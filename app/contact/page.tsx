'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Navbar } from '../components/navbar';
import { Transition } from '../components/transition';
import { Offcanvas, OffcanvasProvider } from '../components/offcanvas';
import { MagneticButton } from '../components/ui/magnetic-button';
import { MarqueeText } from '../components/marquee-text';
import { personalInfo, socialMedias } from '../data';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ExternalLink,
  ArrowUpRight,
} from 'lucide-react';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: '#3B82F6',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
    color: '#10B981',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: personalInfo.location,
    href: '#',
    color: '#F59E0B',
  },
];

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <Transition>
      <OffcanvasProvider>
        <Offcanvas />
        <Navbar />
        <main className="min-h-screen" ref={containerRef}>
          {/* Hero */}
          <section className="relative flex min-h-[70vh] items-end bg-foreground pb-20 pt-32 text-background">
            {/* Background decoration */}
            <motion.div
              className="absolute right-20 top-40 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
              style={{ y }}
            />

            <div className="container mx-auto px-8">
              <motion.div
                className="mb-4 text-sm uppercase tracking-widest text-secondary-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
              >
                Get in Touch
              </motion.div>

              <motion.h1
                className="mb-6 font-heading text-5xl font-bold md:text-7xl lg:text-8xl"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.33, 1, 0.68, 1],
                  delay: 2.2,
                }}
              >
                Let&apos;s Start a<br />
                <span className="text-primary">Project</span>
              </motion.h1>

              <motion.p
                className="max-w-xl text-lg text-secondary-foreground"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.33, 1, 0.68, 1],
                  delay: 2.4,
                }}
              >
                Have a project in mind or just want to say hi? I&apos;m always
                open to discussing new opportunities and collaborations.
              </motion.p>
            </div>
          </section>

          {/* Marquee */}
          <MarqueeText
            text="Say Hello"
            bgColor="bg-primary"
            textColor="text-background"
          />

          {/* Contact Methods */}
          <section className="py-20">
            <div className="container mx-auto px-8">
              <div className="grid gap-6 md:grid-cols-3">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.label}
                    href={method.href}
                    className="group relative overflow-hidden rounded-2xl border border-border bg-background p-8 transition-all hover:border-primary/50"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div
                      className="mb-6 inline-flex rounded-xl p-3"
                      style={{ backgroundColor: `${method.color}15` }}
                    >
                      <method.icon
                        className="h-6 w-6"
                        style={{ color: method.color }}
                      />
                    </div>
                    <p className="mb-2 text-sm text-muted-foreground">
                      {method.label}
                    </p>
                    <p className="text-lg font-medium">{method.value}</p>

                    <motion.div
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background opacity-0 transition-opacity group-hover:opacity-100"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </motion.div>
                  </motion.a>
                ))}
              </div>
            </div>
          </section>

          {/* Main Contact Section */}
          <section className="py-20">
            <div className="container mx-auto px-8">
              <div className="grid gap-16 lg:grid-cols-2">
                {/* Left - Big CTA */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="mb-8 font-heading text-4xl font-bold md:text-5xl">
                    Ready to bring your
                    <br />
                    <span className="text-primary">ideas to life?</span>
                  </h2>

                  <p className="mb-8 text-lg text-muted-foreground">
                    Whether you need a stunning website, a powerful mobile app,
                    or a scalable backend system, I&apos;m here to help turn
                    your vision into reality.
                  </p>

                  <Link href={`mailto:${personalInfo.email}`}>
                    <MagneticButton size="xl">
                      <Send className="mr-2 h-5 w-5" />
                      Send me an email
                    </MagneticButton>
                  </Link>

                  {/* Availability */}
                  <div className="mt-12 flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Available for new projects
                    </span>
                  </div>
                </motion.div>

                {/* Right - Social Links */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="mb-8 text-sm uppercase tracking-widest text-muted-foreground">
                    Find me on
                  </h3>

                  <div className="space-y-4">
                    {socialMedias.map((social, index) => (
                      <motion.a
                        key={social.title}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between border-b border-border py-4 transition-colors hover:border-primary"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <span className="text-2xl font-bold transition-transform group-hover:translate-x-2">
                          {social.title}
                        </span>
                        <ExternalLink className="h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-foreground py-20 text-background">
            <div className="container mx-auto px-8">
              <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                <div>
                  <h2 className="font-heading text-3xl font-bold md:text-4xl">
                    Nguyen Hoang Thong
                  </h2>
                  <p className="mt-2 text-secondary-foreground">
                    Junior Fullstack Developer
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  {socialMedias.map((social) => (
                    <a
                      key={social.title}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline-offset-4 transition-colors hover:text-primary hover:underline"
                    >
                      {social.title}
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-12 border-t border-secondary-foreground/20 pt-8 text-center text-sm text-secondary-foreground">
                <p>© {new Date().getFullYear()} Nguyen Hoang Thong. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </main>
      </OffcanvasProvider>
    </Transition>
  );
}
