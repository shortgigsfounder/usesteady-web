export default function Transformation() {
  return (
    <section
      id="transformation"
      className="section-shell border-t border-[var(--border)]"
    >
      <div className="mx-auto max-w-6xl">
        <p className="section-label">How the translation works</p>
        <h2 className="section-title mt-2">From what you say to what will actually run</h2>
        <p className="section-copy mt-3 max-w-2xl">
          UseSteady does not interpret your intent at runtime. It proposes an exact, reviewable
          request first — and nothing executes until you confirm it.
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_auto_1fr]">

          {/* LEFT — What you said */}
          <div className="min-w-0">
            <p className="mb-2 text-xs font-semibold text-[var(--text-4)]">What you said</p>
          <div className="card min-w-0 overflow-hidden">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--border)]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--border)]" />
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500/60" />
              </div>
              <span className="mono text-[10px] font-semibold uppercase tracking-widest text-blue-400">
                What you said
              </span>
            </div>
            <div className="p-4 sm:p-5">
              <p className="mono mb-3 text-[10px] uppercase tracking-widest text-[var(--text-4)]">
                Plain language — no syntax required
              </p>
              <div className="rounded border border-blue-500/20 bg-blue-500/5 px-3 py-3 sm:px-4 sm:py-4">
                <p className="text-sm leading-7 text-[var(--text-1)]">
                  &ldquo;Change bg-white to bg-slate-950 in app/globals.css, run the tests, then commit.&rdquo;
                </p>
              </div>
              <div className="mt-4 space-y-2">
                {["No command syntax required", "No flags to remember", "No script to maintain"].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-blue-500" />
                      <p className="text-xs leading-6 text-[var(--text-3)]">{item}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          </div>

          {/* MIDDLE — Transformed into a governed request */}
          <div className="flex items-center justify-center lg:flex-col lg:gap-2">
            <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-2">
              <div className="h-8 w-px bg-[var(--border)]" />
              <div className="rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1.5">
                <span className="mono text-center text-[9px] uppercase tracking-widest text-[var(--text-3)]">
                  Transformed
                </span>
              </div>
              <span className="text-lg text-[var(--text-3)]">↓</span>
              <div className="h-8 w-px bg-[var(--border)]" />
            </div>
            <div className="flex w-full items-center gap-3 lg:hidden">
              <div className="h-px flex-1 bg-[var(--border)]" />
              <span className="mono shrink-0 text-[10px] uppercase tracking-widest text-[var(--text-4)]">
                Transformed into a governed request ↓
              </span>
              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>
          </div>

          {/* RIGHT — What will actually run */}
          <div className="min-w-0">
            <p className="mb-2 text-xs font-semibold text-[var(--text-4)]">What will actually run</p>
          <div className="card min-w-0 overflow-hidden">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--border)]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--border)]" />
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="mono text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                What will actually run
              </span>
            </div>
            <div className="p-4 sm:p-5">
              <p className="mono mb-3 text-[10px] uppercase tracking-widest text-[var(--text-4)]">
                Proposed by system — you confirm before anything executes
              </p>
              <div className="overflow-x-auto rounded border border-emerald-600/25 bg-emerald-950/10 px-3 py-3 sm:px-4 sm:py-4">
                <code className="mono block whitespace-pre text-xs leading-6 text-[var(--text-2)]">{`patch app/globals.css
  search="bg-white"
  replace="bg-slate-950"
then test
then commit "chore: update background"`}</code>
              </div>
              <div className="mt-4 space-y-2">
                {[
                  "Exact — no interpretation at runtime",
                  "Policy-checked before a plan is formed",
                  "Mutations require your approval",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
                    <p className="text-xs leading-6 text-[var(--text-3)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>

        <p className="mt-5 text-center text-xs leading-6 text-[var(--text-4)]">
          The governed request is the contract. The runtime executes exactly what is in it — nothing more.
        </p>
      </div>
    </section>
  );
}
