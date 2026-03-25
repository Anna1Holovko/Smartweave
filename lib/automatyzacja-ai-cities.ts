export type AutomationAiCity = {
  slug: string;
  name: string;
  /** „dla firm we Wrocławiu” */
  phraseLocative: string;
  /** 2–3 zdania unikalne pod local SEO (nie doorway — konkret + kontekst) */
  localIntro: string;
  /** ~150–158 znaków pod snippet Google */
  metaDescription: string;
};

export const AUTOMATYZACJA_AI_CITIES: AutomationAiCity[] = [
  {
    slug: 'wroclaw',
    name: 'Wrocław',
    phraseLocative: 'we Wrocławiu i okolicach',
    localIntro:
      'Wrocław to silny hub B2B i usług — firmy często łączą rozwój produktu z presją na szybką obsługę leadów i porządek w CRM. Automatyzacja AI i workflowów pomaga zespołom z Dolnego Śląska odzyskać czas na relacje z klientami zamiast na ręczne przepisywanie danych.',
    metaDescription:
      'Automatyzacja AI dla firm we Wrocławiu: workflowy, integracje, agenci AI. SmartWeave łączy procesy z brandingiem i stronami www.',
  },
  {
    slug: 'warszawa',
    name: 'Warszawa',
    phraseLocative: 'w Warszawie i aglomeracji',
    localIntro:
      'W warszawskiej dynamice liczy się czas reakcji i skalowanie bez proporcjonalnego wzrostu kosztów operacyjnych. Wdrażamy integracje i agentów AI pod konkretne procesy — od kwalifikacji leadów po raporty — tak, by marketing i sprzedaż trzymały jeden spójny przepływ informacji.',
    metaDescription:
      'Automatyzacja AI dla firm w Warszawie: leady, CRM, raporty, agenci AI. Pełna oferta SmartWeave z brandingiem i stronami www.',
  },
  {
    slug: 'krakow',
    name: 'Kraków',
    phraseLocative: 'w Krakowie i regionie',
    localIntro:
      'Firmy z Małopolski często łączą markę technologiczną z potrzebą przejrzystego UX i automatyzacji zaplecza. Łączymy identyfikację wizualną z systemami, które same przenoszą dane między narzędziami i wspierają zespół w obsłudze zapytań.',
    metaDescription:
      'Automatyzacja AI dla firm w Krakowie: integracje, procesy, agenci AI. SmartWeave: branding, strony www i automatyzacja.',
  },
];
