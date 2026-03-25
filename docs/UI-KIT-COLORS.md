# SmartWeave — UI kit: colors in use

Only colors that **actually appear** in the codebase are listed below. All values in **hex** (and rgba where opacity is used). Use these in design tools and when adding styles.

---

## Backgrounds, texts, navbar, footer, CTAs

Quick reference for the main UI areas. All hex unless noted.

### Backgrounds

| Area | Hex | Notes |
|------|-----|--------|
| **Page (body)** | `#020617` | Main page background |
| **Navbar (Header)** | `rgba(2, 6, 23, 0.6)` | Same as #020617 at 60% + `backdrop-filter: blur(12px)` |
| **Footer** | `rgba(2, 6, 23, 0.6)` | Same as navbar + `backdrop-filter: blur(12px)` |
| **Footer top border** | `#1e293b` @ 50% | `border-slate-800/50` |
| **CTA section (full)** | Gradient | `#020617` → purple tint → `#020617` (see §6) |
| **CTA section orbs** | `#a855f7` @ 20%, `#3b82f6` @ 10% | Purple and blue blur circles |
| **CTA form container** | `#0f172a` @ 60% | `bg-slate-900/60` + border `#334155` @ 50% |
| **Simple CTA (other pages)** | Same as CTA section | Same gradient + orbs |
| **Mobile menu panel** | `#0f172a` | `bg-slate-900` + border `#1e293b` |

### Texts

| Use | Hex |
|-----|-----|
| **Headings, primary** | `#ffffff` |
| **Body, descriptions** | `#94a3b8` |
| **Muted, dates, copyright** | `#64748b` |
| **Labels (e.g. form)** | `#cbd5e1` |
| **Links, accent icons** | `#c084fc` |
| **Links hover** | `#ffffff` |

### Navbar (Header)

| Element | Hex |
|---------|-----|
| **Background** | `rgba(2, 6, 23, 0.6)` + blur 12px |
| **Nav link default** | `#cbd5e1` |
| **Nav link hover** | `#ffffff` |
| **Dropdown panel bg** | `#0f172a` @ 95% |
| **Dropdown panel border** | `#334155` @ 50% |
| **Dropdown item default** | `#cbd5e1` |
| **Dropdown item hover bg** | `#1e293b` @ 50% |
| **Mobile menu open border** | `#334155` @ 50% |
| **Mobile hamburger border** | `#334155` |
| **Mobile menu panel bg** | `#0f172a` |
| **Mobile menu panel border** | `#1e293b` |
| **Primary button (Rozpocznij Projekt)** | CTA gradient (see CTAs below) |

### Footer

| Element | Hex |
|---------|-----|
| **Background** | `rgba(2, 6, 23, 0.6)` + blur 12px |
| **Top border** | `#1e293b` @ 50% |
| **Tagline** | `#94a3b8` |
| **Copyright** | `#64748b` |
| **"Kontakt" heading** | `#ffffff` |
| **Contact list text** | `#94a3b8` |
| **Contact links hover** | `#c084fc` |
| **Icons (MapPin, Mail, etc.)** | `#c084fc` |

### CTAs (home: full section + form; other pages: simple block)

| Element | Hex |
|---------|-----|
| **Section background** | Gradient: `#020617` → purple tint → `#020617` |
| **Headline (gradient text, home)** | CTA gradient: `#6BA1FB` → `#A18DFA` → `#EB75BD` |
| **Headline (simple CTA)** | `#ffffff` |
| **Subtext / description** | `#94a3b8` |
| **Badge bg (e.g. "Chcesz spróbować?")** | `#a855f7` @ 10% |
| **Badge border** | `#a855f7` @ 30% |
| **Badge text** | `#d8b4fe` |
| **Primary button ("Napisz do nas", "Wyślij wiadomość")** | Background: CTA gradient `#6BA1FB` → `#A18DFA` → `#EB75BD`; text `#ffffff`; hover shadow `rgba(167,139,250,0.4)` |
| **Secondary button ("Umów krótką diagnozę")** | Background transparent; border `#334155`; text `#ffffff`; hover border `#a855f7` @ 50%, hover bg `#1e293b` @ 30% |
| **Form inputs bg** | `#1e293b` @ 50% |
| **Form inputs border** | `#334155` |
| **Form inputs focus border** | `#a855f7` @ 50% |
| **Form label** | `#cbd5e1` |
| **Form placeholder** | `#64748b` |

---

## 1. Base & background

| Where used | Hex | Class / note |
|------------|-----|--------------|
| Body, gradient end, footer/header tint | `#020617` | `bg-slate-950`, `rgba(2,6,23,0.6)` in Header/Footer |
| Theme color (meta), section mid | `#0f172a` | `themeColor`, `slate-900` |
| Hero section background | `#0b0a18` | `HeroSection` |
| Section gradient via | `#0f172a` | `via-slate-900` |
| Usługi / Philosophy tint | `#172554` @ 30% | `via-blue-950/30` |
| CTA / Consultation tint | `#581c87` @ 20–30% | `via-purple-950/30` or `/20` |

---

## 2. Text

| Where used | Hex | Class |
|------------|-----|--------|
| Headings, primary copy | `#ffffff` | `text-white` |
| Body, descriptions | `#94a3b8` | `text-slate-400` |
| Muted, dates, placeholder | `#64748b` | `text-slate-500` |
| Labels, form labels | `#cbd5e1` | `text-slate-300` |
| Article subheadings | `#e2e8f0` | `text-slate-200` |
| Links, icons (accent) | `#c084fc` | `text-purple-400` |
| Links hover, badge text (purple) | `#d8b4fe` | `text-purple-300` |
| Badge (blue), Philosophy | `#93c5fd` | `text-blue-300` |
| Badge (cyan) PageIntro | `#67e8f9` | `text-cyan-300` |
| Benefit checkmarks | `#34d399` | `text-emerald-400` |
| Form success | `#34d399` | `text-green-400` |
| Form error | `#f87171` | `text-red-400` |

---

## 3. Surfaces & borders

| Where used | Hex | Opacity | Class |
|------------|-----|---------|--------|
| Cards, panels | `#0f172a` | 30%, 40%, 60% | `bg-slate-900/30`, `/40`, `/60` |
| Card inner (icon area) | `#020617` | — | `bg-slate-950` |
| Input background | `#1e293b` | 50%, 80% | `bg-slate-800/50`, `bg-slate-800/80` |
| Card border, divider | `#334155` | 50% | `border-slate-700/50` |
| Input border, secondary border | `#334155` | — | `border-slate-700` |
| Slider fade, icon box border | `#475569` | — | `border-slate-600` |
| White overlay (image gradient) | `#0f172a` | 60% | `from-slate-900/60` |
| Focus border | `#a855f7` | 50% | `focus:border-purple-500/50` |
| Focus ring | `#a855f7` | 20% | `focus:ring-purple-500/20` |
| Hover secondary button | `#1e293b` | 30% | `hover:bg-slate-800/30` |
| Tools section icon box | `#ffffff` | 5%, 10% | `bg-white/5`, `border-white/10` |

---

## 4. Badges & pills (in use)

| Variant | Background | Border | Text (hex) |
|---------|------------|--------|------------|
| Purple (CTA, Automation, Tools) | `#a855f7` @ 10% | `#a855f7` @ 30% | `#d8b4fe` |
| Blue (Services, Philosophy, Usługi, PageIntro) | `#3b82f6` @ 10% | `#3b82f6` @ 30% | `#93c5fd` |
| Cyan (PageIntro e.g. Blog) | `#06b6d4` @ 10% | `#06b6d4` @ 30% | `#67e8f9` |

---

## 5. Decorative blurs (orbs)

| Where used | Hex | Opacity | Class |
|------------|-----|---------|--------|
| Purple (CTA, SimpleCTA, Consultation, blog, realizacje, uslugi) | `#a855f7` | 10%, 20% | `bg-purple-500/10`, `/20` |
| Blue (CTA, Services, Philosophy, uslugi) | `#3b82f6` | 10% | `bg-blue-500/10` |
| Cyan (blog, realizacje) | `#06b6d4` | 10% | `bg-cyan-500/10` |

---

## 6. Gradients (in use)

### CTA gradient (buttons, gradient text)

- **Hex:** `#6BA1FB` → `#A18DFA` → `#EB75BD`
- **CSS:** `.cta-gradient-animated`
- **Used in:** CTASection submit, SimpleCTASection “Napisz do nas”, UslugiConsultationBlock headline, Button primary, Hero gradient text

### Hero headline gradient (inline)

- **Hex:** `#60A5FA` → `#A78BFA` → `#F472B6` (blue → purple → pink)
- **Used in:** HeroSection

### Section background gradients

- **Slate:** `from-slate-950` (#020617) `via-slate-900` (#0f172a) `to-slate-950` — blog, realizacje, blog post
- **Blue tint:** `from-slate-950 via-blue-950/30 to-slate-950` — uslugi, Services, Philosophy
- **Purple tint:** `from-slate-950 via-purple-950/30 to-slate-950` — CTASection, SimpleCTASection, UslugiConsultationBlock; `via-purple-950/20` in AutomationDetails

### Philosophy → Footer transition

- **CSS:** `.gradient-philosophy-to-footer`
- **Stops (hex):** `#0f172a` → `#0d1424` → `#0f1528` → `#12162c` → `#151730` → `#171836` → `#191a3b` → `#1a1a3c` → `#1a193a` → `#181836` → `#161632` → `#14142e` → `#111328` → `#0e1226` → `#0c1124` → `#020617`

### Text gradient (headlines)

| Where used | From (hex) | To (hex) |
|------------|------------|----------|
| Services, Philosophy, Tools | `#60a5fa` | `#c084fc` |
| AutomationDetails | `#c084fc` | `#f472b6` |

### Card / step gradients (data-driven)

| Source | Gradient | From (hex) | To (hex) |
|--------|----------|------------|----------|
| Services (strony) | from-blue-500 to-cyan-500 | `#3b82f6` | `#06b6d4` |
| Services (branding) | from-emerald-500 to-teal-500 | `#10b981` | `#14b8a6` |
| Services (automatyzacja) | from-purple-500 to-pink-500 | `#a855f7` | `#ec4899` |
| AutomationDetails steps | blue→cyan, cyan→teal, teal→emerald, emerald→green, purple→pink | (various) | (various) |
| Blog card hover bar | from-purple-500 to-pink-500 | `#a855f7` | `#ec4899` |
| Portfolio: Kepller | from-slate-500 to-zinc-600 | `#64748b` | `#52525b` |
| Portfolio: OrthoMedica, DentalMint | from-purple-500 to-pink-500 | `#a855f7` | `#ec4899` |
| Portfolio: Maison | from-amber-500 to-orange-500 | `#f59e0b` | `#f97316` |
| Portfolio: Bagiety | from-blue-500 to-cyan-500 | `#3b82f6` | `#06b6d4` |
| Portfolio: AIYO | from-cyan-500 to-blue-500 | `#06b6d4` | `#3b82f6` |

### Other in-use gradients

- **Vertical line (AutomationDetails):** `via-purple-500/50` — `#a855f7` @ 50%
- **Slider fade (ToolsSection):** `from-slate-950 to-transparent`
- **Portfolio carousel arrows:** `from-cyan-500/20 to-blue-500/20`, border `cyan-500/30`, hover `cyan-400/50`

---

## 7. Interactive states & shadows

| Where used | Value | Class / note |
|------------|--------|---------------|
| Card hover border | `#a855f7` @ 50% | `hover:border-purple-500/50` |
| Card hover shadow | `rgba(147,51,234,0.2)` | `hover:shadow-[0_0_40px_...]` (purple) |
| CTA button hover shadow | `rgba(167,139,250,0.4)` | `hover:shadow-[0_0_28px_...]` |
| ScrollToTop, secondary hover | `rgba(147,51,234,0.5)` | Purple glow |
| Portfolio arrow hover | `rgba(34,211,238,0.4)` | Cyan glow |
| Form success bg/border | `#10b981` @ 10%, 30% | `bg-green-500/10 border-green-500/30` |
| Form error bg/border | `#ef4444` @ 10%, 30% | `bg-red-500/10 border-red-500/30` |
| Skip link (focus) | `#9333ea` | `bg-purple-600` |

---

## 8. AI / workflow & special UI

| Where used | Hex / rgba | Note |
|------------|------------|------|
| globals.css AI ring | `rgba(34,211,238,0.4)` | `#22d3ee` @ 40% |
| globals.css AI core, card border | `rgba(0,229,255,0.35)`, `rgba(123,97,255,0.4)` | `#00E5FF`, `#7B61FF` |
| globals.css AI card text | `#1e1b4b` | indigo-950 |
| globals.css AI icon | `#5b21b6` | violet-800 |
| globals.css grid | `rgba(255,255,255,0.04)` | White 4% |
| AiAnimationSection gradient | `#67e8f9`, `#22d3ee`, `#06b6d4` | Cyan stops |
| AutomationWorkflowSection nodes | `#16a34a`, `#84cc16`, `#2563eb`, `#f97316`, `#74AA9C`, `#EA4335`, `#FF7A59`, `#4A154B`, `#a855f7`, `#374151` | Per-icon colors |
| AutomationWorkflowSection stroke | `#e2e8f0` or `rgba(203,213,225,0.4)` | slate-200 |
| AutomationWorkflowSection embedded bg | `#FAFAFA` | Light panel |
| AIHubSection bg | `#FAFAFA` | Light section |
| AIHubSection circle | indigo-500 → violet-600 | `#6366f1` → `#7c3aed` |

---

## 9. Hex quick reference (in use only)

| Name | Hex |
|------|-----|
| Background | `#020617` |
| Theme / slate-900 | `#0f172a` |
| Slate-800 | `#1e293b` |
| Slate-700 | `#334155` |
| Slate-600 | `#475569` |
| Slate-500 | `#64748b` |
| Slate-400 | `#94a3b8` |
| Slate-300 | `#cbd5e1` |
| Slate-200 | `#e2e8f0` |
| Purple-600 | `#9333ea` |
| Purple-500 | `#a855f7` |
| Purple-400 | `#c084fc` |
| Purple-300 | `#d8b4fe` |
| Blue-950 | `#172554` |
| Blue-500 | `#3b82f6` |
| Blue-400 | `#60a5fa` |
| Blue-300 | `#93c5fd` |
| Cyan-500 | `#06b6d4` |
| Cyan-400 | `#22d3ee` |
| Cyan-300 | `#67e8f9` |
| Emerald-500 | `#10b981` |
| Emerald-400 | `#34d399` |
| Teal-500 | `#14b8a6` |
| Green-500 | `#22c55e` |
| Pink-500 | `#ec4899` |
| Pink-400 | `#f472b6` |
| Amber-500 | `#f59e0b` |
| Orange-500 | `#f97316` |
| Zinc-600 | `#52525b` |
| Red-500 | `#ef4444` |
| Red-400 | `#f87171` |
| CTA blue | `#6BA1FB` |
| CTA purple | `#A18DFA` |
| CTA pink | `#EB75BD` |
| AI cyan | `#00E5FF` |
| AI purple | `#7B61FF` |
| Dark violet (text on light) | `#1e1b4b` |
| Violet-800 | `#5b21b6` |
| Light panel bg | `#FAFAFA` |
| Hero bg | `#0b0a18` |

All other Tailwind color classes that appear in the repo map to the standard Tailwind palette; the list above is the subset **actually used** in SmartWeave.
