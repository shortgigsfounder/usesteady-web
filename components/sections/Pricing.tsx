const freeTier = [
  "Local runtime + Control Surface",
  "Policy-governed explicit execution",
  "Analyze with Ollama (local-first)",
  "Timeline, export, and replay",
  "Unlimited runs",
];

const proTier = [
  "Everything in Free",
  "Multi-provider support (xAI Grok, OpenAI, Anthropic)",
  "Usage dashboard + real cost visibility",
  "Team policy packs & advanced audit exports",
  "Operational insights (approval patterns, retry rates)",
];

export default function Pricing() {
  return (
    <section id="pricing" className="section-shell border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl">
        <p className="section-label">Pricing</p>
        <h2 className="section-title mt-2">Simple, transparent pricing</h2>
        <p className="section-copy mt-3">
          We charge for governance and visibility — not for hype.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {/* Free */}
          <article className="card-premium p-6 md:p-7">
            <p className="mono text-[10px] uppercase tracking-widest text-[var(--text-4)]">Free</p>
            <h3 className="mt-2 text-xl font-semibold text-[var(--text-1)]">Local First</h3>
            <div className="mt-2 flex items-end gap-1">
              <span className="text-3xl font-semibold text-[var(--text-1)]">$0</span>
              <span className="pb-1 text-sm text-[var(--text-3)]">forever</span>
            </div>

            <ul className="mt-5 space-y-2.5">
              {freeTier.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 shrink-0 text-[var(--text-4)] text-xs">·</span>
                  <p className="text-sm leading-7 text-[var(--text-2)]">{item}</p>
                </li>
              ))}
            </ul>

            <a
              href="https://x.com/UseSteady"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-secondary interactive-lift mt-6 w-full justify-center"
            >
              Join Private Alpha →
            </a>
          </article>

          {/* Pro */}
          <article className="card-premium border border-blue-500/25 p-6 md:p-7">
            <div className="flex items-center gap-2">
              <p className="mono text-[10px] uppercase tracking-widest text-[var(--text-2)]">Pro</p>
              <span className="rounded border border-blue-500/30 bg-blue-500/10 px-1.5 py-0.5 mono text-[9px] font-semibold text-blue-400">
                Recommended for teams
              </span>
            </div>
            <h3 className="mt-2 text-xl font-semibold text-[var(--text-1)]">Team Governance</h3>
            <div className="mt-2 flex items-end gap-1">
              <span className="text-3xl font-semibold text-[var(--text-1)]">$19</span>
              <span className="pb-1 text-sm text-[var(--text-3)]">/user/month · billed annually</span>
            </div>

            <ul className="mt-5 space-y-2.5">
              {proTier.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 shrink-0 text-blue-400 text-xs">·</span>
                  <p className="text-sm leading-7 text-[var(--text-2)]">{item}</p>
                </li>
              ))}
            </ul>

            <a
              href="https://x.com/UseSteady"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary interactive-lift mt-6 w-full justify-center"
            >
              Join Private Alpha →
            </a>
          </article>
        </div>

        {/* Enterprise note */}
        <div className="mt-4 flex flex-col gap-1 rounded border border-[var(--border)] bg-[var(--bg-surface)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--text-1)]">Enterprise</p>
            <p className="mt-0.5 text-xs leading-6 text-[var(--text-3)]">
              Centralized billing · Signed audit bundles · RBAC · SOC2-style reports · On-prem
            </p>
          </div>
          <a
            href="https://x.com/UseSteady"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs font-semibold text-[var(--text-2)] transition-colors duration-150 hover:text-[var(--text-1)]"
          >
            Contact us →
          </a>
        </div>
      </div>
    </section>
  );
}
