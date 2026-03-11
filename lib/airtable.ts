/**
 * Airtable API for contact submissions (no "Form" column sent).
 *
 * Required env: AIRTABLE_ACCESS_TOKEN (or AIRTABLE_API_KEY), AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID
 * - BASE_ID from URL (e.g. app9YUgvYfBCLgsjq), TABLE_ID from URL (e.g. tbl4c56AhviFwOJlu)
 *
 * Field names: we send exactly these (copy from your Airtable column headers if different):
 * - Imię i Nazwisko, Email, Telefon, NIP, Wiadomość
 * Override with AIRTABLE_FIELD_NAME, AIRTABLE_FIELD_EMAIL, etc.
 */

export type ContactSubmission = {
  name: string;
  email: string;
  phone?: string | null;
  nip?: string | null;
  message: string;
};

const BASE_URL = 'https://api.airtable.com/v0';

// Exact column names for "Formularz kontaktowy" – override with AIRTABLE_FIELD_* if your base differs
const FIELD_KEYS = ['name', 'email', 'phone', 'message', 'nip'] as const;

function getConfig(): { token: string; baseId: string; tableId: string } | null {
  const token = process.env.AIRTABLE_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_TABLE_ID || process.env.AIRTABLE_TABLE_NAME;
  if (!token || !baseId || !tableId) return null;
  return { token, baseId, tableId };
}

function getFieldName(key: (typeof FIELD_KEYS)[number]): string {
  const envKey = `AIRTABLE_FIELD_${key.toUpperCase()}` as keyof NodeJS.ProcessEnv;
  const v = process.env[envKey];
  if (typeof v === 'string' && v.trim()) return v.trim();
  const names: Record<string, string> = {
    name: 'Imię i Nazwisko / Nazwa firmy',
    email: 'Email',
    phone: 'Telefon',
    message: 'Wiadomość',
    nip: 'NIP',
  };
  return names[key];
}

/** Debug: config status and field names we use (no Meta API). */
export async function getAirtableDebugInfo(): Promise<{
  configured: boolean;
  baseId?: string;
  tableId?: string;
  fieldNames: Record<string, string>;
}> {
  const config = getConfig();
  if (!config) {
    return { configured: false, fieldNames: {} };
  }
  const fieldNames: Record<string, string> = {};
  for (const k of FIELD_KEYS) fieldNames[k] = getFieldName(k);
  return {
    configured: true,
    baseId: config.baseId,
    tableId: config.tableId,
    fieldNames,
  };
}

/**
 * Create one record in Airtable. No Meta API – uses env or Polish defaults only.
 * Form type is not sent to Airtable (no "Form" column).
 */
export async function appendContactSubmission(data: ContactSubmission): Promise<{ id: string } | null> {
  const config = getConfig();
  if (!config) {
    console.error('[Airtable] Missing env: AIRTABLE_ACCESS_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID');
    throw new Error('Airtable not configured');
  }

  const fields: Record<string, string> = {
    [getFieldName('name')]: data.name,
    [getFieldName('email')]: data.email,
    [getFieldName('message')]: data.message,
  };
  if (data.phone?.trim()) fields[getFieldName('phone')] = data.phone.trim();
  if (data.nip?.trim()) fields[getFieldName('nip')] = data.nip.trim();

  const url = `${BASE_URL}/${config.baseId}/${encodeURIComponent(config.tableId)}`;
  const body = JSON.stringify({ records: [{ fields }] });

  console.log('[Airtable] POST', url, 'keys:', Object.keys(fields).join(', '));

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.token}`,
      'Content-Type': 'application/json',
    },
    body,
  });

  const resText = await res.text();
  if (!res.ok) {
    console.error('[Airtable]', res.status, resText);
    let msg = `Airtable ${res.status}`;
    try {
      const err = JSON.parse(resText) as { error?: { message?: string }; message?: string };
      msg = err.error?.message ?? err.message ?? msg;
    } catch {
      if (resText) msg = resText.slice(0, 200);
    }
    throw new Error(msg);
  }

  let json: { records?: { id: string }[] };
  try {
    json = JSON.parse(resText) as { records?: { id: string }[] };
  } catch {
    console.error('[Airtable] Invalid JSON', resText.slice(0, 200));
    return null;
  }
  const id = json.records?.[0]?.id ?? null;
  console.log('[Airtable] Created', id ?? 'no id in response');
  return id ? { id } : null;
}
