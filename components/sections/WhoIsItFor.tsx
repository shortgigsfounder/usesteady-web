const audiences = [
  {
    title: "DevOps engineers",
    desc: "You automate infrastructure. You need to know exactly what changed, what ran, and why — with a record you can replay.",
    dot: "bg-blue-500",
    accent: "text-blue-400",
  },
  {
    title: "Backend engineers",
    desc: "You write scripts and push changes. You want a safety net that shows you what will run before it touches anything.",
    dot: "bg-violet-500",
    accent: "text-violet-400",
  },
  {
    title: "Security & compliance teams",
    desc: "You need an immutable audit trail. Every action, every approval, every outcome — recorded and exportable.",
    dot: "bg-amber-500",
    accent: "text-amber-400",
  },
  {
    title: "Indie devs tired of guessing",
    desc: "You're building fast but not blindly. You want control and verifiability without enterprise overhead.",
    dot: "bg-emerald-500",
    accent: "text-emerald-400",
  },
] as const;

export default function WhoIsItFor() {
  return (
    <section className="section-shell border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl">
        <p className="section-label">Who it's for</p>
        <h2 className="section-title mt-2">
          Built for people who care about what actually runs.
        </h2>
        <p className="section-copy mt-3 max-w-xl">
          If you've ever shipped something and thought "wait — did that really run correctly?",
          UseSteady is for you.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <article key={a.title} className="card p-5">
              <div className="flex items-center gap-2.5 mb-3">
                <span className={`h-2 w-2 rounded-full ${a.dot}`} />
                <h3 className={`mono text-xs font-semibold ${a.accent}`}>{a.title}</h3>
              </div>
              <p className="text-sm leading-7 text-[var(--text-2)]">{a.desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-5 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] px-5 py-4">
          <p className="mono text-xs leading-6 text-[var(--text-3)]">
            <span className="text-[var(--text-2)] font-semibold">Not for:</span>{" "}
            teams that want AI to act autonomously without oversight, or workflows where speed matters
            more than correctness. UseSteady adds a gate — that is the point.
          </p>
        </div>
      </div>
    </section>
  );
}
