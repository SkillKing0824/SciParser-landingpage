'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, Brain, Shield, Plug } from 'lucide-react';

const badges = [
  { label: 'Works on any website', Icon: Globe },
  { label: 'Plans before it acts', Icon: Brain },
  { label: 'Your data stays yours', Icon: Shield },
  { label: 'Extensible via MCP', Icon: Plug },
] as const;

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <section
      ref={ref}
      className="w-full border-y border-[var(--color-border)] bg-[var(--color-surface)]"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto max-w-6xl px-6 py-5 md:py-6"
      >
        {/* Desktop: horizontal row with dividers */}
        <div className="hidden md:flex items-center justify-center gap-6">
          {badges.map((badge, i) => (
            <div key={badge.label} className="contents">
              {i > 0 && (
                <div
                  className="w-px h-4 bg-[var(--color-border)]"
                  aria-hidden="true"
                />
              )}
              <div className="flex items-center gap-2.5">
                <badge.Icon
                  size={16}
                  className="shrink-0 text-[var(--color-secondary)]"
                  aria-hidden="true"
                />
                <span
                  className="text-sm uppercase tracking-widest text-[var(--color-text-secondary)] whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {badge.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: 2x2 grid */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2"
            >
              <badge.Icon
                size={16}
                className="shrink-0 text-[var(--color-secondary)]"
                aria-hidden="true"
              />
              <span
                className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
