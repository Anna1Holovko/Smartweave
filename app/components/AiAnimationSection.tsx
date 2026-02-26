'use client';

import { useEffect, useRef } from 'react';

const CARDS = [
  { label: 'Agenci AI', x: 20, y: 17 },
  { label: 'Automatyzacja procesów', x: 80, y: 20 },
  { label: 'Integracje systemów', x: 12, y: 53 },
  { label: 'Chatboty omnichannel', x: 88, y: 57 },
  { label: 'Analiza danych', x: 26, y: 87 },
  { label: 'CRM / Lead management', x: 76, y: 87 },
  { label: 'Raporty & Powiadomienia', x: 50, y: 87 },
];

export function AiAnimationSection() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    const interval = setInterval(() => {
      const card = cards[Math.floor(Math.random() * cards.length)];
      if (card) {
        card.style.boxShadow = '0 0 40px rgba(0,229,255,0.8), 0 0 20px rgba(123,97,255,0.6)';
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
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="50%" stopColor="#7B61FF" />
            <stop offset="100%" stopColor="#4F8CFF" />
          </linearGradient>
        </defs>
        <path className="ai-conn" d="M500 300 L200 100" />
        <path className="ai-conn" d="M500 300 L800 120" />
        <path className="ai-conn" d="M500 300 L120 320" />
        <path className="ai-conn" d="M500 300 L880 340" />
        <path className="ai-conn" d="M500 300 L260 520" />
        <path className="ai-conn" d="M500 300 L760 520" />
        <path className="ai-conn" d="M500 300 L500 520" />
      </svg>
      <div className="ai-core-node">AI</div>
      {CARDS.map((card, i) => (
        <div
          key={card.label}
          ref={(el) => { if (el) cardsRef.current[i] = el; }}
          className="ai-float-card"
          style={{ '--ai-x': `${card.x}%`, '--ai-y': `${card.y}%` } as React.CSSProperties}
        >
          {card.label}
        </div>
      ))}
    </div>
  );
}
