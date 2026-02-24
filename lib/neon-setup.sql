-- Optional: run manually in Neon SQL Editor (Dashboard → SQL Editor) if you prefer to create the table yourself.
-- Otherwise the app creates it automatically on first contact submission.

CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  form_type TEXT NOT NULL DEFAULT 'contact',
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS contact_submissions_form_type_idx ON contact_submissions (form_type);
