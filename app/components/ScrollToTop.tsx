'use client';

import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useChatbotOpen } from '@/app/contexts/ChatbotUiContext';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const chatOpen = useChatbotOpen();

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  /** Closed: above FAB. Open: above whole chat block (FAB + gap + panel, same heights as Chatbot.tsx). */
  const bottomOffset = useMemo(() => {
    const base =
      'max(1.5rem, env(safe-area-inset-bottom, 0px)) + 3.5rem + 0.75rem';
    if (chatOpen) {
      return `calc(${base} + min(70vh, 520px) + 0.75rem)`;
    }
    return `calc(${base})`;
  }, [chatOpen]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed z-[9998] group"
          style={{
            bottom: bottomOffset,
            right: 'max(1.5rem, env(safe-area-inset-right, 0px))',
          }}
          aria-label="Przewiń na górę strony"
        >
          <div className="relative">
            <div className="w-14 h-14 rounded-full glass-card border border-[#d8f17b]/30 flex items-center justify-center transition-all duration-300 hover:border-[#d8f17b]/60 hover:shadow-[0_0_30px_rgba(216,241,123,0.25)] group-hover:scale-110">
              <ArrowUp className="w-6 h-6 text-[#d8f17b] transition-colors" />
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
