"use client";

import { useState, useEffect, useRef } from "react";
import { AppIcon } from "@/components/ui/AppIcon";

/* ── Auto-loop demo data ─────────────────────────────────────────────────── */
const CYCLES = [
  {
    chip:    "Run & commit",
    request: "Run the tests. If everything passes, commit.",
    action:  "test.run_all → git.commit",
    scope:   "src/ → repo root",
    policy:  "read-only · no-force-push · audit-logged",
    result:  "214 tests passed · 1 commit recorded",
  },
  {
    chip:    "What changed?",
    request: "What changed since my last commit?",
    action:  "git.diff",
    scope:   "repo root  (HEAD~1)",
    policy:  "read-only · audit-logged",
    result:  "4 files changed · +47 -12 lines",
  },
  {
    chip:    "Find TODOs",
    request: "Find all the TODO comments in the codebase.",
    action:  "fs.grep",
    scope:   "src/  (read-only scan)",
    policy:  "read-only · audit-logged",
    result:  "23 matches found · 0 files modified",
  },
] as const;

type Phase = "typing" | "classifying" | "review" | "approving" | "executing" | "verified";

const PHASE_DURATIONS: Record<Phase, number> = {
  typing:      900,
  classifying: 600,
  review:      900,
  approving:   700,
  executing:   800,
  verified:    2000,
};

/* ── Auto-loop mini demo panel ───────────────────────────────────────────── */
function HeroDemo() {
  const [cycleIdx, setCycleIdx]   = useState(0);
  const [phase, setPhase]         = useState<Phase>("typing");
  const [typed, setTyped]         = useState("");
  const [paused, setPaused]       = useState(false);
  const timerRef                  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cycle                     = CYCLES[cycleIdx];

  /* Typewriter effect */
  useEffect(() => {
    if (phase !== "typing") return;
    setTyped("");
    let i = 0;
    const full = cycle.request;
    const iv = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(iv);
    }, 900 / full.length);
    return () => clearInterval(iv);
  }, [phase, cycle.request]);

  /* Phase sequencer */
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => {
      setPhase((p) => {
        const order: Phase[] = ["typing", "classifying", "review", "approving", "executing", "verified"];
        const next = order[order.indexOf(p) + 1];
        if (!next) {
          setCycleIdx((i) => (i + 1) % CYCLES.length);
          return "typing";
        }
        return next;
      });
    }, PHASE_DURATIONS[phase]);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase, paused]);

  function jumpTo(idx: number) {
    setCycleIdx(idx);
    setPhase("typing");
  }

  const show = (p: Phase) => {
    const order: Phase[] = ["typing", "classifying", "review", "approving", "executing", "verified"];
    return order.indexOf(phase) >= order.indexOf(p);
  };

  return (
    <div
      className="hidden lg:block w-[360px] shrink-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ambient glow */}
      <div className="relative">
        <div
          className="pointer-events-none absolute -inset-4 rounded-3xl blur-2xl"
          style={{ background: "radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 70%)" }}
        />

        {/* Panel */}
        <div className="relative rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] overflow-hidden">

          {/* Window chrome */}
          <div className="flex items-center gap-1.5 border-b border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
            <AppIcon size={14} className="ml-3" />
            <span className="mono ml-1.5 text-[10px] text-[var(--text-4)]">UseSteady</span>
          </div>

          <div className="p-4 space-y-3">

            {/* Example chips */}
            <div className="flex gap-1.5 flex-wrap">
              {CYCLES.map((c, i) => (
                <button
                  key={c.chip}
                  onClick={() => jumpTo(i)}
                  className={`mono rounded px-2 py-1 text-[10px] border transition-colors ${
                    i === cycleIdx
                      ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                      : "border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--text-4)] hover:text-[var(--text-2)]"
                  }`}
                >
                  {c.chip}
                </button>
              ))}
            </div>

            {/* Input area */}
            <div className="rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-3 py-2.5 min-h-[52px]">
              <p className="mono text-[11px] leading-6 text-[var(--text-2)]">
                {typed || <span className="text-[var(--text-5)]">Describe what you want to do…</span>}
                {phase === "typing" && <span className="inline-block w-0.5 h-3 bg-blue-400 ml-0.5 animate-pulse" />}
              </p>
            </div>

            {/* Classifying */}
            {phase === "classifying" && (
              <div className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
                <span className="mono text-[10px] text-[var(--text-4)]">Classifying…</span>
              </div>
            )}

            {/* Governed Request card */}
            {show("review") && phase !== "classifying" && (
              <div className="animate-fade-in rounded-lg border border-blue-500/25 bg-[var(--bg-elevated)]">
                <div className="flex items-center gap-1.5 border-b border-[var(--border)] px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <span className="mono text-[9px] font-semibold uppercase tracking-widest text-blue-400">Governed Request</span>
                </div>
                <div className="px-3 py-2 space-y-1">
                  {[
                    { k: "action", v: cycle.action },
                    { k: "scope",  v: cycle.scope  },
                    { k: "policy", v: cycle.policy },
                  ].map(({ k, v }) => (
                    <div key={k} className="flex gap-2">
                      <span className="mono w-12 shrink-0 text-[10px] text-[var(--text-4)]">{k}</span>
                      <span className="mono text-[10px] text-[var(--text-2)]">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Approval Gate */}
            {show("review") && phase !== "classifying" && phase !== "executing" && phase !== "verified" && (
              <div className="animate-fade-in rounded-lg border border-violet-500/30 bg-[var(--bg-elevated)] px-3 py-2.5">
                <p className="mono mb-2 text-[10px] text-[var(--text-3)]">Gate — review before it runs.</p>
                <div className={`mono w-full rounded border px-2.5 py-1.5 text-center text-[10px] font-semibold transition-colors ${
                  phase === "approving"
                    ? "border-violet-500/60 bg-violet-500/20 text-violet-300 animate-pulse"
                    : "border-violet-500/30 bg-violet-500/10 text-violet-400"
                }`}>
                  {phase === "approving" ? "Approving…" : "Approve this request →"}
                </div>
              </div>
            )}

            {/* Executing */}
            {phase === "executing" && (
              <div className="animate-fade-in flex items-center gap-2 rounded-lg border border-amber-500/20 bg-[var(--bg-elevated)] px-3 py-2.5">
                <span className="inline-block h-2.5 w-2.5 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
                <span className="mono text-[10px] text-amber-400">Executing · recording artifact…</span>
              </div>
            )}

            {/* VERIFIED */}
            {phase === "verified" && (
              <div className="animate-fade-in rounded-lg border border-emerald-500/30 bg-[var(--bg-elevated)] px-3 py-2.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-emerald-400 text-xs">✓</span>
                  <span className="mono text-[10px] font-semibold text-emerald-400">VERIFIED</span>
                </div>
                <p className="mono text-[10px] text-[var(--text-2)]">{cycle.result}</p>
                <p className="mono mt-1 text-[9px] text-[var(--text-4)]">Artifact recorded · Replayable</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile VERIFIED snapshot ────────────────────────────────────────────── */
function MobileVerifiedCard() {
  return (
    <div className="lg:hidden mt-8 rounded-xl border border-emerald-500/20 bg-[var(--bg-surface)] overflow-hidden">
      <div className="flex items-center gap-1.5 border-b border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2">
        <span className="h-2 w-2 rounded-full bg-red-500/40" />
        <span className="h-2 w-2 rounded-full bg-amber-500/40" />
        <span className="h-2 w-2 rounded-full bg-emerald-500/60" />
        <AppIcon size={12} className="ml-2" />
        <span className="mono ml-1 text-[10px] text-[var(--text-4)]">UseSteady</span>
      </div>
      <div className="px-4 py-3 space-y-2">
        <div className="mono text-[10px] text-[var(--text-4)] uppercase tracking-widest">Run the tests. If everything passes, commit.</div>
        <div className="flex gap-2 mono text-[11px]">
          <span className="text-[var(--text-4)] w-14 shrink-0">action</span>
          <span className="text-[var(--text-2)]">test.run_all → git.commit</span>
        </div>
        <div className="flex gap-2 mono text-[11px]">
          <span className="text-[var(--text-4)] w-14 shrink-0">policy</span>
          <span className="text-[var(--text-2)]">read-only · no-force-push</span>
        </div>
        <div className="flex items-center gap-1.5 pt-1 border-t border-[var(--border)]">
          <span className="text-emerald-400 text-xs">✓</span>
          <span className="mono text-[11px] font-semibold text-emerald-400">VERIFIED — 214 passed · 1 commit recorded</span>
        </div>
      </div>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section className="section-shell pt-10 md:pt-16 lg:pt-24">
      <div className="section-wrap">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">

          {/* ── Left: copy ─────────────────────────────────────────────── */}
          <div className="min-w-0 flex-1">

            {/* Badge */}
            <div className="pill inline-flex">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500" />
              <span className="mono text-xs font-medium text-[var(--text-2)]">Private Alpha</span>
            </div>

            {/* Headline */}
            <h1 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-[var(--text-1)] sm:text-4xl md:text-5xl lg:text-[2.85rem]">
              Turn plain language into controlled system execution.
            </h1>

            {/* Tension */}
            <p className="mt-5 max-w-lg text-base font-semibold leading-7 text-[var(--text-1)] sm:text-lg">
              Nothing runs until you&apos;ve reviewed the exact request.
            </p>

            {/* Support */}
            <p className="mt-2 max-w-lg text-sm leading-7 text-[var(--text-3)] sm:text-base">
              Every action explicit. Every run recorded. Every result replayable.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="https://x.com/UseSteady"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary interactive-lift w-full text-center sm:w-auto"
              >
                Join the Alpha →
              </a>
              <a href="#demo" className="cta-secondary interactive-lift w-full text-center sm:w-auto">
                Watch demo
              </a>
            </div>

            <p className="mt-3 text-xs leading-6 text-[var(--text-4)]">
              Selecting the first cohort via X · No credit card required
            </p>

            {/* Mobile VERIFIED snapshot */}
            <MobileVerifiedCard />
          </div>

          {/* ── Right: auto-loop demo (desktop only) ───────────────────── */}
          <HeroDemo />
        </div>
      </div>
    </section>
  );
}
