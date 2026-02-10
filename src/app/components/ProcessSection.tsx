import { motion, useScroll, useTransform } from 'motion/react';
import { MessageCircle, Lightbulb, Code, TestTube, Rocket } from 'lucide-react';
import { useRef } from 'react';

const steps = [
  {
    number: '01',
    icon: MessageCircle,
    title: 'Poznajemy Twoje potrzeby',
    description:
      'Rozmawiamy z Tobą, aby dokładnie zrozumieć, czego potrzebujesz — zarówno jeśli chodzi o stronę internetową, jak i automatyzację procesów.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Projektujemy i planujemy',
    description:
      'Tworzymy projekt strony gotowej na współczesne standardy internetu i wyszukiwarki AI oraz plan automatyzacji procesów w Twojej firmie.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    number: '03',
    icon: Code,
    title: 'Wdrażamy i kodujemy',
    description:
      'Strony są responsywne, zoptymalizowane pod SEO i przygotowane pod marketing, a procesy biznesowe działają automatycznie dzięki integracjom i kodowaniu dedykowanych rozwiązań.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    number: '04',
    icon: TestTube,
    title: 'Testujemy i dopracowujemy',
    description:
      'Sprawdzamy, czy wszystko działa perfekcyjnie — od funkcjonalności strony po automatyczne procesy. Wprowadzamy poprawki i dopracowujemy szczegóły.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    number: '05',
    icon: Rocket,
    title: 'Oddajemy gotowy system',
    description:
      'Ty otrzymujesz kompletny produkt: stronę internetową i automatyzacje, które działają bez nadzoru, pozwalając Ci skupić się na rozwoju biznesu.',
    gradient: 'from-rose-500 to-red-500',
  },
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[800px] sm:h-[800px] bg-purple-500/10 rounded-full blur-3xl" />

      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-500/10 border border-purple-500/30 rounded-full"
          >
            <span className="text-purple-300 text-xs sm:text-sm font-medium uppercase tracking-wider">
              Jak działamy
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 px-4"
          >
            Automatyzacja{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              dla biznesu
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto px-4"
          >
            Nasz proces jest prosty i przejrzysty — od pierwszej rozmowy po
            gotowy system działający w Twojej firmie.
          </motion.p>
        </div>

        {/* Process steps with connecting line */}
        <div className="relative">
          {/* Vertical connecting line (hidden on mobile) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/20 via-purple-500/50 to-purple-500/20" />

          <div className="space-y-8 sm:space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-6 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content card */}
                <div className="flex-1 w-full md:w-auto">
                  <div className="group relative p-8 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl hover:border-purple-500/50 transition-all hover:shadow-[0_0_30px_rgba(147,51,234,0.2)] overflow-hidden">
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                    <div className="relative flex items-start gap-4">
                      {/* Icon with gradient */}
                      <div
                        className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${step.gradient} p-0.5`}
                      >
                        <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                          <step.icon className="w-7 h-7 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-4">
                          {step.title}
                        </h3>
                        <p className="text-slate-400 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom gradient line */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`}
                    />
                  </div>
                </div>

                {/* Center circle with number (visible on desktop) */}
                <div className="hidden md:flex flex-shrink-0 w-20 h-20 rounded-full bg-slate-900 border-4 border-purple-500/50 items-center justify-center z-10">
                  <span className="text-2xl font-bold bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {step.number}
                  </span>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}