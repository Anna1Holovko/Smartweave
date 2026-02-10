import { motion, useScroll, useTransform } from 'motion/react';
import { Workflow, Palette, Zap, Code2, Brain, Sparkles } from 'lucide-react';
import { useRef } from 'react';

const features = [
  {
    icon: Palette,
    title: 'Vibe-Driven Design',
    description:
      'Tworzymy interfejsy, które nie tylko wyglądają doskonale, ale przekazują właściwy nastrój i budują emocjonalną więź z użytkownikami.',
    gradient: 'from-pink-500 to-purple-500',
  },
  {
    icon: Code2,
    title: 'Design → Code',
    description:
      'Bezpośrednie przełożenie designu na produkcyjny kod. Zero straconych iteracji, pełna zgodność z wizją projektową.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Workflow,
    title: 'Inteligentna Automatyzacja',
    description:
      'Systemy, które myślą za Ciebie. Automatyzujemy powtarzalne procesy, redukując koszty operacyjne o 80%+.',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    icon: Brain,
    title: 'Skalowalne Systemy',
    description:
      'Architektury zaprojektowane na wzrost. Obsługujemy setki tysięcy użytkowników bez utraty wydajności.',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: Zap,
    title: 'Real-Time Workflows',
    description:
      'Synchronizacja w czasie rzeczywistym. Twój zespół pracuje na żywych danych, zawsze aktualnych.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: Sparkles,
    title: 'Premium Experience',
    description:
      'Enterprise-grade niezawodność z premium UX. Dostarczamy rozwiązania klasy światowej dla wymagających firm.',
    gradient: 'from-emerald-500 to-teal-500',
  },
];

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  return (
    <section ref={containerRef} className="relative py-16 sm:py-20 px-4 sm:px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl" />

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full"
          >
            <span className="text-purple-300 text-sm font-medium uppercase tracking-wider">
              Nasze Możliwości
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Technologia Spotyka{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Wizję
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto"
          >
            Łączymy kreatywność z precyzją inżynierską, tworząc systemy, które
            napędzają rozwój firm technologicznych.
          </motion.p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

interface FeatureCardProps {
  feature: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    gradient: string;
  };
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      {/* Glassmorphism card */}
      <div className="relative h-full p-8 bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-purple-500/50 group-hover:shadow-[0_0_40px_rgba(147,51,234,0.3)]">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Icon with gradient */}
        <div
          className={`relative mb-6 w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5`}
        >
          <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* Content */}
        <h3 className="relative text-xl font-bold text-white mb-4">
          {feature.title}
        </h3>
        <p className="relative text-slate-400 leading-relaxed">
          {feature.description}
        </p>

        {/* Bottom gradient line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`}
        />
      </div>
    </motion.div>
  );
}