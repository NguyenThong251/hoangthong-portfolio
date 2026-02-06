'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';
import { MagneticButton } from './ui/magnetic-button';

export function AboutPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="relative overflow-hidden py-32">
      <div className="container mx-auto px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image Side */}
          <motion.div
            className="relative"
            style={{ y: imageY }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/person2.jpg"
                alt="Profile"
                fill
                className="object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              className="absolute -bottom-8 -right-8 w-64 rounded-xl bg-background p-6 shadow-2xl md:w-72"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Quote className="mb-3 h-8 w-8 text-primary" />
              <p className="text-sm italic text-muted-foreground">
                &quot;Code is like humor. When you have to explain it, it&apos;s
                bad.&quot;
              </p>
              <p className="mt-3 text-xs font-medium">— Cory House</p>
            </motion.div>

            {/* Experience badge */}
            <motion.div
              className="absolute -left-4 top-8 rounded-full bg-primary px-4 py-2 text-sm font-bold text-background md:-left-8"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              2+ Years Exp
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <motion.div style={{ y: textY }}>
            <motion.p
              className="mb-4 text-sm uppercase tracking-widest text-primary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              About Me
            </motion.p>

            <motion.h2
              className="mb-6 font-heading text-4xl font-bold md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Crafting Digital
              <br />
              <span className="text-primary">Experiences</span>
            </motion.h2>

            <motion.div
              className="space-y-4 text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p>
                I&apos;m Nguyen Hoang Thong, a passionate fullstack developer
                based in Ho Chi Minh City, Vietnam. I specialize in building
                modern web applications and mobile apps that deliver exceptional
                user experiences.
              </p>
              <p>
                With expertise in React, Next.js, Node.js, and React Native, I
                transform ideas into beautiful, functional digital products.
              </p>
            </motion.div>

            {/* Skills preview */}
            <motion.div
              className="my-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'React Native'].map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-muted px-4 py-2 text-sm font-medium"
                  >
                    {skill}
                  </span>
                )
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/about">
                <MagneticButton size="lg">
                  More About Me
                  <ArrowRight className="ml-2 h-4 w-4" />
                </MagneticButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
