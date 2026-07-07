"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { SunIcon, MoonIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThemeSwitchCircular({
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => setChecked(resolvedTheme === "dark"), [resolvedTheme]);

  if (!mounted) {
    return (
      <button
        className={cn(
          "relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm border border-border",
          className
        )}
        {...props}
      />
    );
  }

  return (
    <button
      onClick={() => setTheme(checked ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm border border-border transition-colors hover:bg-muted",
        className
      )}
      aria-label="Toggle theme"
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={checked ? "dark" : "light"}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          {checked ? <SunIcon className="w-5 h-5 text-foreground" /> : <MoonIcon className="w-5 h-5 text-foreground" />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
