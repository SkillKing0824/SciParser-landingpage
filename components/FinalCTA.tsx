'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: `
          linear-gradient(to bottom, var(--color-surface) 0%, var(--color-primary) 100%)
        `,
      }}
    >
      {/* Subtle green radial glow — centered, understated */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 55%, var(--color-secondary-glow) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center text-center py-32 md:py-40 px-6 md:px-8">
        {/* Headline */}
        <motion.h2
          className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease }}
        >
          Stop doing the browser&rsquo;s job.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-xl md:text-2xl mt-6 max-w-xl"
          style={{ color: 'var(--color-text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
        >
          Describe the task. Sciparser handles the rest.
        </motion.p>

        {/* Oversized CTA button */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
        >
          <a
            href="#"
            className="btn-primary text-lg px-10 py-4 rounded-lg"
          >
            Start automating — free
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>
        </motion.div>

        {/* No-credit-card reassurance */}
        <motion.p
          className="text-sm mt-4"
          style={{ color: 'var(--color-text-muted)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease }}
        >
          No credit card required
        </motion.p>
      </div>
    </section>
  );
}
