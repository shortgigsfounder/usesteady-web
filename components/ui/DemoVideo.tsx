"use client";

import { useRef, useState, useEffect } from "react";

export default function DemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState<boolean | null>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const onCanPlay = () => setHasVideo(true);
    const onError   = () => setHasVideo(false);

    el.addEventListener("canplay", onCanPlay);
    el.addEventListener("error",   onError);

    // Trigger load so the browser resolves the source
    el.load();

    return () => {
      el.removeEventListener("canplay", onCanPlay);
      el.removeEventListener("error",   onError);
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] shadow-lg md:min-h-[320px]">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 border-b border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
        <span className="mono ml-3 text-[10px] text-[var(--text-4)]">
          UseSteady — Governed Execution
        </span>
      </div>

      {/* Video element — always mounted so browser can resolve the src */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className={hasVideo ? "w-full block" : "hidden"}
        src="/demo.mp4"
      />

      {/* Placeholder — shown until video is confirmed */}
      {hasVideo !== true && (
        <div className="flex flex-col items-center justify-center gap-5 px-4 py-10 text-center sm:px-8 sm:py-14">
          {/* Flow strip */}
          <div className="flex w-full max-w-[18rem] items-center gap-0 overflow-hidden rounded-lg border border-[var(--border)]">
            {[
              { label: "Intent",    color: "bg-blue-500/20 text-blue-400" },
              { label: "Review",    color: "bg-violet-500/20 text-violet-400" },
              { label: "Approve",   color: "bg-amber-500/20 text-amber-400" },
              { label: "Verified",  color: "bg-emerald-500/20 text-emerald-400" },
            ].map((step) => (
              <div
                key={step.label}
                className={`flex-1 border-l border-[var(--border)] px-2 py-2 text-center first:border-l-0 ${step.color}`}
              >
                <p className="mono text-[9px] font-semibold uppercase tracking-widest">{step.label}</p>
              </div>
            ))}
          </div>

          {/* Play icon */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)]">
            <svg
              className="ml-1 h-6 w-6 text-[var(--text-3)]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>

          <div className="space-y-1.5">
            <p className="text-sm font-semibold text-[var(--text-2)]">
              Product demo · 10–15 seconds
            </p>
            <p className="mono text-[11px] text-[var(--text-4)]">
              Drop{" "}
              <span className="rounded border border-[var(--border)] bg-[var(--bg-elevated)] px-1.5 py-0.5 text-[var(--text-3)]">
                demo.mp4
              </span>{" "}
              in{" "}
              <span className="rounded border border-[var(--border)] bg-[var(--bg-elevated)] px-1.5 py-0.5 text-[var(--text-3)]">
                /public
              </span>{" "}
              to activate
            </p>
          </div>

          {/* Stages expected in the video */}
          <div className="w-full max-w-xs rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-4 text-left">
            <p className="mono mb-3 text-[9px] uppercase tracking-widest text-[var(--text-4)]">
              What the demo shows
            </p>
            <ul className="space-y-2">
              {[
                { dot: "bg-blue-500",    text: "Intent input — plain language" },
                { dot: "bg-violet-500",  text: "Proposal generation" },
                { dot: "bg-amber-500",   text: "Approval screen" },
                { dot: "bg-emerald-500", text: "Output + diff + VERIFIED state" },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-2.5">
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${item.dot}`} />
                  <span className="mono text-[11px] leading-5 text-[var(--text-3)]">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
