'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '../components/navbar';
import { Contact } from '../components/contact';
import { Transition } from '../components/transition';
import { Offcanvas, OffcanvasProvider } from '../components/offcanvas';
import { MagneticButton } from '../components/ui/magnetic-button';
import { TechStack } from '../components/tech-stack';
import { Timeline } from '../components/timeline';
import { AnimatedCounter } from '../components/animated-counter';
import { MarqueeText } from '../components/marquee-text';
import { personalInfo } from '../data';
import { Download, ExternalLink } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  enter: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.05 * i + 2.2 },
  }),
};

const stats = [
  { value: 10, suffix: '+', label: 'Projects' },
  { value: 2, suffix: '+', label: 'Years Exp' },
  { value: 500, suffix: '+', label: 'Students Taught' },
  { value: 100, suffix: '%', label: 'Passion' },
];

export default function AboutPage() {
  return (
    <Transition>
      <OffcanvasProvider>
        <Offcanvas />
        <Navbar />
        <main className="min-h-screen">
          {/* Hero Section */}
          <section className="relative flex min-h-[80vh] items-end bg-foreground pb-20 pt-32 text-background">
            <div className="container mx-auto px-8">
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                {/* Left - Text */}
                <div>
                  <motion.div
                    className="mb-4 text-sm uppercase tracking-widest text-secondary-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2 }}
                  >
                    About Me
                  </motion.div>

                  <motion.h1
                    className="mb-8 font-heading text-5xl font-bold md:text-7xl"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 2.2 }}
                  >
                    Hello,<br />
                    I&apos;m <span className="text-primary">Thong</span>
                  </motion.h1>

                  <motion.p
                    className="mb-8 text-lg text-secondary-foreground"
                    variants={fadeInUp}
                    custom={2}
                    initial="initial"
                    animate="enter"
                  >
                    A passionate fullstack developer from Ho Chi Minh City, Vietnam.
                    I specialize in building modern web applications and mobile apps
                    with React, Next.js, Node.js, and React Native.
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap gap-4"
                    variants={fadeInUp}
                    custom={3}
                    initial="initial"
                    animate="enter"
                  >
                    <Link href="/NguyenHoangThong_CV_EN_NewDown.pdf" target="_blank">
                      <MagneticButton variant="default" size="lg">
                        <Download className="mr-2 h-4 w-4" />
                        Download CV
                      </MagneticButton>
                    </Link>
                    <Link href={personalInfo.github} target="_blank">
                      <MagneticButton variant="ghost" size="lg" className="border-secondary-foreground/50 text-background">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        GitHub
                      </MagneticButton>
                    </Link>
                  </motion.div>
                </div>

                {/* Right - Image */}
                <motion.div
                  className="relative aspect-[4/5] overflow-hidden rounded-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.4, duration: 0.8 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-foreground/50" />
                  <Image
                    src="/images/person2.jpg"
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="rounded-xl bg-background/10 p-4 backdrop-blur-md">
                      <p className="text-sm">
                        &quot;The combination of my passion for coding, design & interaction
                        positions me in a unique place in the web development world.&quot;
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Marquee */}
          <MarqueeText
            text="Passionate Developer"
            bgColor="bg-primary"
            textColor="text-background"
          />

          {/* Stats */}
          <AnimatedCounter stats={stats} />

          {/* Tech Stack */}
          <TechStack />

          {/* Timeline/Journey */}
          <section className="bg-muted py-20">
            <Timeline />
          </section>

          {/* Philosophy */}
          <section className="py-20">
            <div className="container mx-auto px-8">
              <div className="mx-auto max-w-4xl">
                <motion.h2
                  className="mb-12 text-center font-heading text-4xl font-bold md:text-6xl"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  My Philosophy
                </motion.h2>

                <div className="grid gap-8 md:grid-cols-3">
                  {[
                    {
                      title: 'Clean Code',
                      description: 'Writing maintainable, readable code that stands the test of time.',
                      emoji: '✨',
                    },
                    {
                      title: 'User First',
                      description: 'Building experiences that delight users and solve real problems.',
                      emoji: '❤️',
                    },
                    {
                      title: 'Never Stop Learning',
                      description: 'Staying curious and always exploring new technologies.',
                      emoji: '🚀',
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      className="rounded-2xl bg-muted p-6 text-center"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="mb-4 text-4xl">{item.emoji}</div>
                      <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-foreground py-20 text-background">
            <div className="container mx-auto px-8 text-center">
              <motion.h2
                className="mb-6 font-heading text-4xl font-bold md:text-6xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Let&apos;s Connect
              </motion.h2>
              <motion.p
                className="mb-8 text-secondary-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                I&apos;m always open to discussing new projects or opportunities.
              </motion.p>
              <Link href="/contact">
                <MagneticButton size="xl" variant="ghost" className="border-background text-background">
                  Get in Touch
                </MagneticButton>
              </Link>
            </div>
          </section>
        </main>
        <Contact />
      </OffcanvasProvider>
    </Transition>
  );
}
