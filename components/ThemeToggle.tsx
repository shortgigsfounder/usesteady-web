"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const THEMES = ["dark", "light", "system"] as const;
type Theme = (typeof THEMES)[number];

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SystemIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

const LABELS: Record<Theme, string> = {
  dark: "Dark",
  light: "Light",
  system: "System",
};

const ICONS: Record<Theme, React.ReactNode> = {
  dark: <MoonIcon />,
  light: <SunIcon />,
  system: <SystemIcon />,
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render after mount (standard Next.js pattern)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div className="h-7 w-[72px] rounded border border-[var(--border)] bg-[var(--bg-elevated)] animate-pulse" />
    );
  }

  const current = (theme as Theme) ?? "dark";

  function cycle() {
    const idx = THEMES.indexOf(current);
    const next = THEMES[(idx + 1) % THEMES.length];
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Switch theme — currently ${LABELS[current]}`}
      title={`Theme: ${LABELS[current]} — click to cycle`}
      className={[
        "flex items-center gap-1.5 rounded border px-2.5 py-1.5",
        "font-mono text-[10px] font-medium",
        "border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-2)]",
        "hover:border-[var(--border-strong)] hover:text-[var(--text-1)]",
        "transition-all duration-150 focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-blue-500/40",
      ].join(" ")}
    >
      <span className="flex items-center text-[var(--text-2)]">{ICONS[current]}</span>
      <span>{LABELS[current]}</span>
    </button>
  );
}
