/**
 * Airtable API helpers for contact/CTA form submissions.
 *
 * Required env: AIRTABLE_ACCESS_TOKEN (or AIRTABLE_API_KEY), AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID
 * - BASE_ID: from the Airtable URL (e.g. app9YUgvYfBCLgsjq)
 * - TABLE_ID: the table ID from the URL (e.g. tbl4c56AhviFwOJlu), not the table name
 *
 * Optional env to match your Airtable field names (defaults in parentheses):
 * AIRTABLE_FIELD_NAME (Name), AIRTABLE_FIELD_EMAIL (Email), AIRTABLE_FIELD_PHONE (Phone),
 * AIRTABLE_FIELD_MESSAGE (Message), AIRTABLE_FIELD_FORM (Form), AIRTABLE_FIELD_NIP (NIP)
 * e.g. for Polish: AIRTABLE_FIELD_NAME="Imię i Nazwisko" AIRTABLE_FIELD_PHONE="Telefon"
 */

export type ContactSubmission = {
  name: string;
  email: string;
  phone?: string | null;
  nip?: string | null;
  message: string;
};

const BASE_URL = 'https://api.airtable.com/v0';

function getFieldName(key: 'name' | 'email' | 'phone' | 'message' | 'form' | 'nip'): string {
  const envKey = `AIRTABLE_FIELD_${key.toUpperCase()}` as keyof NodeJS.ProcessEnv;
  const value = process.env[envKey];
  if (typeof value === 'string' && value.trim()) return value.trim();
  // Match "Formularz kontaktowy" columns: Imię i Nazwisko, Email, Telefon, NIP, Wiadomość
  const defaults: Record<string, string> = {
    name: 'Imię i Nazwisko',
    email: 'Email',
    phone: 'Telefon',
    message: 'Wiadomość',
    form: 'Form',
    nip: 'NIP',
  };
  return defaults[key];
}

function getConfig(): { token: string; baseId: string; tableId: string } | null {
  const token = process.env.AIRTABLE_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  // API requires table ID (tbl...), not table name
  const tableId = process.env.AIRTABLE_TABLE_ID || process.env.AIRTABLE_TABLE_NAME;
  if (!token || !baseId || !tableId) return null;
  return { token, baseId, tableId };
}

/**
 * Append a contact/CTA form submission to an Airtable table.
 * Uses env-based field names so your base can use e.g. "Imię i Nazwisko", "Telefon".
 */
export async function appendContactSubmission(
  data: ContactSubmission,
  formType: string = 'contact'
): Promise<{ id: string } | null> {
  const config = getConfig();
  if (!config) return null;

  const tableIdEncoded = encodeURIComponent(config.tableId);
  const url = `${BASE_URL}/${config.baseId}/${tableIdEncoded}`;

  const nameKey = getFieldName('name');
  const emailKey = getFieldName('email');
  const messageKey = getFieldName('message');
  const formKey = getFieldName('form');

  const fields: Record<string, string> = {
    [nameKey]: data.name,
    [emailKey]: data.email,
    [messageKey]: data.message,
    [formKey]: formType,
  };
  const phoneKey = getFieldName('phone');
  const nipKey = getFieldName('nip');
  if (data.phone != null && data.phone !== '') fields[phoneKey] = data.phone;
  if (data.nip != null && data.nip !== '') fields[nipKey] = data.nip;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      records: [{ fields }],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = (err as { error?: { message?: string }; message?: string }).error?.message ?? (err as { message?: string }).message ?? `Airtable ${res.status}`;
    console.error('[Airtable]', res.status, msg, err);
    throw new Error(msg);
  }

  const json = (await res.json()) as { records?: { id: string }[] };
  const id = json.records?.[0]?.id;
  return id ? { id } : null;
}
