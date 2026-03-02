'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Workflow, Bot, Globe, ArrowRight } from 'lucide-react';

export function StrategicCapabilitiesSection() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-heading" className="relative py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950" />
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 sm:mb-20"
        >
          <p className="text-slate-500 text-xs sm:text-sm font-medium uppercase tracking-wider mb-3">Obszary kompetencji</p>
          <h2 id="capabilities-heading" className="text-2xl sm:text-4xl md:text-5xl font-bold text-white">
            Podejście doradcze i wdrożeniowe
          </h2>
        </motion.div>

        <div className="space-y-20 sm:space-y-24">
          {/* A: AUTOMATYZACJA PROCESÓW AI */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Workflow className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Automatyzacja procesów AI</h2>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Operacje oparte na pracy ręcznej ograniczają skalę. Wdrożenia AI w firmach zaczynamy od analizy: projektujemy architekturę automatyzacji i automatyzację workflow — bez implementacji na ślepo. Powtarzalne zadania przejmują systemy; Ty zyskujesz czas i przejrzystość.
            </p>
            <p className="text-slate-500 text-sm mb-4 font-medium">Podejście: analiza → architektura → wdrożenie.</p>
            <ul className="text-slate-400 text-sm space-y-2 mb-6 list-disc list-inside">
              <li>Obsługa leadów i powiadomień</li>
              <li>Raporty i synchronizacja danych między systemami</li>
              <li>Obiegi dokumentów i workflow decyzyjne</li>
            </ul>
            <p className="text-slate-500 text-sm">
              Efekt biznesowy: oszczędność godzin tygodniowo, mniej błędów, większy wolumen bez proporcjonalnego wzrostu zatrudnienia.
            </p>
            <Link
              href="/uslugi/automatyzacja"
              className="inline-flex items-center gap-2 mt-6 text-purple-400 hover:text-purple-300 font-medium text-sm"
            >
              Więcej o automatyzacji procesów AI
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.article>

          {/* B: AGENCI AI DLA FIRM */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Agenci AI dla firm</h2>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              AI jako cyfrowa warstwa operacyjna: asystenci do obsługi zapytań, kwalifikacji leadów, analizy dokumentów i wsparcia decyzji. Nie zastępują ludzi — odciążają od rutyny. Integracje systemowe z CRM, pocztą i narzędziami firmowymi; wartość mierzalna od pierwszego use case’u.
            </p>
            <p className="text-slate-500 text-sm mb-4 font-medium">Typy agentów: operacje wewnętrzne, sprzedaż, obsługa klienta, wsparcie decyzyjne.</p>
            <ul className="text-slate-400 text-sm space-y-2 mb-6 list-disc list-inside">
              <li>Integracje systemowe z istniejącym stackiem</li>
              <li>Wdrożenia mierzalne od pierwszego wdrożenia</li>
            </ul>
            <p className="text-slate-500 text-sm">
              Efekt biznesowy: szybsza reakcja na klientów, lepsze wykorzystanie leadów, oszczędność czasu na analizie i powtarzalnych odpowiedziach.
            </p>
            <Link
              href="/uslugi/agenci-ai"
              className="inline-flex items-center gap-2 mt-6 text-purple-400 hover:text-purple-300 font-medium text-sm"
            >
              Więcej o agentach AI dla firm
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.article>

          {/* C: PROJEKTOWANIE STRON WWW DLA FIRM (B2B) */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Projektowanie stron www dla firm</h2>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Strona to narzędzie sprzedaży, nie wizytówka. Projektowanie stron www dla firm i strony pod leada B2B: architektura pod konwersję, treści pod decydentów, struktura gotowa na SEO i dalsze wdrożenia AI. Strony internetowe generujące leady — mierzalnie.
            </p>
            <p className="text-slate-500 text-sm mb-4 font-medium">To nie „ładna strona” — to strategiczne narzędzie pozyskiwania klientów.</p>
            <ul className="text-slate-400 text-sm space-y-2 mb-6 list-disc list-inside">
              <li>Architektura informacji i UX pod decydentów B2B</li>
              <li>SEO od fundamentu, struktura gotowa na automatyzację i AI</li>
              <li>Formularze i ścieżki prowadzące do kontaktu i kwalifikacji</li>
            </ul>
            <p className="text-slate-500 text-sm">
              Efekt biznesowy: więcej kwalifikowanych zapytań, krótszy cykl decyzji, spójność z kanałami leadowymi i CRM.
            </p>
            <Link
              href="/uslugi/strony"
              className="inline-flex items-center gap-2 mt-6 text-purple-400 hover:text-purple-300 font-medium text-sm"
            >
              Więcej o stronach pod leada B2B
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
