'use client';

import { motion, useAnimationFrame, useMotionValue } from 'motion/react';
import { useRef } from 'react';

/*
  Structure:
  Sheets → Router
            ↗ HTTP → Parser → Router → Gmail → Sheets
            ↘ Sheets → Gemini → Cloud → Sheets
            ↘ Sheets → Tools → Buffer → Buffer → Sheets
*/

const nodes = [
  { id: 'sheetsStart', x: 80, y: 260, logo: '/logos/google-sheets.png' },
  { id: 'router1', x: 240, y: 260, logo: '/logos/router.png' },
  { id: 'http1', x: 420, y: 120, logo: '/logos/http.png' },
  { id: 'parser1', x: 580, y: 120, logo: '/logos/parser.png' },
  { id: 'router2', x: 740, y: 120, logo: '/logos/router.png' },
  { id: 'gmail', x: 900, y: 120, logo: '/logos/gmail.png' },
  { id: 'sheetsTop', x: 1060, y: 120, logo: '/logos/google-sheets.png' },
  { id: 'sheetsMid', x: 420, y: 260, logo: '/logos/google-sheets.png' },
  { id: 'gemini', x: 580, y: 260, logo: '/logos/gemini.png' },
  { id: 'cloud', x: 740, y: 260, logo: '/logos/cloudinary.png' },
  { id: 'sheetsMidEnd', x: 900, y: 260, logo: '/logos/google-sheets.png' },
  { id: 'sheetsBottom', x: 420, y: 400, logo: '/logos/google-sheets.png' },
  { id: 'tools', x: 580, y: 400, logo: '/logos/tools.png' },
  { id: 'buffer1', x: 740, y: 400, logo: '/logos/buffer.png' },
  { id: 'buffer2', x: 900, y: 400, logo: '/logos/buffer.png' },
  { id: 'sheetsBottomEnd', x: 1060, y: 400, logo: '/logos/google-sheets.png' },
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
          logo={node.logo}
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
  logo,
  embedded,
  viewBoxWidth,
  viewBoxHeight,
}: {
  x: number;
  y: number;
  logo: string;
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
        className={`w-[68px] h-[68px] rounded-full flex items-center justify-center overflow-hidden ${
          embedded
            ? 'bg-slate-800/80 border border-slate-600/80 shadow-lg'
            : 'bg-white shadow-md border border-gray-100'
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="" width={32} height={32} className="object-contain" />
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
