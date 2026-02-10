-- ============================================
-- NAPRAWA TABELI kv_store_d2f83652
-- ============================================
-- Skopiuj WSZYSTKO i uruchom w Supabase SQL Editor
-- https://supabase.com/dashboard/project/mpokyroyyqxhxlkofluc/sql/new

-- KROK 1: Usuń starą tabelę jeśli istnieje (z CASCADE dla bezpieczeństwa)
DROP TABLE IF EXISTS kv_store_d2f83652 CASCADE;

-- KROK 2: Stwórz tabelę od nowa z DOKŁADNĄ strukturą
CREATE TABLE kv_store_d2f83652 (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- KROK 3: Wyłącz RLS (Row Level Security) całkowicie
ALTER TABLE kv_store_d2f83652 DISABLE ROW LEVEL SECURITY;

-- KROK 4: Nadaj pełne uprawnienia wszystkim rolom
GRANT ALL PRIVILEGES ON TABLE kv_store_d2f83652 TO anon;
GRANT ALL PRIVILEGES ON TABLE kv_store_d2f83652 TO authenticated;
GRANT ALL PRIVILEGES ON TABLE kv_store_d2f83652 TO service_role;
GRANT ALL PRIVILEGES ON TABLE kv_store_d2f83652 TO postgres;

-- KROK 5: Dodaj komentarz do tabeli (opcjonalnie)
COMMENT ON TABLE kv_store_d2f83652 IS 'Key-Value store for contact form submissions';

-- KROK 6: Stwórz indeks dla szybszego wyszukiwania po kluczach zaczynających się od "contact:"
CREATE INDEX IF NOT EXISTS idx_kv_store_contact_keys ON kv_store_d2f83652(key) WHERE key LIKE 'contact:%';

-- KROK 7: Stwórz indeks na created_at dla sortowania
CREATE INDEX IF NOT EXISTS idx_kv_store_created_at ON kv_store_d2f83652(created_at DESC);

-- ============================================
-- WERYFIKACJA - SPRAWDŹ CZY DZIAŁA
-- ============================================

-- Test 1: Sprawdź strukturę tabeli
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns
WHERE table_name = 'kv_store_d2f83652'
ORDER BY ordinal_position;

-- Test 2: Sprawdź RLS status (powinno być FALSE)
SELECT 
  schemaname,
  tablename, 
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'kv_store_d2f83652';

-- Test 3: Sprawdź uprawnienia
SELECT 
  grantee, 
  privilege_type 
FROM information_schema.role_table_grants 
WHERE table_name = 'kv_store_d2f83652';

-- Test 4: Wstaw testowy rekord
INSERT INTO kv_store_d2f83652 (key, value) 
VALUES ('test:123', '{"test": true, "timestamp": "2026-02-10T12:00:00Z"}'::jsonb);

-- Test 5: Sprawdź czy rekord został zapisany
SELECT * FROM kv_store_d2f83652 WHERE key = 'test:123';

-- Test 6: Usuń testowy rekord
DELETE FROM kv_store_d2f83652 WHERE key = 'test:123';

-- ============================================
-- OCZEKIWANY WYNIK
-- ============================================
-- Po uruchomieniu powinno pokazać:
-- 
-- Test 1 (Struktura):
--   key         | text   | NO
--   value       | jsonb  | NO
--   created_at  | timestamptz | YES
--
-- Test 2 (RLS):
--   rls_enabled: false
--
-- Test 3 (Uprawnienia):
--   anon           | SELECT, INSERT, UPDATE, DELETE
--   authenticated  | SELECT, INSERT, UPDATE, DELETE
--   service_role   | SELECT, INSERT, UPDATE, DELETE
--
-- Test 4-6: Success
-- ============================================
