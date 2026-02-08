'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Code2,
  Palette,
  Smartphone,
  Globe,
  Zap,
  Shield,
  ArrowUpRight,
} from 'lucide-react';
import { MagneticButton } from './ui/magnetic-button';
import Link from 'next/link';

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description:
      'Building fast, modern websites with Next.js, React, and cutting-edge technologies.',
    tags: ['Next.js', 'React', 'TypeScript', 'Nuxt', 'Vue', 'Ruby', 'Python', 'Laravel', 'PHP', 'JavaScript'],
    color: '#3B82F6',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description:
      'Cross-platform mobile applications with React Native and Expo.',
    tags: ['React Native', 'Expo', 'iOS', 'Android'],
    color: '#8B5CF6',
  },
  {
    icon: Code2,
    title: 'Backend Systems',
    description:
      'Scalable APIs and microservices with NestJS, Node.js, and cloud infrastructure.',
    tags: ['NestJS', 'Node.js', 'PostgreSQL', 'GraphQL', 'REST APIs'],
    color: '#10B981',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'Beautiful, intuitive interfaces that delight users and drive engagement.',
    tags: ['Figma', 'Design Systems', 'Prototyping', 'Photoshop', 'Illustrator'],
    color: '#F59E0B',
  },
  {
    icon: Zap,
    title: 'Performance',
    description:
      'Optimizing applications for speed, accessibility, and SEO excellence.',
    tags: ['Core Web Vitals', 'SEO', 'Analytics'],
    color: '#EF4444',
  },
  {
    icon: Shield,
    title: 'DevOps & Security',
    description:
      'Secure deployment pipelines, CI/CD, and cloud infrastructure management.',
    tags: ['Docker', 'AWS', 'CI/CD', 'Kubernetes','Bitbucket'],
    color: '#6366F1',
  },
];

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="relative overflow-hidden py-32">
      {/* Background decoration */}
      <motion.div
        className="absolute -right-40 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl"
        style={{ y }}
      />
      <motion.div
        className="absolute -left-40 bottom-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
      />

      <div className="container relative z-10 mx-auto px-8">
        {/* Header */}
        <div className="mb-20 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-4 text-sm uppercase tracking-widest text-muted-foreground">
              What I Do
            </p>
            <h2 className="font-heading text-4xl font-bold md:text-6xl lg:text-7xl">
              Services &<br />
              <span className="text-primary">Expertise</span>
            </h2>
          </motion.div>

          <motion.p
            className="max-w-md text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            From concept to deployment, I offer end-to-end development services
            to bring your digital vision to life.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background p-8 transition-all hover:border-primary/50"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Icon */}
              <div
                className="mb-6 inline-flex rounded-xl p-3"
                style={{ backgroundColor: `${service.color}15` }}
              >
                <service.icon
                  className="h-6 w-6"
                  style={{ color: service.color }}
                />
              </div>

              {/* Content */}
              <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
              <p className="mb-6 text-muted-foreground">{service.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted px-3 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Hover arrow */}
              <motion.div
                className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background"
                initial={{ scale: 0, rotate: -45 }}
                whileHover={{ scale: 1, rotate: 0 }}
              >
                <ArrowUpRight className="h-5 w-5" />
              </motion.div>

              {/* Background glow on hover */}
              <div
                className="absolute inset-0 -z-10 opacity-0 blur-3xl transition-opacity group-hover:opacity-10"
                style={{ backgroundColor: service.color }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-6 text-lg text-muted-foreground">
            Have a project in mind?
          </p>
          <Link href="/contact">
            <MagneticButton size="xl">
              Let&apos;s Work Together
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </MagneticButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
