# AGENTS.md — usesteady-web

> Read this before making any change to this repository.

---

## What this repo is

**usesteady-web** is the marketing website for [usesteady.dev](https://usesteady.dev).

- Next.js 15, App Router, Tailwind CSS
- Deployed automatically on Vercel from `main`
- **No backend, no API routes, no database, no auth**
- Pure static marketing content

---

## What this repo is NOT

- It is **not** the UseSteady desktop app (Electron)
- It is **not** the Python backend / governance engine
- It does **not** share code with the desktop app
- It does **not** contain the execution runtime, planner, compiler, or policy engine

The desktop app lives in a separate repo: `usesteady-app`.

---

## History / why it's a standalone repo

**Before April 2026** this website lived inside the monorepo at `C:/Forge/web/`.
The monorepo also contained:
- `src/` — Python core (coordinator, planner, policy engine)
- `ui/` — Electron + React desktop app
- `web/` — this website (now moved here)

The split was made because:
1. Vercel deployment required `rootDirectory: "web"` in a root `vercel.json`,
   which conflicted with Vercel's Next.js auto-detection and caused repeated 404s.
2. Desktop app commits were triggering unnecessary website rebuilds.
3. Two unrelated build systems (electron-vite + Next.js) in one repo made
   debugging harder.

The canonical reference conversation that describes all UI/UX decisions made
before the split is transcript **15f8ea04-c337-4931-bcec-9ec2ba99c6dc**
(stored in the parent monorepo's `agent-transcripts/` folder).

---

## Vercel deployment rules

**DO NOT** add `rootDirectory`, `buildCommand`, or `outputDirectory` to
`vercel.json`. Vercel auto-detects everything from `package.json` and
`next.config.ts` at the repo root.

`vercel.json` must contain **only**:
- `$schema`
- `headers` (security headers + cache rules)

Adding any other top-level property to `vercel.json` risks breaking the
deployment. The schema validator will reject unknown properties.

**Vercel dashboard settings (set once, do not change):**
- Framework: Next.js (auto-detected — do not override)
- Root directory: `.` (repo root)
- Build command: default (`next build`)
- Output directory: default (`.next`)

---

## Content structure

```
app/page.tsx          ← Homepage — imports all sections in order
components/sections/  ← One file per page section (Hero, Pricing, …)
components/ui/        ← Shared primitives (buttons, badges, icons)
public/               ← Static assets (favicon, social images, demo.mp4)
```

To edit the homepage, go to `components/sections/` and find the relevant section.
There is no CMS. Content is plain TypeScript/TSX.

---

## Styling rules

- Tailwind CSS only — no additional CSS files unless absolutely necessary
- CSS variables for theming are in `app/globals.css`
- Light/dark mode via `ThemeToggle.tsx` + `class="dark"` on `<html>`
- Color tokens: navy/slate base, electric green for success/CTA, soft blue for info

---

## What NOT to do

- Do not add API routes (`app/api/`)
- Do not add `next-auth` or any auth layer
- Do not import anything from the desktop app repo
- Do not add `rootDirectory` to `vercel.json`
- Do not commit `/node_modules`, `/.next`, `/out`, `/demo-frames`
- Do not add LLM/AI inference to the site (it's a marketing site, not an app)

---

## Scripts reference

```bash
npm run build          # production build
npm run preview        # serve built output on :3001
npm run preview:open   # Windows: open in browser
npm run dev            # live reload dev server (use only when editing Next.js)
npm run lint           # ESLint
```

```bash
node generate-icons.mjs              # regenerate favicon assets
node generate-social.mjs             # regenerate OG social images
node generate-social-transparent.mjs # transparent variant
```

---

## Deployment checklist (before merging to main)

1. `npm run build` completes without errors
2. `npm run lint` passes
3. Preview looks correct at localhost:3001
4. No changes to `vercel.json` beyond `headers`
5. No new secrets committed (`.env*` is gitignored)
