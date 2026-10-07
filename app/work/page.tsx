'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '../components/navbar';
import { Contact } from '../components/contact';
import { Transition } from '../components/transition';
import { Offcanvas, OffcanvasProvider } from '../components/offcanvas';
import { MagneticButton } from '../components/ui/magnetic-button';
import { MarqueeText } from '../components/marquee-text';
import { thumbnailProjects } from '../data';
import { ArrowUpRight, Github } from 'lucide-react';

const allProjects = [
  ...thumbnailProjects.map((p) => ({ ...p, description: '' })),
  {
    title: 'RescueOS Platform',
    category: 'Microservices',
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    color: '#2D3436',
    description: 'Emergency response coordination system with real-time tracking and dispatching.',
    tags: ['NestJS', 'Kafka', 'React Native'],
  },
  {
    title: 'Portfolio Website',
    category: 'Next.js',
    src: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
    color: '#636E72',
    description: 'Modern portfolio with Framer Motion animations and smooth transitions.',
    tags: ['Next.js', 'Framer Motion', 'Tailwind'],
  },
  {
    title: 'E-Learning Platform',
    category: 'Education Tech',
    src: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
    color: '#0984e3',
    description: 'Interactive learning platform for programming courses.',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
];

const scaleUp = {
  initial: { scale: 0, x: '-50%', y: '-50%' },
  enter: {
    scale: 1,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

export default function WorkPage() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const [filter, setFilter] = useState('all');
  const modalRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const moveItems = (x: number, y: number) => {
    if (modalRef.current) {
      modalRef.current.style.left = `${x}px`;
      modalRef.current.style.top = `${y}px`;
    }
    if (cursorRef.current) {
      cursorRef.current.style.left = `${x}px`;
      cursorRef.current.style.top = `${y}px`;
    }
  };

  const categories = ['all', 'Enterprise', 'Web Application', 'React Native', 'WordPress', 'Microservices', 'Next.js', 'Education Tech'];

  const filteredProjects = filter === 'all'
    ? allProjects
    : allProjects.filter((p) => p.category.toLowerCase().includes(filter.toLowerCase()));

  return (
    <Transition>
      <OffcanvasProvider>
        <Offcanvas />
        <Navbar />
        <main
          className="min-h-screen"
          onMouseMove={(e) => moveItems(e.clientX, e.clientY)}
        >
          {/* Hero */}
          <section className="bg-foreground pb-12 pt-32 text-background">
            <div className="container mx-auto px-8">
              <motion.div
                className="mb-4 text-sm uppercase tracking-widest text-secondary-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
              >
                My Work
              </motion.div>

              <motion.h1
                className="mb-6 font-heading text-5xl font-bold md:text-7xl lg:text-8xl"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 2.2 }}
              >
                Selected<br />
                <span className="text-primary">Projects</span>
              </motion.h1>

              <motion.p
                className="max-w-xl text-lg text-secondary-foreground"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 2.4 }}
              >
                A collection of projects I&apos;ve worked on, ranging from enterprise
                applications to personal experiments. Each project showcases different
                skills and technologies.
              </motion.p>
            </div>
          </section>

          {/* Marquee */}
          <MarqueeText
            text="View My Work"
            bgColor="bg-primary"
            textColor="text-background"
          />

          {/* Filter */}
          <section className="border-b border-border py-6">
            <div className="container mx-auto px-8">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`rounded-full px-4 py-2 text-sm transition-all ${
                      filter === cat
                        ? 'bg-foreground text-background'
                        : 'bg-muted hover:bg-foreground hover:text-background'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Projects List */}
          <section className="py-12">
            <div className="container mx-auto px-8">
              <div className="flex flex-col">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    className="group flex cursor-pointer flex-col gap-4 border-b border-border py-12 transition-all hover:px-4 md:flex-row md:items-center md:justify-between"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    onMouseEnter={() => setModal({ active: true, index })}
                    onMouseLeave={() => setModal({ active: false, index })}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">
                          0{index + 1}
                        </span>
                        <h4 className="font-heading text-3xl font-bold transition-all group-hover:-translate-x-2 md:text-5xl">
                          {project.title}
                        </h4>
                      </div>
                      {project.description && (
                        <p className="max-w-md text-sm text-muted-foreground md:ml-10">
                          {project.description}
                        </p>
                      )}
                      {'tags' in project && project.tags && (
                        <div className="flex flex-wrap gap-2 md:ml-10">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-muted px-3 py-1 text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground transition-all group-hover:translate-x-2">
                        {project.category}
                      </span>
                      <motion.div
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        animate={{ scale: modal.active && modal.index === index ? 1 : 0 }}
                      >
                        <ArrowUpRight className="h-5 w-5" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Modal */}
          <motion.div
            ref={modalRef}
            className="pointer-events-none fixed z-30 h-80 w-96 overflow-hidden rounded-xl"
            variants={scaleUp}
            initial="initial"
            animate={modal.active ? 'enter' : 'closed'}
          >
            <div
              className="h-full w-full transition-all duration-500"
              style={{ transform: `translateY(${modal.index * -100}%)` }}
            >
              {filteredProjects.map((project) => (
                <div
                  key={project.title}
                  className="relative flex h-full w-full items-center justify-center"
                  style={{ backgroundColor: project.color }}
                >
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            ref={cursorRef}
            className="pointer-events-none fixed z-30 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-sm font-medium text-background"
            variants={scaleUp}
            initial="initial"
            animate={modal.active ? 'enter' : 'closed'}
          >
            View
          </motion.div>

          {/* CTA */}
          <section className="bg-foreground py-20 text-background">
            <div className="container mx-auto px-8 text-center">
              <motion.h2
                className="mb-6 font-heading text-4xl font-bold md:text-6xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Have a Project in Mind?
              </motion.h2>
              <motion.p
                className="mb-8 text-secondary-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Let&apos;s work together to bring your ideas to life.
              </motion.p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <MagneticButton size="xl" variant="ghost" className="border-background text-background">
                    Start a Project
                  </MagneticButton>
                </Link>
                <Link href="https://github.com/NguyenThong251" target="_blank">
                  <MagneticButton size="xl" variant="ghost" className="border-secondary-foreground/50 text-secondary-foreground">
                    <Github className="mr-2 h-5 w-5" />
                    View GitHub
                  </MagneticButton>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Contact />
      </OffcanvasProvider>
    </Transition>
  );
}
