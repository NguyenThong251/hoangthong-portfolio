'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copyright, Dot, Menu } from 'lucide-react';
import Link from 'next/link';
import { useOffcanvas } from './offcanvas';
import { MagneticButton } from './ui/magnetic-button';
import { navItems } from '../data';

const navVariants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
  },
  hidden: {
    y: -100,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
  },
};

const menuButtonVariants = {
  initial: { scale: 0, opacity: 0 },
  enter: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export function Navbar() {
  const { setIsOpen } = useOffcanvas();
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      // Show menu button after scrolling 100px
      setScrolled(currentScrollY > 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        className="fixed inset-x-0 top-0 z-40"
        variants={navVariants}
        animate={hidden ? 'hidden' : 'visible'}
      >
        <div className="flex items-center justify-between px-6 py-4 text-background mix-blend-difference md:px-8">
          {/* Brand */}
          <Link href="/" className="group flex cursor-pointer items-center">
            <motion.div
              className="transition-transform duration-500"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5, ease: [0.1, 0, 0.3, 1] }}
            >
              <Copyright size={20} />
            </motion.div>

            <div className="relative ml-2 flex overflow-hidden whitespace-nowrap">
              <span className="transition-transform duration-500 group-hover:-translate-x-full">
                Code by
              </span>
              <span className="pl-1 transition-transform duration-500 group-hover:-translate-x-14">
                Thong
              </span>
              <span className="absolute left-20 pl-1 transition-transform duration-500 group-hover:-translate-x-14">
                Nguyen
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links - Only show when not scrolled */}
          <AnimatePresence>
            {!scrolled && (
              <motion.ul
                className="hidden items-center gap-1 lg:flex"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {navItems.map(({ href, title }) => (
                  <li key={href} className="group">
                    <Link href={href}>
                      <MagneticButton
                        variant="default"
                        size="sm"
                        className="relative px-4 py-2"
                      >
                        <span className="text-sm capitalize">{title}</span>
                        <Dot className="absolute -bottom-1 left-1/2 -translate-x-1/2 scale-0 transition-transform duration-200 group-hover:scale-100" />
                      </MagneticButton>
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* Status indicator - Desktop */}
          <div className="hidden items-center gap-2 lg:flex">
            <AnimatePresence>
              {!scrolled && (
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  <span className="text-xs">Available</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button - Always visible on mobile */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 backdrop-blur-sm lg:hidden"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.nav>

      {/* Floating Menu Button - Desktop (shows after scroll) */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            className="fixed right-6 top-4 z-50 hidden lg:block md:right-8"
            variants={menuButtonVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <motion.button
              className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg"
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex flex-col gap-1.5">
                <motion.span
                  className="block h-0.5 w-5 bg-background"
                  whileHover={{ width: 20 }}
                />
                <motion.span
                  className="block h-0.5 w-4 bg-background"
                  whileHover={{ width: 20 }}
                />
              </div>

              {/* Hover ring effect */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-foreground/30"
                initial={{ scale: 1, opacity: 0 }}
                whileHover={{ scale: 1.2, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
