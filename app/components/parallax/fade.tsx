'use client';

import { motion, type ReactNode } from 'framer-motion';

const fade = {
  initial: { opacity: 0, y: 20 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
};

interface ParallaxFadeProps {
  children: React.ReactNode;
}

export function ParallaxFade({ children }: ParallaxFadeProps) {
  return (
    <motion.div
      variants={fade}
      initial="initial"
      whileInView="open"
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
