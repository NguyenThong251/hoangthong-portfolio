'use client';

import { motion } from 'framer-motion';
import {
  Code2,
  Database,
  Globe,
  Layers,
  Server,
  Smartphone,
  Terminal,
  Zap,
} from 'lucide-react';

const techCategories = [
  {
    title: 'Frontend',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    techs: ['React', 'Next.js', 'Vue', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    icon: Server,
    color: 'from-green-500 to-emerald-500',
    techs: ['Node.js', 'NestJS', 'Express', 'Laravel', 'PHP'],
  },
  {
    title: 'Mobile',
    icon: Smartphone,
    color: 'from-purple-500 to-pink-500',
    techs: ['React Native', 'Expo', 'Android', 'iOS'],
  },
  {
    title: 'Database',
    icon: Database,
    color: 'from-orange-500 to-red-500',
    techs: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
  },
  {
    title: 'DevOps',
    icon: Terminal,
    color: 'from-gray-600 to-gray-800',
    techs: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
  },
  {
    title: 'Others',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
    techs: ['Git', 'Kafka', 'GraphQL', 'REST APIs'],
  },
];

export function TechStack() {
  return (
    <section className="bg-muted py-20">
      <div className="container mx-auto px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 font-heading text-4xl font-bold md:text-6xl">
            Tech Stack
          </h2>
          <p className="text-lg text-muted-foreground">
            Technologies I work with every day
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {techCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="group relative overflow-hidden rounded-2xl bg-background p-6 shadow-lg transition-all hover:shadow-xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 transition-opacity group-hover:opacity-5`}
              />
              <div className="relative">
                <div
                  className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${category.color} p-3`}
                >
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-4 text-xl font-bold">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.techs.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 text-sm transition-colors hover:bg-foreground hover:text-background"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
