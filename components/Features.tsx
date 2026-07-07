'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu, Eye, CalendarClock, Globe, Archive } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  {
    title: 'Plans before it clicks',
    description:
      'A planning layer breaks your task into steps. If something fails, a critic reviews the failure and retries with a revised approach — not just a blank error message.',
    icon: Cpu,
  },
  {
    title: 'Watch it work, live',
    description:
      "Execution is streamed in real time. See the agent's reasoning and the actual browser screen while it works — not just a spinner and a prayer.",
    icon: Eye,
  },
  {
    title: 'Set it once, it runs daily',
    description:
      'Schedule any task to repeat automatically. Daily price checks, report pulls, monitoring — without touching it again after the first setup.',
    icon: CalendarClock,
  },
  {
    title: 'Any website, no integration',
    description:
      'Sciparser drives a real Chromium browser. It works on any website the same way you do — no special APIs, no browser extensions, no setup on the target site.',
    icon: Globe,
  },
  {
    title: 'Everything is saved',
    description:
      'Full run history with what was done, what the result was, and when. Export to CSV, JSON, or PDF anytime.',
    icon: Archive,
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as any, // ease-out
    },
  }),
};

/* ------------------------------------------------------------------ */
/*  Feature Card                                                       */
/* ------------------------------------------------------------------ */

function FeatureCard({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  const Icon = feature.icon;

  return (
    <motion.div
      className="card-surface-hover p-6 md:p-8 flex flex-col h-full"
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Icon container */}
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg"
        style={{
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.2)',
        }}
      >
        <Icon
          className="size-5"
          style={{ color: 'var(--color-secondary)' }}
          strokeWidth={1.75}
        />
      </div>

      {/* Title */}
      <h3
        className="mt-4 text-xl font-semibold text-[var(--color-text-primary)]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p
        className="mt-2 text-sm leading-relaxed"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {feature.description}
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Features Section                                                   */
/* ------------------------------------------------------------------ */

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      id="features"
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--color-primary)' }}
    >
      <div className="mx-auto max-w-6xl">
        {/* ---- Header (left-aligned / asymmetric) ---- */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }}
        >
          <h2
            className="text-3xl font-bold text-[var(--color-text-primary)] md:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Built for the tasks you actually do
          </h2>
          <p
            className="mt-4 max-w-2xl text-lg"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Every capability is designed around one goal: completing real-world
            browser tasks reliably, transparently, and without babysitting.
          </p>
        </motion.div>

        {/* ---- Asymmetric Bento Grid ---- */}
        {/*
          Desktop (lg+):  3-col grid
            Row 1 — Card 1 (2 col) | Card 2 (1 col)
            Row 2 — Card 3 (1 col) | Card 4 (2 col)
            Row 3 — Card 5 (1 col)

          Tablet (md):  2-col grid
            Card 1 spans 2 cols, rest are 1 col each

          Mobile:  single column
        */}
        <div
          className="grid grid-cols-1 gap-4
                     md:grid-cols-2 md:gap-5
                     lg:grid-cols-3 lg:gap-6"
        >
          {/* Card 1 — spans 2 cols on md+ */}
          <div className="md:col-span-2 lg:col-span-2">
            <FeatureCard feature={features[0]} index={0} />
          </div>

          {/* Card 2 — 1 col */}
          <div>
            <FeatureCard feature={features[1]} index={1} />
          </div>

          {/* Card 3 — 1 col */}
          <div>
            <FeatureCard feature={features[2]} index={2} />
          </div>

          {/* Card 4 — spans 2 cols on lg */}
          <div className="lg:col-span-2">
            <FeatureCard feature={features[3]} index={3} />
          </div>

          {/* Card 5 — 1 col */}
          <div>
            <FeatureCard feature={features[4]} index={4} />
          </div>
        </div>
      </div>
    </section>
  );
}
