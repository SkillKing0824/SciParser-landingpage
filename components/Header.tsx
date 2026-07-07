'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import ThemeSwitchCircular from './ui/theme-switch-circular';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
] as const;

/* ------------------------------------------------------------------ */
/*  Smooth-scroll helper (respects reduced-motion)                     */
/* ------------------------------------------------------------------ */

function scrollToSection(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  onAfter?: () => void,
) {
  e.preventDefault();
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  onAfter?.();
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* --- scroll listener --- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll(); // initialise on mount
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* --- lock body scroll when drawer is open --- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeDrawer = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }}
        className={`
          fixed inset-x-0 top-0 z-50 h-[88px]
          flex items-center
          px-6 md:px-8
          transition-[background-color,border-color] duration-300 ease-out
          ${
            scrolled
              ? 'bg-[var(--color-primary)]/90 backdrop-blur-lg border-b border-[var(--color-border)]'
              : 'bg-transparent border-b border-transparent'
          }
        `}
      >
        {/* Inner container */}
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          {/* ---------- Logo ---------- */}
          <a
            href="#"
            aria-label="Back to top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="relative shrink-0"
          >
            <div className="relative h-12 md:h-16 w-[180px] md:w-[240px]">
              <Image
                src="/logo-transparent.png"
                fill
                alt="Sciparser"
                priority
                className="object-contain object-left show-in-dark"
              />
              <div className="show-in-light absolute inset-0 flex items-center -translate-x-5 translate-y-1">
                <Image
                  src="/logo-light-v2.png"
                  width={1536}
                  height={1024}
                  alt="Sciparser"
                  priority
                  className="w-full h-auto object-contain object-left scale-[1.4] origin-left"
                />
              </div>
            </div>
          </a>

          {/* ---------- Desktop nav ---------- */}
          <nav className="hidden md:block" aria-label="Main navigation">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => scrollToSection(e, href)}
                    className="
                      text-sm font-medium
                      text-[var(--color-text-secondary)]
                      transition-colors duration-[var(--duration-normal)]
                      hover:text-[var(--color-white)]
                    "
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------- Desktop CTAs ---------- */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeSwitchCircular className="mr-2" />
            <Link href="/login" className="btn-ghost">
              Sign In
            </Link>
            <Link href="/signup" className="btn-primary">
              Get Started
            </Link>
          </div>

          {/* ---------- Mobile hamburger ---------- */}
          <button
            type="button"
            className="
              md:hidden flex items-center justify-center
              w-10 h-10 rounded-[var(--radius-md)]
              text-[var(--color-text-secondary)]
              hover:text-[var(--color-white)]
              transition-colors duration-[var(--duration-normal)]
            "
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.header>

      {/* ============================================================
          Mobile Drawer
          ============================================================ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-black/60 md:hidden"
              onClick={closeDrawer}
              aria-hidden
            />

            {/* Drawer panel */}
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as any }}
              className="
                fixed right-0 top-0 bottom-0 z-50 w-[280px]
                flex flex-col
                bg-[var(--color-surface)] border-l border-[var(--color-border)]
                md:hidden
              "
            >
              {/* Close button row */}
              <div className="flex items-center justify-end h-[72px] px-6">
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="
                    flex items-center justify-center
                    w-10 h-10 rounded-[var(--radius-md)]
                    text-[var(--color-text-secondary)]
                    hover:text-[var(--color-white)]
                    transition-colors duration-[var(--duration-normal)]
                  "
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-6 pt-2" aria-label="Mobile navigation">
                <ul className="flex flex-col gap-1">
                  {NAV_LINKS.map(({ label, href }, i) => (
                    <motion.li
                      key={href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.06 * i,
                        duration: 0.35,
                        ease: [0.16, 1, 0.3, 1] as any,
                      }}
                    >
                      <a
                        href={href}
                        onClick={(e) => scrollToSection(e, href, closeDrawer)}
                        className="
                          block py-3 text-base font-medium
                          text-[var(--color-text-secondary)]
                          hover:text-[var(--color-white)]
                          transition-colors duration-[var(--duration-normal)]
                        "
                      >
                        {label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* CTAs */}
              <div className="px-6 pb-8 flex flex-col gap-3">
                <div className="flex justify-center mb-2">
                  <ThemeSwitchCircular />
                </div>
                <Link
                  href="/login"
                  className="btn-ghost justify-center w-full"
                  onClick={closeDrawer}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="btn-primary justify-center w-full"
                  onClick={closeDrawer}
                >
                  Get Started
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
