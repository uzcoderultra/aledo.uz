import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Find closest interactive element with data-cursor attribute
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorEl = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorEl) {
        setIsHovered(true);
        setCursorText(cursorEl.getAttribute('data-cursor') || '');
      } else {
        const isClickable = target.closest('button, a, input, select, textarea, [role="button"]');
        setIsHovered(!!isClickable);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Primary Small Pointer Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#E8C45A] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
          scale: isHovered ? 0.5 : 1
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.1 }}
      />

      {/* Larger Interactive Ring or Text Label */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#E8C45A]/50 pointer-events-none z-[9998] flex items-center justify-center text-[10px] font-mono tracking-widest text-[#0A0A0A] bg-[#E8C45A] uppercase font-bold"
        animate={{
          x: mousePos.x - (cursorText ? 44 : isHovered ? 24 : 16),
          y: mousePos.y - (cursorText ? 44 : isHovered ? 24 : 16),
          width: cursorText ? 88 : isHovered ? 48 : 32,
          height: cursorText ? 88 : isHovered ? 48 : 32,
          opacity: isHovered || cursorText ? 1 : 0.35,
          backgroundColor: cursorText ? '#E8C45A' : 'transparent',
          color: cursorText ? '#0A0A0A' : '#E8C45A'
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
      >
        {cursorText && (
          <span className="text-center px-1 leading-tight font-semibold">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
};
