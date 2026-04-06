const rows = [
  {
    dimension: "Intent Handling",
    usesteady: "Executes only explicit typed grammar",
    cursor: "Natural language and broad goals",
    advantage: true,
  },
  {
    dimension: "Safety Model",
    usesteady: "Deny-by-default policies + approval gates",
    cursor: "Flexible guardrails, varies by workflow",
    advantage: true,
  },
  {
    dimension: "Auditability",
    usesteady: "Append-only timeline + full export/replay",
    cursor: "Session logs — rarely production-grade",
    advantage: true,
  },
  {
    dimension: "Determinism",
    usesteady: "Fully deterministic runtime loop",
    cursor: "Probabilistic by default",
    advantage: true,
  },
  {
    dimension: "Best Use Case",
    usesteady: "Controlled, high-trust execution & compliance",
    cursor: "Fast ideation and exploration",
    advantage: false,
  },
];

export default function Comparison() {
  return (
    <section className="section-shell border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl">
        <p className="section-label">Positioning</p>
        <h2 className="section-title mt-2">UseSteady is / is not</h2>
        <p className="section-copy mt-3 max-w-2xl">
          AI assistants help you think and draft. UseSteady helps you execute safely — with proof.
          They are complementary tools, not competitors.
        </p>

        {/* Desktop table */}
        <div className="card mt-8 hidden overflow-hidden md:block">
          <div className="grid grid-cols-[1fr_1.4fr_1.4fr] border-b border-[var(--border)] bg-[var(--bg-elevated)]">
            <div className="mono px-5 py-3 text-[10px] uppercase tracking-widest text-[var(--text-4)]">
              Dimension
            </div>
            <div className="mono border-l border-[var(--border)] px-5 py-3 text-[10px] uppercase tracking-widest text-blue-400">
              UseSteady
            </div>
            <div className="mono border-l border-[var(--border)] px-5 py-3 text-[10px] uppercase tracking-widest text-[var(--text-4)]">
              Cursor / Claude Code
            </div>
          </div>

          {rows.map((row, idx) => (
            <div
              key={row.dimension}
              className={`grid grid-cols-[1fr_1.4fr_1.4fr] ${
                idx !== rows.length - 1 ? "border-b border-[var(--border)]" : ""
              } hover:bg-[var(--bg-elevated)] transition-colors duration-150`}
            >
              <div className="px-5 py-4 text-sm font-medium leading-7 text-[var(--text-1)]">{row.dimension}</div>
              <div className="border-l border-[var(--border)] px-5 py-4">
                <div className="flex items-start gap-2">
                  {row.advantage && (
                    <span className="mt-0.5 shrink-0 text-emerald-500 text-xs">✓</span>
                  )}
                  <p className="text-sm leading-7 text-[var(--text-1)]">{row.usesteady}</p>
                </div>
              </div>
              <div className="border-l border-[var(--border)] px-5 py-4 text-sm leading-7 text-[var(--text-3)]">
                {row.cursor}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile cards */}
        <div className="mt-6 space-y-3 md:hidden">
          {rows.map((row) => (
            <div key={row.dimension} className="card p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-2)]">
                {row.dimension}
              </p>
              <div className="mt-3 rounded border border-blue-500/20 bg-blue-500/5 p-3">
                <p className="mono text-[9px] uppercase tracking-widest text-blue-400 mb-1.5">UseSteady</p>
                <p className="text-sm leading-7 text-[var(--text-1)]">{row.usesteady}</p>
              </div>
              <div className="mt-2 rounded border border-[var(--border)] bg-[var(--bg-elevated)] p-3">
                <p className="mono text-[9px] uppercase tracking-widest text-[var(--text-4)] mb-1.5">
                  Cursor / Claude Code
                </p>
                <p className="text-sm leading-7 text-[var(--text-3)]">{row.cursor}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
