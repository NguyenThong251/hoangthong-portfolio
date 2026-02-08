'use client';

import { motion } from 'framer-motion';
import { ArrowDownRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { ParallaxSlider } from './parallax/slider';
import { personalInfo } from '../data';

const slideUp = {
  initial: { y: 100, opacity: 0 },
  enter: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 2.2 },
  },
};

const staggerChildren = {
  initial: {},
  enter: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 2.4,
    },
  },
};

const fadeInUp = {
  initial: { y: 30, opacity: 0 },
  enter: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
};

export function Header() {
  return (
    <motion.header
      className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-foreground text-background"
      variants={slideUp}
      initial="initial"
      animate="enter"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/thong.jpg"
          alt="Nguyen Hoang Thong"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/5 via-foreground/5 to-foreground" />
      </div>
     
      {/* Animated background shapes */}
      <motion.div
        className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Main content */}
      <div className="relative flex flex-col gap-4 md:flex-col-reverse md:justify-normal">
        {/* Big scrolling name */}
        <div className="select-none">
          <h1 className="font-heading text-[max(5rem,10vw)] font-bold leading-none tracking-tight">
            <ParallaxSlider repeat={4} baseVelocity={2}>
              <span className="pr-8 md:pr-12">
                {personalInfo.name}
                <span className="mx-4 text-primary">•</span>
              </span>
            </ParallaxSlider>
          </h1>
        </div>

        {/* Info section */}
        <motion.div
          className="md:ml-auto"
          variants={staggerChildren}
          initial="initial"
          animate="enter"
        >
          <div className="mx-8 my-8 md:mx-24 md:my-16">
            <motion.div className="mb-4 md:mb-16" variants={fadeInUp}>
              <ArrowDownRight size={28} strokeWidth={1.25} />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <p className="mb-2 text-sm uppercase tracking-widest text-secondary-foreground">
                Based in Ho Chi Minh City
              </p>
            </motion.div>

            <motion.h2
              className="font-heading text-3xl font-bold md:text-5xl lg:text-6xl"
              variants={fadeInUp}
            >
              <span className="block">Junior</span>
              <span className="block text-primary">Fullstack</span>
              <span className="block">Developer</span>
            </motion.h2>

            <motion.p
              className="mt-6 max-w-md text-secondary-foreground"
              variants={fadeInUp}
            >
              Crafting digital experiences with modern technologies. Passionate
              about clean code and beautiful interfaces.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2 text-secondary-foreground">
          <span className="text-xs uppercase tracking-widest">Scroll Down</span>
          <ChevronDown className="h-5 w-5" />
        </div>
      </motion.div>
    </motion.header>
  );
}
