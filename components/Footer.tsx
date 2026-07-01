'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { Mail } from 'lucide-react';

/* Inline SVG icons for brand logos (removed from lucide-react v1.x) */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const productLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

const companyLinks = [
  { label: 'About', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Contact', href: '#' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer
      className="bg-[var(--color-surface)] border-t border-[var(--color-border)]"
    >
      <div className="max-w-6xl mx-auto pt-16 pb-8 px-6 md:px-8">
        {/* ── 4-column grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Column 1 — Brand */}
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/logo.png"
              width={1316}
              height={474}
              alt="Sciparser"
              className="h-12 w-auto md:h-16 object-contain block"
            />

            <p className="text-sm text-[var(--color-text-secondary)] mt-3">
              Your AI agent for real-world tasks.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4 mt-4">
              <a
                href="#"
                aria-label="GitHub"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition-colors"
              >
                <GithubIcon className="size-5" />
              </a>

              <a
                href="#"
                aria-label="X (Twitter)"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition-colors inline-flex items-center justify-center"
              >
                <span
                  className="text-sm font-semibold leading-none"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  𝕏
                </span>
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition-colors"
              >
                <LinkedinIcon className="size-5" />
              </a>
            </div>
          </div>

          {/* Column 2 — Product */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Legal + Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Newsletter signup */}
            <div className="mt-6">
              <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                Stay updated
              </p>

              {subscribed ? (
                <p className="text-sm text-[var(--color-secondary)]">
                  Thanks for subscribing!
                </p>
              ) : (
                <form onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="w-full bg-[var(--color-primary)] border border-[var(--color-border)] rounded-md px-3 py-2 text-sm text-white placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-secondary)] focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full mt-2 bg-[var(--color-secondary)] text-[var(--color-primary)] text-sm font-semibold px-4 py-2 rounded-md hover:brightness-110 transition-all cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-[var(--color-border)] mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            © 2026 Sciparser. All rights reserved.
          </p>

          <a
            href="mailto:support@sciparser.com"
            className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition-colors inline-flex items-center gap-1.5"
          >
            <Mail className="size-3.5" />
            support@sciparser.com
          </a>
        </div>
      </div>
    </footer>
  );
}
