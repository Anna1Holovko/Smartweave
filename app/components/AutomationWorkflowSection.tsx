'use client';

import { motion, useAnimationFrame, useMotionValue } from 'motion/react';
import { useRef } from 'react';
import {
  FileSpreadsheet,
  GitBranch,
  Globe,
  FileCode,
  Mail,
  Bot,
  Cloud,
  Wrench,
  Copy,
  type LucideIcon,
} from 'lucide-react';

/*
  Structure:
  Sheets → Router
            ↗ HTTP → Parser → Router → Gmail → Sheets
            ↘ Sheets → Gemini → Cloud → Sheets
            ↘ Sheets → Tools → Buffer → Buffer → Sheets
*/

type NodeType = { id: string; x: number; y: number; icon: LucideIcon; color: string };

const nodes: NodeType[] = [
  { id: 'sheetsStart', x: 80, y: 260, icon: FileSpreadsheet, color: 'bg-green-500' },
  { id: 'router1', x: 240, y: 260, icon: GitBranch, color: 'bg-lime-400' },
  { id: 'http1', x: 420, y: 120, icon: Globe, color: 'bg-blue-500' },
  { id: 'parser1', x: 580, y: 120, icon: FileCode, color: 'bg-amber-500' },
  { id: 'router2', x: 740, y: 120, icon: GitBranch, color: 'bg-lime-400' },
  { id: 'gmail', x: 900, y: 120, icon: Mail, color: 'bg-red-500' },
  { id: 'sheetsTop', x: 1060, y: 120, icon: FileSpreadsheet, color: 'bg-green-500' },
  { id: 'sheetsMid', x: 420, y: 260, icon: FileSpreadsheet, color: 'bg-green-500' },
  { id: 'gemini', x: 580, y: 260, icon: Bot, color: 'bg-emerald-500' },
  { id: 'cloud', x: 740, y: 260, icon: Cloud, color: 'bg-sky-500' },
  { id: 'sheetsMidEnd', x: 900, y: 260, icon: FileSpreadsheet, color: 'bg-green-500' },
  { id: 'sheetsBottom', x: 420, y: 400, icon: FileSpreadsheet, color: 'bg-green-500' },
  { id: 'tools', x: 580, y: 400, icon: Wrench, color: 'bg-purple-400' },
  { id: 'buffer1', x: 740, y: 400, icon: Copy, color: 'bg-orange-400' },
  { id: 'buffer2', x: 900, y: 400, icon: Copy, color: 'bg-orange-400' },
  { id: 'sheetsBottomEnd', x: 1060, y: 400, icon: FileSpreadsheet, color: 'bg-green-500' },
];

const connections: [string, string][] = [
  ['sheetsStart', 'router1'],
  ['router1', 'http1'],
  ['http1', 'parser1'],
  ['parser1', 'router2'],
  ['router2', 'gmail'],
  ['gmail', 'sheetsTop'],
  ['router1', 'sheetsMid'],
  ['sheetsMid', 'gemini'],
  ['gemini', 'cloud'],
  ['cloud', 'sheetsMidEnd'],
  ['router1', 'sheetsBottom'],
  ['sheetsBottom', 'tools'],
  ['tools', 'buffer1'],
  ['buffer1', 'buffer2'],
  ['buffer2', 'sheetsBottomEnd'],
];

function curvedPath(x1: number, y1: number, x2: number, y2: number): string {
  const midX = (x1 + x2) / 2;
  return `M${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
}

export function AutomationWorkflowSection({ embedded = false }: { embedded?: boolean }) {
  const progress = useMotionValue(0);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const filterId = embedded ? 'flow-dot-glow-embed' : 'flow-dot-glow';

  useAnimationFrame((_, delta) => {
    progress.set((progress.get() + delta * 0.00012) % 1);
  });

  const diagram = (
    <div className="relative w-full min-w-0" style={{ aspectRatio: '1140/520' }}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1140 520" preserveAspectRatio="xMidYMid meet">
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
                stroke={embedded ? 'rgba(203,213,225,0.4)' : '#e2e8f0'}
                strokeWidth="2"
                strokeDasharray="6 10"
                fill="none"
                ref={(el) => {
                  if (el) pathRefs.current[i] = el;
                }}
              />
              <FlowDot pathRef={() => pathRefs.current[i] ?? undefined} progress={progress} filterId={filterId} />
            </g>
          );
        })}
      </svg>

      {nodes.map((node) => (
        <Node
          key={node.id}
          x={node.x}
          y={node.y}
          icon={node.icon}
          color={node.color}
          embedded={embedded}
          viewBoxWidth={1140}
          viewBoxHeight={520}
        />
      ))}
    </div>
  );

  if (embedded) {
    return (
      <div className="relative overflow-hidden bg-transparent cursor-auto" style={{ cursor: 'auto' }}>
        <div className="relative max-w-full min-h-[520px]">{diagram}</div>
      </div>
    );
  }

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
      style={{ backgroundColor: '#FAFAFA' }}
      aria-labelledby="workflow-heading"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <h2 id="workflow-heading" className="text-3xl font-semibold text-gray-900 mb-16">
          Automatyzacja procesów biznesowych z wykorzystaniem AI
        </h2>

        <div className="relative hidden md:block">{diagram}</div>
      </div>
    </section>
  );
}

function Node({
  x,
  y,
  icon: Icon,
  color,
  embedded,
  viewBoxWidth,
  viewBoxHeight,
}: {
  x: number;
  y: number;
  icon: LucideIcon;
  color: string;
  embedded: boolean;
  viewBoxWidth: number;
  viewBoxHeight: number;
}) {
  const leftPct = (x / viewBoxWidth) * 100;
  const topPct = (y / viewBoxHeight) * 100;
  return (
    <motion.div
      className="absolute w-[68px] h-[68px]"
      style={{
        left: `calc(${leftPct}% - 34px)`,
        top: `calc(${topPct}% - 34px)`,
      }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 5, repeat: Infinity }}
      whileHover={{ scale: 1.08 }}
    >
      <div
        className={`w-[68px] h-[68px] rounded-full flex items-center justify-center shadow-lg border-4 ${
          embedded ? `${color} border-slate-600/80` : `${color} border-white`
        }`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
    </motion.div>
  );
}

function FlowDot({
  pathRef,
  progress,
  filterId,
}: {
  pathRef: () => SVGPathElement | undefined;
  progress: ReturnType<typeof useMotionValue<number>>;
  filterId: string;
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
      fill="#6366f1"
      cx={x}
      cy={y}
      filter={`url(#${filterId})`}
      className="drop-shadow-[0_0_6px_rgba(99,102,241,0.5)]"
    />
  );
}
