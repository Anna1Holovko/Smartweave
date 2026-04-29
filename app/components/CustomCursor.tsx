'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

import { BRAND_MARK_PATH } from './BrandMarkIcon';

/** Inner follower size (px); offset centers hotspot near blob centroid */
const INNER_SIZE = 12;
const INNER_OFFSET = INNER_SIZE / 2;

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        !!(
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') ||
          target.closest('button') ||
          target.style?.cursor === 'pointer' ||
          (typeof window !== 'undefined' && window.getComputedStyle(target).cursor === 'pointer')
        )
      );
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen text-[#d8f17b]"
        style={{ width: INNER_SIZE, height: INNER_SIZE }}
        animate={{
          x: mousePosition.x - INNER_OFFSET,
          y: mousePosition.y - INNER_OFFSET,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
        aria-hidden
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="168"
          height="168"
          viewBox="0 0 168 168"
          fill="none"
          className="h-full w-full"
        >
          <path d={BRAND_MARK_PATH} fill="currentColor" />
        </svg>
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#d8f17b]/50 rounded-full pointer-events-none z-[9999] mix-blend-screen"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16, scale: isHovering ? 1.5 : 1 }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
        aria-hidden
      />
    </>
  );
}
