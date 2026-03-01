'use client';

import {
  motion,
  useMotionValue,
  useSpring,
  useAnimationFrame,
  useMotionValueEvent,
} from 'motion/react';
import { useRef, useState } from 'react';

const modules = [
  { id: 0, label: 'Lead Source', x: 0, y: 0 },
  { id: 1, label: 'CRM', x: 240, y: 0 },
  { id: 2, label: 'Email automation', x: 480, y: 0 },
  { id: 3, label: 'Notification', x: 0, y: 180 },
  { id: 4, label: 'AI processing', x: 240, y: 180 },
  { id: 5, label: 'Database', x: 480, y: 180 },
  { id: 6, label: 'Report', x: 240, y: 360 },
];

const pathD = `
M100 60
H340
H580
V240
H340
H100
V420
H340
`;

export function AutomationWorkflowSection() {
  const pathRef = useRef<SVGPathElement>(null);
  const progress = useMotionValue(0);
  const [activeModule, setActiveModule] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / 40);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / 40);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useAnimationFrame((_t, delta) => {
    const speed = 0.00008;
    progress.set((progress.get() + delta * speed) % 1);
  });

  const lastIndexRef = useRef(0);
  useMotionValueEvent(progress, 'change', (v) => {
    const index = Math.min(6, Math.floor(v * 7));
    if (index !== lastIndexRef.current) {
      lastIndexRef.current = index;
      setActiveModule(index);
    }
  });

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
      style={{ backgroundColor: '#FAFAFA' }}
      aria-labelledby="workflow-heading"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="workflow-heading"
          className="text-2xl sm:text-3xl font-semibold text-slate-900 text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Automatyzacja procesów biznesowych
        </motion.h2>

        <motion.div
          className="relative h-[520px] max-w-[720px] mx-auto hidden md:block"
          style={{ x: springX, y: springY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {modules.map((mod) => (
            <ModuleCard
              key={mod.id}
              label={mod.label}
              x={mod.x}
              y={mod.y}
              active={activeModule === mod.id}
            />
          ))}

          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="workflow-line-gradient">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#6366f1" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              ref={pathRef}
              d={pathD}
              stroke="url(#workflow-line-gradient)"
              strokeWidth="2"
              fill="none"
            />
            <MovingDot pathRef={pathRef} progress={progress} />
          </svg>
        </motion.div>

        <div className="md:hidden space-y-4">
          {modules.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-2xl p-5 shadow-soft border border-slate-100 text-slate-700 font-medium"
            >
              {m.label}
            </div>
          ))}
        </div>

        <motion.p
          className="mt-10 text-center text-sm sm:text-base text-slate-500 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Inteligentny przepływ danych w czasie rzeczywistym — od leada do raportu.
        </motion.p>
      </div>
    </section>
  );
}

function MovingDot({
  pathRef,
  progress,
}: {
  pathRef: React.RefObject<SVGPathElement | null>;
  progress: ReturnType<typeof useMotionValue<number>>;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useAnimationFrame(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    const point = path.getPointAtLength(progress.get() * length);
    x.set(point.x);
    y.set(point.y);
  });

  return (
    <motion.circle
      r="6"
      fill="#6366f1"
      cx={x}
      cy={y}
      className="drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]"
    />
  );
}

function ModuleCard({
  label,
  x,
  y,
  active,
}: {
  label: string;
  x: number;
  y: number;
  active: boolean;
}) {
  return (
    <motion.div
      className="absolute w-[200px] h-[120px] bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-700 font-medium shadow-soft"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -6, 0],
        scale: active ? 1.04 : 1,
        boxShadow: active
          ? '0 25px 60px rgba(99,102,241,0.18)'
          : '0 10px 30px rgba(0,0,0,0.06)',
      }}
      transition={{
        y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        scale: { duration: 0.3 },
      }}
      whileHover={{ scale: 1.05 }}
    >
      {active && (
        <motion.div
          className="absolute inset-0 rounded-2xl bg-indigo-500/5 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
      {label}
    </motion.div>
  );
}
