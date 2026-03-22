'use client';

import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

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
            /* Above chat FAB (h-14 = 3.5rem) + gap; aligned with Chatbot.tsx bottom/right */
            bottom:
              'calc(max(1.5rem, env(safe-area-inset-bottom, 0px)) + 3.5rem + 0.75rem)',
            right: 'max(1.5rem, env(safe-area-inset-right, 0px))',
          }}
          aria-label="Przewiń na górę strony"
        >
          <div className="relative">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full glass-card border border-[#d8f17b]/30 flex items-center justify-center transition-all duration-300 hover:border-[#d8f17b]/60 hover:shadow-[0_0_30px_rgba(216,241,123,0.25)] group-hover:scale-110">
              <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#d8f17b] transition-colors" />
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
