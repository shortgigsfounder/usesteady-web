const canDo = [
  "Read and analyse files in a local repo",
  "Apply targeted patches to specific files",
  "Run test suites and surface results",
  "Commit changes with a structured message",
  "Export a full execution log as JSON",
  "Replay any past run and verify it matches the recorded artifact",
  "Require human approval before any mutation",
  "Run locally with Ollama — no cloud required",
];

const cannotYet = [
  "Deploy to production or managed cloud environments",
  "Manage cloud resources (AWS, GCP, Azure)",
  "Operate across multiple repositories simultaneously",
  "Integrate with CI/CD pipelines as a step",
  "Support teams and role-based approval routing",
  "Run headlessly in unattended mode",
];

export default function Capability() {
  return (
    <section className="section-shell border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl">
        <p className="section-label">Scope</p>
        <h2 className="section-title mt-2">What you can do — and what you cannot do yet</h2>
        <p className="mt-2 text-base font-medium text-[var(--text-2)]">
          Focused by design. Expanding carefully.
        </p>
        <p className="section-copy mt-2 max-w-xl">
          No capability is implied. If it is not in this list, it does not exist.
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {/* Can do */}
          <div className="card p-5 md:p-6">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <p className="mono text-[10px] font-semibold uppercase tracking-widest text-emerald-500">
                What you can do
              </p>
            </div>
            <ul className="space-y-2.5">
              {canDo.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mono mt-[5px] shrink-0 text-[10px] font-bold text-emerald-500">✓</span>
                  <p className="text-sm leading-7 text-[var(--text-2)]">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Cannot yet */}
          <div className="card p-5 md:p-6">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[var(--text-4)]" />
              <p className="mono text-[10px] font-semibold uppercase tracking-widest text-[var(--text-4)]">
                What you cannot do yet
              </p>
            </div>
            <ul className="space-y-2.5">
              {cannotYet.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mono mt-[5px] shrink-0 text-[10px] font-bold text-[var(--text-5)]">—</span>
                  <p className="text-sm leading-7 text-[var(--text-3)]">{item}</p>
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2.5">
              <p className="mono text-[10px] leading-5 text-[var(--text-4)]">
                These capabilities are on the roadmap. Alpha testers shape priority.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
