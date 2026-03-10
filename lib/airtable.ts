/**
 * Airtable API helpers for contact/CTA form submissions.
 * Requires: AIRTABLE_ACCESS_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME (or AIRTABLE_TABLE_ID)
 * Table should have fields: Name, Email, Phone, NIP, Message, Form (or match the keys below).
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
  const tableId = process.env.AIRTABLE_TABLE_NAME || process.env.AIRTABLE_TABLE_ID;
  if (!token || !baseId || !tableId) return null;
  return { token, baseId, tableId };
}

/**
 * Append a contact/CTA form submission to an Airtable table.
 * Field names in Airtable must match (e.g. "Name", "Email", "Phone", "NIP", "Message", "Form").
 */
export async function appendContactSubmission(
  data: ContactSubmission,
  formType: string = 'contact'
): Promise<{ id: string } | null> {
  const config = getConfig();
  if (!config) return null;

  const tableIdEncoded = encodeURIComponent(config.tableId);
  const url = `${BASE_URL}/${config.baseId}/${tableIdEncoded}`;

  const fields: Record<string, string> = {
    Name: data.name,
    Email: data.email,
    Message: data.message,
    Form: formType,
  };
  if (data.phone != null && data.phone !== '') fields.Phone = data.phone;
  if (data.nip != null && data.nip !== '') fields.NIP = data.nip;

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
    throw new Error((err as { error?: { message?: string } }).error?.message || `Airtable ${res.status}`);
  }

  const json = (await res.json()) as { records?: { id: string }[] };
  const id = json.records?.[0]?.id;
  return id ? { id } : null;
}
