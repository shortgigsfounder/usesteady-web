import { AppIcon } from "@/components/ui/AppIcon";

function HeroVisual() {
  return (
    <div className="hidden lg:flex lg:items-start lg:justify-center lg:pt-4">
      <div className="w-72 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-7">

        {/* Brand mark — large */}
        <div className="relative mb-6 flex justify-center">
          {/* Ambient glow */}
          <div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{ background: "radial-gradient(ellipse, rgba(34,197,94,0.12) 0%, transparent 70%)" }}
          />
          <AppIcon size={64} className="relative" />
        </div>

        {/* Flow strip */}
        <div className="mb-6 flex items-center justify-between gap-1">
          {[
            { dot: "bg-blue-500",    label: "Intent",   color: "text-blue-400" },
            { dot: null,             label: "→",         color: "text-[var(--text-5)]" },
            { dot: "bg-violet-500",  label: "Gate",     color: "text-violet-400" },
            { dot: null,             label: "→",         color: "text-[var(--text-5)]" },
            { dot: "bg-emerald-500", label: "Verified", color: "text-emerald-400" },
          ].map((item, i) =>
            item.dot === null ? (
              <span key={i} className="mono text-xs text-[var(--text-5)]">→</span>
            ) : (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />
                <span className={`mono text-[9px] uppercase tracking-widest ${item.color}`}>
                  {item.label}
                </span>
              </div>
            )
          )}
        </div>

        {/* Three properties */}
        <div className="mb-5 space-y-2 border-t border-[var(--border)] pt-5">
          {[
            { dot: "bg-blue-500",    label: "Deterministic",  desc: "Same inputs, same outputs" },
            { dot: "bg-violet-500",  label: "Controlled",     desc: "Policy gate before every run" },
            { dot: "bg-emerald-500", label: "Verifiable",     desc: "Replay any run, any time" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-2.5">
              <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${item.dot}`} />
              <div>
                <span className="mono text-[11px] font-semibold text-[var(--text-2)]">{item.label}</span>
                <span className="mono text-[11px] text-[var(--text-4)]"> — {item.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Philosophy */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2.5">
          <p className="mono text-[10px] leading-5 text-[var(--text-3)]">
            If it can&apos;t be reviewed, it doesn&apos;t run.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="section-shell pt-10 md:pt-16 lg:pt-24">
      <div className="section-wrap">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">

          {/* ── Left: copy ─────────────────────────────────────────────── */}
          <div className="min-w-0 flex-1">
            {/* Label */}
            <div className="pill">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500" />
              <span className="mono text-xs font-medium text-[var(--text-2)]">Private Alpha</span>
            </div>

            {/* Headline — 3xl on phones, 4xl on sm, 5xl on iPad, slightly smaller on lg (two-col) */}
            <h1 className="mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-[var(--text-1)] sm:text-4xl md:text-5xl lg:text-[2.85rem]">
              Turn plain language into controlled system execution.
            </h1>

            {/* Tension subtext — base on mobile, lg on sm+ */}
            <p className="mt-5 max-w-lg text-base font-medium leading-7 text-[var(--text-1)] sm:text-lg sm:leading-8">
              Stop running commands you didn&apos;t fully review.
            </p>
            <p className="mt-2 max-w-lg text-sm leading-7 text-[var(--text-2)] sm:text-base sm:leading-8">
              Every action is explicit, approved by you, and verifiable after the fact.
              Nothing runs silently.
            </p>

            {/* CTAs — stacked on mobile, row on sm+ */}
            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
              <a href="#demo" className="cta-primary interactive-lift">
                Watch 10-second demo
              </a>
              <a href="#transformation" className="cta-secondary interactive-lift">
                Try a real request
              </a>
            </div>
            <p className="mt-3 text-xs leading-6 text-[var(--text-4)]">
              Selecting the first cohort via X · No credit card required
            </p>

            {/* Concrete example */}
            <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] sm:mt-8 sm:max-w-xl">
              <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-2">
                <span className="mono text-[9px] uppercase tracking-widest text-[var(--text-4)]">
                  Example request
                </span>
              </div>
              <div className="px-4 py-3">
                <p className="text-sm leading-7 text-[var(--text-2)]">
                  &ldquo;Change bg-white to bg-slate-950 in app/globals.css, run the tests, then commit.&rdquo;
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="mono text-[10px] text-[var(--text-4)]">↓</span>
                  <p className="mono text-[10px] text-emerald-400">
                    Reviewed, approved, and verified — before anything executes.
                  </p>
                </div>
                <p className="mono mt-1.5 text-[10px] text-[var(--text-4)]">
                  Every run is recorded and replayable.
                </p>
              </div>
            </div>

            {/* Pipeline strip */}
            <div className="mt-8 max-w-lg border-t border-[var(--border)] pt-5 md:mt-12">
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {[
                  { label: "Compile-time policy decides", color: "text-blue-400" },
                  { label: "Runtime enforces",            color: "text-violet-400" },
                  { label: "Artifact records",            color: "text-amber-400" },
                  { label: "Replay verifies",             color: "text-emerald-400" },
                ].map((item) => (
                  <span key={item.label} className={`mono text-xs font-medium ${item.color}`}>
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: brand visual (desktop only) ────────────────────── */}
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
