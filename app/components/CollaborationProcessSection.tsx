'use client';

import { motion } from 'motion/react';
import { MessageSquare, PenTool, Cpu, Search, Rocket, type LucideIcon } from 'lucide-react';
import { USLUGI_H2_CLASS } from '@/lib/layout';

const PROCESS_ICONS: LucideIcon[] = [MessageSquare, PenTool, Cpu, Search, Rocket];

export type CollaborationProcessItem = { step: number; title: string; description: string };

type Props = {
  process: readonly CollaborationProcessItem[];
  /** Subtitle under the main two-tone heading (matches home “Jak działamy” block). */
  subtitle?: string;
  className?: string;
};

const DEFAULT_SUBTITLE =
  'Od pierwszej rozmowy do wdrożenia — kroki są jasne, kolejność uzgodniona, a Ty widzisz postępy na każdym etapie.';

export function CollaborationProcessSection({
  process,
  subtitle = DEFAULT_SUBTITLE,
  className = '',
}: Props) {
  return (
    <section
      aria-labelledby="collaboration-process-heading"
      className={`relative py-10 sm:py-20 md:py-24 lg:py-32 xl:py-36 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-[var(--bg-graphite)]" />

      <div className="relative z-10 max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto">
        <div className="text-center mb-12 sm:mb-20">
          <motion.h2
            id="collaboration-process-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`${USLUGI_H2_CLASS} mb-4 sm:mb-6 px-4`}
          >
            <span className="text-[#e4e4e7]">Jak wygląda</span>{' '}
            <span className="text-[#d8f17b]">proces współpracy</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-zinc-400 max-w-[80ch] mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#d8f17b]/30 to-transparent hidden lg:block" />

          <div className="space-y-12 lg:space-y-24">
            {process.map((step, index) => {
              const isLeft = index % 2 === 0;
              const Icon = PROCESS_ICONS[index % PROCESS_ICONS.length];
              const num = String(step.step).padStart(2, '0');
              return (
                <motion.div
                  key={`${step.step}-${step.title}`}
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
                            <div
                              className="glass-card hover-lift relative p-6 rounded-2xl overflow-hidden"
                              style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
                            >
                              <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-[#d8f17b]/15 border border-[#d8f17b]/20 flex items-center justify-center flex-shrink-0">
                                  <Icon className="w-6 h-6 text-[#d8f17b]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#e4e4e7]">{step.title}</h3>
                              </div>
                              <p className="text-zinc-400 leading-relaxed">{step.description}</p>
                              <div className="absolute bottom-0 left-0 right-0 h-0.5 w-0 bg-[#d8f17b] group-hover:w-full transition-all duration-500 rounded-b-2xl" />
                            </div>
                          </div>
                        </div>
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                            className="relative"
                          >
                            <div className="w-16 h-16 rounded-full bg-[#d8f17b]/20 border border-[#d8f17b]/40 flex items-center justify-center">
                              <span className="text-[#d8f17b] font-bold text-lg">{num}</span>
                            </div>
                          </motion.div>
                        </div>
                        <div />
                      </>
                    ) : (
                      <>
                        <div />
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                            className="relative"
                          >
                            <div className="w-16 h-16 rounded-full bg-[#d8f17b]/20 border border-[#d8f17b]/40 flex items-center justify-center">
                              <span className="text-[#d8f17b] font-bold text-lg">{num}</span>
                            </div>
                          </motion.div>
                        </div>
                        <div className="flex justify-start">
                          <div className="relative group max-w-md w-full transition-transform duration-300 hover:-translate-y-2">
                            <div
                              className="glass-card hover-lift relative p-6 rounded-2xl overflow-hidden"
                              style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
                            >
                              <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-[#d8f17b]/15 border border-[#d8f17b]/20 flex items-center justify-center flex-shrink-0">
                                  <Icon className="w-6 h-6 text-[#d8f17b]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#e4e4e7]">{step.title}</h3>
                              </div>
                              <p className="text-zinc-400 leading-relaxed">{step.description}</p>
                              <div className="absolute bottom-0 left-0 right-0 h-0.5 w-0 bg-[#d8f17b] group-hover:w-full transition-all duration-500 rounded-b-2xl" />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="lg:hidden relative group transition-transform duration-300 hover:-translate-y-2">
                    <div
                      className="glass-card hover-lift relative p-6 rounded-2xl overflow-hidden"
                      style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
                    >
                      <div className="absolute -top-3 -left-3">
                        <div className="w-12 h-12 rounded-full bg-[#d8f17b]/20 border border-[#d8f17b]/40 flex items-center justify-center">
                          <span className="text-[#d8f17b] font-bold text-sm">{num}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#d8f17b]/15 border border-[#d8f17b]/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-[#d8f17b]" />
                        </div>
                        <h3 className="text-xl font-bold text-[#e4e4e7]">{step.title}</h3>
                      </div>
                      <p className="text-zinc-400 leading-relaxed">{step.description}</p>
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 w-0 bg-[#d8f17b] group-hover:w-full transition-all duration-500 rounded-b-2xl" />
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
