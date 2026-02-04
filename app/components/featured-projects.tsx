'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { MagneticButton } from './ui/magnetic-button';

const projects = [
  {
    id: 1,
    title: 'QuocDuy ERP',
    category: 'Enterprise Solution',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    color: '#1a1a2e',
  },
  {
    id: 2,
    title: 'TiimHotel',
    category: 'Booking Platform',
    tags: ['NestJS', 'Microservices', 'Kafka'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    color: '#16213e',
  },
  {
    id: 3,
    title: 'Mobile ERP',
    category: 'React Native App',
    tags: ['React Native', 'Expo', 'Redux'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    color: '#0f3460',
  },
  {
    id: 4,
    title: 'Galaxy Chess',
    category: 'WordPress Site',
    tags: ['WordPress', 'PHP', 'MySQL'],
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800',
    color: '#533483',
  },
];

export function FeaturedProjects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20">
      <div className="container mx-auto px-8">
        <motion.div
          className="mb-16 flex items-end justify-between"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="mb-4 font-heading text-4xl font-bold md:text-6xl">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground">
              Selected works from my portfolio
            </p>
          </div>
          <Link href="/work" className="hidden md:block">
            <MagneticButton variant="outline" size="lg">
              View all work
            </MagneticButton>
          </Link>
        </motion.div>

        <div
          ref={containerRef}
          className="grid gap-6 md:grid-cols-2"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ backgroundColor: project.color }}
            >
              <motion.div
                className="absolute inset-0"
                animate={{
                  scale: hoveredId === project.id ? 1.1 : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-80 transition-opacity group-hover:opacity-60"
                />
              </motion.div>

              <div className="absolute inset-0 flex flex-col justify-between p-6 text-background">
                <div className="flex items-start justify-between">
                  <div className="flex gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-background/20 px-3 py-1 text-xs backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <motion.div
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{
                      scale: hoveredId === project.id ? 1 : 0,
                      rotate: hoveredId === project.id ? 0 : -45,
                    }}
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </motion.div>
                </div>

                <div>
                  <p className="mb-2 text-sm opacity-80">{project.category}</p>
                  <h3 className="font-heading text-3xl font-bold md:text-4xl">
                    {project.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/work">
            <MagneticButton variant="outline" size="lg">
              View all work
            </MagneticButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
