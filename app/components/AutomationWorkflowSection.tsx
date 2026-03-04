'use client';

import { motion, useAnimationFrame, useMotionValue } from 'motion/react';
import { useRef } from 'react';
import {
  FileSpreadsheet,
  GitBranch,
  Mail,
  Bot,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

/*
  Layout (Make-style):
  Sheets → Router
            ↗ AI → Sheets
            ↘ AI → AI → Gmail
                    ↘ Tools
*/

type NodeType = {
  id: string;
  x: number;
  y: number;
  icon: LucideIcon;
  color: string;
};

const nodes: NodeType[] = [
  { id: 'start', x: 80, y: 260, icon: FileSpreadsheet, color: 'bg-green-500' },
  { id: 'router1', x: 260, y: 260, icon: GitBranch, color: 'bg-lime-400' },
  { id: 'ai1', x: 440, y: 120, icon: Bot, color: 'bg-emerald-500' },
  { id: 'sheet2', x: 640, y: 120, icon: FileSpreadsheet, color: 'bg-green-500' },
  { id: 'ai2', x: 440, y: 260, icon: Bot, color: 'bg-emerald-500' },
  { id: 'ai3', x: 640, y: 260, icon: Bot, color: 'bg-emerald-500' },
  { id: 'mail', x: 840, y: 260, icon: Mail, color: 'bg-red-500' },
  { id: 'router2', x: 640, y: 400, icon: GitBranch, color: 'bg-lime-400' },
  { id: 'tools', x: 840, y: 400, icon: Wrench, color: 'bg-purple-400' },
];

const connections: [string, string][] = [
  ['start', 'router1'],
  ['router1', 'ai1'],
  ['ai1', 'sheet2'],
  ['router1', 'ai2'],
  ['ai2', 'ai3'],
  ['ai3', 'mail'],
  ['ai2', 'router2'],
  ['router2', 'tools'],
];

function curvedPath(x1: number, y1: number, x2: number, y2: number): string {
  const midX = (x1 + x2) / 2;
  return `M${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
}

export function AutomationWorkflowSection({ embedded = false }: { embedded?: boolean }) {
  const progress = useMotionValue(0);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const filterId = embedded ? 'flow-dot-glow-embed' : 'flow-dot-glow';

  useAnimationFrame((_t, delta) => {
    progress.set((progress.get() + delta * 0.00012) % 1);
  });

  const diagram = (
    <div className="relative h-[520px] w-full min-w-0">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <filter id={filterId} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {connections.map(([from, to], i) => {
          const a = nodes.find((n) => n.id === from)!;
          const b = nodes.find((n) => n.id === to)!;
          const path = curvedPath(a.x, a.y, b.x, b.y);

          return (
            <g key={`${from}-${to}`}>
              <path
                d={path}
                stroke={embedded ? 'rgba(203,213,225,0.7)' : '#cbd5e1'}
                strokeWidth="2"
                strokeDasharray="4 8"
                fill="none"
                ref={(el) => {
                  if (el) pathRefs.current[i] = el;
                }}
              />
              <FlowDot
                pathRef={() => pathRefs.current[i] ?? undefined}
                progress={progress}
                offset={0}
                filterId={filterId}
              />
              <FlowDot
                pathRef={() => pathRefs.current[i] ?? undefined}
                progress={progress}
                offset={0.5}
                filterId={filterId}
              />
            </g>
          );
        })}
      </svg>

      {nodes.map((node) => (
        <Node key={node.id} {...node} />
      ))}
    </div>
  );

  if (embedded) {
    return (
      <div className="relative overflow-hidden bg-transparent cursor-auto" style={{ cursor: 'auto' }}>
        <div className="relative max-w-full">
          {diagram}
        </div>
      </div>
    );
  }

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
      style={{ backgroundColor: '#FAFAFA' }}
      aria-labelledby="workflow-heading"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="workflow-heading"
          className="text-2xl sm:text-3xl font-semibold text-slate-900 text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Automatyzacja procesów biznesowych i agenci AI
        </motion.h2>

        <div className="relative h-[520px] hidden md:block">
          {diagram}
        </div>

        <div className="md:hidden space-y-4">
          {nodes.map((n) => (
            <div
              key={n.id}
              className="bg-white rounded-xl border border-slate-100 p-4 shadow-soft text-slate-700"
            >
              {n.id}
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
          Inteligentny przepływ danych w czasie rzeczywistym - od leada do raportu.
        </motion.p>
      </div>
    </section>
  );
}

function Node({
  x,
  y,
  icon: Icon,
  color,
}: NodeType) {
  return (
    <motion.div
      className="absolute"
      style={{ left: x - 32, top: y - 32 }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.08 }}
    >
      <div
        className={`w-[64px] h-[64px] rounded-full ${color} shadow-lg flex items-center justify-center border-4 border-white`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
    </motion.div>
  );
}

function FlowDot({
  pathRef,
  progress,
  offset,
  filterId,
}: {
  pathRef: () => SVGPathElement | undefined;
  progress: ReturnType<typeof useMotionValue<number>>;
  offset: number;
  filterId: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useAnimationFrame(() => {
    const path = pathRef();
    if (!path) return;
    const length = path.getTotalLength();
    const t = (progress.get() + offset) % 1;
    const point = path.getPointAtLength(t * length);
    x.set(point.x);
    y.set(point.y);
  });

  return (
    <motion.circle
      r="5"
      fill="#6366f1"
      cx={x}
      cy={y}
      filter={`url(#${filterId})`}
      className="drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]"
    />
  );
}
