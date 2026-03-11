# Redesign: AI Minimal — Deliverable

**Branch:** `redesign-ai-minimal`  
**Scope:** Visual and layout layer only. All routes, navigation, content, SEO metadata, and functionality are unchanged.

---

## 1. Branch structure

- **Base:** Created from `origin/main`; `main` was not modified.
- **Logo asset:** `public/assets/smartweave-logo-ai.png` (SmartWeave logo with white text and accent star on dark).
- **Modified areas:**
  - `app/globals.css` — design tokens, base styles, utilities, animations
  - `app/layout.tsx` — Syne & Manrope fonts, body background/theme
  - `tailwind.config.ts` — accent, graphite, font families, shadows
  - `app/components/` — Header, Footer, Hero, PainPoints, Services, Tools, AutomationDetails, Portfolio, Blog, CTA, ScrollToTop, Button
  - No new routes or pages; no changes to SEO structure (H1/H2, metadata, semantic HTML).

---

## 2. Modified components

| Component | Changes |
|----------|--------|
| **Header** | Logo → `smartweave-logo-ai.png`; glass bar; nav/dropdowns graphite + accent hover; mobile menu glass + accent; CTA uses shared Button (accent). |
| **Footer** | Same logo; graphite glass bar; contact/links accent icons and hover. |
| **HeroSection** | Graphite bg; accent glow; badge and rotating phrase accent; secondary CTA border accent; scroll indicator accent. |
| **PainPointsSection** | Graphite bg; section badge/headline accent; cards → glass-card + hover-lift; icon/bar accent. |
| **ServicesSection** | Graphite bg; badge/headline accent; service cards → glass-card + hover-lift; list/links accent; “Zobacz pełną ofertę” accent. |
| **ToolsSection** | Badge/headline accent; marquee fades use `--bg-graphite`; tool labels hover accent. |
| **AutomationDetails** | Graphite bg; badge/headline accent; timeline line accent; step cards glass + hover-lift; step number circles accent. |
| **PortfolioSection** | Graphite bg; badge/headline accent; portfolio cards glass + hover-lift; category/title/hover accent; arrows and “Zobacz wszystkie” accent. |
| **BlogSection** | Graphite bg; badge/headline accent; article cards glass + hover-lift; link and bar accent. |
| **CTASection** | Graphite bg; badge/headline accent; form container glass; inputs white/5 + accent focus; submit uses cta-gradient-animated (accent). |
| **ScrollToTop** | Glass + accent border/icon and hover glow. |
| **Button** | Primary: accent solid + hover glow; secondary: border white/15, hover accent. |

---

## 3. Updated styles

### Design tokens (`app/globals.css`)

- **Backgrounds:** `--bg-graphite`, `--bg-graphite-elevated`, `--bg-graphite-card` (glass).
- **Accent:** `--accent` (#d8f17b), `--accent-muted`, `--accent-glow`.
- **Typography:** `--font-syne`, `--font-manrope` (loaded in `layout.tsx` via next/font and applied in base).
- **Spacing/radius:** `--section-padding-*`, `--radius`, etc.

### Base (body, headings)

- Body: `var(--font-manrope)`, `var(--bg-graphite)`, color `#e4e4e7`.
- Headings: `var(--font-syne)`, semibold, tight letter-spacing; H1/H2 responsive `clamp`.

### Utilities

- **`.glass-card`** — `var(--bg-graphite-card)`, backdrop-blur, light border; hover: accent border + accent-glow shadow.
- **`.accent-glow` / `.accent-glow-sm`** — soft box-shadow from accent.
- **`.hover-lift`** — slight translateY and shadow on hover.
- **`.animate-fade-in-up`** — opacity + translateY keyframes (available for use).
- **Skip-link focus** — accent background, graphite text.

### CTA & gradient

- **`.cta-gradient-animated`** — solid accent background, graphite text; hover: accent glow + slight lift (no heavy gradient).
- **`.gradient-philosophy-to-footer`** — gradient from graphite to slightly darker and back (seamless into footer).

### AI animation block (hero)

- Core node and float cards use accent tint and glow instead of cyan/purple.

### Tailwind (`tailwind.config.ts`)

- `fontFamily.syne` / `fontFamily.manrope` from CSS variables.
- `colors.accent`, `colors.graphite`, `boxShadow['accent-glow']`.

---

## 4. Animation implementations

- **Existing motion (unchanged):** Hero phrase swap (AnimatePresence), scroll indicator bounce, section `whileInView` fade-in, card `whileHover` lift where present.
- **New/updated:**
  - **Fade-in-up:** `@keyframes fade-in-up` + `.animate-fade-in-up` in `globals.css` for optional use.
  - **Card hover:** `.hover-lift` (translateY -2px + shadow) used on glass cards across sections.
  - **CTA/submit:** Accent button hover uses `box-shadow` + `transform: translateY(-1px)` (no scale).
  - **AI hero:** Orb and float cards use accent glow and subtle motion as before, with new palette.
- **Principles:** Short duration (~0.2–0.5s), ease-out/ease, no heavy motion; focus on hover and scroll-in.

---

## 5. Logo

- **Asset:** `public/assets/smartweave-logo-ai.png` (white “SmartWeave” + accent star on dark).
- **Usage:** Header and Footer; responsive height (`h-8 sm:h-9 max-h-10`), priority load; high contrast on graphite.

---

## 6. SEO and performance

- All existing H1/H2 and metadata kept.
- Semantic structure and heading order unchanged.
- No extra JS for design-only changes; fonts loaded via next/font (swap).
- Layout and content (including gradient-philosophy wrapper) preserved; only visual layer and layout styling updated.

---

## Summary

The site on `redesign-ai-minimal` uses a **graphite dark** background, **#d8f17b** accent, **Syne** (titles) and **Manrope** (body), with **glassmorphism** cards, **accent glow**, and **subtle hover/scroll** motion. The provided SmartWeave logo is used in Header and Footer. All routes, navigation, content, and SEO remain as on `main`; only the visual layer and layout styling were redesigned.
