'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

const timelineItems = [
  {
    year: '2025',
    title: 'Full Stack Developer',
    company: 'Quoc Duy',
    description:
      'Developing ERP, accounting, and time attendance systems using React, Node.js, React Native, and PHP (Vtiger).',
    type: 'work',
  },
  {
    year: '2024',
    title: 'Full Stack Developer',
    company: 'Tiim Group',
    description:
      'Built NestJS Microservices for Booking, Payments, Partners, Notifications and Search.',
    type: 'work',
  },
  {
    year: '2024',
    title: 'Software Engineer Intern',
    company: 'Softworld Technology',
    description:
      'Developed web applications using Next.js, React, and Laravel.',
    type: 'work',
  },
  {
    year: '2023',
    title: 'Programming Instructor',
    company: 'MindX Technology',
    description:
      'Teaching Python, JavaScript and Web Development to students aged 6-18.',
    type: 'work',
  },
  {
    year: '2022',
    title: 'Started University',
    company: 'University of Transport HCMC',
    description: 'Majoring in Information Technology.',
    type: 'education',
  },
];

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={containerRef} className="relative py-20">
      <div className="container mx-auto px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 font-heading text-4xl font-bold md:text-6xl">
            My Journey
          </h2>
          <p className="text-lg text-muted-foreground">
            From student to fullstack developer
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-3xl">
          {/* Animated Line */}
          <div className="absolute left-8 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2">
            <motion.div
              className="w-full bg-primary"
              style={{ height: lineHeight }}
            />
          </div>

          {timelineItems.map((item, index) => (
            <motion.div
              key={`${item.year}-${item.company}`}
              className={`relative mb-12 flex items-start gap-8 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Dot */}
              <div className="absolute left-8 z-10 flex h-4 w-4 items-center justify-center md:left-1/2 md:-translate-x-1/2">
                <motion.div
                  className="h-4 w-4 rounded-full bg-primary"
                  whileInView={{ scale: [0, 1.5, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                />
              </div>

              {/* Content */}
              <div
                className={`ml-16 w-full md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:text-right' : ''
                }`}
              >
                <motion.div
                  className="rounded-xl bg-muted p-6 transition-all hover:bg-muted/80"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="mb-2 flex items-center gap-2">
                    {item.type === 'work' ? (
                      <Briefcase className="h-4 w-4 text-primary" />
                    ) : item.type === 'education' ? (
                      <GraduationCap className="h-4 w-4 text-primary" />
                    ) : (
                      <Award className="h-4 w-4 text-primary" />
                    )}
                    <span className="text-sm font-medium text-primary">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mb-2 text-sm text-muted-foreground">
                    {item.company}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
