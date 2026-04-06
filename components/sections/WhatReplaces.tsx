const before = [
  {
    label: "Scripts you didn't verify",
    desc: "They ran. Something changed. You're not sure what. There's no trace.",
  },
  {
    label: "Automation you can't audit",
    desc: "Schedulers and CI jobs mutate state with no record of what they decided.",
  },
  {
    label: "AI that runs without review",
    desc: "Models that interpret broadly and act immediately — no gate, no approval.",
  },
  {
    label: "Commands executed before you see them",
    desc: "You see the output. You never confirmed what ran to produce it.",
  },
];

const after = [
  {
    label: "Every action is explicit",
    desc: "Governed requests only. Typed, auditable, policy-checked before planning.",
  },
  {
    label: "Full audit trail",
    desc: "Append-only timeline. Every step recorded, exportable, and replayable.",
  },
  {
    label: "Policy gate before every mutation",
    desc: "Compiler validates. You approve. Runtime enforces. That order never changes.",
  },
  {
    label: "Nothing runs without your confirmation",
    desc: "You reviewed exactly what will execute — before it executes.",
  },
];

export default function WhatReplaces() {
  return (
    <section className="section-shell border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl">
        <p className="section-label">The problem it solves</p>
        <h2 className="section-title mt-2">What this replaces</h2>
        <p className="mt-3 text-base font-medium text-[var(--text-2)]">
          Most tools execute. They don&apos;t explain what actually ran.
        </p>
        <p className="section-copy mt-2 max-w-xl">
          Three patterns that quietly cause outages, drift, and lost trust — and what UseSteady does instead.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--border)] lg:grid lg:grid-cols-2">
          {/* BEFORE */}
          <div className="border-b border-[var(--border)] p-6 lg:border-b-0 lg:border-r md:p-7">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <p className="mono text-[10px] font-semibold uppercase tracking-widest text-red-400">
                Before
              </p>
            </div>
            <ul className="space-y-5">
              {before.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="mono mt-[3px] shrink-0 text-[11px] font-bold text-red-500">✕</span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-1)]">{item.label}</p>
                    <p className="mt-0.5 text-xs leading-6 text-[var(--text-3)]">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* AFTER */}
          <div className="p-6 md:p-7">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <p className="mono text-[10px] font-semibold uppercase tracking-widest text-emerald-500">
                With UseSteady
              </p>
            </div>
            <ul className="space-y-5">
              {after.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="mono mt-[3px] shrink-0 text-[11px] font-bold text-emerald-500">✓</span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-1)]">{item.label}</p>
                    <p className="mt-0.5 text-xs leading-6 text-[var(--text-3)]">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
