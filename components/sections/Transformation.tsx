export default function Transformation() {
  return (
    <section
      id="transformation"
      className="section-shell border-t border-[var(--border)]"
    >
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <p className="section-label">Compile-time governance</p>
        <h2 className="section-title mt-2">
          Your words become an exact request — before anything runs.
        </h2>
        <p className="section-copy mt-3 max-w-2xl">
          UseSteady doesn&apos;t interpret your intent at runtime. It compiles it into
          a deterministic, reviewable request first. Same input always produces
          the same governed request. No surprises.
        </p>

        {/* ── 3-stage pipeline ───────────────────────────────────────────────── */}
        <div className="mt-10">

          {/* Desktop: horizontal 3-col with connectors */}
          <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-start md:gap-0">

            {/* Stage 1 — Input */}
            <div className="rounded-xl border border-blue-500/25 bg-[var(--bg-surface)] overflow-hidden">
              <div className="border-b border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2.5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span className="mono text-[10px] font-semibold uppercase tracking-widest text-blue-400">
                  What you said
                </span>
              </div>
              <div className="p-5">
                <div className="rounded-lg border border-blue-500/15 bg-blue-500/5 px-4 py-4">
                  <p className="text-sm leading-7 text-[var(--text-1)]">
                    &ldquo;Run the tests. If everything passes, commit.&rdquo;
                  </p>
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    "No command syntax",
                    "No flags to remember",
                    "No script to maintain",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-blue-500" />
                      <p className="text-xs leading-6 text-[var(--text-3)]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Connector A — compile step */}
            <div className="flex flex-col items-center justify-start pt-12 px-3 gap-1.5">
              <div className="h-px w-8 bg-[var(--border-strong)]" />
              <div className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2 py-1">
                <span className="mono text-[9px] font-semibold uppercase tracking-widest text-violet-400 whitespace-nowrap">
                  compile
                </span>
              </div>
              <div className="h-px w-8 bg-[var(--border-strong)]" />
              <span className="text-[var(--text-5)] text-sm">→</span>
            </div>

            {/* Stage 2 — Compiler (the differentiator) */}
            <div className="rounded-xl border border-violet-500/30 bg-[var(--bg-surface)] overflow-hidden ring-1 ring-violet-500/10">
              <div className="border-b border-[var(--border)] bg-violet-500/5 px-4 py-2.5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                <span className="mono text-[10px] font-semibold uppercase tracking-widest text-violet-400">
                  Compiler
                </span>
              </div>
              <div className="p-5 space-y-3">
                <div className="rounded-lg border border-violet-500/20 bg-[var(--bg-elevated)] px-3 py-3">
                  <p className="mono text-[10px] leading-6 text-[var(--text-3)]">
                    Classifies intent<br />
                    Resolves scope + policy<br />
                    Builds exact action plan
                  </p>
                </div>
                <div className="space-y-1.5">
                  {[
                    { label: "Runtime LLM?",    val: "None",            color: "text-emerald-400" },
                    { label: "Deterministic?",   val: "Always",         color: "text-emerald-400" },
                    { label: "Ambiguity?",       val: "Rejected",       color: "text-red-400"     },
                  ].map(({ label, val, color }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="mono text-[10px] text-[var(--text-4)]">{label}</span>
                      <span className={`mono text-[10px] font-semibold ${color}`}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Connector B — approval step */}
            <div className="flex flex-col items-center justify-start pt-12 px-3 gap-1.5">
              <div className="h-px w-8 bg-[var(--border-strong)]" />
              <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1">
                <span className="mono text-[9px] font-semibold uppercase tracking-widest text-emerald-400 whitespace-nowrap">
                  you approve
                </span>
              </div>
              <div className="h-px w-8 bg-[var(--border-strong)]" />
              <span className="text-[var(--text-5)] text-sm">→</span>
            </div>

            {/* Stage 3 — Governed Request */}
            <div className="rounded-xl border border-emerald-500/25 bg-[var(--bg-surface)] overflow-hidden">
              <div className="border-b border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2.5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="mono text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                  What will actually run
                </span>
              </div>
              <div className="p-5">
                <div className="overflow-x-auto rounded-lg border border-emerald-600/20 bg-emerald-950/10 px-4 py-3">
                  <code className="mono block whitespace-pre text-[11px] leading-6 text-[var(--text-2)]">{`step 1  test.run_all
        scope   = src/
        policy  = read-only

step 2  git.commit          ← only if step 1 passes
        message = auto
        policy  = no-force-push`}</code>
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    "Exact — no runtime interpretation",
                    "Policy-checked at compile time",
                    "Mutations require your sign-off",
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

          {/* Mobile: vertical stack with connector lines */}
          <div className="flex flex-col gap-0 md:hidden">

            {/* Stage 1 */}
            <div className="rounded-xl border border-blue-500/25 bg-[var(--bg-surface)] overflow-hidden">
              <div className="border-b border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2.5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span className="mono text-[10px] font-semibold uppercase tracking-widest text-blue-400">What you said</span>
              </div>
              <div className="p-4">
                <div className="rounded-lg border border-blue-500/15 bg-blue-500/5 px-3 py-3">
                  <p className="text-sm leading-7 text-[var(--text-1)]">
                    &ldquo;Run the tests. If everything passes, commit.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile connector A */}
            <div className="flex items-center gap-3 px-6 py-2">
              <div className="w-px h-6 bg-[var(--border-strong)] mx-auto" />
            </div>
            <div className="flex items-center justify-center">
              <div className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5">
                <span className="mono text-[10px] font-semibold uppercase tracking-widest text-violet-400">
                  compile · deterministic · no LLM at runtime
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center py-1">
              <span className="text-[var(--text-5)]">↓</span>
            </div>

            {/* Stage 2 — Compiler */}
            <div className="rounded-xl border border-violet-500/30 bg-[var(--bg-surface)] overflow-hidden">
              <div className="border-b border-[var(--border)] bg-violet-500/5 px-4 py-2.5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                <span className="mono text-[10px] font-semibold uppercase tracking-widest text-violet-400">Compiler</span>
              </div>
              <div className="p-4">
                <div className="flex justify-between">
                  {[
                    { label: "Runtime LLM?", val: "None",    color: "text-emerald-400" },
                    { label: "Deterministic?", val: "Always", color: "text-emerald-400" },
                    { label: "Ambiguity?",    val: "Rejected", color: "text-red-400"   },
                  ].map(({ label, val, color }) => (
                    <div key={label} className="flex flex-col items-center gap-1">
                      <span className={`mono text-xs font-semibold ${color}`}>{val}</span>
                      <span className="mono text-[9px] text-[var(--text-4)]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile connector B */}
            <div className="flex items-center justify-center py-1">
              <span className="text-[var(--text-5)]">↓</span>
            </div>
            <div className="flex items-center justify-center">
              <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5">
                <span className="mono text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                  you approve
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center py-1">
              <span className="text-[var(--text-5)]">↓</span>
            </div>

            {/* Stage 3 */}
            <div className="rounded-xl border border-emerald-500/25 bg-[var(--bg-surface)] overflow-hidden">
              <div className="border-b border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2.5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="mono text-[10px] font-semibold uppercase tracking-widest text-emerald-400">What will actually run</span>
              </div>
              <div className="p-4">
                <div className="overflow-x-auto rounded-lg border border-emerald-600/20 bg-emerald-950/10 px-3 py-3">
                  <code className="mono block whitespace-pre text-[10px] leading-6 text-[var(--text-2)]">{`step 1  test.run_all
        scope  = src/
        policy = read-only

step 2  git.commit  ← if step 1 passes
        policy = no-force-push`}</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contract callout */}
        <div className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] px-5 py-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono text-xs leading-6 text-[var(--text-3)]">
            <span className="text-[var(--text-1)] font-semibold">The governed request is the contract.</span>{" "}
            The runtime executes exactly what is in it — nothing more, nothing less.
          </p>
          <a
            href="#demo"
            className="shrink-0 mono text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors whitespace-nowrap"
          >
            See the full flow →
          </a>
        </div>

      </div>
    </section>
  );
}
