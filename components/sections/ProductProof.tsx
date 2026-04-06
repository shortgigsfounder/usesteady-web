import DemoWalkthrough from "@/components/ui/DemoWalkthrough";

export default function ProductProof() {
  return (
    <section id="demo" className="section-shell border-t border-[var(--border)]">
      <div className="section-wrap">

        <p className="section-label">Demo</p>
        <h2 className="section-title mt-2 max-w-2xl">
          Review it. Approve it. Then it runs.
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--text-3)] max-w-xl">
          Nothing executes until you see the exact request — every step, every tool call, every mutation.
          Walk through the full flow below.
        </p>

        <div className="mt-10">
          <DemoWalkthrough />
        </div>

        {/* Trust rule strip */}
        <div className="mt-12 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]">
          <div className="grid grid-cols-2 divide-x divide-y divide-[var(--border)] lg:grid-cols-4 lg:divide-y-0">
            {[
              { label: "Compile-time policy decides", color: "text-blue-400" },
              { label: "Runtime enforces",            color: "text-violet-400" },
              { label: "Artifact records",            color: "text-amber-400" },
              { label: "Replay verifies",             color: "text-emerald-400" },
            ].map((rule) => (
              <div key={rule.label} className="px-5 py-4">
                <p className={`mono text-xs font-semibold leading-5 ${rule.color}`}>
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
