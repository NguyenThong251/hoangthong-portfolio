'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ParallaxReveal } from './parallax/reveal';
import { ParallaxFade } from './parallax/fade';
import { MagneticButton } from './ui/magnetic-button';

const phrase =
  'Helping businesses grow in the digital era. Together we will build amazing products. Clean code, cutting-edge technologies, and passion for development.';

export function Description() {
  return (
    <section className="container mx-auto px-8 py-32">
      <div className="relative flex flex-wrap items-end gap-12">
        <div className="basis-full lg:basis-8/12">
          <h2 className="text-3xl font-medium leading-tight md:text-5xl lg:text-6xl">
            <ParallaxReveal paragraph={phrase} />
          </h2>
        </div>

        <div className="basis-full lg:basis-3/12">
          <ParallaxFade>
            <p className="text-base text-muted-foreground lg:text-lg">
              The combination of my passion for coding, design & interaction
              positions me in a unique place in the web development world.
            </p>
          </ParallaxFade>
        </div>

        <motion.div
          className="absolute -right-4 top-1/2 lg:right-0 lg:top-full"
          whileInView={{ y: '-15%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/about">
            <MagneticButton variant="ghost" size="xl">
              About me
            </MagneticButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
