'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { MagneticButton } from './ui/magnetic-button';
import { personalInfo } from '../data';

export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-primary py-32"
    >
      {/* Floating shapes */}
      <motion.div
        className="absolute -left-20 top-20 h-40 w-40 rounded-full bg-background/10"
        style={{ y, rotate }}
      />
      <motion.div
        className="absolute -right-10 bottom-20 h-60 w-60 rounded-full bg-background/5"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
      />
      <motion.div
        className="absolute left-1/2 top-10 h-20 w-20 rounded-full bg-background/10"
        style={{ rotate }}
      />

      <div className="container relative z-10 mx-auto px-8">
        <motion.div
          className="mx-auto max-w-4xl text-center text-background"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="mb-6 font-heading text-5xl font-bold md:text-7xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Let&apos;s Build
            <br />
            Something Amazing
          </motion.h2>

          <motion.p
            className="mb-12 text-xl opacity-80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            I&apos;m currently available for freelance projects and full-time
            positions.
          </motion.p>

          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href={`mailto:${personalInfo.email}`}>
              <MagneticButton
                size="xl"
                variant="default"
                className="bg-background text-primary hover:bg-background/90"
              >
                <Mail className="mr-2 h-5 w-5" />
                Send Email
              </MagneticButton>
            </Link>
            <Link href="/contact">
              <MagneticButton
                size="xl"
                variant="ghost"
                className="border-background/50 text-background hover:bg-background/10"
              >
                Contact Page
                <ArrowRight className="ml-2 h-5 w-5" />
              </MagneticButton>
            </Link>
          </motion.div>

          <motion.div
            className="mt-16 flex flex-wrap items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 opacity-70">
              <Mail className="h-4 w-4" />
              <span className="text-sm">{personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-2 opacity-70">
              <Phone className="h-4 w-4" />
              <span className="text-sm">{personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2 opacity-70">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{personalInfo.location}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
