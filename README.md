# SmartWeave – Design & Automatyzacja

Next.js landing page for SmartWeave: design, strony WWW i automatyzacja procesów dla firm.

## Setup

```bash
npm install
```

## Running the app

- **Development:** `npm run dev` — runs at [http://localhost:3000](http://localhost:3000)
- **Production build:** `npm run build` then `npm start`
- **Lint:** `npm run lint`

The contact form saves submissions to Neon (DB) and/or sends email via Resend or Formspree; configure at least one in `.env.local` (see section below).

## Formularz kontaktowy – konfiguracja

Formularz zapisuje zgłoszenia do bazy (Neon) i/lub wysyła powiadomienia e-mail (Resend lub Formspree). Wystarczy skonfigurować **Neon** albo **e-mail** (albo oba). Skopiuj `.env.example` do `.env.local` i uzupełnij zmienne.

### Neon (zapisy do bazy)

1. Wejdź na [neon.tech](https://neon.tech) i zaloguj się.
2. **New project** → wybierz region, nazwę projektu.
3. W projekcie: **Connection details** → skopiuj **Connection string**.
4. W `.env.local` ustaw:
   ```bash
   POSTGRES_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```
   (albo `DATABASE_URL` – tabela `contact_submissions` tworzy się przy pierwszym zgłoszeniu.)

### Powiadomienia e-mail

**Opcja A – Formspree** (darmowo ok. 50 zgłoszeń/miesiąc na formularz):

1. [formspree.io](https://formspree.io) → utwórz formularz, skopiuj ID (np. `xyzabc`).
2. W `.env.local`:
   ```bash
   FORMSPREE_FORM_ID=xyzabc
   ```
   Dla wielu formularzy (np. kontakt + newsletter):
   ```bash
   FORMSPREE_FORM_ID_contact=xyzabc
   FORMSPREE_FORM_ID_newsletter=yyyzzz
   ```

**Opcja B – Resend** (darmowo ok. 100 e-maili/dzień):

1. [resend.com](https://resend.com) → API Keys → utwórz klucz.
2. W `.env.local`:
   ```bash
   RESEND_API_KEY=re_xxxxxxxxxxxx
   CONTACT_EMAIL_TO=hello@smartweave.com,ann7golovko@gmail.com
   ```
   Opcjonalnie nadawca (domyślnie Resend):
   ```bash
   RESEND_FROM=SmartWeave <noreply@twoja-domena.com>
   ```
   Dla różnych formularzy:
   ```bash
   CONTACT_EMAIL_TO_contact=hello@smartweave.com
   CONTACT_EMAIL_TO_newsletter=newsletter@smartweave.com
   ```

### Vercel – sterowanie Resend z poziomu Vercel

Żeby formularz kontaktowy / CTA wysyłał e-maile na produkcji, ustaw w Vercel te same zmienne co w `.env.local`:

1. **Vercel Dashboard** → Twój projekt → **Settings** → **Environment Variables**.
2. Dodaj (dla **Production**, **Preview** i/lub **Development**, według potrzeb):

| Zmienna | Opis | Przykład |
|--------|------|----------|
| `RESEND_API_KEY` | Klucz API z [resend.com](https://resend.com) → API Keys | `re_xxxxxxxxxxxx` |
| `RESEND_FROM` | Adres nadawcy (zweryfikowana domena lub `onboarding@resend.dev`) | `SmartWeave <hello@smartweave.pl>` |
| `CONTACT_EMAIL_TO` | Domyślny odbiorca (wiele adresów: po przecinku) | `hello@smartweave.pl` |
| `CONTACT_EMAIL_TO_cta` | Odbiorcy zgłoszeń z sekcji CTA | `ann7golovko@gmail.com,partner@firma.pl` |

3. **Save** i zrób **Redeploy** (lub poczekaj na kolejny deploy), żeby zmienne zostały wzięte pod uwagę.

Dzięki temu cała konfiguracja Resend (klucz, nadawca, odbiorcy) jest w Vercel – bez commitu `.env.local`.

Dane w Neon, ale brak maila? Dodaj w tym samym miejscu co POSTGRES_URL zmienne e-mail: Resend (RESEND_API_KEY i CONTACT_EMAIL_TO) lub Formspree (FORMSPREE_FORM_ID lub FORMSPREE_FORM_ID_contact). Bez nich e-mail nie jest wysyłany.

## Tech stack

- **Next.js 15** (App Router)
- **React 18**, **TypeScript**
- **Tailwind CSS**
- **Motion** (animations)
- **Lucide React** (icons)
