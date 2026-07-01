'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Is my data safe?',
    answer:
      'Yes. Authentication uses industry-standard JWT tokens and bcrypt password hashing. Your task data and results are stored securely and never shared with third parties. You own your data completely.',
  },
  {
    question: 'What kinds of tasks can Sciparser handle?',
    answer:
      'Anything you can do in a browser manually: booking reservations, filling forms, checking prices, pulling reports, extracting data, monitoring pages for changes, and more. If a human can click through it, Sciparser can automate it.',
  },
  {
    question: 'Do I need to know how to code?',
    answer:
      'Not at all. You describe tasks in plain English. No scripting, no selectors, no browser extensions to configure.',
  },
  {
    question: 'What happens if a task fails partway through?',
    answer:
      'Sciparser has a built-in critic layer. If a step fails, the agent reviews what went wrong, revises its approach, and retries — rather than just giving you a generic error message.',
  },
  {
    question: 'Can I watch it work in real time?',
    answer:
      "Yes. Every task execution is streamed live. You see the agent's reasoning and the actual browser screen as it navigates and acts.",
  },
  {
    question: 'How does daily scheduling work?',
    answer:
      'After running a task once, toggle the "repeat" option and set a schedule. Sciparser will run the same task automatically at your chosen interval — no further input needed.',
  },
  {
    question: 'How is this different from browser extensions or RPA tools?',
    answer:
      'Browser extensions require manual installation and configuration per site. Traditional RPA tools need you to record scripts or define workflows. Sciparser uses a real AI agent that understands plain English and adapts to page layouts — no pre-programming.',
  },
  {
    question: 'What websites does it work on?',
    answer:
      'Any website accessible in a standard Chromium browser. No special integration, API access, or site cooperation is required.',
  },
  {
    question: 'Can I export my results?',
    answer:
      'Yes. Every task run can be exported as CSV, JSON, or PDF. Your full history of runs is saved and accessible anytime.',
  },
  {
    question: 'Is there a free tier?',
    answer:
      'Yes. The free plan includes 10 tasks per month and 1 scheduled task, with basic CSV export. No credit card required.',
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Accordion Item                                                     */
/* ------------------------------------------------------------------ */

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      className="border-b border-[var(--color-border)]"
      variants={itemVariants}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        className="flex w-full items-center justify-between py-5 text-left cursor-pointer"
      >
        <span
          className="text-base font-medium text-white pr-4 md:text-lg"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {item.question}
        </span>
        <ChevronDown
          className="size-5 shrink-0 transition-transform duration-300"
          style={{
            color: 'var(--color-text-secondary)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as any }}
            className="overflow-hidden"
          >
            <p
              className="pb-5 text-sm leading-relaxed md:text-base"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Section                                                        */
/* ------------------------------------------------------------------ */

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-24 px-6 md:py-32 md:px-8"
      style={{ background: 'var(--color-primary)' }}
    >
      <div className="ml-0 max-w-3xl md:ml-[10%] lg:ml-[15%]">
        {/* ---- Heading ---- */}
        <motion.h2
          className="mb-12 text-3xl font-bold text-white md:mb-16 md:text-4xl lg:text-5xl"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }}
        >
          Questions &amp; answers
        </motion.h2>

        {/* ---- Accordion list ---- */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
