/**
 * Airtable API helpers for contact/CTA form submissions.
 *
 * Required env: AIRTABLE_ACCESS_TOKEN (or AIRTABLE_API_KEY), AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID
 * - BASE_ID: from the Airtable URL (e.g. app9YUgvYfBCLgsjq)
 * - TABLE_ID: the table ID from the URL (e.g. tbl4c56AhviFwOJlu), not the table name
 *
 * Field names are resolved from the table schema (Meta API) so they always match your base.
 * Optional env overrides: AIRTABLE_FIELD_NAME, AIRTABLE_FIELD_EMAIL, etc. (exact Airtable names).
 */

export type ContactSubmission = {
  name: string;
  email: string;
  phone?: string | null;
  nip?: string | null;
  message: string;
};

const BASE_URL = 'https://api.airtable.com/v0';

function getConfig(): { token: string; baseId: string; tableId: string } | null {
  const token = process.env.AIRTABLE_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_TABLE_ID || process.env.AIRTABLE_TABLE_NAME;
  if (!token || !baseId || !tableId) return null;
  return { token, baseId, tableId };
}

type TableSchema = { id: string; name: string; fields: { id: string; name: string; type: string }[] };

const schemaCache = new Map<string, { table: TableSchema; at: number }>();
const SCHEMA_CACHE_MS = 60_000;

async function getTableSchema(config: { token: string; baseId: string; tableId: string }): Promise<TableSchema | null> {
  const cacheKey = `${config.baseId}:${config.tableId}`;
  const cached = schemaCache.get(cacheKey);
  if (cached && Date.now() - cached.at < SCHEMA_CACHE_MS) return cached.table;

  const metaUrl = `${BASE_URL}/meta/bases/${config.baseId}/tables`;
  const res = await fetch(metaUrl, {
    headers: { Authorization: `Bearer ${config.token}` },
  });
  if (!res.ok) {
    console.warn('[Airtable] Meta API failed', res.status, '- using env/default field names');
    return null;
  }
  const json = (await res.json()) as { tables?: TableSchema[] };
  const table = json.tables?.find((t) => t.id === config.tableId || t.name === config.tableId);
  if (table) schemaCache.set(cacheKey, { table, at: Date.now() });
  return table ?? null;
}

/** Resolve Airtable field name: env override, or match from schema, or default. */
function resolveFieldName(
  key: 'name' | 'email' | 'phone' | 'message' | 'form' | 'nip',
  schemaFields: { name: string }[] | null
): string {
  const envKey = `AIRTABLE_FIELD_${key.toUpperCase()}` as keyof NodeJS.ProcessEnv;
  const envVal = process.env[envKey];
  if (typeof envVal === 'string' && envVal.trim()) return envVal.trim();

  const lower = (s: string) => s.toLowerCase();
  const defaults: Record<string, string[]> = {
    name: ['imię', 'nazwisko', 'name'],
    email: ['email'],
    phone: ['telefon', 'phone'],
    message: ['wiadomość', 'message'],
    form: ['form'],
    nip: ['nip'],
  };
  const keywords = defaults[key];
  const match = schemaFields?.find((f) => keywords.some((k) => lower(f.name).includes(k)));
  if (match) return match.name;

  const fallbacks: Record<string, string> = {
    name: 'Imię i Nazwisko',
    email: 'Email',
    phone: 'Telefon',
    message: 'Wiadomość',
    form: 'Form',
    nip: 'NIP',
  };
  return fallbacks[key];
}

/**
 * Append a contact/CTA form submission to an Airtable table.
 * Uses table schema to get exact field names so data always maps to your columns.
 */
export async function appendContactSubmission(
  data: ContactSubmission,
  formType: string = 'contact'
): Promise<{ id: string } | null> {
  const config = getConfig();
  if (!config) return null;

  const schema = await getTableSchema(config);
  const schemaFields = schema?.fields ?? null;

  const nameKey = resolveFieldName('name', schemaFields);
  const emailKey = resolveFieldName('email', schemaFields);
  const messageKey = resolveFieldName('message', schemaFields);
  const formKey = resolveFieldName('form', schemaFields);
  const phoneKey = resolveFieldName('phone', schemaFields);
  const nipKey = resolveFieldName('nip', schemaFields);

  const fields: Record<string, string> = {
    [nameKey]: data.name,
    [emailKey]: data.email,
    [messageKey]: data.message,
    [formKey]: formType,
  };
  if (data.phone != null && data.phone !== '') fields[phoneKey] = data.phone;
  if (data.nip != null && data.nip !== '') fields[nipKey] = data.nip;

  const tableIdEncoded = encodeURIComponent(config.tableId);
  const url = `${BASE_URL}/${config.baseId}/${tableIdEncoded}`;
  const body = { records: [{ fields }] };

  if (process.env.NODE_ENV === 'development') {
    console.log('[Airtable] Sending field keys:', Object.keys(fields));
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = (err as { error?: { message?: string }; message?: string }).error?.message ?? (err as { message?: string }).message ?? `Airtable ${res.status}`;
    console.error('[Airtable]', res.status, msg, 'field keys sent:', Object.keys(fields));
    throw new Error(msg);
  }

  const json = (await res.json()) as { records?: { id: string }[] };
  const id = json.records?.[0]?.id;
  if (process.env.NODE_ENV === 'development' && id) {
    console.log('[Airtable] Record created', id);
  }
  return id ? { id } : null;
}
