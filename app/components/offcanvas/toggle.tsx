'use client';

import { motion } from 'framer-motion';
import { useOffcanvas } from './context';

export function OffcanvasToggle() {
  const { isOpen, toggle } = useOffcanvas();

  return (
    <motion.button
      className="fixed right-6 top-4 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg md:right-8 lg:hidden"
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2.5 }}
    >
      <div className="relative flex h-5 w-6 flex-col items-center justify-center">
        <motion.span
          className="absolute h-0.5 w-6 bg-background"
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 0 : -4,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="absolute h-0.5 bg-background"
          animate={{
            width: isOpen ? 0 : 16,
            opacity: isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="absolute h-0.5 w-6 bg-background"
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? 0 : 4,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.button>
  );
}
