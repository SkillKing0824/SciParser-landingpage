'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { AiLoader } from '@/components/ui/ai-loader';
import { OrbitingLogos } from '@/components/ui/orbiting-logos';

function AnimatedBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-[#22C55E]/5 via-transparent to-[#10B981]/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {[300, 450, 600, 750].map((size, i) => (
          <div key={i} className="absolute rounded-full border border-[#22C55E]/10"
            style={{ width: size, height: size, top: -size / 2, left: -size / 2, animation: `spin ${20 + i * 10}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}` }} />
        ))}
      </div>
      {[...Array(15)].map((_, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ width: i % 3 === 0 ? 4 : 2, height: i % 3 === 0 ? 4 : 2, background: i % 3 === 0 ? '#22C55E' : '#10B981', left: `${(i * 43 + 15) % 100}%`, top: `${(i * 61 + 8) % 100}%` }}
          animate={{ y: [0, -20, 0], opacity: [0.15, 0.6, 0.15] }}
          transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: (i * 0.4) % 4, ease: 'easeInOut' }} />
      ))}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#22C55E]/8 rounded-full blur-[100px]" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#10B981]/8 rounded-full blur-[80px]" />
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: `radial-gradient(circle, #22C55E 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
    </div>
  );
}

function FeatureBullet({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 rounded-full bg-[#22C55E]/20 flex items-center justify-center flex-shrink-0">
        <CheckCircle2 size={12} className="text-[#22C55E]" />
      </div>
      <span className="text-[var(--color-text-secondary)] text-sm">{text}</span>
    </div>
  );
}

function InputField({ label, type, placeholder, value, onChange, showToggle, onToggle, showPassword }: {
  label: string; type: string; placeholder: string; value: string;
  onChange: (v: string) => void; showToggle?: boolean; onToggle?: () => void; showPassword?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className={`block text-xs font-semibold mb-1.5 transition-colors duration-200 ${focused ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}>{label}</label>
      <div className={`relative flex items-center rounded-xl border transition-all duration-300 ${focused ? 'border-[var(--color-secondary)] shadow-[0_0_0_3px_var(--color-secondary-glow)]' : 'border-[var(--color-border)] hover:border-[var(--color-border-hover)]'}`}>
        <input
          type={showToggle ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-[var(--color-surface)] text-[var(--color-text-primary)] px-4 py-3 rounded-xl text-sm placeholder-[#6B7280] outline-none focus:outline-none focus:ring-0"
        />
        {showToggle && (
          <button type="button" onClick={onToggle} className="absolute right-3 text-[var(--color-text-muted)] hover:text-[#22C55E] transition-colors">
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}

function PasswordStrength({ password }: { password: string }) {
  const strength = Math.min(4, [password.length >= 8, /[A-Z]/.test(password), /[0-9]/.test(password), /[^A-Za-z0-9]/.test(password)].filter(Boolean).length);
  const colors = ['#EF4444', '#F59E0B', '#22C55E', '#10B981'];
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  if (!password) return null;
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
            style={{ background: i < strength ? colors[strength - 1] : '#1F2328' }} />
        ))}
      </div>
      <p className="text-xs" style={{ color: strength > 0 ? colors[strength - 1] : '#6B7280' }}>
        {strength > 0 ? labels[strength - 1] : ''}
      </p>
    </div>
  );
}

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 2000);
  };

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100]">
            <AiLoader text="CREATING ACCOUNT" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="h-screen flex bg-[var(--color-primary)] overflow-hidden">

      {/* ---- LEFT PANEL: Form ---- */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex flex-col items-center justify-center p-6 md:p-10 relative"
      >
        <div className="lg:hidden mb-6">
          <Link href="/">
            <div className="relative h-12 w-[180px]">
              <Image src="/logo-transparent.png" fill alt="Sciparser" priority className="object-contain object-left show-in-dark" />
              <Image src="/logo-light-v2.png" fill alt="Sciparser" priority className="object-contain object-left show-in-light scale-[1.4] translate-y-[-2px] origin-left" />
            </div>
          </Link>
        </div>

        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                <div className="w-20 h-20 rounded-full bg-[#22C55E]/20 border-2 border-[#22C55E] flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={36} className="text-[#22C55E]" />
                </div>
                <h2 className="text-3xl font-bold text-[var(--color-text-primary)] font-[Outfit,sans-serif] mb-3">You&apos;re in!</h2>
                <p className="text-[var(--color-text-secondary)] mb-8">Welcome to Sciparser. Your account is ready.</p>
                <Link href="/login" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#22C55E] to-[#10B981] text-[#0B0F0D] font-semibold hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all">
                  Go to Dashboard <ArrowRight size={16} />
                </Link>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="mb-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 mb-3">
                    <Sparkles size={12} className="text-[#22C55E]" />
                    <span className="text-[#22C55E] text-xs font-mono tracking-widest">FREE FOREVER PLAN AVAILABLE</span>
                  </div>
                  <h2 className="text-3xl font-bold font-[Outfit,sans-serif] text-[var(--color-text-primary)] mb-2">Create your account</h2>
                  <p className="text-[var(--color-text-secondary)]">
                    Already have one?{' '}
                    <Link href="/login" className="text-[#22C55E] hover:underline font-medium">Sign in →</Link>
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <InputField label="Full name" type="text" placeholder="John Doe" value={name} onChange={setName} />
                  <InputField label="Email address" type="email" placeholder="you@example.com" value={email} onChange={setEmail} />
                  <div>
                    <InputField label="Password" type="password" placeholder="Create a strong password" value={password} onChange={setPassword} showToggle onToggle={() => setShowPassword(!showPassword)} showPassword={showPassword} />
                    <PasswordStrength password={password} />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer group pt-2">
                    <div onClick={() => setAgreed(!agreed)}
                      className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${agreed ? 'bg-[#22C55E] border-[#22C55E]' : 'border-[var(--color-border)] hover:border-[#22C55E]/50'}`}>
                      {agreed && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#0B0F0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </div>
                    <span className="text-sm text-[var(--color-text-secondary)] leading-relaxed group-hover:text-[var(--color-text-primary)] transition-colors">
                      I agree to the <a href="#" className="text-[#22C55E] hover:underline">Terms of Service</a> and <a href="#" className="text-[#22C55E] hover:underline">Privacy Policy</a>
                    </span>
                  </label>

                  <motion.button type="submit" disabled={loading || !agreed} whileHover={{ scale: agreed ? 1.01 : 1 }} whileTap={{ scale: agreed ? 0.98 : 1 }}
                    className="w-full relative overflow-hidden py-3.5 px-6 rounded-xl font-semibold text-[#0B0F0D] bg-gradient-to-r from-[#22C55E] to-[#10B981] mt-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    <AnimatePresence mode="wait">
                      {loading ? (
                        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <div className="w-5 h-5 border-2 border-[#0B0F0D]/30 border-t-[#0B0F0D] rounded-full animate-spin" />
                        </motion.div>
                      ) : (
                        <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                          Create Account <ArrowRight size={16} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </form>

                <div className="flex items-center gap-4 my-4">
                  <div className="flex-1 h-px bg-[#1F2328]" />
                  <span className="text-[var(--color-text-muted)] text-xs font-mono">OR SIGN UP WITH</span>
                  <div className="flex-1 h-px bg-[#1F2328]" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {['Google', 'GitHub'].map((provider) => (
                    <motion.button key={provider} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="py-3 px-4 rounded-xl border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 bg-[var(--color-surface)] hover:bg-[var(--color-surface-elevated)] hover:border-[#22C55E]/30">
                      {provider === 'Google' ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                        </svg>
                      )}
                      {provider}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ---- RIGHT PANEL: Visual ---- */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex flex-col justify-between w-[50%] relative overflow-hidden p-10 border-l border-[var(--color-border)] bg-[var(--color-primary)]"
      >
        <AnimatedBg />

        <div className="relative z-10">
          <Link href="/">
            <div className="relative h-14 w-[210px]">
              <Image src="/logo-transparent.png" fill alt="Sciparser" priority className="object-contain object-left show-in-dark" />
              <Image src="/logo-light-v2.png" fill alt="Sciparser" priority className="object-contain object-left show-in-light scale-[1.4] translate-y-[-2px] origin-left" />
            </div>
          </Link>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center flex-1 py-6">
          <div className="relative mb-6 flex items-center justify-center w-[160px] h-[160px]">
            <OrbitingLogos className="w-full h-full" />
          </div>

          <h2 className="text-3xl font-bold font-[Outfit,sans-serif] text-[var(--color-text-primary)] text-center mb-3">
            Your AI Agent<br />
            <span className="bg-gradient-to-r from-[#22C55E] to-[#10B981] bg-clip-text text-transparent">Awaits</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-center max-w-sm mb-6 leading-relaxed text-sm">
            Join thousands of professionals who&apos;ve automated their browser workflows with Sciparser.
          </p>

          <div className="space-y-3 w-full max-w-sm">
            <FeatureBullet text="Browse and extract data autonomously" />
            <FeatureBullet text="Multi-step task execution in seconds" />
            <FeatureBullet text="Works with any website, no code needed" />
            <FeatureBullet text="Enterprise-grade security & privacy" />
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-sm">
            <div className="flex -space-x-2">
              {['#22C55E', '#10B981', '#059669', '#16A34A'].map((color, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[var(--color-primary)] flex items-center justify-center text-xs font-bold text-[var(--color-text-primary)]" style={{ background: color }}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div>
              <div className="text-[var(--color-text-primary)] text-sm font-semibold">2,000+ users joined last week</div>
              <div className="flex items-center gap-1 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill="#22C55E">
                    <path d="M5 0l1.2 3.7H10L6.9 6l1.2 3.7L5 7.6 1.9 9.7 3.1 6 0 3.7h3.8L5 0z"/>
                  </svg>
                ))}
                <span className="text-[var(--color-text-secondary)] text-xs ml-1">4.9/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#22C55E] to-transparent opacity-30" />
      </motion.div>
    </div>
    </>
  );
}
