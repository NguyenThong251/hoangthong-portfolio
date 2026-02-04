'use client';

import { motion } from 'framer-motion';

const reveal = {
  initial: { y: '100%' },
  open: (i: number) => ({
    y: '0%',
    transition: { duration: 0.5, delay: 0.02 * i, ease: [0.76, 0, 0.24, 1] },
  }),
};

interface ParallaxRevealProps {
  paragraph: string;
}

export function ParallaxReveal({ paragraph }: ParallaxRevealProps) {
  const words = paragraph.split(' ');

  return (
    <>
      {words.map((word, index) => (
        <span key={index} className="mr-2 inline-flex overflow-hidden md:mr-3">
          <motion.span
            custom={index}
            variants={reveal}
            initial="initial"
            whileInView="open"
            viewport={{ once: true }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  );
}
