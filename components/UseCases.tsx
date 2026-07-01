'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  UtensilsCrossed,
  FileText,
  TrendingUp,
  BarChart3,
  Download,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface UseCase {
  title: string;
  description: string;
  icon: LucideIcon;
}

const useCases: UseCase[] = [
  {
    title: 'Restaurant & appointment bookings',
    description:
      '\u201CBook a table for 4 at 7pm Friday at Nobu\u201D \u2014 Sciparser navigates the booking site, selects the time slot, fills your details, and confirms.',
    icon: UtensilsCrossed,
  },
  {
    title: 'Government & insurance forms',
    description:
      'Tedious multi-page forms filled accurately. Upload documents, check boxes, submit \u2014 the agent handles the paperwork you dread.',
    icon: FileText,
  },
  {
    title: 'Daily price & stock monitoring',
    description:
      'Set it once: \u201CCheck if the RTX 5090 is back in stock at Best Buy and Newegg every morning.\u201D Get notified the moment it finds a result.',
    icon: TrendingUp,
  },
  {
    title: 'Recurring dashboard report pulls',
    description:
      '\u201CPull this week\u2019s numbers from our analytics dashboard into a spreadsheet every Monday.\u201D No API needed \u2014 it reads the screen.',
    icon: BarChart3,
  },
  {
    title: 'Data extraction & export',
    description:
      'Scrape product listings, pull research data, collect form responses \u2014 then export everything as CSV, JSON, or PDF.',
    icon: Download,
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -32 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  }),
};

/* ------------------------------------------------------------------ */
/*  Use Case Card                                                      */
/* ------------------------------------------------------------------ */

function UseCaseCard({
  useCase,
  index,
}: {
  useCase: UseCase;
  index: number;
}) {
  const Icon = useCase.icon;
  const isEven = index % 2 === 1; // 0-indexed: odd indices get offset

  return (
    <motion.article
      className={`
        border-hairline-hover rounded-lg p-5 md:p-6
        flex flex-col sm:flex-row items-start gap-4 sm:gap-5
        ${isEven ? 'sm:ml-8 md:ml-16' : 'ml-0'}
      `}
      style={{ background: 'var(--color-surface-elevated)' }}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Icon */}
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
        style={{ background: 'rgba(34, 197, 94, 0.1)' }}
      >
        <Icon
          className="size-5"
          style={{ color: 'var(--color-secondary)' }}
          strokeWidth={1.75}
        />
      </div>

      {/* Text */}
      <div className="min-w-0">
        <h3
          className="text-lg font-semibold text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {useCase.title}
        </h3>
        <p
          className="mt-1.5 text-sm leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {useCase.description}
        </p>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  UseCases Section                                                   */
/* ------------------------------------------------------------------ */

export default function UseCases() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="use-cases"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-8"
      style={{ background: 'var(--color-surface)' }}
    >
      <div className="mx-auto max-w-5xl">
        {/* ---- Header (left-aligned) ---- */}
        <motion.div
          className="mb-12 md:mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2
            className="text-3xl font-bold text-white md:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Real tasks, not abstractions
          </h2>
          <p
            className="mt-4 max-w-2xl text-lg"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Sciparser handles the same tasks you&apos;d do manually in a
            browser&nbsp;&mdash; just faster, and on autopilot.
          </p>
        </motion.div>

        {/* ---- Stacked Cards ---- */}
        <div className="space-y-4">
          {useCases.map((uc, i) => (
            <UseCaseCard key={uc.title} useCase={uc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
