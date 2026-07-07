'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, MessageSquare, Gift } from 'lucide-react';

const benefits = [
  { icon: Sparkles, label: 'Priority access' },
  { icon: MessageSquare, label: 'Shape the roadmap' },
  { icon: Gift, label: 'Free tier guaranteed' },
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

export default function EarlyAccess() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="early-access"
      ref={sectionRef}
      className="relative bg-[var(--color-primary)] py-24 md:py-32 px-6 md:px-8"
    >
      {/* ─── Top decorative divider ─── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--color-border) 30%, var(--color-border) 70%, transparent)',
        }}
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-3xl flex flex-col items-center text-center">
        {/* ─── Heading ─── */}
        <motion.h2
          className="font-[var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)]"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease }}
        >
          Be among the first to automate
        </motion.h2>

        {/* ─── Subheading ─── */}
        <motion.p
          className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        >
          Sciparser is opening up to early users. Join the waitlist and be first
          in line when we launch.
        </motion.p>

        {/* ─── Email signup form (UI only) ─── */}
        <motion.form
          className="mt-10 flex flex-col md:flex-row items-center w-full max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email"
            aria-label="Email address"
            className="w-full md:w-80 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-secondary)] focus:outline-none transition-colors"
            style={{
              fontFamily: 'var(--font-body)',
              transitionDuration: 'var(--duration-normal)',
            }}
          />
          <button
            type="submit"
            className="btn-primary ml-0 md:ml-3 mt-3 md:mt-0 w-full md:w-auto justify-center whitespace-nowrap"
          >
            Join the waitlist
          </button>
        </motion.form>

        {/* ─── Benefit badges ─── */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 md:gap-8 mt-8"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.35, ease }}
        >
          {benefits.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"
            >
              <Icon
                className="size-4 text-[var(--color-secondary)]"
                aria-hidden="true"
              />
              {label}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ─── Bottom decorative divider ─── */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--color-border) 30%, var(--color-border) 70%, transparent)',
        }}
        aria-hidden="true"
      />
    </section>
  );
}
