import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

/**
 * TechSpotlight: A subtle, high-end interactive ambient spotlight
 * that smoothly follows the cursor on desktop devices, illuminating the dark
 * architectural grid with a restrained lime glow (< 5% opacity).
 * Automatically disabled on touch screens and when reduced motion is preferred.
 */
export const TechSpotlight: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isPointerFine, setIsPointerFine] = useState(false);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smooth spring physics for natural fluid tracking
  const springConfig = { damping: 28, stiffness: 140, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop mouse, trackpad)
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsPointerFine(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPointerFine(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isPointerFine || shouldReduceMotion) return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isPointerFine, isVisible, mouseX, mouseY, shouldReduceMotion]);

  if (!isPointerFine || shouldReduceMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <motion.div
        className="absolute w-[540px] h-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: smoothX,
          top: smoothY,
          background:
            'radial-gradient(circle, rgba(204, 255, 0, 0.038) 0%, rgba(204, 255, 0, 0.01) 40%, transparent 70%)',
          willChange: 'transform, left, top',
        }}
      />
    </motion.div>
  );
};
