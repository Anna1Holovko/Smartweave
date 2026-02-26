'use client';

import { useEffect, useRef } from 'react';
import { Bot, Workflow, MessageCircle, FileText, Plug, BarChart3, Users } from 'lucide-react';

/* Positions in % – arranged in a circle around center (50%, 50%) so cards don’t overlap */
const CARDS = [
  { label: 'Agenci AI', x: 50, y: 10, icon: Bot },
  { label: 'Automatyzacja procesów', x: 78, y: 18, icon: Workflow },
  { label: 'Chatboty omnichannel', x: 90, y: 50, icon: MessageCircle },
  { label: 'Raporty & Powiadomienia', x: 78, y: 82, icon: FileText },
  { label: 'Integracje systemów', x: 50, y: 90, icon: Plug },
  { label: 'Analiza danych', x: 22, y: 82, icon: BarChart3 },
  { label: 'CRM / Lead management', x: 10, y: 50, icon: Users },
];

export function AiAnimationSection() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    const interval = setInterval(() => {
      const card = cards[Math.floor(Math.random() * cards.length)];
      if (card) {
        card.style.boxShadow = '0 8px 28px rgba(0,0,0,0.2), 0 0 24px rgba(34,211,238,0.4)';
        setTimeout(() => {
          card.style.boxShadow = '';
        }, 1200);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ai-animation-wrap">
      <div className="ai-animation-grid" aria-hidden />
      <svg
        className="ai-animation-svg"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <linearGradient id="aiLineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        {/* Outer outline (reference diagram style) */}
        <path className="ai-outer-ring" d="M 60 60 L 940 60 Q 960 60 960 80 L 960 520 Q 960 540 940 540 L 60 540 Q 40 540 40 520 L 40 80 Q 40 60 60 60 Z" fill="none" />
        {/* Lines from AI center to card edge */}
        <path className="ai-conn" d="M500 300 L500 110" />
        <path className="ai-conn" d="M500 300 L739 136" />
        <path className="ai-conn" d="M500 300 L850 300" />
        <path className="ai-conn" d="M500 300 L739 464" />
        <path className="ai-conn" d="M500 300 L500 490" />
        <path className="ai-conn" d="M500 300 L261 464" />
        <path className="ai-conn" d="M500 300 L150 300" />
      </svg>
      <div className="ai-core-node">AI</div>
      {CARDS.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            ref={(el) => { if (el) cardsRef.current[i] = el; }}
            className="ai-float-card"
            style={{ '--ai-x': `${card.x}%`, '--ai-y': `${card.y}%` } as React.CSSProperties}
          >
            <span className="ai-float-card-icon">
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
            </span>
            <span className="ai-float-card-label">{card.label}</span>
          </div>
        );
      })}
    </div>
  );
}
