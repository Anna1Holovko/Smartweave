'use client';

import { motion } from 'motion/react';
import { Database, Sparkles, CopyCheck, FileText, ListChecks } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Database,
    title: 'Rejestracja nowego leada',
    description: (
      <>
        Nowy lead trafia do bazy danych prowadzonej w Airtable.
        <span className="block mt-2">Może on pochodzić np. z:</span>
        <ul className="list-disc list-inside text-zinc-400 mt-2 space-y-1">
          <li>formularza na stronie internetowej,</li>
          <li>kampanii marketingowej,</li>
          <li>integracji z innymi systemami.</li>
        </ul>
      </>
    ),
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Automatyczna analiza leada przez AI',
    description: (
      <>
        Po pojawieniu się nowego rekordu uruchamiany jest scenariusz automatyzacji w Make.
        <span className="block mt-2">Dane leada są analizowane przez model językowy od OpenAI.</span>
        <span className="block mt-2">AI wykonuje m.in.:</span>
        <ul className="list-disc list-inside text-zinc-400 mt-2 space-y-1">
          <li>ocenę potencjału sprzedażowego (lead scoring),</li>
          <li>identyfikację branży klienta,</li>
          <li>analizę intencji zakupowej,</li>
          <li>stworzenie podsumowania do CRM.</li>
        </ul>
      </>
    ),
  },
  {
    number: '03',
    icon: CopyCheck,
    title: 'Wykrywanie duplikatów kontaktów',
    description: (
      <>
        System automatycznie sprawdza, czy dana firma istnieje już w bazie kontaktów.
        <span className="block mt-2">Weryfikacja odbywa się na podstawie <em>numeru NIP</em>, co pozwala uniknąć duplikowania rekordów w bazie CRM.</span>
        <ul className="list-disc list-inside text-zinc-400 mt-2 space-y-1">
          <li>jeśli kontakt istnieje → dane są aktualizowane,</li>
          <li>jeśli kontakt nie istnieje → tworzony jest nowy rekord kontaktu.</li>
        </ul>
      </>
    ),
  },
  {
    number: '04',
    icon: FileText,
    title: 'Generowanie kontekstu sprzedażowego',
    description: (
      <>
        Na podstawie analizy AI generowane są materiały wspierające pracę handlowca:
        <ul className="list-disc list-inside text-zinc-400 mt-2 space-y-1">
          <li>podsumowanie leada,</li>
          <li>najważniejsze informacje biznesowe,</li>
          <li><em>proponowany skrypt rozmowy sprzedażowej</em>.</li>
        </ul>
        <span className="block mt-2">Dzięki temu konsultant może rozpocząć rozmowę z klientem mając już przygotowany kontekst.</span>
      </>
    ),
  },
  {
    number: '05',
    icon: ListChecks,
    title: 'Automatyczne zadania sprzedażowe',
    description: (
      <>
        System automatycznie tworzy zadanie dla zespołu sprzedaży:
        <ul className="list-disc list-inside text-zinc-400 mt-2 space-y-1">
          <li>przypisuje priorytet leada na podstawie lead score,</li>
          <li>dodaje notatkę do rekordu klienta,</li>
          <li>przekazuje gotowy skrypt rozmowy.</li>
        </ul>
        <span className="block mt-2">Pozwala to znacząco skrócić czas przygotowania handlowca do pierwszego kontaktu.</span>
      </>
    ),
  },
];

export function CaseStudyWorkflowFlow() {
  return (
    <div className="relative max-w-6xl mx-auto">
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#d8f17b]/30 to-transparent hidden lg:block" />

      <div className="space-y-12 lg:space-y-24">
        {steps.map((step, index) => {
          const isLeft = index % 2 === 0;
          const Icon = step.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                {isLeft ? (
                  <>
                    <div className="flex justify-end">
                      <div className="relative group max-w-md w-full transition-transform duration-300 hover:-translate-y-2">
                        <div className="glass-card hover-lift relative p-6 rounded-2xl overflow-hidden" style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-[#d8f17b]/15 border border-[#d8f17b]/20 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-[#d8f17b]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#e4e4e7]">{step.title}</h3>
                          </div>
                          <div className="text-zinc-400 leading-relaxed text-sm">{step.description}</div>
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 w-0 bg-[#d8f17b] group-hover:w-full transition-all duration-500 rounded-b-2xl" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                      <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }} className="relative">
                        <div className="w-16 h-16 rounded-full bg-[#d8f17b]/20 border border-[#d8f17b]/40 flex items-center justify-center">
                          <span className="text-[#d8f17b] font-bold text-lg">{step.number}</span>
                        </div>
                      </motion.div>
                    </div>
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                      <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }} className="relative">
                        <div className="w-16 h-16 rounded-full bg-[#d8f17b]/20 border border-[#d8f17b]/40 flex items-center justify-center">
                          <span className="text-[#d8f17b] font-bold text-lg">{step.number}</span>
                        </div>
                      </motion.div>
                    </div>
                    <div className="flex justify-start">
                      <div className="relative group max-w-md w-full transition-transform duration-300 hover:-translate-y-2">
                        <div className="glass-card hover-lift relative p-6 rounded-2xl overflow-hidden" style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-[#d8f17b]/15 border border-[#d8f17b]/20 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-[#d8f17b]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#e4e4e7]">{step.title}</h3>
                          </div>
                          <div className="text-zinc-400 leading-relaxed text-sm">{step.description}</div>
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 w-0 bg-[#d8f17b] group-hover:w-full transition-all duration-500 rounded-b-2xl" />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="lg:hidden relative group transition-transform duration-300 hover:-translate-y-2">
                <div className="glass-card hover-lift relative p-6 rounded-2xl overflow-hidden" style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}>
                  <div className="absolute -top-3 -left-3">
                    <div className="w-12 h-12 rounded-full bg-[#d8f17b]/20 border border-[#d8f17b]/40 flex items-center justify-center">
                      <span className="text-[#d8f17b] font-bold text-sm">{step.number}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#d8f17b]/15 border border-[#d8f17b]/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#d8f17b]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#e4e4e7]">{step.title}</h3>
                  </div>
                  <div className="text-zinc-400 leading-relaxed text-sm">{step.description}</div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 w-0 bg-[#d8f17b] group-hover:w-full transition-all duration-500 rounded-b-2xl" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
