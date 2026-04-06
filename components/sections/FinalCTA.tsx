export default function FinalCTA() {
  return (
    <section id="final-cta" className="section-shell border-t border-[var(--border)] pb-20 md:pb-28">
      <div className="mx-auto max-w-3xl">
        <div className="card-premium p-8 md:p-10">
          <p className="section-label">Ready?</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-[var(--text-1)] md:text-4xl">
            Know exactly what ran.{" "}
            <span className="text-[var(--text-2)]">Every time. Or don&apos;t run it at all.</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-[var(--text-2)]">
            UseSteady turns plain language into controlled, verifiable execution.
            Every action reviewed. Every outcome recorded. Nothing runs silently.
          </p>

          <div className="mt-5 space-y-2">
            {[
              "You describe — the system proposes — you confirm",
              "Mutations require your explicit approval before anything runs",
              "Every run is replayable and verifiable against recorded truth",
            ].map((point) => (
              <div key={point} className="flex items-start gap-2.5">
                <span className="mt-1 shrink-0 h-1 w-1 rounded-full bg-emerald-500" />
                <p className="text-sm leading-7 text-[var(--text-2)]">{point}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#try-it"
              className="cta-primary interactive-lift w-full text-center sm:w-auto"
            >
              Try a real request
            </a>
            <a href="#demo" className="cta-secondary interactive-lift w-full text-center sm:w-auto">
              Run the demo
            </a>
          </div>

          <div className="mt-6 flex items-center gap-3 border-t border-[var(--border)] pt-5">
            <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--text-5)]" />
            <p className="mono text-xs leading-6 text-[var(--text-4)]">
              Selecting the first cohort via X · No credit card required ·{" "}
              <a
                href="https://x.com/UseSteady"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-1 text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors min-h-[44px] flex items-center"
              >
                Follow @UseSteady →
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
