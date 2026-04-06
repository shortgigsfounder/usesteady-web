export default function Quickstart() {
  return (
    <section id="quickstart" className="section-shell border-t border-[var(--border)]">
      <div className="mx-auto max-w-5xl">
        <p className="section-label">Get started</p>
        <h2 className="section-title mt-2">Download and run</h2>
        <p className="section-copy mt-3">
          No git clone required. One-click installer opens directly to the Control Surface.
        </p>

        <div className="card mt-8 p-6 md:p-8">
          {/* Download buttons */}
          <div className="grid gap-3 sm:grid-cols-3">
            {["macOS", "Windows", "Linux"].map((platform) => (
              <button
                key={platform}
                type="button"
                disabled
                aria-disabled="true"
                className="flex items-center justify-between rounded border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3.5 text-sm text-[var(--text-4)] cursor-not-allowed opacity-60"
              >
                <span className="font-medium">{platform}</span>
                <span className="mono text-[10px] uppercase tracking-wide">Coming soon</span>
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[var(--text-1)]">Private Alpha</p>
              <p className="mt-1 text-xs leading-6 text-[var(--text-2)]">
                We are selecting the first cohort carefully via X.
              </p>
            </div>
            <a
              href="https://x.com/UseSteady"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary interactive-lift shrink-0"
            >
              Join on X →
            </a>
          </div>

          {/* Source access note */}
          <div className="mt-4 rounded border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3.5">
            <p className="mono mb-1 text-[10px] uppercase tracking-widest text-[var(--text-4)]">Source access</p>
            <p className="text-xs leading-6 text-[var(--text-3)]">
              Repository access is granted only to approved alpha participants.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
