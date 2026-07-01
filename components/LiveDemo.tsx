'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

/* ================================================================
   LIVE DEMO — The centerpiece of the landing page.
   An animated mock browser window filling an insurance form,
   with a streaming agent-log panel beside it.
   ================================================================ */

// --- Animation timeline data ---
interface FormStep {
  field: string;
  label: string;
  value: string;
  logLine: string;
}

const FORM_STEPS: FormStep[] = [
  {
    field: 'fullName',
    label: 'Full Name',
    value: 'Alex Chen',
    logLine: '› Filling: Full Name → "Alex Chen"',
  },
  {
    field: 'date',
    label: 'Date of Incident',
    value: '2025-06-15',
    logLine: '› Filling: Date of Incident → "2025-06-15"',
  },
  {
    field: 'policy',
    label: 'Policy Number',
    value: 'INS-4471-B',
    logLine: '› Filling: Policy Number → "INS-4471-B"',
  },
  {
    field: 'description',
    label: 'Description',
    value: 'Water damage to kitchen ceiling from upstairs pipe burst.',
    logLine: '› Filling: Description → "Water damage to kitchen..."',
  },
];

const INITIAL_LOG_LINES = [
  '› Navigating to insurance-portal.gov',
  '› Page loaded — locating claim form',
];

const STEP_DURATION = 1200; // ms per form field
const TYPING_INTERVAL = 40; // ms per character
const INITIAL_DELAY = 1500; // ms before form filling starts
const LOOP_PAUSE = 3000; // ms to show success before restarting

export default function LiveDemo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const [currentStep, setCurrentStep] = useState(-1); // -1 = pre-start
  const [typedValues, setTypedValues] = useState<Record<string, string>>({});
  const [logLines, setLogLines] = useState<string[]>([]);
  const [cursorPosition, setCursorPosition] = useState({ field: '', progress: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimeouts = useCallback(() => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  }, []);

  const addTimeout = useCallback((fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timeoutRefs.current.push(id);
    return id;
  }, []);

  const resetState = useCallback(() => {
    setCurrentStep(-1);
    setTypedValues({});
    setLogLines([]);
    setCursorPosition({ field: '', progress: 0 });
    setIsSubmitting(false);
    setIsComplete(false);
  }, []);

  const runAnimation = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    resetState();

    // Phase 1: initial log lines
    addTimeout(() => {
      setLogLines([INITIAL_LOG_LINES[0]]);
    }, 400);

    addTimeout(() => {
      setLogLines([INITIAL_LOG_LINES[0], INITIAL_LOG_LINES[1]]);
    }, 1000);

    // Phase 2: fill form fields one by one
    FORM_STEPS.forEach((step, index) => {
      const baseDelay = INITIAL_DELAY + index * STEP_DURATION;

      // Show cursor moving to field
      addTimeout(() => {
        setCurrentStep(index);
        setCursorPosition({ field: step.field, progress: 0 });
      }, baseDelay);

      // Type the value character by character
      const valueChars = step.value.split('');
      valueChars.forEach((_, charIndex) => {
        addTimeout(() => {
          setTypedValues((prev) => ({
            ...prev,
            [step.field]: step.value.slice(0, charIndex + 1),
          }));
          setCursorPosition({
            field: step.field,
            progress: (charIndex + 1) / valueChars.length,
          });
        }, baseDelay + 200 + charIndex * TYPING_INTERVAL);
      });

      // Add log line after typing completes
      addTimeout(() => {
        setLogLines((prev) => [...prev, step.logLine]);
      }, baseDelay + 200 + valueChars.length * TYPING_INTERVAL + 100);
    });

    // Phase 3: submit
    const submitDelay =
      INITIAL_DELAY + FORM_STEPS.length * STEP_DURATION + 400;
    addTimeout(() => {
      setIsSubmitting(true);
      setCursorPosition({ field: 'submit', progress: 1 });
      setLogLines((prev) => [...prev, '› Submitting form...']);
    }, submitDelay);

    // Phase 4: success
    addTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
      setLogLines((prev) => [
        ...prev,
        '✓ Claim submitted — Confirmation #4471',
      ]);
    }, submitDelay + 1200);

    // Phase 5: loop
    addTimeout(() => {
      setIsRunning(false);
      resetState();
      // Will re-trigger via useEffect if still in view
    }, submitDelay + 1200 + LOOP_PAUSE);
  }, [isRunning, resetState, addTimeout]);

  useEffect(() => {
    if (isInView && !isRunning) {
      runAnimation();
    }
    if (!isInView) {
      clearAllTimeouts();
      setIsRunning(false);
      resetState();
    }
    return () => clearAllTimeouts();
  }, [isInView, isRunning, runAnimation, clearAllTimeouts, resetState]);

  return (
    <section
      id="live-demo"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            See it in action
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] mt-4 max-w-2xl mx-auto">
            Watch Sciparser fill out an insurance claim form — navigating,
            typing, and submitting, exactly like you would.
          </p>
        </motion.div>

        {/* Demo container */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-0 lg:gap-0 rounded-xl overflow-hidden border border-[var(--color-border)]"
          style={{ background: 'var(--color-surface)' }}
        >
          {/* ---- Browser Window ---- */}
          <div className="flex flex-col">
            {/* Browser chrome */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border)]"
              style={{ background: 'var(--color-primary-lighter)' }}
            >
              {/* Traffic lights */}
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              {/* URL bar */}
              <div
                className="flex-1 px-3 py-1.5 rounded-md text-xs"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: 'var(--color-primary)',
                  color: 'var(--color-text-muted)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <span className="text-[var(--color-text-muted)] mr-1">🔒</span>
                insurance-portal.gov/claims/new
              </div>
            </div>

            {/* Browser content — the form */}
            <div className="p-6 md:p-8 flex-1">
              <div className="max-w-md">
                {/* Form header */}
                <div className="mb-6">
                  <h3
                    className="text-lg font-semibold text-white"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    New Insurance Claim
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">
                    Fill out the form below to submit a new claim.
                  </p>
                </div>

                {/* Form fields */}
                <div className="space-y-4">
                  {FORM_STEPS.map((step, index) => (
                    <div key={step.field} className="relative">
                      <label
                        className="block text-xs font-medium mb-1.5"
                        style={{
                          fontFamily: 'var(--font-body)',
                          color:
                            currentStep === index
                              ? 'var(--color-secondary)'
                              : 'var(--color-text-secondary)',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {step.label}
                      </label>
                      {step.field === 'description' ? (
                        <textarea
                          ref={(el) => { if (currentStep === index && el && document.activeElement !== el) el.focus(); }}
                          className="relative w-full rounded-md px-3 py-2 text-sm transition-all duration-300 text-white placeholder:text-[var(--color-text-muted)] resize-none focus:outline-none"
                          style={{
                            background: 'var(--color-primary)',
                            border: `1px solid ${currentStep === index ? 'var(--color-secondary)' : 'var(--color-border)'}`,
                            boxShadow: currentStep === index ? '0 0 0 2px rgba(34, 197, 94, 0.15)' : 'none',
                            fontFamily: 'var(--font-body)',
                            minHeight: '60px',
                          }}
                          placeholder={`Enter ${step.label.toLowerCase()}...`}
                          value={typedValues[step.field] || ''}
                          onChange={(e) => setTypedValues((prev) => ({ ...prev, [step.field]: e.target.value }))}
                          onFocus={() => { if (!isRunning) setCurrentStep(index); }}
                          onBlur={() => { if (!isRunning) setCurrentStep(-1); }}
                        />
                      ) : (
                        <input
                          type="text"
                          ref={(el) => { if (currentStep === index && el && document.activeElement !== el) el.focus(); }}
                          className="relative w-full rounded-md px-3 py-2 text-sm transition-all duration-300 text-white placeholder:text-[var(--color-text-muted)] focus:outline-none"
                          style={{
                            background: 'var(--color-primary)',
                            border: `1px solid ${currentStep === index ? 'var(--color-secondary)' : 'var(--color-border)'}`,
                            boxShadow: currentStep === index ? '0 0 0 2px rgba(34, 197, 94, 0.15)' : 'none',
                            fontFamily: 'var(--font-body)',
                            minHeight: '36px',
                          }}
                          placeholder={`Enter ${step.label.toLowerCase()}...`}
                          value={typedValues[step.field] || ''}
                          onChange={(e) => setTypedValues((prev) => ({ ...prev, [step.field]: e.target.value }))}
                          onFocus={() => { if (!isRunning) setCurrentStep(index); }}
                          onBlur={() => { if (!isRunning) setCurrentStep(-1); }}
                        />
                      )}
                    </div>
                  ))}

                  {/* Submit button */}
                  <div className="pt-2">
                    <button
                      className="px-5 py-2.5 rounded-md text-sm font-semibold transition-all duration-300"
                      style={{
                        fontFamily: 'var(--font-body)',
                        background: isComplete
                          ? 'var(--color-secondary)'
                          : isSubmitting
                          ? 'var(--color-secondary-dim)'
                          : 'var(--color-accent)',
                        color: 'var(--color-primary)',
                        transform:
                          isSubmitting
                            ? 'scale(0.97)'
                            : cursorPosition.field === 'submit'
                            ? 'scale(1.02)'
                            : 'scale(1)',
                        boxShadow: isComplete
                          ? '0 0 20px rgba(34, 197, 94, 0.3)'
                          : 'none',
                      }}
                    >
                      {isComplete
                        ? '✓ Claim Submitted'
                        : isSubmitting
                        ? 'Submitting...'
                        : 'Submit Claim'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---- Agent Log Panel ---- */}
          <div
            className="flex flex-col border-t lg:border-t-0 lg:border-l border-[var(--color-border)]"
            style={{ background: 'var(--color-primary)' }}
          >
            {/* Log panel header */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)]"
              style={{ background: 'var(--color-primary-lighter)' }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: isComplete
                    ? 'var(--color-secondary)'
                    : isRunning
                    ? 'var(--color-secondary)'
                    : 'var(--color-text-muted)',
                  animation:
                    isRunning && !isComplete
                      ? 'pulse-dot 1.5s ease-in-out infinite'
                      : 'none',
                }}
              />
              <span
                className="text-xs uppercase tracking-wider"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: isComplete
                    ? 'var(--color-secondary)'
                    : 'var(--color-text-secondary)',
                }}
              >
                {isComplete ? 'Complete' : isRunning ? 'Agent Running' : 'Agent Idle'}
              </span>
            </div>

            {/* Log lines */}
            <div className="flex-1 p-4 overflow-y-auto" style={{ minHeight: '280px' }}>
              <div className="space-y-2">
                {logLines.map((line, index) => (
                  <div
                    key={`${line}-${index}`}
                    className="text-xs leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: line.startsWith('✓')
                        ? 'var(--color-secondary)'
                        : 'var(--color-text-secondary)',
                      fontWeight: line.startsWith('✓') ? 600 : 400,
                    }}
                  >
                    {line.split('').map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          delay: (charIndex * 0.015),
                          duration: 0.1,
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>
                ))}
                {/* Blinking cursor at end of log */}
                {isRunning && !isComplete && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-1 mt-1"
                  >
                    <span
                      className="inline-block w-1.5 h-4"
                      style={{
                        background: 'var(--color-secondary)',
                        animation: 'cursor-blink 0.8s infinite',
                        opacity: 0.6,
                      }}
                    />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Status bar */}
            <div
              className="px-4 py-2 border-t border-[var(--color-border)] flex items-center justify-between"
              style={{ background: 'var(--color-primary-lighter)' }}
            >
              <span
                className="text-[10px] uppercase tracking-wider"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {isComplete
                  ? 'Task completed'
                  : isRunning
                  ? `Step ${Math.min(currentStep + 3, FORM_STEPS.length + 2)} of ${
                      FORM_STEPS.length + 2
                    }`
                  : 'Waiting'}
              </span>
              <span
                className="text-[10px]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {isComplete ? '4.2s' : isRunning ? 'Running...' : '—'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
