import { neon } from '@neondatabase/serverless';

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

function getSql() {
  if (!connectionString) return null;
  return neon(connectionString);
}

export type ContactSubmission = {
  name: string;
  email: string;
  phone?: string | null;
  nip?: string | null;
  message: string;
};

const DEFAULT_FORM_TYPE = 'contact';

/** Insert a form submission. formType identifies the form (e.g. contact, newsletter). Returns new id or null if DB not configured. */
export async function insertContactSubmission(
  data: ContactSubmission,
  formType: string = DEFAULT_FORM_TYPE
): Promise<number | null> {
  const sql = getSql();
  if (!sql) return null;

  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      form_type TEXT NOT NULL DEFAULT 'contact',
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      nip TEXT,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS nip TEXT`;
  await sql`
    CREATE INDEX IF NOT EXISTS contact_submissions_form_type_idx
    ON contact_submissions (form_type)
  `;
  const rows = await sql`
    INSERT INTO contact_submissions (form_type, name, email, phone, nip, message)
    VALUES (${formType}, ${data.name}, ${data.email}, ${data.phone ?? null}, ${data.nip ?? null}, ${data.message})
    RETURNING id
  `;
  const row = rows[0] as { id: number } | undefined;
  return row?.id ?? null;
}
