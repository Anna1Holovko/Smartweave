'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import {
  Database,
  Mail,
  MessageCircle,
  BarChart3,
  Users,
  Bot,
  FileText,
  Plug,
  type LucideIcon,
} from 'lucide-react';

const nodes: { icon: LucideIcon; angle: number }[] = [
  { icon: Users, angle: -160 },
  { icon: Database, angle: -120 },
  { icon: Mail, angle: -70 },
  { icon: MessageCircle, angle: -20 },
  { icon: Bot, angle: 20 },
  { icon: FileText, angle: 70 },
  { icon: BarChart3, angle: 120 },
  { icon: Plug, angle: 160 },
];

export function AIHubSection() {
  const radius = 260;
  const center = 300;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / 50);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / 50);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="bg-[#FAFAFA] py-28 overflow-hidden rounded-2xl">
      <div className="max-w-6xl mx-auto px-6">
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
            <div className="w-[180px] h-[180px] rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 shadow-[0_20px_80px_rgba(99,102,241,0.35)] flex items-center justify-center text-white text-5xl font-semibold">
              AI
            </div>
          </motion.div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {nodes.map((node, i) => {
              const rad = (node.angle * Math.PI) / 180;
              const x = center + Math.cos(rad) * radius;
              const y = center + Math.sin(rad) * radius;
              return (
                <motion.line
                  key={i}
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke="#c7d2fe"
                  strokeWidth="2"
                  strokeDasharray="4 8"
                  animate={{ strokeDashoffset: [0, -48] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              );
            })}
          </svg>

          {nodes.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const x = center + Math.cos(rad) * radius;
            const y = center + Math.sin(rad) * radius;
            const Icon = node.icon;
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: x - 36, top: y - 36 }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.08 }}
              >
                <div className="w-[72px] h-[72px] rounded-full bg-white border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center justify-center">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
