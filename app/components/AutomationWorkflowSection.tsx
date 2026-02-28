'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, animate } from 'motion/react';
import {
  Inbox,
  Users,
  Mail,
  Database,
  Cpu,
  Bell,
  FileText,
  type LucideIcon,
} from 'lucide-react';

const VIEWBOX = { w: 1000, h: 500 };

const BLOCKS: { id: string; label: string; icon: LucideIcon; x: number; y: number }[] = [
  { id: 'lead', label: 'Lead source', icon: Inbox, x: 100, y: 80 },
  { id: 'crm', label: 'CRM', icon: Users, x: 260, y: 80 },
  { id: 'email', label: 'Email automation', icon: Mail, x: 420, y: 80 },
  { id: 'database', label: 'Database', icon: Database, x: 420, y: 200 },
  { id: 'ai', label: 'AI processing', icon: Cpu, x: 260, y: 200 },
  { id: 'notification', label: 'Notification', icon: Bell, x: 100, y: 200 },
  { id: 'report', label: 'Report', icon: FileText, x: 260, y: 320 },
];

/** Path through block centers: Lead → CRM → Email → Database → AI → Notification → Report → back to Lead */
const FLOW_PATH_D =
  'M 100 80 L 260 80 L 420 80 L 420 200 L 260 200 L 100 200 L 100 320 L 260 320 L 100 80';

const DURATION = 10;
const ACCENT = '#4F46E5'; // indigo-600

export function AutomationWorkflowSection() {
  const pathRef = useRef<SVGPathElement>(null);
  const [totalLength, setTotalLength] = useState(0);
  const [progress, setProgress] = useState(0);
  const [point, setPoint] = useState({ x: 100, y: 80 });

  const updatePoint = useCallback(() => {
    if (!pathRef.current || totalLength <= 0) return;
    const p = pathRef.current.getPointAtLength(progress * totalLength);
    setPoint({ x: p.x, y: p.y });
  }, [progress, totalLength]);

  useEffect(() => {
    const path = pathRef.current;
    if (path) setTotalLength(path.getTotalLength());
  }, []);

  useEffect(() => {
    updatePoint();
  }, [updatePoint]);

  useEffect(() => {
    const controls = animate(0, 1, {
      duration: DURATION,
      repeat: Infinity,
      ease: 'linear',
      onUpdate: (v) => {
        setProgress(v);
        if (pathRef.current && totalLength > 0) {
          const p = pathRef.current.getPointAtLength(v * totalLength);
          setPoint({ x: p.x, y: p.y });
        }
      },
    });
    return () => controls.stop();
  }, [totalLength]);

  const activeIndex = totalLength > 0 ? Math.floor((progress * 7) % 7) : 0;

  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === 'undefined') return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      setParallax({ x: dx * 6, y: dy * 6 });
    };
    const onLeave = () => setParallax({ x: 0, y: 0 });
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
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

        {/* Desktop: 2-row workflow with path */}
        <div
          className="relative w-full max-w-4xl mx-auto hidden md:block"
          style={{ aspectRatio: `${VIEWBOX.w} / ${VIEWBOX.h}` }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <linearGradient id="workflow-accent" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={ACCENT} stopOpacity="0.4" />
                <stop offset="50%" stopColor={ACCENT} />
                <stop offset="100%" stopColor={ACCENT} stopOpacity="0.4" />
              </linearGradient>
              <filter id="dot-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Thin track line */}
            <path
              ref={pathRef}
              d={FLOW_PATH_D}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Animated stroke (visible part of flow) */}
            <path
              d={FLOW_PATH_D}
              fill="none"
              stroke="url(#workflow-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={totalLength}
              strokeDashoffset={totalLength * (1 - progress)}
              style={{ transition: 'none' }}
            />
            {/* Moving dot */}
            <circle
              cx={point.x}
              cy={point.y}
              r="6"
              fill={ACCENT}
              filter="url(#dot-glow)"
              style={{ transition: 'none' }}
            />
          </svg>

          {/* Blocks overlay – same coordinate system as SVG + parallax */}
          <motion.div
            className="absolute inset-0 md:block"
            style={{
              aspectRatio: `${VIEWBOX.w} / ${VIEWBOX.h}`,
              x: parallax.x,
              y: parallax.y,
            }}
          >
            {BLOCKS.map((block, index) => {
              const Icon = block.icon;
              const isActive = index === activeIndex;
              const leftPct = (block.x / VIEWBOX.w) * 100;
              const topPct = (block.y / VIEWBOX.h) * 100;
              return (
                <motion.div
                  key={block.id}
                  className="absolute flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:scale-[1.02] hover:border-indigo-200 transition-all duration-300 cursor-default min-w-[100px] max-w-[140px]"
                  style={{
                    left: `${leftPct}%`,
                    top: `${topPct}%`,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: isActive
                      ? `0 4px 24px ${ACCENT}30, 0 0 0 1px ${ACCENT}40`
                      : undefined,
                  }}
                  initial={false}
                  animate={{
                    y: [0, -3, 0],
                    transition: {
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.3,
                    },
                  }}
                >
                  <motion.span
                    className="flex items-center justify-center w-10 h-10 rounded-xl text-slate-600"
                    animate={{
                      scale: isActive ? 1.05 : 1,
                      color: isActive ? ACCENT : '#475569',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </motion.span>
                  <span className="text-xs font-medium text-slate-700 text-center leading-tight">
                    {block.label}
                  </span>
                  {isActive && (
                    <motion.span
                      className="absolute inset-0 rounded-2xl border-2 border-indigo-400/50 pointer-events-none"
                      initial={{ opacity: 0.5, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.06 }}
                      transition={{ duration: 0.7, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile: vertical stack with line + dot */}
        <div className="md:hidden relative w-full max-w-sm mx-auto">
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-slate-200 rounded-full" />
            <div
              className="absolute left-0 top-0 w-6 h-6 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/40 -translate-x-1/2 z-10"
              style={{ top: `${progress * 100}%` }}
            />
            {BLOCKS.map((block, index) => {
              const Icon = block.icon;
              const isActive = index === activeIndex;
              return (
                <motion.div
                  key={block.id}
                  className="relative flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                  animate={{ opacity: 1 }}
                >
                  <div
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white border shadow-sm min-w-0 flex-1 ${
                      isActive ? 'border-indigo-300 shadow-indigo-500/10' : 'border-slate-200/80'
                    }`}
                  >
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl text-slate-600">
                      <Icon className="w-5 h-5" strokeWidth={1.8} />
                    </span>
                    <span className="text-xs font-medium text-slate-700 text-center">
                      {block.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
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
