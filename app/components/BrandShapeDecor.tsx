'use client';

import { motion } from 'motion/react';

type BrandShapeDecorProps = {
  className?: string;
  /** Tailwind width classes; height follows aspect ratio */
  sizeClassName?: string;
};

/**
 * Brand mark / abstract weave shape (#d8f17b) — use as background decor only.
 */
export function BrandShapeDecor({
  className = '',
  sizeClassName = 'w-[min(42vw,200px)] sm:w-[min(38vw,240px)] lg:w-56',
}: BrandShapeDecorProps) {
  return (
    <div aria-hidden className={`pointer-events-none select-none ${className}`}>
      <motion.div
        className="text-[#d8f17b]"
        initial={{ opacity: 0, scale: 0.92, rotate: -6 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="168"
          height="168"
          viewBox="0 0 168 168"
          fill="none"
          className={`${sizeClassName} h-auto max-h-[min(42vw,220px)] sm:max-h-[min(36vw,260px)]`}
        >
          <path
            d="M14.2509 18.8437C21.2528 16.4365 56.9052 27.7512 74.9489 26.6485C113.516 24.2891 131.767 17.0105 167.386 0C138.021 52.9757 129.684 99.1127 151.876 148.939C147.406 153.756 114.732 140.343 102.77 139.874C59.2492 138.17 39.8345 147.683 0 167.282C1.02967 165.483 2.01572 163.664 2.95746 161.831C32.2596 105.284 30.0287 70.1915 14.2509 18.8437Z"
            fill="currentColor"
          />
        </svg>
      </motion.div>
    </div>
  );
}
