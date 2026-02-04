'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Quoc Duy Company',
    role: 'ERP Project',
    rating: 5,
    text: 'Excellent work on our ERP system. The solution was delivered on time with great attention to detail.',
    avatar: '🏢',
  },
  {
    name: 'Tiim Group',
    role: 'Microservices',
    rating: 5,
    text: 'Outstanding microservices architecture for our booking platform. Highly scalable and well-documented.',
    avatar: '🏨',
  },
  {
    name: 'MindX Students',
    role: 'Programming Course',
    rating: 5,
    text: 'Best instructor! Made complex concepts easy to understand. Really passionate about teaching.',
    avatar: '🎓',
  },
];

export function ReviewCards() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 font-heading text-4xl font-bold md:text-6xl">
            What People Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Feedback from colleagues and clients
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              className="group relative overflow-hidden rounded-2xl bg-foreground p-8 text-background"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Quote className="absolute right-4 top-4 h-12 w-12 text-secondary-foreground/20" />

              <div className="mb-4 flex items-center gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mb-6 text-secondary-foreground">{review.text}</p>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/10 text-2xl">
                  {review.avatar}
                </div>
                <div>
                  <h4 className="font-bold">{review.name}</h4>
                  <p className="text-sm text-secondary-foreground">
                    {review.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Big Card */}
        <motion.div
          className="mt-8 grid gap-6 md:grid-cols-2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center rounded-2xl bg-primary p-12">
            <div className="text-center text-background">
              <div className="font-heading text-8xl font-bold">2+</div>
              <p className="mt-2 text-lg">Years of Experience</p>
            </div>
          </div>
          <div className="flex items-center justify-center rounded-2xl bg-foreground p-12">
            <div className="text-center text-background">
              <div className="flex items-center justify-center gap-2">
                <span className="font-heading text-6xl font-bold">5.0</span>
                <Star className="h-12 w-12 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="mt-2 text-lg text-secondary-foreground">
                Client Satisfaction
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
