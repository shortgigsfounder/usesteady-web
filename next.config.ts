import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No output:"export" — Vercel's native Next.js integration is used instead.
  // All pages are still statically generated at build time (no dynamic data).
  // This unlocks image optimisation, edge caching, and future SSR if needed.

  // Turbopack root is scoped to this directory in dev to avoid watching the
  // entire monorepo (Python CLI, Electron UI, etc.).
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
