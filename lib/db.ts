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
  message: string;
};

const DEFAULT_FORM_TYPE = 'contact';

/** Create the contact_submissions table if it doesn't exist (Neon). Safe to call before insert. */
async function ensureTable(sql: ReturnType<typeof neon>): Promise<void> {
  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      form_type TEXT NOT NULL DEFAULT 'contact',
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS contact_submissions_form_type_idx
    ON contact_submissions (form_type)
  `;
}

/** Insert a form submission. formType identifies the form (e.g. contact, newsletter). Returns new id or null if DB not configured. */
export async function insertContactSubmission(
  data: ContactSubmission,
  formType: string = DEFAULT_FORM_TYPE
): Promise<number | null> {
  const sql = getSql();
  if (!sql) return null;

  await ensureTable(sql);
  const rows = await sql`
    INSERT INTO contact_submissions (form_type, name, email, phone, message)
    VALUES (${formType}, ${data.name}, ${data.email}, ${data.phone ?? null}, ${data.message})
    RETURNING id
  `;
  const row = rows[0] as { id: number } | undefined;
  return row?.id ?? null;
}
