import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { insertContactSubmission } from '@/lib/db';
import { appendContactSubmission } from '@/lib/airtable';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM = process.env.RESEND_FROM || 'SmartWeave <onboarding@resend.dev>';
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const DEFAULT_FORM = 'contact';

const MAX_NAME = 200;
const MAX_EMAIL = 320;
const MAX_PHONE = 50;
const NIP_LENGTH = 10;
const MAX_MESSAGE = 5000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

const rateLimitMap = new Map<string, number[]>();

function getClientIp(request: Request): string {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  const xri = request.headers.get('x-real-ip');
  if (xri) return xri.trim();
  return 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cut = now - RATE_LIMIT_WINDOW_MS;
  let times = rateLimitMap.get(ip) ?? [];
  times = times.filter((t) => t > cut);
  if (times.length >= RATE_LIMIT_MAX) return true;
  times.push(now);
  rateLimitMap.set(ip, times);
  return false;
}

function getFormspreeId(form: string): string | undefined {
  const key = `FORMSPREE_FORM_ID_${form}`;
  return process.env[key] || process.env.FORMSPREE_FORM_ID;
}

function getEmailTo(form: string): string | undefined {
  const key = `CONTACT_EMAIL_TO_${form}`;
  return process.env[key] || process.env.CONTACT_EMAIL_TO;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Zbyt wiele prób. Spróbuj za chwilę.' },
      { status: 429 }
    );
  }

  let body: {
    form?: string;
    name?: string;
    email?: string;
    phone?: string;
    nip?: string;
    message?: string;
    website?: string;
    _hp?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (body.website?.trim() || body._hp?.trim()) {
    return NextResponse.json({ success: true });
  }

  const form = (body.form?.trim() || DEFAULT_FORM).toLowerCase().replace(/\s+/g, '_');
  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim() || undefined;
  const nipRaw = body.nip?.replace(/\D/g, '') ?? '';
  const nip = nipRaw.length === NIP_LENGTH ? nipRaw : undefined;
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Imię, email i wiadomość są wymagane.' },
      { status: 400 }
    );
  }

  if (name.length > MAX_NAME || email.length > MAX_EMAIL || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Nieprawidłowe dane.' }, { status: 400 });
  }
  if (phone && phone.length > MAX_PHONE) {
    return NextResponse.json({ error: 'Nieprawidłowe dane.' }, { status: 400 });
  }
  if (body.nip != null && body.nip.trim() !== '' && !nip) {
    return NextResponse.json({ error: 'NIP musi składać się z 10 cyfr.' }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: 'Wiadomość jest za długa.' }, { status: 400 });
  }

  const hasAirtable = !!(
    (process.env.AIRTABLE_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY) &&
    process.env.AIRTABLE_BASE_ID &&
    (process.env.AIRTABLE_TABLE_NAME || process.env.AIRTABLE_TABLE_ID)
  );
  const hasDb = !!(process.env.POSTGRES_URL || process.env.DATABASE_URL);
  const formspreeId = getFormspreeId(form);
  const emailTo = getEmailTo(form);
  const hasGmail = !!(GMAIL_USER && GMAIL_APP_PASSWORD && emailTo);
  const hasEmail = !!(RESEND_API_KEY && emailTo) || hasGmail || !!formspreeId;

  // Prefer Airtable for storage when configured; otherwise fall back to Neon
  const useAirtable = hasAirtable;
  const useDb = hasDb && !useAirtable;

  if (!useAirtable && !useDb && !hasEmail) {
    return NextResponse.json(
      { error: 'Formularz jest tymczasowo niedostępny. Spróbuj później.' },
      { status: 503 }
    );
  }

  if ((useAirtable || useDb) && !hasEmail) {
    console.warn(
      '[Contact] Email not configured: Gmail (GMAIL_USER + GMAIL_APP_PASSWORD + CONTACT_EMAIL_TO_cta), Resend, or Formspree'
    );
  }

  const payload = { name, email, phone, nip, message };
  const storagePromise = useAirtable
    ? appendContactSubmission(payload, form)
    : useDb
      ? insertContactSubmission(payload, form)
      : Promise.resolve(null);
  const emailPromise = hasEmail
    ? sendContactEmail(payload, form, formspreeId ?? undefined, emailTo)
    : Promise.resolve();

  const [storageResult, emailResult] = await Promise.allSettled([storagePromise, emailPromise]);

  const storageOk = storageResult.status === 'fulfilled';
  const emailOk = emailResult.status === 'fulfilled';

  if (!storageOk && storageResult.status === 'rejected') {
    console.error('Contact form storage error (Airtable/Neon):', storageResult.reason);
  }
  let emailErr: string | undefined;
  if (!emailOk && emailResult.status === 'rejected') {
    const err = emailResult.reason;
    emailErr = err instanceof Error ? err.message : String(err);
    console.error('Contact form email error:', emailErr);
  }

  if (storageOk && emailOk) {
    return NextResponse.json({ success: true });
  }
  if (emailOk) {
    return NextResponse.json({ success: true });
  }
  if (storageOk) {
    const isDev = process.env.NODE_ENV === 'development';
    const message =
      'Wiadomość zapisana. Powiadomienie e-mail nie zostało wysłane.' +
      (isDev && emailErr ? ` (${emailErr})` : '');
    return NextResponse.json({ success: true, message });
  }
  return NextResponse.json(
    { error: 'Nie udało się zapisać wiadomości ani wysłać e-maila. Spróbuj później.' },
    { status: 500 }
  );
}

async function sendContactEmail(
  data: { name: string; email: string; phone?: string; nip?: string; message: string },
  form: string,
  formspreeId: string | undefined,
  emailTo: string | undefined
): Promise<void> {
  if (RESEND_API_KEY && emailTo) {
    await sendViaResend(data, emailTo, form);
    return;
  }
  if (GMAIL_USER && GMAIL_APP_PASSWORD && emailTo) {
    await sendViaGmail(data, emailTo, form);
    return;
  }
  if (formspreeId) {
    await sendViaFormspree(data, formspreeId);
    return;
  }
}

async function sendViaResend(
  data: { name: string; email: string; phone?: string; nip?: string; message: string },
  emailTo: string,
  form: string
): Promise<void> {
  if (!RESEND_API_KEY) return;

  const resend = new Resend(RESEND_API_KEY);
  const to = emailTo.split(',').map((e) => e.trim()).filter(Boolean);
  const prefix = form === 'cta' ? '[SmartWeave CTA]' : '[SmartWeave]';
  const subject = `${prefix} Wiadomość od ${data.name}`;
  const html = [
    `<p><strong>Imię i Nazwisko / Nazwa firmy:</strong> ${escapeHtml(data.name)}</p>`,
    `<p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>`,
    data.phone ? `<p><strong>Telefon:</strong> ${escapeHtml(data.phone)}</p>` : '',
    `<p><strong>NIP:</strong> ${data.nip ? escapeHtml(data.nip) : '-'}</p>`,
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

/** Free option: send via your Gmail (use App password from Google Account → Security). */
async function sendViaGmail(
  data: { name: string; email: string; phone?: string; nip?: string; message: string },
  emailTo: string,
  form: string
): Promise<void> {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) return;

  const prefix = form === 'cta' ? '[SmartWeave CTA]' : '[SmartWeave]';
  const subject = `${prefix} Wiadomość od ${data.name}`;
  const html = [
    `<p><strong>Imię i Nazwisko / Nazwa firmy:</strong> ${escapeHtml(data.name)}</p>`,
    `<p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>`,
    data.phone ? `<p><strong>Telefon:</strong> ${escapeHtml(data.phone)}</p>` : '',
    `<p><strong>NIP:</strong> ${data.nip ? escapeHtml(data.nip) : '-'}</p>`,
    '<p><strong>Wiadomość:</strong></p>',
    `<p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>`,
  ]
    .filter(Boolean)
    .join('');

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  const toList = emailTo.split(',').map((e) => e.trim()).filter(Boolean);
  await transporter.sendMail({
    from: `SmartWeave <${GMAIL_USER}>`,
    to: toList,
    replyTo: data.email,
    subject,
    html,
  });
}

async function sendViaFormspree(
  data: { name: string; email: string; phone?: string; nip?: string; message: string },
  formspreeId: string
): Promise<void> {
  const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      nip: data.nip || '',
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
