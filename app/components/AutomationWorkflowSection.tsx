'use client';

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
} from 'motion/react';
import { useRef } from 'react';

type Node = {
  id: number;
  label: string;
  x: number;
  y: number;
};

const nodes: Node[] = [
  { id: 0, label: 'Webhook', x: 40, y: 200 },
  { id: 1, label: 'CRM', x: 180, y: 200 },
  { id: 2, label: 'Router', x: 340, y: 200 },
  { id: 3, label: 'Email', x: 520, y: 80 },
  { id: 4, label: 'Report', x: 700, y: 80 },
  { id: 5, label: 'AI', x: 520, y: 200 },
  { id: 6, label: 'Database', x: 700, y: 200 },
  { id: 7, label: 'Notification', x: 520, y: 320 },
  { id: 8, label: 'Archive', x: 700, y: 320 },
];

const connections: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [2, 5],
  [5, 6],
  [2, 7],
  [7, 8],
];

export function AutomationWorkflowSection() {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const progress = useMotionValue(0);

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
    progress.set((progress.get() + delta * 0.0001) % 1);
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
          className="relative h-[420px] hidden md:block"
          style={{ x: springX, y: springY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <svg className="absolute inset-0 w-full h-full">
            {connections.map(([a, b], i) => {
              const n1 = nodes.find((n) => n.id === a)!;
              const n2 = nodes.find((n) => n.id === b)!;
              const path = `M${n1.x} ${n1.y} L${n2.x} ${n2.y}`;

              return (
                <g key={`${a}-${b}`}>
                  <path
                    d={path}
                    stroke="#d1d5db"
                    strokeWidth="2"
                    strokeDasharray="4 6"
                    fill="none"
                    ref={(el) => {
                      pathRefs.current[i] = el;
                    }}
                  />
                  <FlowDot
                    pathRef={() => pathRefs.current[i] ?? undefined}
                    progress={progress}
                  />
                </g>
              );
            })}
          </svg>

          {nodes.map((node) => (
            <NodeCircle key={node.id} node={node} />
          ))}
        </motion.div>

        <div className="md:hidden space-y-3">
          {nodes.map((n) => (
            <div
              key={n.id}
              className="bg-white border border-slate-100 rounded-xl p-4 shadow-soft text-slate-700"
            >
              {n.label}
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

function NodeCircle({ node }: { node: Node }) {
  return (
    <motion.div
      className="absolute flex items-center justify-center pointer-events-none"
      style={{ left: node.x - 30, top: node.y - 30 }}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="w-[60px] h-[60px] rounded-full bg-white border border-slate-200 shadow-soft flex items-center justify-center text-xs text-slate-700 text-center px-2">
        {node.label}
      </div>
    </motion.div>
  );
}

function FlowDot({
  pathRef,
  progress,
}: {
  pathRef: () => SVGPathElement | undefined;
  progress: ReturnType<typeof useMotionValue<number>>;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useAnimationFrame(() => {
    const path = pathRef();
    if (!path) return;
    const length = path.getTotalLength();
    const point = path.getPointAtLength(progress.get() * length);
    x.set(point.x);
    y.set(point.y);
  });

  return (
    <motion.circle
      r="4"
      fill="#4f46e5"
      cx={x}
      cy={y}
      className="drop-shadow-[0_0_6px_rgba(79,70,229,0.8)]"
    />
  );
}
