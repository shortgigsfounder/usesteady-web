# AGENTS.md — usesteady-web

> Read this before making any change to this repository.
> This file is kept current after every significant agent session.

---

## What this repo is

**usesteady-web** is the marketing website for [usesteady.dev](https://usesteady.dev).

- Next.js 15 (App Router), Tailwind CSS v4
- Deployed automatically on Vercel from `main`
- **No backend, no API routes, no database, no auth**
- Pure static marketing content — all pages prerendered at build time

**Live URL:** https://usesteady.dev
**GitHub:** https://github.com/shortgigsfounder/usesteady-web
**Vercel project:** `usesteady-web` under `founder-7570s-projects`

---

## What this repo is NOT

- It is **not** the UseSteady desktop app (Electron) — that lives in `usesteady-app` / `C:/Forge`
- It does **not** share code with the desktop app
- It does **not** contain the execution runtime, planner, compiler, or policy engine

---

## CI/CD pipeline — how deploys work

```
git push main
    ↓
GitHub Actions: CI (.github/workflows/ci.yml)
  job 1: build  — next build + eslint (fails fast on type errors or lint)
  job 2: smoke  — Playwright smoke tests against the production build
    ↓ both jobs must pass
GitHub Actions: Deploy (.github/workflows/deploy.yml)
  triggered by workflow_run event (conclusion == 'success' only)
  runs: vercel deploy --prod --yes
    ↓
usesteady.dev updated
```

**If CI fails, the deploy workflow never runs.** The `skip-report` job fires instead
and writes a summary to the workflow run. Vercel production stays on the last
known-good deployment.

**You never need to touch Cloudflare or Vercel manually** after the initial setup.
One-time setup is complete as of April 2026.

---

## GitHub Actions secrets (set once — do not change)

| Secret | Value | Where to find |
|---|---|---|
| `VERCEL_TOKEN` | Vercel OAuth token (stored in `%APPDATA%\com.vercel.cli\Data\auth.json`) | Vercel dashboard → Account → Tokens |
| `VERCEL_ORG_ID` | `team_lQPAE7hwsST8bMtborfoWoAH` | `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | `prj_IHGAs8NMhj889FGOVXpDD9TEza0q` | `.vercel/project.json` |

**Note on VERCEL_TOKEN type:** The CLI is authenticated via OAuth (`vca_*` token).
Classic tokens (`pat_*`) cannot be created programmatically — only via the Vercel
dashboard. The OAuth token works for `vercel deploy` in CI.

---

## Vercel deployment rules — hard lessons learned

### DO use `vercel deploy --prod --yes`
The deploy workflow runs:
```bash
vercel deploy --prod --token="${VERCEL_TOKEN}" --yes
```
This uploads source code and lets Vercel build on their infrastructure. **Reliable.**

### DO NOT use `vercel build --prod` + `vercel deploy --prebuilt --prod`
This pattern was tried and caused **NOT_FOUND (404) on all routes** in production.

**Root cause:** `vercel build --prod` locally generates a `.vercel/output/` directory
using the Build Output API. For this Next.js project, it produced RSC metadata
lambdas (`favicon.ico.rsc`, `icon.png.rsc` at 736KB each) but was missing the root
`/` route. `vercel deploy --prebuilt` uploaded this incomplete output. Vercel served
it as-is → every request 404'd. The build took only 9s (suspiciously fast) vs 20-30s
for a real server-side build.

**The fix:** Remove `vercel pull` + `vercel build` + `--prebuilt` entirely.
Just use `vercel deploy --prod --yes`. Vercel does the build correctly on their end.

### DO NOT add `rootDirectory`, `buildCommand`, or `outputDirectory` to `vercel.json`
Vercel auto-detects Next.js from the root `package.json`. Adding these properties
causes schema validation failures or routing mismatches.

`vercel.json` must contain **only**: `$schema` + `headers`.

---

## DNS setup — Cloudflare (one-time, do not change)

DNS for `usesteady.dev` is managed in **Cloudflare**. These records are set
permanently — agents do not need to touch them again:

| Type | Name | Value | Purpose |
|---|---|---|---|
| A | `usesteady.dev` | `76.76.21.21` | Vercel's anycast IP — apex domain |
| CNAME | `www` | `cname.vercel-dns.com` | www → Vercel |
| TXT | `_vercel` | `vc-domain-verify=usesteady.dev,c0882161bef7246cf784` | Domain ownership proof for Vercel |

**`www.usesteady.dev`** is configured in Vercel to redirect (308) to `usesteady.dev`.

### If you ever need to re-verify the domain

The domain was originally claimed by the old monorepo Vercel project. To transfer
it to a new project, Vercel requires a TXT verification record at `_vercel.usesteady.dev`.
Steps:
1. Add domain to new Vercel project via API: `POST /v10/projects/{projectId}/domains`
2. Get the required TXT value from the response (`verification[0].value`)
3. Add TXT record in Cloudflare — **Proxy status must be DNS only (grey cloud)**
4. Trigger verification: `POST /v9/projects/{projectId}/domains/{domain}/verify`
5. Check `verified: true` in response

---

## Known lint issues (already fixed — do not reintroduce)

These ESLint errors existed in the codebase and were fixed in April 2026.
If you see them reappear after editing, fix them before pushing:

| File | Error | Fix |
|---|---|---|
| Any `.tsx` | `react/no-unescaped-entities` — `"`, `'` in JSX text | Use `&ldquo;`, `&rdquo;`, `&apos;` |
| `app/page.tsx` | `@next/no-html-link-for-pages` — `<a href="/">` | Use `<Link href="/">` from `next/link` |
| `components/ThemeToggle.tsx` | `react-hooks/set-state-in-effect` | Add `// eslint-disable-next-line` — this is a valid Next.js hydration pattern |
| Any `.map()` callback | Unused variable (e.g., `(item, i) =>` where `i` is unused) | Remove the unused parameter |

Run `npm run lint` locally before pushing. CI will fail on lint errors.

---

## Smoke tests (Playwright)

Tests live in `tests/e2e/smoke.spec.ts`. They run against `next start` (production build).

What they check:
- Homepage returns 200, renders without blank screen
- Page title contains "UseSteady"
- `og:title` meta tag present
- Hero section visible
- At least one CTA link visible
- Header nav visible, brand name visible
- No uncaught JS errors
- No internal links return 4xx
- Favicon and OG image (`/social/og-image-1200x630.png`) are served

To run locally:
```bash
npm run build
npm run test:e2e
```

The Playwright config (`playwright.config.ts`) uses `webServer: { command: "npm run start" }`
so it starts the production server automatically. **Do not run against `npm run dev`** —
smoke tests must run against the production build.

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

## Scripts reference

```bash
npm run build          # production build (required before smoke tests)
npm run start          # serve production build on :3000
npm run preview        # build + serve on :3001 (convenient local check)
npm run dev            # live reload dev server (only for active editing)
npm run lint           # ESLint — must pass before pushing
npm run test:e2e       # Playwright smoke tests (requires build first)
npm run test:e2e:headed  # same but with visible browser window
```

```bash
node generate-icons.mjs              # regenerate favicon assets
node generate-social.mjs             # regenerate OG social images
```

---

## History / why it's a standalone repo

**Before April 2026** this website lived inside the monorepo at `C:/Forge/web/`.

The split was made because:
1. Vercel's Next.js integration expects the app at the repo root. Using
   `rootDirectory: "web"` in a monorepo `vercel.json` caused repeated 404s and
   schema validation failures.
2. Desktop app commits triggered unnecessary website rebuilds.
3. Two unrelated build systems (electron-vite + Next.js) in one repo made
   debugging harder.

The canonical reference conversation for all UI/UX decisions before the split:
transcript **15f8ea04-c337-4931-bcec-9ec2ba99c6dc** in the parent repo's
`agent-transcripts/` folder.

---

## What NOT to do

- Do not add API routes (`app/api/`)
- Do not add auth of any kind
- Do not import anything from the desktop app repo
- Do not add `rootDirectory`, `buildCommand`, or `outputDirectory` to `vercel.json`
- Do not use `vercel build --prod` + `vercel deploy --prebuilt` — it causes 404s
- Do not commit `/node_modules`, `/.next`, `/out`, `/demo-frames`, `.vercel/`
- Do not add LLM/AI inference (it's a marketing site)
- Do not touch Cloudflare DNS or Vercel project settings — they are configured correctly
