import Link from "next/link";
import Capability from "@/components/sections/Capability";
import FinalCTA from "@/components/sections/FinalCTA";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Pricing from "@/components/sections/Pricing";
import ProductProof from "@/components/sections/ProductProof";
import Transformation from "@/components/sections/Transformation";
import Trust from "@/components/sections/Trust";
import WhatReplaces from "@/components/sections/WhatReplaces";
import WhoIsItFor from "@/components/sections/WhoIsItFor";
import { AppIcon } from "@/components/ui/AppIcon";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <>
      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-base)]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:px-10">
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <AppIcon size={28} />
            <span className="mono text-sm font-semibold tracking-tight text-[var(--text-1)]">UseSteady</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <a href="#demo"         className="text-xs font-medium text-[var(--text-2)] transition-colors duration-150 hover:text-[var(--text-1)]">Demo</a>
            <a href="#how-it-works" className="text-xs font-medium text-[var(--text-2)] transition-colors duration-150 hover:text-[var(--text-1)]">How it works</a>
            <a href="#pricing"      className="text-xs font-medium text-[var(--text-2)] transition-colors duration-150 hover:text-[var(--text-1)]">Pricing</a>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="https://x.com/UseSteady"
              target="_blank"
              rel="noopener noreferrer"
              className="interactive-lift rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-3 py-1.5 text-xs font-semibold text-[var(--text-2)] transition-all hover:bg-[var(--bg-deep)] hover:border-[var(--border)] hover:text-[var(--text-1)]"
            >
              {/* "Private " hidden on very small screens to prevent overflow */}
              <span className="hidden sm:inline">Private </span>Alpha →
            </a>
          </div>
        </div>
      </header>

      <main className="overflow-hidden">
        {/* 1 — The pitch */}
        <Hero />
        {/* 2 — Plain language → governed request */}
        <Transformation />
        {/* 3 — See the full flow */}
        <ProductProof />
        {/* 4 — Four steps */}
        <HowItWorks />
        {/* 5 — Before / After */}
        <WhatReplaces />
        {/* 6 — Trust model */}
        <Trust />
        {/* 7 — Who it's for */}
        <WhoIsItFor />
        {/* 8 — Scope */}
        <Capability />
        {/* 9 — Pricing */}
        <Pricing />
        {/* 10 — CTA */}
        <FinalCTA />
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-[var(--border)] px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <AppIcon size={20} />
            <span className="mono text-xs font-semibold text-[var(--text-2)]">UseSteady</span>
          </Link>
          <p className="mono text-xs leading-6 text-[var(--text-4)]">
            If it can&apos;t be reviewed, it doesn&apos;t run.
          </p>
          <a
            href="https://x.com/UseSteady"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-[var(--text-2)] transition-colors duration-150 hover:text-[var(--text-1)]"
          >
            X / Twitter →
          </a>
        </div>
      </footer>
    </>
  );
}
