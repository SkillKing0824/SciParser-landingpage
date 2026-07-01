'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Tier {
  name: string;
  price: string;
  priceSuffix?: string;
  features: string[];
  cta: string;
  ctaClass: 'btn-primary' | 'btn-secondary';
  recommended?: boolean;
}

const tiers: Tier[] = [
  {
    name: 'Free',
    price: '$0',
    priceSuffix: '/month',
    features: [
      '10 tasks per month',
      '1 scheduled task',
      'Basic export (CSV)',
      'Community support',
    ],
    cta: 'Get started',
    ctaClass: 'btn-secondary',
  },
  {
    name: 'Pro',
    price: '$29',
    priceSuffix: '/month',
    features: [
      '200 tasks per month',
      'Unlimited scheduled tasks',
      'Priority execution',
      'Full export (CSV, JSON, PDF)',
      'Email support',
    ],
    cta: 'Start with Pro',
    ctaClass: 'btn-primary',
    recommended: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Unlimited tasks',
      'Team accounts',
      'Dedicated support',
      'SLA guarantee',
      'Custom integrations',
    ],
    cta: 'Contact sales',
    ctaClass: 'btn-secondary',
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
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  }),
};

/* ------------------------------------------------------------------ */
/*  Pricing Card                                                       */
/* ------------------------------------------------------------------ */

function PricingCard({
  tier,
  index,
}: {
  tier: Tier;
  index: number;
}) {
  const isRecommended = tier.recommended;

  /*
   * Mobile ordering: Pro card gets order -1 so it appears first.
   * On md+ the grid naturally shows them left→right.
   */
  const orderClass = isRecommended ? 'order-first md:order-none' : '';

  return (
    <motion.div
      className={`card-surface relative flex flex-col p-8 rounded-xl ${orderClass}`}
      style={{
        ...(isRecommended
          ? {
              borderColor: 'var(--color-secondary)',
              boxShadow: 'var(--shadow-glow)',
            }
          : {}),
      }}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Recommended badge */}
      {isRecommended && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-full"
          style={{
            background: 'var(--color-secondary)',
            color: 'var(--color-primary)',
          }}
        >
          Recommended
        </span>
      )}

      {/* Tier name */}
      <h3
        className="text-xl font-semibold text-white"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {tier.name}
      </h3>

      {/* Price */}
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-5xl font-bold text-white">{tier.price}</span>
        {tier.priceSuffix && (
          <span
            className="text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {tier.priceSuffix}
          </span>
        )}
      </div>

      {/* Divider */}
      <div
        className="my-6 h-px w-full"
        style={{ background: 'var(--color-border)' }}
      />

      {/* Feature list */}
      <ul className="flex-1 space-y-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check
              className="mt-0.5 size-4 shrink-0"
              style={{ color: 'var(--color-secondary)' }}
              strokeWidth={2.5}
            />
            <span
              className="text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button className={`${tier.ctaClass} mt-8 w-full`}>{tier.cta}</button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pricing Section                                                    */
/* ------------------------------------------------------------------ */

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-8"
      style={{ background: 'var(--color-surface)' }}
    >
      <div className="mx-auto max-w-5xl">
        {/* ---- Header ---- */}
        <motion.div
          className="mb-12 md:mb-16 text-center"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Simple, transparent pricing
          </h2>
          <p
            className="mt-4 text-lg max-w-lg mx-auto"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Start free. Scale when you&apos;re ready.
          </p>
        </motion.div>

        {/* ---- Pricing Grid ---- */}
        {/*
         * On md+ the Pro card uses scale-[1.02] to visually pop.
         * On mobile, CSS `order-first` on the Pro card brings it to the top.
         */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={
                tier.recommended ? 'md:scale-[1.02] md:z-10' : ''
              }
            >
              <PricingCard tier={tier} index={i} />
            </div>
          ))}
        </div>

        {/* ---- Disclaimer ---- */}
        <p
          className="text-xs text-center mt-8"
          style={{ color: 'var(--color-text-muted)' }}
        >
          All prices are placeholder — final pricing will be announced at
          launch.
        </p>
      </div>
    </section>
  );
}
