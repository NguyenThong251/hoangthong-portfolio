'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function InteractiveEyes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const leftEyeX = centerX - 100;
      const rightEyeX = centerX + 100;

      const leftAngle = Math.atan2(e.clientY - centerY, e.clientX - leftEyeX);
      const rightAngle = Math.atan2(e.clientY - centerY, e.clientX - rightEyeX);

      setRotate({
        left: (leftAngle * 180) / Math.PI - 90,
        right: (rightAngle * 180) / Math.PI - 90,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex h-[50vh] items-center justify-center overflow-hidden bg-cover bg-center md:h-[70vh]"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920)',
      }}
    >
      <div className="absolute inset-0 bg-foreground/40" />
      <div className="relative flex gap-8 md:gap-16">
        {['left', 'right'].map((eye) => (
          <div
            key={eye}
            className="flex h-32 w-32 items-center justify-center rounded-full bg-background md:h-48 md:w-48"
          >
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-foreground md:h-36 md:w-36">
              <motion.div
                className="absolute h-8 w-8 rounded-full bg-background md:h-12 md:w-12"
                animate={{
                  rotate: eye === 'left' ? rotate.left : rotate.right,
                }}
                style={{ transformOrigin: 'center 150%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              />
            </div>
          </div>
        ))}
      </div>
      <motion.p
        className="absolute bottom-8 text-center text-lg text-background"
        animate={{ y: [0, 10, 0], opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Move your cursor around 👀
      </motion.p>
    </section>
  );
}
