'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { thumbnailProjects } from '../data';
import { MagneticButton } from './ui/magnetic-button';

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

export function Thumbnail() {
  const [modal, setModal] = useState({ active: false, index: 0 });
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

  return (
    <section
      className="container mx-auto px-8 py-20"
      onMouseMove={(e) => moveItems(e.clientX, e.clientY)}
    >
      <div className="my-8 flex flex-col gap-10">
        <h3 className="text-sm uppercase text-muted-foreground">Recent Work</h3>

        <div className="flex flex-col">
          {thumbnailProjects.map((project, index) => (
            <div
              key={project.title}
              className="group flex cursor-pointer items-center justify-between border-t border-border py-12 transition-all hover:px-8 hover:opacity-50"
              onMouseEnter={() => setModal({ active: true, index })}
              onMouseLeave={() => setModal({ active: false, index })}
            >
              <h4 className="text-4xl font-medium transition-all group-hover:-translate-x-2 md:text-6xl">
                {project.title}
              </h4>
              <p className="text-muted-foreground transition-all group-hover:translate-x-2">
                {project.category}
              </p>
            </div>
          ))}
        </div>

        <motion.div
          ref={modalRef}
          className="pointer-events-none fixed z-30 h-80 w-96 overflow-hidden"
          variants={scaleUp}
          initial="initial"
          animate={modal.active ? 'enter' : 'closed'}
        >
          <div
            className="h-full w-full transition-all duration-500"
            style={{ top: `${modal.index * -100}%` }}
          >
            {thumbnailProjects.map((project) => (
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

        <div className="mt-8 flex justify-center">
          <Link href="/work">
            <MagneticButton variant="outline" size="lg">
              More work
            </MagneticButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
