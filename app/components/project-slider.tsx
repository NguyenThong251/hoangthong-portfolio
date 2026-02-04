'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const projectImages = {
  first: [
    {
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
      alt: 'Dashboard Project',
    },
    {
      src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600',
      alt: 'Code Editor',
    },
    {
      src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600',
      alt: 'Laptop Coding',
    },
    {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
      alt: 'Analytics Dashboard',
    },
    {
      src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600',
      alt: 'MacBook Code',
    },
  ],
  second: [
    {
      src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600',
      alt: 'Mobile App',
    },
    {
      src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
      alt: 'Hotel Booking',
    },
    {
      src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600',
      alt: 'Design System',
    },
    {
      src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600',
      alt: 'Tech Setup',
    },
    {
      src: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600',
      alt: 'UX Design',
    },
  ],
};

function useProjectSlider(element: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ['start end', 'end start'],
  });

  const transformX1 = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const transformX2 = useTransform(scrollYProgress, [0, 1], [-350, 0]);
  const transformY = useTransform(scrollYProgress, [0, 0.9], [300, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return { transformX1, transformX2, transformY, opacity };
}

interface SliderItemProps {
  src: string;
  alt: string;
  index: number;
}

function SliderItem({ src, alt, index }: SliderItemProps) {
  return (
    <motion.div
      className="relative aspect-video min-w-[200px] flex-shrink-0 overflow-hidden rounded-xl md:min-w-[300px] lg:min-w-[400px]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 transition-opacity hover:opacity-100">
        <div className="absolute bottom-4 left-4 text-background">
          <p className="text-sm font-medium">{alt}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectSlider() {
  const containerRef = useRef<HTMLElement>(null);
  const { transformX1, transformX2, transformY, opacity } =
    useProjectSlider(containerRef);

  return (
    <section ref={containerRef} className="relative z-10 overflow-hidden py-20">
      <motion.div
        className="mb-16 px-8 text-center"
        style={{ opacity }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-4 font-heading text-4xl font-bold md:text-6xl">
          Recent Work
        </h2>
        <p className="text-lg text-muted-foreground">
          A glimpse into my latest projects
        </p>
      </motion.div>

      <div className="grid items-center gap-6">
        {/* First Row - Slides Left */}
        <motion.div
          className="flex gap-6 pl-8"
          style={{
            width: '200vw',
            x: transformX1,
          }}
        >
          {projectImages.first.map((img, index) => (
            <SliderItem key={img.src} {...img} index={index} />
          ))}
          {/* Repeat for seamless look */}
          {projectImages.first.map((img, index) => (
            <SliderItem
              key={`repeat-${img.src}`}
              {...img}
              index={index + projectImages.first.length}
            />
          ))}
        </motion.div>

        {/* Second Row - Slides Right */}
        <motion.div
          className="flex gap-6 pl-8"
          style={{
            width: '200vw',
            x: transformX2,
          }}
        >
          {projectImages.second.map((img, index) => (
            <SliderItem key={img.src} {...img} index={index} />
          ))}
          {/* Repeat for seamless look */}
          {projectImages.second.map((img, index) => (
            <SliderItem
              key={`repeat-${img.src}`}
              {...img}
              index={index + projectImages.second.length}
            />
          ))}
        </motion.div>
      </div>

      {/* Curved bottom effect */}
      <motion.div
        className="mx-auto mt-10 w-full max-w-[120vw] bg-background"
        style={{
          height: transformY,
          borderRadius: '0 0 50% 50%',
        }}
      />
    </section>
  );
}
