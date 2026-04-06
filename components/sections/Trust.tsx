const pillars = [
  {
    word: "Deterministic",
    line: "Same inputs, same outputs. Every time. No variance between runs.",
    detail:
      "The runtime executes only what the compiler accepted. There is no interpretation step. If a run succeeded yesterday, replaying it today produces the same result.",
    color: "text-blue-400",
    border: "border-blue-500/20",
    bg: "bg-blue-500/5",
    dot: "bg-blue-500",
  },
  {
    word: "Controlled",
    line: "Nothing executes without passing through the policy gate.",
    detail:
      "Mutations are deny-by-default. Every file write, test run, and commit requires either a policy allowance or an explicit human approval before the runtime touches anything.",
    color: "text-violet-400",
    border: "border-violet-500/20",
    bg: "bg-violet-500/5",
    dot: "bg-violet-500",
  },
  {
    word: "Verifiable",
    line: "Every step is recorded. Replay it at any time and prove the outcome.",
    detail:
      "Execution artifacts are written to an append-only log. You can export the full trace as JSON, replay the exact sequence, and verify that no step deviated from the recorded truth.",
    color: "text-emerald-400",
    border: "border-emerald-600/20",
    bg: "bg-emerald-950/10",
    dot: "bg-emerald-500",
  },
] as const;

export default function Trust() {
  return (
    <section className="section-shell border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl">
        <p className="section-label">Trust model</p>
        <h2 className="section-title mt-2">Three properties. Non-negotiable.</h2>
        <p className="section-copy mt-3 max-w-xl">
          These are architectural constraints, not marketing claims. They are enforced at the
          runtime level, not configured away.
        </p>

        <div className="mt-6 inline-block rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-4 py-3">
          <p className="mono text-sm font-semibold text-[var(--text-1)]">
            If it can&apos;t be reviewed, it doesn&apos;t run.
          </p>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {pillars.map((p) => (
            <article key={p.word} className={`rounded-lg border p-5 md:p-6 ${p.border} ${p.bg}`}>
              <div className="flex items-center gap-2.5 mb-3">
                <span className={`h-2 w-2 rounded-full ${p.dot}`} />
                <h3 className={`mono text-sm font-semibold ${p.color}`}>{p.word}</h3>
              </div>
              <p className="text-base font-medium leading-7 tracking-tight text-[var(--text-1)]">
                {p.line}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--text-2)]">{p.detail}</p>
            </article>
          ))}
        </div>

        {/* Invariant strip */}
        <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] px-5 py-4">
          <p className="mono mb-3 text-[10px] uppercase tracking-widest text-[var(--text-4)]">
            System invariant
          </p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Planner is untrusted",
              "Compiler is authoritative",
              "Runtime enforces, never interprets",
              "UI displays recorded truth only",
            ].map((rule) => (
              <div key={rule} className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-500" />
                <p className="mono text-xs leading-6 text-[var(--text-2)]">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
