'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Describe your task',
    description:
      'Type what you need in plain English. "Book a table for 4 at 7pm Friday" — that\'s it.',
  },
  {
    number: '02',
    title: 'Agent plans the approach',
    description:
      'Sciparser breaks the task into discrete steps and identifies what pages to visit, what to click, what to fill.',
  },
  {
    number: '03',
    title: 'Browser executes live',
    description:
      'A real Chromium browser opens and works through the plan. Watch the screen and reasoning in real time.',
  },
  {
    number: '04',
    title: 'Result delivered & saved',
    description:
      'The completed result is captured, saved to your history, and exportable. Schedule it to repeat daily if needed.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as any },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as any },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as any },
  },
};

const verticalLineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as any },
  },
};

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="bg-[var(--color-primary)] py-24 md:py-32 px-6 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16 md:mb-20"
        >
          <motion.h2
            variants={headingVariants}
            className="font-[var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-5"
          >
            From intent to impact in four steps
          </motion.h2>
          <motion.p
            variants={headingVariants}
            className="text-[var(--color-text-secondary)] text-lg max-w-xl mx-auto"
          >
            No code. No setup on the target site. Just describe what you need.
          </motion.p>
        </motion.div>

        {/* Desktop stepper (md+) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="hidden md:grid md:grid-cols-4 gap-0 relative"
        >
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-start">
              {/* Step number + connecting line row */}
              <div className="relative w-full flex items-center mb-5">
                {/* Step number */}
                <span
                  className="font-[var(--font-mono)] text-4xl font-bold text-[var(--color-secondary)] relative z-10 shrink-0"
                >
                  <motion.span variants={stepVariants} className="block">
                    {step.number}
                  </motion.span>
                </span>

                {/* Horizontal connecting line (not on last step) */}
                {index < steps.length - 1 && (
                  <motion.div
                    variants={lineVariants}
                    className="flex-1 h-px bg-[var(--color-border)] ml-4 origin-left"
                  />
                )}
              </div>

              {/* Content */}
              <motion.div variants={stepVariants} className="pr-8">
                <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Mobile stepper */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="md:hidden flex flex-col"
        >
          {steps.map((step, index) => (
            <div key={step.number} className="flex gap-5">
              {/* Left rail: number + vertical line */}
              <div className="flex flex-col items-center shrink-0">
                <motion.span
                  variants={stepVariants}
                  className="font-[var(--font-mono)] text-4xl font-bold text-[var(--color-secondary)]"
                >
                  {step.number}
                </motion.span>

                {index < steps.length - 1 && (
                  <motion.div
                    variants={verticalLineVariants}
                    className="w-px flex-1 bg-[var(--color-border)] my-3 origin-top"
                  />
                )}
              </div>

              {/* Content */}
              <motion.div
                variants={stepVariants}
                className={index < steps.length - 1 ? 'pb-10' : 'pb-0'}
              >
                <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-text-primary)] mb-2 mt-1">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
