'use client';

import { motion } from 'framer-motion';

interface MarqueeTextProps {
  text: string;
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
  bgColor?: string;
  textColor?: string;
}

export function MarqueeText({
  text,
  direction = 'left',
  speed = 20,
  className = '',
  bgColor = 'bg-primary',
  textColor = 'text-background',
}: MarqueeTextProps) {
  const xInitial = direction === 'left' ? 0 : -100;
  const xAnimate = direction === 'left' ? -100 : 0;

  return (
    <div className={`w-full overflow-hidden py-8 ${bgColor} ${className}`}>
      <div className="flex whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={`flex shrink-0 items-center gap-8 ${textColor}`}
            initial={{ x: `${xInitial}%` }}
            animate={{ x: `${xAnimate}%` }}
            transition={{
              duration: speed,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <span className="font-heading text-[12vw] font-bold uppercase leading-none md:text-[10vw]">
              {text}
            </span>
            <span className="text-4xl">✦</span>
            <span className="font-heading text-[12vw] font-bold uppercase leading-none md:text-[10vw]">
              {text}
            </span>
            <span className="text-4xl">✦</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
