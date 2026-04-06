"use client";

import { useState, useRef, useEffect } from "react";
import { AppIcon } from "@/components/ui/AppIcon";

/* ── Example requests (mirrors Electron IntentInputPanel chips) ───────────── */
const EXAMPLES = [
  { label: "Run & commit",    text: "Run the tests. If everything passes, commit." },
  { label: "What changed?",  text: "What changed since my last commit?" },
  { label: "Find TODOs",     text: "Find all the TODO comments in the codebase." },
  { label: "Check the API",  text: "Is the staging server responding?" },
  { label: "Backup first",   text: "Back up the database before the migration." },
] as const;

/* ── Deterministic intent classifier (mirrors ui/src/lib/intent-classifier) ─ */
type Intent = {
  action: string;
  scope: string;
  policy: string;
  resultLine: string;
};

function classifyIntent(text: string): Intent {
  const t = text.toLowerCase();
  if (t.includes("test") && (t.includes("commit") || t.includes("pass")))
    return { action: "test.run_all → git.commit", scope: "src/ → repo root", policy: "read-only · no-force-push · audit-logged", resultLine: "214 tests passed · 1 commit recorded · artifact written" };
  if (t.includes("test"))
    return { action: "test.run_all",     scope: "src/  (read-only scan)", policy: "no-write · no-delete · audit-logged",  resultLine: "214 tests passed · 0 files modified" };
  if (t.includes("changed") || t.includes("diff"))
    return { action: "git.diff",         scope: "repo root  (HEAD~1)",    policy: "read-only · audit-logged",             resultLine: "4 files changed · +47 -12 lines · 0 files modified" };
  if (t.includes("todo") || t.includes("find"))
    return { action: "fs.grep",          scope: "src/  (read-only scan)", policy: "read-only · audit-logged",             resultLine: "23 matches found · 0 files modified" };
  if (t.includes("staging") || t.includes("server") || t.includes("responding") || t.includes("api"))
    return { action: "net.health_check", scope: "staging  (read-only)",   policy: "read-only · no-mutate · audit-logged", resultLine: "200 OK · 142 ms · 0 files modified" };
  if (t.includes("backup") || t.includes("database") || t.includes("migration"))
    return { action: "db.export",        scope: "database  (read-only snapshot)", policy: "read-only · no-drop · audit-logged", resultLine: "backup.sql · 4.2 MB · artifact recorded" };
  if (t.includes("commit"))
    return { action: "git.commit",       scope: "repo root",              policy: "no-force-push · audit-logged",         resultLine: "1 commit recorded · 0 unexpected files" };
  return   { action: "intent.classify",  scope: "repo root",              policy: "read-only · audit-logged",             resultLine: "Request classified · awaiting your approval" };
}

type Stage = "idle" | "classifying" | "review" | "executing" | "verified";

/* ─────────────────────────────────────────────────────────────────────────── */

export default function TryIt() {
  const [value, setValue]       = useState("");
  const [stage, setStage]       = useState<Stage>("idle");
  const [intent, setIntent]     = useState<Intent | null>(null);
  const [showDownload, setShowDownload] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resultRef   = useRef<HTMLDivElement>(null);

  /* Auto-grow textarea */
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${ta.scrollHeight}px`;
  }, [value]);

  /* Scroll to result cards when they appear */
  useEffect(() => {
    if (stage !== "idle" && stage !== "classifying") {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [stage]);

  function handlePrepare() {
    if (!value.trim()) return;
    setStage("classifying");
    setShowDownload(false);
    setTimeout(() => {
      setIntent(classifyIntent(value));
      setStage("review");
    }, 900);
  }

  function handleApprove() {
    setStage("executing");
    setTimeout(() => {
      setStage("verified");
      setTimeout(() => setShowDownload(true), 700);
    }, 1200);
  }

  function handleReset() {
    setStage("idle");
    setIntent(null);
    setShowDownload(false);
    setValue("");
    textareaRef.current?.focus();
  }

  return (
    <section id="try-it" className="section-shell">
      <div className="section-wrap">

        {/* Header */}
        <div className="mb-10 max-w-xl">
          <p className="mono mb-3 text-xs font-medium uppercase tracking-widest text-blue-500">
            Go deeper
          </p>
          <h2 className="text-2xl font-bold leading-snug tracking-tight text-[var(--text-1)] sm:text-3xl">
            Type your own request.
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--text-3)]">
            The hero shows a preview. This is the full flow — your input,
            your approval, your result. Nothing executes on this page,
            but everything here is exactly how the real app works.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">

          {/* ── Left: Input panel ──────────────────────────────────────── */}
          <div className="flex flex-col gap-4">

            {/* Example chips */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex.label}
                  onClick={() => {
                    setValue(ex.text);
                    handleReset();
                    setValue(ex.text);
                    textareaRef.current?.focus();
                  }}
                  className="mono shrink-0 rounded-md border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-3 py-2.5 text-[11px] text-[var(--text-2)] transition-colors hover:border-blue-500/40 hover:bg-[var(--bg-deep)] hover:text-[var(--text-1)] min-h-[44px]"
                >
                  {ex.label}
                </button>
              ))}
            </div>

            {/* Textarea — mirrors Electron IntentInputPanel */}
            <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/20 transition-all">
              <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span className="mono text-[10px] uppercase tracking-widest text-[var(--text-4)]">
                  Describe what you want to do
                </span>
              </div>
              <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handlePrepare(); }}
                placeholder="e.g. Run the test suite and show me the results"
                rows={3}
                className="mono w-full resize-none bg-transparent px-4 py-3 text-sm leading-7 text-[var(--text-1)] placeholder:text-[var(--text-4)] focus:outline-none"
              />
            </div>

            {/* Prepare button */}
            <button
              onClick={handlePrepare}
              disabled={!value.trim() || stage === "classifying"}
              className="cta-primary interactive-lift disabled:cursor-not-allowed disabled:opacity-40 w-full sm:w-auto"
            >
              {stage === "classifying" ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Classifying…
                </span>
              ) : "Prepare Request →"}
            </button>

            <p className="mono text-[10px] leading-5 text-[var(--text-4)]">
              ⌘ Enter to prepare · Nothing executes on this page
            </p>
          </div>

          {/* ── Right: Pipeline cards ──────────────────────────────────── */}
          <div ref={resultRef} className="flex flex-col gap-4">

            {/* Step 1 — Governed Request */}
            {(stage === "review" || stage === "executing" || stage === "verified") && intent && (
              <div className="animate-fade-in rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)]">
                <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <span className="mono text-[10px] font-semibold uppercase tracking-widest text-blue-400">
                    Step 1 — Governed Request
                  </span>
                </div>
                <div className="space-y-2 px-4 py-3">
                  {[
                    { label: "Intent",  value: value },
                    { label: "Action",  value: intent.action },
                    { label: "Scope",   value: intent.scope },
                    { label: "Policy",  value: intent.policy },
                  ].map(({ label, value: val }) => (
                    <div key={label} className="flex gap-3">
                      <span className="mono w-14 shrink-0 text-[11px] text-[var(--text-4)]">{label}</span>
                      <span className="mono text-[11px] text-[var(--text-2)]">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 — Approval Gate */}
            {stage === "review" && intent && (
              <div className="animate-fade-in rounded-xl border border-violet-500/30 bg-[var(--bg-surface)]">
                <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                  <span className="mono text-[10px] font-semibold uppercase tracking-widest text-violet-400">
                    Step 2 — Approval Required
                  </span>
                </div>
                <div className="px-4 py-3">
                  <p className="mono mb-3 text-[11px] leading-6 text-[var(--text-3)]">
                    Review the exact request before anything runs.
                    This gate cannot be bypassed.
                  </p>
                  <div className="mono mb-4 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-[11px] text-[var(--text-2)]">
                    {intent.action} · {intent.scope}
                  </div>
                  <button
                    onClick={handleApprove}
                    className="w-full rounded-lg border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-xs font-semibold text-violet-400 transition-colors hover:bg-violet-500/20"
                  >
                    Approve this request →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 — Executing (transition) */}
            {stage === "executing" && (
              <div className="animate-fade-in rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)]">
                <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-2.5">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                  <span className="mono text-[10px] font-semibold uppercase tracking-widest text-amber-400">
                    Executing…
                  </span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3">
                  <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
                  <span className="mono text-[11px] text-[var(--text-3)]">
                    Running approved request · Recording artifact…
                  </span>
                </div>
              </div>
            )}

            {/* Step 3 — VERIFIED */}
            {stage === "verified" && intent && (
              <div className="animate-fade-in rounded-xl border border-emerald-500/30 bg-[var(--bg-surface)]">
                <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="mono text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                    Step 3 — Verified
                  </span>
                </div>
                <div className="px-4 py-3">
                  <div className="mono mb-2 flex items-center gap-2 text-[11px] text-[var(--text-2)]">
                    <span className="text-emerald-400">✓</span>
                    <span>{intent.resultLine}</span>
                  </div>
                  <div className="mono text-[10px] leading-6 text-[var(--text-4)]">
                    Artifact recorded · Replay available · No drift detected
                  </div>
                  <button
                    onClick={handleReset}
                    className="mono mt-3 text-[10px] text-[var(--text-4)] underline underline-offset-2 hover:text-[var(--text-2)] transition-colors"
                  >
                    Try another request ↺
                  </button>
                </div>
              </div>
            )}

            {/* Idle placeholder */}
            {stage === "idle" && (
              <div className="flex h-full min-h-[200px] items-center justify-center rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-elevated)]">
                <div className="text-center">
                  <AppIcon size={32} className="mx-auto mb-3 opacity-30" />
                  <p className="mono text-xs text-[var(--text-4)]">
                    Pick an example or type your own request
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Download bar ───────────────────────────────────────────────── */}
        <div
          className={`mt-10 overflow-hidden transition-all duration-700 ease-out ${
            showDownload ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-xl border border-emerald-500/20 bg-[var(--bg-surface)] px-6 py-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mono text-xs font-semibold text-emerald-400">
                  That&apos;s exactly what UseSteady does on your real codebase.
                </p>
                <p className="mono mt-1 text-[11px] text-[var(--text-4)]">
                  Every run recorded, replayable, and verifiable. We&apos;re selecting the first cohort now.
                </p>
              </div>
              <a
                href="https://x.com/UseSteady"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary interactive-lift shrink-0 text-center text-xs"
              >
                Join the Alpha →
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
