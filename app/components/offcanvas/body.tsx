'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useOffcanvas } from './context';
import { navItems, socialMedias } from '../../data';
import { ArrowUpRight } from 'lucide-react';

const menuVariants = {
  initial: {
    x: '100%',
  },
  enter: {
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const linkVariants = {
  initial: { x: 80, opacity: 0 },
  enter: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.05 * i,
    },
  }),
  exit: (i: number) => ({
    x: 80,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.02 * i,
    },
  }),
};

const overlayVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export function OffcanvasBody() {
  const { setIsOpen } = useOffcanvas();

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-40 bg-foreground/80 backdrop-blur-sm"
        variants={overlayVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        onClick={() => setIsOpen(false)}
      />

      {/* Menu Panel */}
      <motion.div
        className="fixed bottom-0 right-0 top-0 z-50 flex w-full flex-col bg-foreground text-background sm:w-[450px]"
        variants={menuVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {/* Close button */}
        <div className="flex justify-end p-6">
          <motion.button
            className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary-foreground/30"
            onClick={() => setIsOpen(false)}
            whileHover={{ scale: 1.1, borderColor: 'white' }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative h-4 w-4">
              <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-background" />
              <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-background" />
            </div>
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-10 py-8">
          <p className="mb-8 text-xs uppercase tracking-widest text-secondary-foreground">
            Navigation
          </p>
          <ul className="space-y-2">
            {navItems.map(({ href, title }, i) => (
              <motion.li
                key={href}
                custom={i}
                variants={linkVariants}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <Link
                  href={href}
                  className="group flex items-center justify-between border-b border-secondary-foreground/20 py-4 transition-colors hover:border-background"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="font-heading text-4xl font-bold capitalize transition-transform group-hover:translate-x-2 md:text-5xl">
                    {title}
                  </span>
                  <ArrowUpRight className="h-6 w-6 opacity-0 transition-all group-hover:opacity-100" />
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-secondary-foreground/20 p-10">
          <p className="mb-4 text-xs uppercase tracking-widest text-secondary-foreground">
            Socials
          </p>
          <div className="flex flex-wrap gap-4">
            {socialMedias.map(({ href, title }, i) => (
              <motion.a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline-offset-4 transition-colors hover:text-primary hover:underline"
                custom={i + navItems.length}
                variants={linkVariants}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                {title}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
