# usesteady-web

Marketing website for [usesteady.dev](https://usesteady.dev).

Built with **Next.js 15** (App Router) + **Tailwind CSS**. Deployed on **Vercel**.

> **This repo is intentionally separate from the Electron desktop app.**
> The desktop app lives in [github.com/your-org/usesteady-app](https://github.com/your-org/usesteady-app) (formerly the `ui/` folder of the monorepo).
> They were split in April 2026 because Vercel deployments from a monorepo
> with a nested `rootDirectory` caused repeated 404s and were hard to manage.

---

## Local Development

### Recommended (static preview, low memory)

```bash
npm install
npm run build
npm run preview
```

Then open [http://localhost:3001](http://localhost:3001).

On Windows:

```bash
npm run preview:open
```

### Live reload (only when actively editing Next.js code)

```bash
npm run dev
```

---

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Next.js dev server with live reload |
| `npm run build` | Production build |
| `npm run preview` | Serve the built output on port 3001 |
| `npm run preview:open` | Open preview in browser (Windows) |
| `npm run lint` | ESLint |

---

## Deployment (Vercel)

This repo deploys automatically from the **`main`** branch on Vercel.

**Vercel project settings (set once in the Vercel dashboard):**
- Framework preset: **Next.js** (auto-detected)
- Root directory: `.` (repo root — Next.js is at the root here)
- Build command: *(leave default — `next build`)*
- Output directory: *(leave default — `.next`)*

**`vercel.json`** in this repo handles only security headers and cache rules.
It does **not** set `rootDirectory`, `buildCommand`, or `outputDirectory` — Vercel
auto-detects everything from the root `package.json` and `next.config.ts`.

### Why we split from the monorepo

The original monorepo (`C:/Forge`) contained both the Electron app and this
website under `web/`. Vercel's Next.js integration expects the app at the repo
root. Using `rootDirectory: "web"` in a root `vercel.json` caused:

1. Repeated 404s when the config drifted on `main` vs feature branches
2. Schema validation failures (extra properties in `vercel.json`)
3. Every desktop-app commit potentially retriggers a web deploy
4. Debugging required understanding two unrelated build systems

The fix is this: **one repo, one project, one concern**.

---

## Structure

```
usesteady-web/
├── app/                  # Next.js App Router pages and layouts
│   ├── layout.tsx        # Root layout (metadata, fonts, theme)
│   ├── page.tsx          # Homepage (all sections assembled)
│   └── globals.css       # Global Tailwind + CSS variables
├── components/
│   ├── sections/         # Page sections (Hero, HowItWorks, Pricing, …)
│   ├── ui/               # Shared primitives (buttons, badges, icons)
│   └── ThemeToggle.tsx   # Light/dark mode toggle
├── public/               # Static assets (favicon, social images, demo.mp4)
├── generate-*.mjs        # One-off scripts to regenerate icons / social cards
├── next.config.ts        # Next.js config
├── vercel.json           # Vercel headers + cache rules only
└── tsconfig.json         # TypeScript config
```

---

## Adding / changing content

All page content lives in `components/sections/`. Each section is a single
self-contained component. Edit them directly — no CMS, no external data source.

To add a new section:

1. Create `components/sections/MySection.tsx`
2. Import and render it in `app/page.tsx`

---

## Regenerating icons and social images

Run these locally when you change the logo or brand colors.
Commit the output files in `public/`.

```bash
node generate-icons.mjs
node generate-social.mjs
node generate-social-transparent.mjs
```

---

## Relationship to the desktop app

The desktop app (Electron + React) ships as a standalone binary for macOS,
Windows, and Linux. It has its own repo and its own release cycle. The website
does **not** import code from the desktop app and the desktop app does **not**
import code from the website. They share only the brand and copy.

- Desktop app repo: `usesteady-app` (the former `ui/` folder)
- Website repo: this repo (`usesteady-web`)
