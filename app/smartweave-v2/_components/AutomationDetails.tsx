'use client';

import { motion } from 'motion/react';
import { MessageSquare, PenTool, Cpu, Search, Rocket } from 'lucide-react';

const workflowSteps = [
  { number: '01', icon: MessageSquare, title: 'Poznajemy Twoje potrzeby', description: 'Rozmawiamy z Tobą, aby dokładnie zrozumieć cele biznesowe, grupę docelową i oczekiwane efekty – zarówno w kontekście strony internetowej, jak i automatyzacji procesów w firmie', gradient: 'from-blue-500 to-cyan-500' },
  { number: '02', icon: PenTool, title: 'Projektowanie i planowanie', description: 'Tworzymy projekt strony zgodny z nowoczesnymi standardami internetu i wyszukiwarek AI oraz przygotowujemy plan automatyzacji procesów biznesowych dopasowany do Twojej działalności. Projekt obejmuje UX/UI nastawione na konwersję, strukturę treści, key visuale i spójny wizerunek marki', gradient: 'from-cyan-500 to-teal-500' },
  { number: '03', icon: Cpu, title: 'Wdrożenie i kodowanie', description: 'Strony są responsywne, szybkie i zoptymalizowane pod SEO. Integrujemy systemy CRM, narzędzia analityczne i automatyzacje procesów, aby działały samodzielnie i wspierały codzienne działania firmy', gradient: 'from-teal-500 to-emerald-500' },
  { number: '04', icon: Search, title: 'Testowanie i dopracowywanie', description: 'Sprawdzamy działanie strony i automatyzacji w rzeczywistych warunkach, wprowadzamy poprawki i dopracowujemy szczegóły, aby wszystko funkcjonowało bez zarzutu', gradient: 'from-emerald-500 to-green-500' },
  { number: '05', icon: Rocket, title: 'Oddanie gotowego systemu', description: 'Otrzymujesz kompletny produkt: nowoczesną stronę internetową oraz automatyzacje, które działają bez nadzoru. Dzięki temu możesz w pełni skupić się na rozwoju biznesu, obsłudze klientów i zwiększaniu przychodów', gradient: 'from-purple-500 to-pink-500' },
];

export function AutomationDetails() {
  return (
    <section id="how-we-work" aria-labelledby="how-we-work-heading" className="relative py-10 sm:py-20 md:py-24 lg:py-32 xl:py-36 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[1000px] sm:h-[1000px] 2xl:w-[1200px] 2xl:h-[1200px] bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto">
        <div className="text-center mb-12 sm:mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="inline-block mb-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-500/10 border border-purple-500/30 rounded-full">
            <span className="text-purple-300 text-xs sm:text-sm font-medium uppercase tracking-wider">Jak działamy</span>
          </motion.div>
          <motion.h2 id="how-we-work-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 px-4">
            <span className="text-white">Automatyzacja i strony www,</span>{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">które działają za Ciebie</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-base sm:text-xl text-slate-400 max-w-[80ch] mx-auto px-2">
            Tworzymy procesy i strony internetowe, które wspierają rozwój Twojej firmy
          </motion.p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-purple-500/50 to-transparent hidden lg:block" />

          <div className="space-y-12 lg:space-y-24">
            {workflowSteps.map((step, index) => {
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
                            <div className="relative p-6 rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(147,51,234,0.2)] overflow-hidden">
                              <div className="flex items-center gap-4 mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} p-0.5 flex-shrink-0`}>
                                  <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center">
                                    <Icon className="w-6 h-6 text-white" />
                                  </div>
                                </div>
                                <h3 className="text-xl font-bold text-white">{step.title}</h3>
                              </div>
                              <p className="text-slate-400 leading-relaxed">{step.description}</p>
                              <div className={`absolute bottom-0 left-0 right-0 h-1 w-0 bg-gradient-to-r ${step.gradient} group-hover:w-full transition-all duration-500 rounded-b-2xl`} />
                            </div>
                          </div>
                        </div>
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                          <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }} className="relative">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
                              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">{step.number}</span>
                              </div>
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
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
                              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">{step.number}</span>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                        <div className="flex justify-start">
                          <div className="relative group max-w-md w-full transition-transform duration-300 hover:-translate-y-2">
                            <div className="relative p-6 rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(147,51,234,0.2)] overflow-hidden">
                              <div className="flex items-center gap-4 mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} p-0.5 flex-shrink-0`}>
                                  <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center">
                                    <Icon className="w-6 h-6 text-white" />
                                  </div>
                                </div>
                                <h3 className="text-xl font-bold text-white">{step.title}</h3>
                              </div>
                              <p className="text-slate-400 leading-relaxed">{step.description}</p>
                              <div className={`absolute bottom-0 left-0 right-0 h-1 w-0 bg-gradient-to-r ${step.gradient} group-hover:w-full transition-all duration-500 rounded-b-2xl`} />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="lg:hidden relative group transition-transform duration-300 hover:-translate-y-2">
                    <div className="relative p-6 rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(147,51,234,0.2)] overflow-hidden">
                      <div className="absolute -top-3 -left-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
                          <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{step.number}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} p-0.5 flex-shrink-0`}>
                          <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      </div>
                      <p className="text-slate-400 leading-relaxed">{step.description}</p>
                      <div className={`absolute bottom-0 left-0 right-0 h-1 w-0 bg-gradient-to-r ${step.gradient} group-hover:w-full transition-all duration-500 rounded-b-2xl`} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
