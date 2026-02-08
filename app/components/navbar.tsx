'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dot, Menu, Download } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
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
  const { setIsOpen, isOpen } = useOffcanvas();
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
          <Link href="/" className="group flex cursor-pointer items-center gap-2">
            <motion.div
              className="relative h-8 w-8 flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
            >
              <Image
                src="/images/logo-thong.svg"
                alt="Nguyen Hoang Thong Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            <span className="text-sm font-medium">Thong Nguyen</span>
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

          {/* Status indicator & CV Download - Desktop */}
          <div className="hidden items-center gap-4 lg:flex">
            <AnimatePresence>
              {!scrolled && (
                <>
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
                  
                  <motion.a
                    href="public/images/images/2026_AI%20Course_NguyenHoangThong.pdf"
                    download="NguyenHoangThong_CV.pdf"
                    className="flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-4 py-2 text-xs backdrop-blur-sm transition-all hover:bg-background/20"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download size={14} />
                    <span>Download CV</span>
                  </motion.a>
                </>
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
        {scrolled && !isOpen && (
          <motion.div
            className="fixed right-6 top-4 z-50 hidden lg:block md:right-8"
            variants={menuButtonVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <motion.button
              className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-foreground text-background shadow-lg overflow-hidden"
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Base background */}
              <div className="absolute inset-0 rounded-full bg-foreground" />
              
              {/* Background fill - smooth transition to blue */}
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-500"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.6 }}
                transition={{
                  duration: 0.3,
                  ease: [0.33, 1, 0.68, 1],
                }}
              />

              {/* Menu icon */}
              <div className="relative z-10 flex flex-col gap-1.5">
                <motion.span
                  className="block h-0.5 w-5 bg-background transition-colors"
                  whileHover={{ width: 20 }}
                />
                <motion.span
                  className="block h-0.5 w-4 bg-background transition-colors"
                  whileHover={{ width: 20 }}
                />
              </div>

              {/* Border ring */}
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
