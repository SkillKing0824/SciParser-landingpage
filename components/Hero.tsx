'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SpecialText } from './ui/special-text';
import { GlobeCdn } from './ui/cobe-globe-cdn';

const terminalLines = [
  { prefix: '›', text: 'Navigating to restaurant.com', delay: 1.2 },
  { prefix: '›', text: 'Selecting date: Friday, 7:00 PM', delay: 1.8 },
  { prefix: '›', text: 'Party size: 4', delay: 2.4 },
  { prefix: '✓', text: 'Table booked — Confirmation #2847', delay: 3.0, done: true },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-32 flex items-center overflow-hidden">
      {/* Subtle radial glow behind the hero */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at center, var(--color-secondary-glow) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
          {/* ─── LEFT: Text Block (~55%) ─── */}
          <div className="w-full lg:w-[55%] flex flex-col items-start">
            {/* Headline */}
            <motion.h1
              className="font-[var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--color-text-primary)] leading-[1.05]"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {['Type', 'a', 'task.'].map((word, i) => (
                <motion.span
                  key={`l1-${i}`}
                  className="inline-block mr-[0.3em]"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any },
                    },
                  }}
                >
                  {word}
                </motion.span>
              ))}
              <br />
              {['A', 'real'].map((word, i) => (
                <motion.span
                  key={`l2a-${i}`}
                  className="inline-block mr-[0.3em]"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any },
                    },
                  }}
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                className="inline-block mr-[0.3em] text-[var(--color-secondary)]"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any },
                  },
                }}
              >
                <SpecialText delay={0.5} speed={40} className="font-[var(--font-display)] font-bold">browser</SpecialText>
              </motion.span>
              {['does', 'the', 'rest.'].map((word, i) => (
                <motion.span
                  key={`l2b-${i}`}
                  className="inline-block mr-[0.3em]"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any },
                    },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subhead */}
            <motion.p
              className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-lg mt-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }}
            >
              Sciparser opens a real Chromium browser, navigates to the right pages, fills
              forms, clicks buttons, and delivers the result — on any website, no integration
              needed.
            </motion.p>

            {/* Primary CTA */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }}
            >
              <a href="#" className="btn-primary">
                Run your first task
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }}
            >
              <a
                href="#live-demo"
                className="inline-flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-secondary)] transition-colors"
                style={{ transitionDuration: 'var(--duration-normal)' }}
              >
                See it in action ↓
              </a>
            </motion.div>
          </div>

          {/* ─── RIGHT: Globe Animation (~45%) ─── */}
          <motion.div
            className="w-full lg:w-[45%] flex justify-center lg:justify-end lg:pt-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] as any }}
          >
            <div className="w-full max-w-md lg:max-w-lg">
              <GlobeCdn speed={0.004} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

