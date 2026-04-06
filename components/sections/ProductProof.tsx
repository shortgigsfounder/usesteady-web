import DemoVideo from "@/components/ui/DemoVideo";

export default function ProductProof() {
  return (
    <section id="demo" className="section-shell border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl">
        <p className="section-label">Demo</p>

        {/* Two-column layout: video (left) + copy (right) */}
        {/* md = iPad portrait (768px), lg = desktop (1024px) */}
        <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-start md:gap-10 lg:gap-14">

          {/* Video */}
          <div className="w-full md:flex-1">
            <DemoVideo />
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded border border-emerald-600/30 bg-emerald-950/20 px-2.5 py-1">
                <span className="mono text-[10px] font-semibold text-emerald-400">✓ VERIFIED</span>
              </span>
              <p className="mono text-[11px] text-[var(--text-4)]">
                Replay matched exactly. No drift.
              </p>
            </div>
          </div>

          {/* Copy panel */}
          <div className="flex w-full flex-col justify-center md:w-56 md:shrink-0 lg:w-72">
            <h2 className="section-title">
              Review it. Approve it.<br className="hidden sm:block" /> Then it runs.
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--text-3)]">
              Nothing executes until you see the exact request — every step, every tool call, every mutation.
            </p>

            <ul className="mt-8 space-y-5">
              {[
                {
                  dot:  "bg-blue-500",
                  head: "Review before execution",
                  body: "See the full plan — every step, every tool call — before it runs.",
                },
                {
                  dot:  "bg-amber-500",
                  head: "Approve with full context",
                  body: "Each gate shows exactly what will change and why approval is required.",
                },
                {
                  dot:  "bg-emerald-500",
                  head: "Verify what actually ran",
                  body: "Replay confirms the artifact matches the approved plan. No drift.",
                },
              ].map((item) => (
                <li key={item.head} className="flex gap-3.5">
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.dot}`} />
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-1)]">{item.head}</p>
                    <p className="mt-0.5 text-sm leading-6 text-[var(--text-3)]">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Jump links */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#transformation"
                className="cta-secondary py-2 px-4 text-sm"
              >
                Try a real request
              </a>
            </div>
          </div>
        </div>

        {/* Trust rule strip */}
        <div className="mt-10 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)]">
          <div className="grid grid-cols-2 gap-0 divide-x divide-y divide-[var(--border)] lg:grid-cols-4 lg:divide-y-0">
            {[
              { label: "Compile-time policy decides", color: "text-blue-400" },
              { label: "Runtime enforces",            color: "text-violet-400" },
              { label: "Artifact records",            color: "text-amber-400" },
              { label: "Replay verifies",             color: "text-emerald-400" },
            ].map((rule) => (
              <div key={rule.label} className="px-4 py-4 md:px-5">
                <p className={`mono text-[10px] leading-5 font-semibold ${rule.color}`}>
                  {rule.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
