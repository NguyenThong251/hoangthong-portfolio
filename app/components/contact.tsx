'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { personalInfo, socialMedias } from '../data';
import { MagneticButton } from './ui/magnetic-button';

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <motion.footer
      ref={containerRef}
      className="relative bg-foreground py-24 text-background"
      style={{ y }}
    >
      <div className="container mx-auto px-8">
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <h5 className="text-sm uppercase text-secondary-foreground">
            Let&apos;s work together
          </h5>
          <Link href={`mailto:${personalInfo.email}`}>
            <MagneticButton variant="ghost" size="xl" className="border-background text-background">
              Get in touch
            </MagneticButton>
          </Link>
        </div>

        <div className="flex flex-col items-center justify-between gap-8 border-t border-secondary-foreground/30 pt-8 md:flex-row">
          <div>
            <p className="text-sm text-secondary-foreground">
              © {new Date().getFullYear()} {personalInfo.name}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-secondary-foreground">{personalInfo.location}</span>
          </div>

          <div className="flex gap-6">
            {socialMedias.map((social) => (
              <Link
                key={social.title}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-secondary-foreground transition-colors hover:text-background"
              >
                {social.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
