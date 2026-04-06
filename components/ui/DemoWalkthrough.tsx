"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AppIcon } from "@/components/ui/AppIcon";

/* ── Step definitions ────────────────────────────────────────────────────── */
const STEPS = [
  {
    id:    1,
    color: "blue"    as const,
    label: "Intent",
    title: "You describe it.",
    desc:  "Plain language. No syntax. No commands. Just what you want done.",
    bullets: [
      "Natural language input",
      "Deterministic classification — no LLM in the path",
      "Same input always produces the same governed request",
    ],
  },
  {
    id:    2,
    color: "blue"    as const,
    label: "Governed Request",
    title: "It becomes a governed request.",
    desc:  "Your intent is compiled into an exact, reviewable specification. Nothing is ambiguous.",
    bullets: [
      "Exact action — not a guess",
      "Scope is explicitly bounded",
      "Policy assigned at compile time",
    ],
  },
  {
    id:    3,
    color: "violet"  as const,
    label: "Approval Gate",
    title: "You approve. Or you don't.",
    desc:  "The gate is mandatory. Review the exact request. Nothing runs without your explicit approval.",
    bullets: [
      "Gate cannot be bypassed",
      "You see exactly what will run",
      "One click to reject — no explanation required",
    ],
  },
  {
    id:    4,
    color: "amber"   as const,
    label: "Executing",
    title: "Only then does it run.",
    desc:  "The approved request executes against the runtime. Every action is recorded as it happens.",
    bullets: [
      "Runs only the approved plan — nothing more",
      "Artifact written in real time",
      "No silent side effects",
    ],
  },
  {
    id:    5,
    color: "emerald" as const,
    label: "Verified",
    title: "Verified. Replayable. Done.",
    desc:  "The artifact is replayed against the approved plan. If anything drifted, it's flagged.",
    bullets: [
      "Replay is verify-only — never re-executes",
      "Drift detection is automatic",
      "Full audit trail, always available",
    ],
  },
] as const;

type StepColor = "blue" | "violet" | "amber" | "emerald";

const COLOR = {
  blue:    { dot: "bg-blue-500",    border: "border-blue-500/30",    text: "text-blue-400",    bg: "bg-blue-500/10",    ring: "ring-blue-500/30"    },
  violet:  { dot: "bg-violet-500",  border: "border-violet-500/30",  text: "text-violet-400",  bg: "bg-violet-500/10",  ring: "ring-violet-500/30"  },
  amber:   { dot: "bg-amber-500",   border: "border-amber-500/30",   text: "text-amber-400",   bg: "bg-amber-500/10",   ring: "ring-amber-500/30"   },
  emerald: { dot: "bg-emerald-500", border: "border-emerald-500/30", text: "text-emerald-400", bg: "bg-emerald-500/10", ring: "ring-emerald-500/30" },
};

const STEP_DURATION = 3200; // ms per step before auto-advance

/* ── Left panel content per step ─────────────────────────────────────────── */
function StepPanel({ step, progress }: { step: typeof STEPS[number]; progress: number }) {
  const c = COLOR[step.color];

  return (
    <div className="relative flex flex-col h-full">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--border)]">
        <div
          className={`h-full ${c.dot} transition-none`}
          style={{ width: `${progress}%`, transition: "width 100ms linear" }}
        />
      </div>

      {/* Window chrome */}
      <div className="flex items-center gap-1.5 border-b border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2.5 mt-0.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
        <AppIcon size={13} className="ml-3" />
        <span className="mono ml-1.5 text-[10px] text-[var(--text-4)]">UseSteady — Governed Execution</span>
      </div>

      {/* Content area */}
      <div className="flex-1 p-5 flex flex-col gap-3 min-h-[280px] md:min-h-[320px]">

        {/* Step 1 — Intent */}
        {step.id === 1 && (
          <div className="flex flex-col gap-3 animate-fade-in">
            <div className="rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] overflow-hidden">
              <div className="flex items-center gap-2 border-b border-[var(--border)] px-3 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span className="mono text-[10px] text-[var(--text-4)] uppercase tracking-widest">Describe what you want to do</span>
              </div>
              <div className="px-3 py-2.5">
                <p className="mono text-[11px] leading-6 text-[var(--text-2)]">
                  Run the tests. If everything passes, commit.
                  <span className="inline-block w-0.5 h-3 bg-blue-400 ml-0.5 animate-pulse" />
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Run & commit", "What changed?", "Find TODOs", "Check the API"].map((ex) => (
                <span key={ex} className="mono rounded border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-2 py-1 text-[10px] text-[var(--text-4)]">{ex}</span>
              ))}
            </div>
            <button className="mono self-start rounded-lg bg-blue-600 px-4 py-2 text-[11px] font-semibold text-white hover:bg-blue-500 transition-colors">
              Prepare Request →
            </button>
          </div>
        )}

        {/* Step 2 — Governed Request */}
        {step.id === 2 && (
          <div className="animate-fade-in rounded-lg border border-blue-500/25 bg-[var(--bg-elevated)]">
            <div className="flex items-center gap-1.5 border-b border-[var(--border)] px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              <span className="mono text-[10px] font-semibold uppercase tracking-widest text-blue-400">Governed Request</span>
            </div>
            <div className="px-4 py-3 space-y-2.5">
              {[
                { k: "Intent",  v: "Run the tests. If everything passes, commit." },
                { k: "Step 1",  v: "test.run_all  ·  scope: src/  ·  read-only" },
                { k: "Step 2",  v: "git.commit  ·  only if step 1 passes" },
                { k: "Policy",  v: "no-force-push · no-delete · audit-logged" },
              ].map(({ k, v }) => (
                <div key={k} className="flex gap-3">
                  <span className="mono w-14 shrink-0 text-xs text-[var(--text-4)]">{k}</span>
                  <span className="mono text-xs text-[var(--text-2)]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 — Approval Gate */}
        {step.id === 3 && (
          <div className="animate-fade-in flex flex-col gap-3">
            <div className="rounded-lg border border-violet-500/30 bg-[var(--bg-elevated)]">
              <div className="flex items-center gap-1.5 border-b border-[var(--border)] px-3 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                <span className="mono text-[10px] font-semibold uppercase tracking-widest text-violet-400">Approval Required</span>
              </div>
              <div className="px-4 py-3">
                <p className="mono mb-3 text-xs leading-6 text-[var(--text-3)]">
                  Review the exact request before anything runs. This gate cannot be bypassed.
                </p>
                <div className="mono rounded border border-[var(--border)] bg-[var(--bg-surface)] px-3 py-2 text-xs text-[var(--text-2)] mb-3">
                  test.run_all → git.commit · no-force-push
                </div>
                <button className="mono w-full rounded-lg border border-violet-500/40 bg-violet-500/10 px-4 py-2.5 text-xs font-semibold text-violet-400 hover:bg-violet-500/20 transition-colors animate-pulse">
                  Approve this request →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4 — Executing */}
        {step.id === 4 && (
          <div className="animate-fade-in flex flex-col gap-3">
            <div className="rounded-lg border border-amber-500/25 bg-[var(--bg-elevated)] px-4 py-3">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block h-2.5 w-2.5 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
                <span className="mono text-[11px] font-semibold text-amber-400">Executing approved request…</span>
              </div>
              <div className="space-y-1.5">
                {["step 1: test.run_all — started", "scanning src/ …", "214 tests passing …", "step 2: git.commit — writing artifact …"].map((line, i) => (
                  <p key={line} className={`mono text-[10px] leading-5 ${i < 2 ? "text-[var(--text-4)]" : "text-[var(--text-3)]"}`}>
                    {i === 2 && <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />}
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 5 — Verified */}
        {step.id === 5 && (
          <div className="animate-fade-in flex flex-col gap-3">
            <div className="rounded-lg border border-emerald-500/30 bg-[var(--bg-elevated)] px-4 py-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-emerald-400 text-sm">✓</span>
                <span className="mono text-xs font-semibold text-emerald-400">VERIFIED</span>
              </div>
              <p className="mono text-xs text-[var(--text-2)] mb-1">214 tests passed · 1 commit recorded · 0 unexpected files</p>
              <p className="mono text-[10px] text-[var(--text-4)]">Artifact recorded · Replay confirmed · No drift detected</p>
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3">
              <p className="mono mb-2 text-[10px] uppercase tracking-widest text-[var(--text-4)]">Replay result</p>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 text-[11px]">✓</span>
                <span className="mono text-[11px] text-[var(--text-3)]">Replay matched artifact exactly</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────────────── */
export default function DemoWalkthrough() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress]   = useState(0);
  const [paused, setPaused]       = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const step = STEPS[activeIdx];

  const advance = useCallback((next: number) => {
    setTransitioning(true);
    setTimeout(() => {
      setActiveIdx(next % STEPS.length);
      setProgress(0);
      setTransitioning(false);
    }, 200);
  }, []);

  useEffect(() => {
    if (paused) return;
    setProgress(0);
    const start = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / STEP_DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        advance(activeIdx + 1);
      }
    }, 80);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [activeIdx, paused, advance]);

  function goTo(idx: number) {
    if (intervalRef.current) clearInterval(intervalRef.current);
    advance(idx);
  }

  const c = COLOR[step.color];

  return (
    <div className="flex flex-col gap-6 lg:gap-8">

      {/* Step dots */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {STEPS.map((s, i) => {
          const sc = COLOR[s.color];
          const isActive = i === activeIdx;
          return (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 min-h-[36px] transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? `${sc.border} ${sc.bg} ${sc.text}`
                  : "border-[var(--border-strong)] text-[var(--text-4)] hover:text-[var(--text-2)] hover:border-[var(--border)]"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${isActive ? sc.dot : "bg-[var(--border-strong)]"}`} />
              <span className="mono text-[11px] font-medium">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Two-column body */}
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10 lg:items-start">

        {/* Left — app panel */}
        <div
          className="w-full lg:flex-1 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{ opacity: transitioning ? 0 : 1, transition: "opacity 0.2s ease" }}
        >
          <StepPanel step={step} progress={progress} />
        </div>

        {/* Right — copy */}
        <div
          className="w-full lg:w-72 lg:shrink-0 flex flex-col justify-center"
          style={{ opacity: transitioning ? 0 : 1, transition: "opacity 0.2s ease" }}
        >
          <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 mb-4 w-fit ${c.border} ${c.bg}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
            <span className={`mono text-[10px] font-semibold uppercase tracking-widest ${c.text}`}>
              Step {step.id} of {STEPS.length}
            </span>
          </div>

          <h3 className="text-xl font-semibold leading-snug tracking-tight text-[var(--text-1)] sm:text-2xl">
            {step.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[var(--text-3)]">{step.desc}</p>

          <ul className="mt-5 space-y-2.5">
            {step.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5">
                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${c.dot}`} />
                <span className="text-sm leading-6 text-[var(--text-3)]">{b}</span>
              </li>
            ))}
          </ul>

          {/* Prev / Next */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={() => goTo((activeIdx - 1 + STEPS.length) % STEPS.length)}
              className="mono flex-1 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-4 py-2.5 text-xs font-medium text-[var(--text-3)] hover:text-[var(--text-1)] hover:border-[var(--border)] transition-colors min-h-[44px]"
            >
              ← Prev
            </button>
            <button
              onClick={() => goTo(activeIdx + 1)}
              className={`mono flex-1 rounded-lg border px-4 py-2.5 text-xs font-semibold transition-colors min-h-[44px] ${c.border} ${c.bg} ${c.text} hover:opacity-80`}
            >
              {activeIdx === STEPS.length - 1 ? "Start over ↺" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
