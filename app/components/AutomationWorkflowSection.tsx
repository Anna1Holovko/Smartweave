'use client';

import { motion, useAnimationFrame, useMotionValue } from 'motion/react';
import { useRef } from 'react';
import { SECTION_H2_CLASS } from '@/lib/layout';

import {
  SiGooglesheets,
  SiOpenai,
  SiHubspot,
  SiSlack,
  SiGmail,
} from 'react-icons/si';

import {
  GitBranch,
  Wrench,
  Globe,
  Brackets,
  Layers,
} from 'lucide-react';

const DIAGRAM_WIDTH = 1260;
const DIAGRAM_HEIGHT = 620;

/** Lucide + react-icons — wspólny nadbudowany typ SVG (IconType z react-icons nie pasuje do `{ className?: string }`). */
type WorkflowIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type NodeType = {
  id: string;
  x: number;
  y: number;
  icon: WorkflowIcon;
  color: string;
};

const nodes: NodeType[] = [
  { id: 'start', x: 80, y: 320, icon: SiGooglesheets, color: '#16a34a' },

  { id: 'router1', x: 260, y: 320, icon: GitBranch, color: '#84cc16' },

  // TOP FLOW
  { id: 'http', x: 460, y: 80, icon: Globe, color: '#2563eb' },
  { id: 'parser', x: 640, y: 80, icon: Brackets, color: '#f97316' },
  { id: 'gptTop', x: 820, y: 80, icon: SiOpenai, color: '#74AA9C' },
  { id: 'email', x: 1000, y: 80, icon: SiGmail, color: '#EA4335' },

  // MIDDLE FLOW
  { id: 'hubspot', x: 460, y: 320, icon: SiHubspot, color: '#FF7A59' },
  { id: 'gptMid', x: 640, y: 320, icon: SiOpenai, color: '#74AA9C' },
  { id: 'slack', x: 820, y: 320, icon: SiSlack, color: '#4A154B' },

  // BOTTOM FLOW
  { id: 'sheetsBottom', x: 460, y: 560, icon: SiGooglesheets, color: '#16a34a' },
  { id: 'tools', x: 640, y: 560, icon: Wrench, color: '#a855f7' },
  { id: 'buffer1', x: 820, y: 560, icon: Layers, color: '#374151' },
  { id: 'sheetsEnd', x: 1000, y: 560, icon: SiGooglesheets, color: '#16a34a' },
];

const connections: [string, string][] = [
  ['start', 'router1'],

  // TOP FLOW
  ['router1', 'http'],
  ['http', 'parser'],
  ['parser', 'gptTop'],
  ['gptTop', 'email'],

  // MIDDLE FLOW

  ['router1', 'hubspot'],
  ['hubspot', 'gptMid'],
  ['gptMid', 'slack'],

  // BOTTOM FLOW
  ['router1', 'sheetsBottom'],
  ['sheetsBottom', 'tools'],
  ['tools', 'buffer1'],
  ['buffer1', 'sheetsEnd'],
];

function curvedPath(x1: number, y1: number, x2: number, y2: number) {
  const offset = Math.abs(x2 - x1) * 0.45;
  return `M ${x1} ${y1} C ${x1 + offset} ${y1}, ${x2 - offset} ${y2}, ${x2} ${y2}`;
}

export function AutomationWorkflowSection({ embedded = false }: { embedded?: boolean }) {
  const progress = useMotionValue(0);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const filterId = 'flow-dot-glow';

  useAnimationFrame((_, delta) => {
    if (embedded) return;
    progress.set((progress.get() + delta * 0.00012) % 1);
  });

  const diagram = (
    <div
      className="relative w-full min-w-0"
      style={{ aspectRatio: `${DIAGRAM_WIDTH}/${DIAGRAM_HEIGHT}` }}
    >
      {/* Na /uslugi/automatyzacja (embedded) ukrywamy linie i kropki SVG — zostają węzły z ikonami */}
      {!embedded && (
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${DIAGRAM_WIDTH} ${DIAGRAM_HEIGHT}`}
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
              <g key={i}>
                <path
                  d={path}
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="2"
                  strokeDasharray="6 10"
                  fill="none"
                  ref={(el) => {
                    if (el) pathRefs.current[i] = el;
                  }}
                />
                <FlowDot
                  pathRef={() => pathRefs.current[i] ?? undefined}
                  progress={progress}
                  filterId={filterId}
                />
              </g>
            );
          })}
        </svg>
      )}

      {nodes.map((node) => (
        <Node
          key={node.id}
          x={node.x}
          y={node.y}
          icon={node.icon}
          color={node.color}
          viewBoxWidth={DIAGRAM_WIDTH}
          viewBoxHeight={DIAGRAM_HEIGHT}
        />
      ))}
    </div>
  );

  if (embedded) {
    return (
      <div className="relative overflow-hidden bg-transparent">
        <div className="relative max-w-full min-h-[520px]">{diagram}</div>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-[var(--bg-graphite)]" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <h2 className={`${SECTION_H2_CLASS} mb-16`}>
          Automatyzacja procesów biznesowych
        </h2>

        <div className="relative h-[720px] hidden md:block">{diagram}</div>
      </div>
    </section>
  );
}

function Node({
  x,
  y,
  icon: Icon,
  color,
  viewBoxWidth,
  viewBoxHeight,
}: {
  x: number;
  y: number;
  icon: WorkflowIcon;
  color: string;
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
      transition={{ duration: 6, repeat: Infinity }}
      whileHover={{ scale: 1.1 }}
    >
      <div
        className="w-[68px] h-[68px] rounded-full shadow-lg flex items-center justify-center border-4 border-white"
        style={{ backgroundColor: color }}
      >
        <Icon className="w-7 h-7 text-white" />
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
      fill="#d8f17b"
      cx={x}
      cy={y}
      filter={`url(#${filterId})`}
      className="drop-shadow-[0_0_6px_rgba(216,241,123,0.5)]"
    />
  );
}
