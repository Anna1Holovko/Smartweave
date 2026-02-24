import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { insertContactSubmission } from '@/lib/db';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM = process.env.RESEND_FROM || 'SmartWeave <hello@smartweave.com>';
const DEFAULT_FORM = 'contact';

function getFormspreeId(form: string): string | undefined {
  const key = `FORMSPREE_FORM_ID_${form}`;
  return process.env[key] || process.env.FORMSPREE_FORM_ID;
}

function getEmailTo(form: string): string | undefined {
  const key = `CONTACT_EMAIL_TO_${form}`;
  return process.env[key] || process.env.CONTACT_EMAIL_TO;
}

export async function POST(request: Request) {
  let body: { form?: string; name?: string; email?: string; phone?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const form = (body.form?.trim() || DEFAULT_FORM).toLowerCase().replace(/\s+/g, '_');
  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim() || undefined;
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Imię, email i wiadomość są wymagane.' },
      { status: 400 }
    );
  }

  const hasDb = !!(process.env.POSTGRES_URL || process.env.DATABASE_URL);
  const formspreeId = getFormspreeId(form);
  const emailTo = getEmailTo(form);
  const hasEmail = !!(RESEND_API_KEY && emailTo) || !!formspreeId;

  if (!hasDb && !hasEmail) {
    return NextResponse.json(
      {
        error: `Skonfiguruj Neon (POSTGRES_URL – zapisy do bazy) i/lub powiadomienia e-mail: Resend (RESEND_API_KEY + CONTACT_EMAIL_TO) lub Formspree (FORMSPREE_FORM_ID lub FORMSPREE_FORM_ID_${form}).`,
      },
      { status: 503 }
    );
  }

  if (hasDb && !hasEmail) {
    console.warn(
      '[Contact] Email not configured: set RESEND_API_KEY + CONTACT_EMAIL_TO (or CONTACT_EMAIL_TO_contact), or FORMSPREE_FORM_ID / FORMSPREE_FORM_ID_contact'
    );
  }

  // Run DB insert and email notification in parallel (CTA: save to Neon + notify emails at once)
  const dbPromise = hasDb
    ? insertContactSubmission({ name, email, phone, message }, form)
    : Promise.resolve(null);
  const emailPromise = hasEmail
    ? sendContactEmail({ name, email, phone, message }, form, formspreeId ?? undefined, emailTo)
    : Promise.resolve();

  const [dbResult, emailResult] = await Promise.allSettled([dbPromise, emailPromise]);

  const dbOk = dbResult.status === 'fulfilled';
  const emailOk = emailResult.status === 'fulfilled';

  if (!dbOk && dbResult.status === 'rejected') {
    console.error('Contact form DB insert error:', dbResult.reason);
  }
  if (!emailOk && emailResult.status === 'rejected') {
    const err = emailResult.reason;
    console.error('Contact form email error:', err instanceof Error ? err.message : err);
  }

  if (dbOk && emailOk) {
    return NextResponse.json({ success: true });
  }
  if (emailOk) {
    return NextResponse.json({ success: true });
  }
  if (dbOk) {
    return NextResponse.json({
      success: true,
      message: 'Wiadomość zapisana. Powiadomienie e-mail nie zostało wysłane.',
    });
  }
  return NextResponse.json(
    { error: 'Nie udało się zapisać wiadomości ani wysłać e-maila. Spróbuj później.' },
    { status: 500 }
  );
}

async function sendContactEmail(
  data: { name: string; email: string; phone?: string; message: string },
  form: string,
  formspreeId: string | undefined,
  emailTo: string | undefined
): Promise<void> {
  if (RESEND_API_KEY && emailTo) {
    await sendViaResend(data, emailTo);
    return;
  }
  if (formspreeId) {
    await sendViaFormspree(data, formspreeId);
    return;
  }
}

async function sendViaResend(
  data: { name: string; email: string; phone?: string; message: string },
  emailTo: string
): Promise<void> {
  if (!RESEND_API_KEY) return;

  const resend = new Resend(RESEND_API_KEY);
  const to = emailTo.split(',').map((e) => e.trim()).filter(Boolean);
  const subject = `[SmartWeave] Wiadomość od ${data.name}`;
  const html = [
    `<p><strong>Imię i nazwisko:</strong> ${escapeHtml(data.name)}</p>`,
    `<p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>`,
    data.phone ? `<p><strong>Telefon:</strong> ${escapeHtml(data.phone)}</p>` : '',
    '<p><strong>Wiadomość:</strong></p>',
    `<p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>`,
  ]
    .filter(Boolean)
    .join('');

  const { error } = await resend.emails.send({
    from: RESEND_FROM,
    to,
    replyTo: data.email,
    subject,
    html,
  });

  if (error) throw new Error(error.message);
}

async function sendViaFormspree(
  data: { name: string; email: string; phone?: string; message: string },
  formspreeId: string
): Promise<void> {
  const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      message: data.message,
      _subject: `[SmartWeave] Wiadomość od ${data.name}`,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Formspree ${res.status}`);
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
