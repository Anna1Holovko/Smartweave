'use client';

import { motion, useAnimationFrame, useMotionValue } from 'motion/react';
import { useRef } from 'react';

/*
  Structure:
  Sheets → Router
            ↗ HTTP → Parser → Router → GPT → Sheets (TOP)
            ↘ Sheets → Gemini → Cloudinary → Sheets (MIDDLE)
            ↘ Sheets → Tools → Buffer → Buffer → Sheets (BOTTOM)
*/

const DIAGRAM_WIDTH = 1260;
const DIAGRAM_HEIGHT = 600;

const nodes = [
  { id: 'sheetsStart', x: 80, y: 300, logo: '/logos/google-sheets.svg' },
  { id: 'router1', x: 260, y: 300, logo: '/logos/router.svg' },
  { id: 'http1', x: 460, y: 80, logo: '/logos/http.svg' },
  { id: 'parser1', x: 640, y: 80, logo: '/logos/parser.svg' },
  { id: 'router2', x: 820, y: 80, logo: '/logos/router.svg' },
  { id: 'gpt', x: 1000, y: 80, logo: '/logos/gpt.svg' },
  { id: 'sheetsTop', x: 1180, y: 80, logo: '/logos/google-sheets.svg' },
  { id: 'sheetsMid', x: 460, y: 300, logo: '/logos/google-sheets.svg' },
  { id: 'gemini', x: 640, y: 300, logo: '/logos/gemini.svg' },
  { id: 'cloudinary', x: 820, y: 300, logo: '/logos/cloudinary.svg' },
  { id: 'sheetsMidEnd', x: 1000, y: 300, logo: '/logos/google-sheets.svg' },
  { id: 'sheetsBottom', x: 460, y: 520, logo: '/logos/google-sheets.svg' },
  { id: 'tools', x: 640, y: 520, logo: '/logos/tools.svg' },
  { id: 'buffer1', x: 820, y: 520, logo: '/logos/buffer.svg' },
  { id: 'buffer2', x: 1000, y: 520, logo: '/logos/buffer.svg' },
  { id: 'sheetsBottomEnd', x: 1180, y: 520, logo: '/logos/google-sheets.svg' },
];

const connections: [string, string][] = [
  ['sheetsStart', 'router1'],
  ['router1', 'http1'],
  ['http1', 'parser1'],
  ['parser1', 'router2'],
  ['router2', 'gpt'],
  ['gpt', 'sheetsTop'],
  ['router1', 'sheetsMid'],
  ['sheetsMid', 'gemini'],
  ['gemini', 'cloudinary'],
  ['cloudinary', 'sheetsMidEnd'],
  ['router1', 'sheetsBottom'],
  ['sheetsBottom', 'tools'],
  ['tools', 'buffer1'],
  ['buffer1', 'buffer2'],
  ['buffer2', 'sheetsBottomEnd'],
];

function curvedPath(x1: number, y1: number, x2: number, y2: number): string {
  const offset = Math.abs(x2 - x1) * 0.45;
  return `M ${x1} ${y1} C ${x1 + offset} ${y1}, ${x2 - offset} ${y2}, ${x2} ${y2}`;
}

export function AutomationWorkflowSection({ embedded = false }: { embedded?: boolean }) {
  const progress = useMotionValue(0);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const filterId = embedded ? 'flow-dot-glow-embed' : 'flow-dot-glow';

  useAnimationFrame((_, delta) => {
    progress.set((progress.get() + delta * 0.00012) % 1);
  });

  const diagram = (
    <div
      className="relative w-full min-w-0"
      style={{ aspectRatio: `${DIAGRAM_WIDTH}/${DIAGRAM_HEIGHT}` }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${DIAGRAM_WIDTH} ${DIAGRAM_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
      >
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
          viewBoxWidth={DIAGRAM_WIDTH}
          viewBoxHeight={DIAGRAM_HEIGHT}
          embedded={embedded}
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

        <div className="relative h-[680px] hidden md:block">{diagram}</div>
      </div>
    </section>
  );
}

function Node({
  x,
  y,
  logo,
  viewBoxWidth,
  viewBoxHeight,
  embedded,
}: {
  x: number;
  y: number;
  logo: string;
  viewBoxWidth: number;
  viewBoxHeight: number;
  embedded: boolean;
}) {
  const leftPct = (x / viewBoxWidth) * 100;
  const topPct = (y / viewBoxHeight) * 100;
  return (
    <motion.div
      className="absolute w-[72px] h-[72px]"
      style={{
        left: `calc(${leftPct}% - 36px)`,
        top: `calc(${topPct}% - 36px)`,
      }}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 6, repeat: Infinity }}
    >
      <div
        className={`w-[72px] h-[72px] rounded-full flex items-center justify-center border shadow-sm ${
          embedded ? 'bg-slate-800/80 border-slate-600/80' : 'bg-white border-gray-200'
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="" className="w-9 h-9 object-contain" />
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
