'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Zap, Shield, Globe } from 'lucide-react';

/* ---------- Animated Background Particles ---------- */
function OrbitalBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Orbital rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[500px] h-[500px] rounded-full border border-[#22C55E]/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animation: 'spin 30s linear infinite' }} />
        <div className="w-[700px] h-[700px] rounded-full border border-[#22C55E]/8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animation: 'spin 45s linear infinite reverse' }} />
        <div className="w-[900px] h-[900px] rounded-full border border-[#22C55E]/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animation: 'spin 60s linear infinite' }} />
      </div>
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#22C55E]/10 rounded-full blur-[80px] animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-[#10B981]/10 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: '1s' }} />
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#22C55E]"
          style={{ left: `${(i * 37 + 10) % 100}%`, top: `${(i * 53 + 5) % 100}%`, opacity: 0.2 + (i % 5) * 0.1 }}
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: (i * 0.3) % 3, ease: 'easeInOut' }}
        />
      ))}
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `linear-gradient(#22C55E 1px, transparent 1px), linear-gradient(90deg, #22C55E 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
    </div>
  );
}

function StatCard({ icon: Icon, value, label }: { icon: any; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#22C55E]/20 bg-[#22C55E]/5 backdrop-blur-sm">
      <div className="w-8 h-8 rounded-lg bg-[#22C55E]/20 flex items-center justify-center flex-shrink-0">
        <Icon size={14} className="text-[#22C55E]" />
      </div>
      <div>
        <div className="text-white font-bold text-sm font-[Outfit,sans-serif]">{value}</div>
        <div className="text-[#A1A7AE] text-xs">{label}</div>
      </div>
    </div>
  );
}

function InputField({ label, type, placeholder, value, onChange, showToggle, onToggle, showPassword }: {
  label: string; type: string; placeholder: string; value: string;
  onChange: (v: string) => void; showToggle?: boolean; onToggle?: () => void; showPassword?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="group relative">
      <label className={`block text-xs font-semibold mb-1.5 transition-colors duration-200 ${focused ? 'text-[#22C55E]' : 'text-[#A1A7AE]'}`}>{label}</label>
      <div className={`relative flex items-center rounded-xl border transition-all duration-300 ${focused ? 'border-[#22C55E] shadow-[0_0_0_3px_rgba(34,197,94,0.15)]' : 'border-[#1F2328] hover:border-[#22C55E]/40'}`}>
        <input
          type={showToggle ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-[#111418] text-white px-4 py-3 rounded-xl text-sm placeholder-[#6B7280] outline-none"
        />
        {showToggle && (
          <button type="button" onClick={onToggle} className="absolute right-3 text-[#6B7280] hover:text-[#22C55E] transition-colors">
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
        <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#22C55E] to-[#10B981] rounded-full transition-all duration-500 ${focused ? 'w-full' : 'w-0'}`} />
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen flex bg-[#0B0F0D]">

      {/* ---- LEFT PANEL: Visual ---- */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex flex-col justify-between w-[55%] relative overflow-hidden p-14 border-r border-[#1F2328]"
      >
        <OrbitalBg />
        <div className="relative z-10">
          <Link href="/">
            <Image src="/logo-transparent.png" width={1828} height={399} alt="Sciparser" className="h-14 w-auto object-contain" priority />
          </Link>
        </div>

        {/* ---- Scrolling Ticker: Works With ---- */}
        <div className="relative z-10 flex flex-col gap-3">
          {/* Label — fully visible */}
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-[#22C55E]/20" />
            <p className="text-[#22C55E] font-mono text-[11px] tracking-[0.2em] uppercase font-semibold px-2">
              Works seamlessly with
            </p>
            <div className="h-px flex-1 bg-[#22C55E]/20" />
          </div>

          {/* Row 1 — scrolls LEFT continuously */}
          <div className="overflow-hidden relative">
            <div
              className="flex gap-3"
              style={{
                width: 'max-content',
                animation: 'ticker-left 28s linear infinite',
              }}
            >
              {[
                'Google', 'LinkedIn', 'Twitter / X', 'GitHub', 'Amazon', 'Notion',
                'Salesforce', 'HubSpot', 'Shopify', 'Stripe', 'Slack', 'Jira',
                'Google', 'LinkedIn', 'Twitter / X', 'GitHub', 'Amazon', 'Notion',
                'Salesforce', 'HubSpot', 'Shopify', 'Stripe', 'Slack', 'Jira',
              ].map((name, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#22C55E]/25 bg-[#22C55E]/8 whitespace-nowrap flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                  <span className="text-white/80 text-xs font-medium">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls RIGHT continuously */}
          <div className="overflow-hidden relative">
            <div
              className="flex gap-3"
              style={{
                width: 'max-content',
                animation: 'ticker-right 22s linear infinite',
              }}
            >
              {[
                'Reddit', 'Yahoo Finance', 'Bloomberg', 'Wikipedia', 'YouTube',
                'Airbnb', 'Booking.com', 'Glassdoor', 'Indeed', 'Crunchbase', 'Yelp', 'Zillow',
                'Reddit', 'Yahoo Finance', 'Bloomberg', 'Wikipedia', 'YouTube',
                'Airbnb', 'Booking.com', 'Glassdoor', 'Indeed', 'Crunchbase', 'Yelp', 'Zillow',
              ].map((name, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#10B981]/25 bg-[#10B981]/8 whitespace-nowrap flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  <span className="text-white/80 text-xs font-medium">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#0B0F0D] to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#0B0F0D] to-transparent pointer-events-none z-10" />
        </div>

        <div className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-[#22C55E] text-xs font-mono tracking-widest">AI-POWERED BROWSER AGENT</span>
            </div>
            <h1 className="text-5xl font-bold font-[Outfit,sans-serif] text-white leading-tight mb-6">
              Welcome back to<br />
              <span className="bg-gradient-to-r from-[#22C55E] to-[#10B981] bg-clip-text text-transparent">the future</span>
            </h1>
            <p className="text-[#A1A7AE] text-lg leading-relaxed max-w-md mb-10">
              Your autonomous browser agent is ready. Log in to pick up where you left off and let Sciparser do the heavy lifting.
            </p>
            <div className="grid grid-cols-3 gap-3">
              <StatCard icon={Zap} value="10x" label="Faster workflows" />
              <StatCard icon={Shield} value="99.9%" label="Uptime guarantee" />
              <StatCard icon={Globe} value="150+" label="Sites supported" />
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#22C55E] to-transparent opacity-40" />
      </motion.div>

      {/* ---- RIGHT PANEL: Form ---- */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 relative"
      >
        <div className="lg:hidden mb-10">
          <Link href="/">
            <Image src="/logo-transparent.png" width={1828} height={399} alt="Sciparser" className="h-12 w-auto object-contain" priority />
          </Link>
        </div>

        <div className="w-full max-w-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="mb-10">
            <h2 className="text-3xl font-bold font-[Outfit,sans-serif] text-white mb-2">Sign in</h2>
            <p className="text-[#A1A7AE]">
              New here?{' '}
              <Link href="/signup" className="text-[#22C55E] hover:underline font-medium">Create an account →</Link>
            </p>
          </motion.div>

          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} onSubmit={handleSubmit} className="space-y-5">
            <InputField label="Email address" type="email" placeholder="you@example.com" value={email} onChange={setEmail} />
            <InputField label="Password" type="password" placeholder="••••••••" value={password} onChange={setPassword} showToggle onToggle={() => setShowPassword(!showPassword)} showPassword={showPassword} />

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div onClick={() => setRemember(!remember)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${remember ? 'bg-[#22C55E] border-[#22C55E]' : 'border-[#1F2328] hover:border-[#22C55E]/50'}`}>
                  {remember && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#0B0F0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </div>
                <span className="text-sm text-[#A1A7AE] group-hover:text-white transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-sm text-[#22C55E] hover:underline">Forgot password?</a>
            </div>

            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              className="w-full relative overflow-hidden py-3.5 px-6 rounded-xl font-semibold text-[#0B0F0D] bg-gradient-to-r from-[#22C55E] to-[#10B981] mt-4 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] disabled:opacity-70 flex items-center justify-center gap-2">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="w-5 h-5 border-2 border-[#0B0F0D]/30 border-t-[#0B0F0D] rounded-full animate-spin" />
                  </motion.div>
                ) : (
                  <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                    Sign In <ArrowRight size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-[#1F2328]" />
            <span className="text-[#6B7280] text-xs font-mono">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-[#1F2328]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {['Google', 'GitHub'].map((provider) => (
              <motion.button key={provider} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="py-3 px-4 rounded-xl border border-[#1F2328] text-[#A1A7AE] hover:text-white text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 bg-[#111418] hover:bg-[#171B1E]">
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

          <p className="text-center text-xs text-[#6B7280] mt-8">
            By signing in you agree to our{' '}
            <a href="#" className="text-[#22C55E] hover:underline">Terms</a>{' '}
            &amp;{' '}
            <a href="#" className="text-[#22C55E] hover:underline">Privacy Policy</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
