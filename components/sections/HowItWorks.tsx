const steps = [
  {
    n: "01",
    name: "Describe",
    detail: "Tell the system what you want in plain English. No commands, no flags, no scripts.",
    color: "text-blue-400",
    dot: "bg-blue-500",
    highlight: false,
  },
  {
    n: "02",
    name: "Review the exact request",
    detail: "Before anything runs, you see every step. This is the moment that sets UseSteady apart.",
    color: "text-violet-400",
    dot: "bg-violet-500",
    highlight: true,
  },
  {
    n: "03",
    name: "Approve",
    detail: "Mutations require your explicit sign-off. Read-only steps run automatically.",
    color: "text-amber-400",
    dot: "bg-amber-500",
    highlight: false,
  },
  {
    n: "04",
    name: "Execute + Verify",
    detail: "The runtime enforces the plan exactly. Every step is recorded and replayable.",
    color: "text-emerald-400",
    dot: "bg-emerald-500",
    highlight: false,
  },
] as const;

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-shell border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl">
        <p className="section-label">How it works</p>
        <h2 className="section-title mt-2">Four steps. Nothing hidden.</h2>
        <p className="section-copy mt-3 max-w-xl">
          Every request follows the same path. You stay in control at every gate.
        </p>

        {/* Desktop pipeline */}
        <div className="mt-10 hidden lg:flex lg:items-stretch lg:gap-0">
          {steps.map((step, idx) => (
              <div key={step.n} className="flex flex-1 items-stretch">
              <div className={`flex-1 p-6 ${step.highlight ? "rounded-lg border border-violet-500/40 bg-violet-500/5" : "card-sm hover:border-[var(--border-strong)]"}`}>
                <div className="flex items-center gap-2.5">
                  <span className={`h-2 w-2 rounded-full ${step.dot}`} />
                  <span className={`mono text-[11px] font-semibold tracking-wide ${step.color}`}>
                    {step.n}
                  </span>
                </div>
                <p className="mt-4 text-base font-semibold tracking-tight text-[var(--text-1)]">
                  {step.name}
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--text-2)]">{step.detail}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className="flex w-8 flex-shrink-0 items-center justify-center">
                  <span className="text-[var(--text-5)]">→</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
          {steps.map((step) => (
            <div key={step.n} className={`p-4 ${step.highlight ? "rounded-lg border border-violet-500/40 bg-violet-500/5" : "card-sm hover:border-[var(--border-strong)]"}`}>
              <div className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${step.dot}`} />
                <span className={`mono text-[11px] font-semibold ${step.color}`}>{step.n}</span>
              </div>
              <p className="mt-3 text-sm font-semibold tracking-tight text-[var(--text-1)]">
                {step.name}
              </p>
              <p className="mt-1.5 text-sm leading-6 text-[var(--text-2)]">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
