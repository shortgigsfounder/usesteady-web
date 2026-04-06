const canDo = [
  {
    group: "Local codebase",
    items: [
      "Read and analyse files in a local repo",
      "Apply targeted patches to specific files",
      "Run test suites and surface results",
      "Commit with a structured, reviewable message",
    ],
  },
  {
    group: "Audit & verification",
    items: [
      "Export the full execution log as JSON",
      "Replay any past run and verify it against the recorded artifact",
      "Every mutation requires your explicit approval before it touches anything",
    ],
  },
  {
    group: "Runtime",
    items: [
      "Runs locally with Ollama — no data leaves your machine",
      "Works on macOS, Windows, and Linux",
    ],
  },
];

const cannotYet = [
  {
    item:       "Deploy to production or managed cloud environments",
    constraint: "Remote execution needs a different governance model — not ready.",
  },
  {
    item:       "Manage cloud resources (AWS, GCP, Azure)",
    constraint: "Cloud ops cannot be fully audited in this version.",
  },
  {
    item:       "Operate across multiple repositories",
    constraint: "Cross-repo scope resolution is not yet implemented.",
  },
  {
    item:       "Integrate into CI/CD pipelines as a step",
    constraint: "Headless mode requires an unattended approval model.",
  },
  {
    item:       "Team workflows and role-based approval routing",
    constraint: "Multi-user policy routing is in design.",
  },
  {
    item:       "Run headlessly without human oversight",
    constraint: "The gate requires a human in the loop. That is the point.",
  },
];

export default function Capability() {
  return (
    <section className="section-shell border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl">

        <p className="section-label">Scope</p>
        <h2 className="section-title mt-2">What this version does. Exactly.</h2>
        <p className="section-copy mt-3 max-w-xl">
          No capability is implied. If it&apos;s not in this list, it does not
          exist in this build.
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">

          {/* ── In scope ─────────────────────────────────────────────────── */}
          <div className="card p-5 md:p-6">
            <div className="mb-5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <p className="mono text-[10px] font-semibold uppercase tracking-widest text-emerald-500">
                In scope today
              </p>
            </div>

            <div className="space-y-6">
              {canDo.map((group) => (
                <div key={group.group}>
                  <p className="mono mb-2.5 text-[10px] uppercase tracking-widest text-[var(--text-4)]">
                    {group.group}
                  </p>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mono mt-[5px] shrink-0 text-[10px] font-bold text-emerald-500">
                          ✓
                        </span>
                        <p className="text-sm leading-7 text-[var(--text-2)]">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ── Not yet ──────────────────────────────────────────────────── */}
          <div className="flex flex-col">
            <div className="card flex-1 p-5 md:p-6">
              <div className="mb-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--text-5)]" />
                <p className="mono text-[10px] font-semibold uppercase tracking-widest text-[var(--text-4)]">
                  Not yet
                </p>
              </div>
              <p className="mono mb-5 text-[11px] leading-5 text-[var(--text-4)]">
                We add capabilities when they can be fully governed.
              </p>

              <ul className="space-y-4">
                {cannotYet.map(({ item, constraint }) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mono mt-[5px] shrink-0 text-[10px] text-[var(--text-5)]">
                      —
                    </span>
                    <div>
                      <p className="text-sm leading-6 text-[var(--text-3)]">{item}</p>
                      <p className="mono mt-0.5 text-[10px] leading-5 text-[var(--text-4)]">
                        {constraint}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Alpha callout */}
            <div className="mt-3 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="mono text-[11px] leading-5 text-[var(--text-4)]">
                Alpha testers shape what gets built next.
              </p>
              <a
                href="https://x.com/UseSteady"
                target="_blank"
                rel="noopener noreferrer"
                className="mono text-[11px] font-semibold text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors whitespace-nowrap"
              >
                Follow @UseSteady →
              </a>
            </div>
          </div>
        </div>

        {/* Philosophy line */}
        <div className="mt-6 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-5 py-3.5">
          <p className="mono text-xs leading-6 text-[var(--text-3)]">
            <span className="text-[var(--text-1)] font-semibold">Limitations are a design decision, not a roadmap gap.</span>{" "}
            Every boundary exists because the capability cannot yet be executed under full governance.
            When it can, it ships.
          </p>
        </div>

      </div>
    </section>
  );
}
