'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import {
  Bot,
  Workflow,
  MessageCircle,
  BarChart3,
  Plug,
  FileText,
  Users,
  type LucideIcon,
} from 'lucide-react';

const items: { icon: LucideIcon; angle: number }[] = [
  { icon: Workflow, angle: -60 },
  { icon: Bot, angle: -20 },
  { icon: MessageCircle, angle: 20 },
  { icon: FileText, angle: 60 },
  { icon: Plug, angle: 120 },
  { icon: BarChart3, angle: 160 },
  { icon: Users, angle: -160 },
];

export function AIHubSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / 40);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / 40);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const radius = 260;
  const center = 300;

  return (
    <section className="relative overflow-hidden py-28 bg-gradient-to-br from-[#020617] via-[#020617] to-[#041029] rounded-2xl">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="relative h-[600px]"
          style={{ x: springX, y: springY }}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          <motion.div
            className="absolute flex items-center justify-center"
            style={{
              left: center - 90,
              top: center - 90,
            }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <div className="w-[180px] h-[180px] rounded-full bg-gradient-to-br from-indigo-500/40 to-cyan-400/30 backdrop-blur-xl border border-cyan-300/30 shadow-[0_0_80px_rgba(56,189,248,0.35)] flex items-center justify-center text-4xl font-semibold text-white">
              AI
            </div>
          </motion.div>

          {items.map((item, i) => {
            const rad = (item.angle * Math.PI) / 180;
            const x = center + Math.cos(rad) * radius;
            const y = center + Math.sin(rad) * radius;
            const Icon = item.icon;
            return (
              <OrbitItem key={i} x={x} y={y} Icon={Icon} center={center} />
            );
          })}

          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {items.map((item, i) => {
              const rad = (item.angle * Math.PI) / 180;
              const x = center + Math.cos(rad) * radius;
              const y = center + Math.sin(rad) * radius;
              return (
                <motion.line
                  key={i}
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke="rgba(56,189,248,0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                  animate={{ strokeDashoffset: [0, -24] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              );
            })}
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

function OrbitItem({
  x,
  y,
  Icon,
  center,
}: {
  x: number;
  y: number;
  Icon: LucideIcon;
  center: number;
}) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: x - 80,
        top: y - 32,
      }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-indigo-600" />
        </div>
      </div>
    </motion.div>
  );
}
