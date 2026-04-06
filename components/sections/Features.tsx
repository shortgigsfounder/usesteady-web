const guarantees = [
  {
    id: "01",
    title: "Explicit commands only",
    points: [
      "Only typed, auditable commands run",
      "No broad natural-language execution",
      "No hidden side effects",
      "Every action evaluated against policy before execution",
    ],
  },
  {
    id: "02",
    title: "Full audit trail",
    points: [
      "Append-only execution timeline",
      "Plan → Policy → Execute → Verify",
      "Artifacts exported as structured JSON",
      "Replay exact sequences at any point",
    ],
  },
  {
    id: "03",
    title: "Policy-governed approvals",
    points: [
      "Deny-by-default for mutations",
      "Explicit human approval gates for fs.apply_patch, git.commit",
      "Read-only operations run without gates",
      "Policy verdict stamped at compile time",
    ],
  },
  {
    id: "04",
    title: "Local-first analysis",
    points: [
      "Local Ollama by default",
      "Read-only analysis with enforced JSON schema",
      "Cloud usage includes explicit cost warnings",
      "No telemetry without explicit opt-in",
    ],
  },
];

export default function Features() {
  return (
    <section className="section-shell border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl">
        <p className="section-label">Trust guarantees</p>
        <h2 className="section-title mt-2">What UseSteady promises</h2>
        <p className="section-copy mt-3 max-w-2xl">
          Not marketing claims. Enforceable architectural constraints built into the runtime.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {guarantees.map((g) => (
            <article key={g.id} className="card p-5 hover:border-[var(--border-strong)] md:p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="mono text-[11px] font-semibold text-[var(--text-4)]">{g.id}</span>
                <h3 className="text-sm font-semibold tracking-tight text-[var(--text-1)]">{g.title}</h3>
              </div>
              <ul className="space-y-2.5">
                {g.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="mt-1 shrink-0 h-1 w-1 rounded-full bg-[var(--text-4)]" />
                    <p className="text-sm leading-7 text-[var(--text-2)]">{point}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Core invariant strip */}
        <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] p-5 md:p-6">
          <p className="mono mb-3 text-[10px] uppercase tracking-widest text-[var(--text-4)]">Core invariant</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Planner is untrusted",
              "Compiler is authoritative",
              "Runtime enforces, never interprets",
              "UI displays recorded truth only",
            ].map((rule) => (
              <div key={rule} className="flex items-start gap-2">
                <span className="mt-1 shrink-0 h-1 w-1 rounded-full bg-blue-500" />
                <p className="mono text-xs leading-6 text-[var(--text-2)]">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
