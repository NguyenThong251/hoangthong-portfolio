'use client';

import { useRef, useState, useCallback, type ReactNode, type ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function MagneticButton({
  children,
  className,
  variant = 'default',
  size = 'md',
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-12 py-6 text-xl rounded-full',
  };

  const variantClasses = {
    default: 'bg-foreground text-background',
    ghost: 'bg-transparent border border-foreground',
    outline: 'bg-background border border-foreground text-foreground',
  };

  return (
    <motion.button
      ref={ref}
      className={cn(
        'relative inline-flex items-center justify-center rounded-full font-medium transition-colors',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', damping: 15, stiffness: 150, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      {...props}
    >
      <motion.span
        className="inline-flex flex-row items-center"
        animate={{ x: position.x * 0.3, y: position.y * 0.3 }}
        transition={{ type: 'spring', damping: 15, stiffness: 150, mass: 0.1 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
