/**
 * Generates transparent-background variations of UseSteady social assets.
 * Run: node generate-social-transparent.mjs
 *
 * Variants:
 *   on-dark  — colored mark (blue+green), for placing on dark/colored backgrounds
 *   on-light — same blue+green accents work, but text switches to near-black
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";

const OUT = "public/social";
fs.mkdirSync(OUT, { recursive: true });

// ─── Tokens ─────────────────────────────────────────────────────────────────

const GREEN  = "#22c55e";
const BLUE   = "#3b82f6";

// on-dark: text colors are light
const D_TEXT1 = "#e6edf3";
const D_TEXT2 = "#9da7b3";
const D_TEXT3 = "#6b7280";

// on-light: text colors are dark
const L_TEXT1 = "#0f172a";
const L_TEXT2 = "#334155";
const L_TEXT3 = "#64748b";

// ─── Gate mark fragment (no background rect) ─────────────────────────────────

function gate(x, y, size) {
  const s = size / 64;
  return `
    <circle cx="${x + 6*s}"  cy="${y + 32*s}" r="${4*s}" fill="${BLUE}"/>
    <line x1="${x + 10*s}" y1="${y + 32*s}" x2="${x + 25*s}" y2="${y + 32*s}"
      stroke="${BLUE}" stroke-width="${3.5*s}" stroke-linecap="round"/>
    <rect x="${x + 25*s}" y="${y + 18*s}" width="${4*s}" height="${28*s}" rx="${1.5*s}" fill="${BLUE}"/>
    <rect x="${x + 35*s}" y="${y + 18*s}" width="${4*s}" height="${28*s}" rx="${1.5*s}" fill="${GREEN}"/>
    <line x1="${x + 39*s}" y1="${y + 32*s}" x2="${x + 54*s}" y2="${y + 32*s}"
      stroke="${GREEN}" stroke-width="${3.5*s}" stroke-linecap="round"/>
    <circle cx="${x + 58*s}" cy="${y + 32*s}" r="${4*s}" fill="${GREEN}"/>
  `;
}

// ─── 1. Icon only — transparent (800×800) ───────────────────────────────────
// Works on any background. The blue+green hold up everywhere.

const iconTransparent = `
<svg width="800" height="800" viewBox="0 0 800 800"
  xmlns="http://www.w3.org/2000/svg">
  ${gate(168, 168, 464)}
</svg>`;

// ─── 2. Horizontal wordmark — on dark (transparent BG, light text) ───────────
// Use on: dark slides, dark social posts, dark Canva templates, Discord banners

const wordmarkOnDark = `
<svg width="880" height="160" viewBox="0 0 880 160"
  xmlns="http://www.w3.org/2000/svg">
  <!-- Gate mark, 120px -->
  ${gate(0, 20, 120)}
  <!-- Wordmark -->
  <text x="140" y="90"
    font-family="'Consolas','Courier New',monospace"
    font-size="64" font-weight="700" letter-spacing="-1.5"
    fill="${D_TEXT1}">UseSteady</text>
  <!-- Tagline -->
  <text x="142" y="130"
    font-family="'Consolas','Courier New',monospace"
    font-size="22" fill="${D_TEXT2}">If it can't be reviewed, it doesn't run.</text>
</svg>`;

// ─── 3. Horizontal wordmark — on light (transparent BG, dark text) ────────────
// Use on: white slides, light Canva, press kit, print

const wordmarkOnLight = `
<svg width="880" height="160" viewBox="0 0 880 160"
  xmlns="http://www.w3.org/2000/svg">
  ${gate(0, 20, 120)}
  <text x="140" y="90"
    font-family="'Consolas','Courier New',monospace"
    font-size="64" font-weight="700" letter-spacing="-1.5"
    fill="${L_TEXT1}">UseSteady</text>
  <text x="142" y="130"
    font-family="'Consolas','Courier New',monospace"
    font-size="22" fill="${L_TEXT2}">If it can't be reviewed, it doesn't run.</text>
</svg>`;

// ─── 4. Stacked logo — on dark (icon above wordmark, transparent) ────────────
// Good for: App Store badges, Instagram square posts, square slide covers

const stackedOnDark = `
<svg width="600" height="700" viewBox="0 0 600 700"
  xmlns="http://www.w3.org/2000/svg">
  <!-- Gate mark centered, 280px -->
  ${gate(160, 30, 280)}
  <!-- Wordmark -->
  <text x="300" y="410"
    font-family="'Consolas','Courier New',monospace"
    font-size="56" font-weight="700" letter-spacing="-1"
    text-anchor="middle" fill="${D_TEXT1}">UseSteady</text>
  <!-- Tagline -->
  <text x="300" y="458"
    font-family="'Consolas','Courier New',monospace"
    font-size="21" text-anchor="middle"
    fill="${D_TEXT2}">If it can't be reviewed, it doesn't run.</text>
  <!-- Trust bar -->
  <line x1="80" y1="512" x2="520" y2="512" stroke="${D_TEXT3}" stroke-width="0.75" opacity="0.4"/>
  <text x="300" y="550"
    font-family="'Consolas','Courier New',monospace"
    font-size="15" text-anchor="middle"
    fill="${D_TEXT3}">Policy · Enforcement · Replay · Audit</text>
</svg>`;

// ─── 5. Stacked logo — on light ───────────────────────────────────────────────

const stackedOnLight = `
<svg width="600" height="700" viewBox="0 0 600 700"
  xmlns="http://www.w3.org/2000/svg">
  ${gate(160, 30, 280)}
  <text x="300" y="410"
    font-family="'Consolas','Courier New',monospace"
    font-size="56" font-weight="700" letter-spacing="-1"
    text-anchor="middle" fill="${L_TEXT1}">UseSteady</text>
  <text x="300" y="458"
    font-family="'Consolas','Courier New',monospace"
    font-size="21" text-anchor="middle"
    fill="${L_TEXT2}">If it can't be reviewed, it doesn't run.</text>
  <line x1="80" y1="512" x2="520" y2="512" stroke="${L_TEXT3}" stroke-width="0.75" opacity="0.3"/>
  <text x="300" y="550"
    font-family="'Consolas','Courier New',monospace"
    font-size="15" text-anchor="middle"
    fill="${L_TEXT3}">Policy · Enforcement · Replay · Audit</text>
</svg>`;

// ─── 6. Icon only — monochrome white (for coloured brand backgrounds) ─────────
// Use on: coloured slide backgrounds, merchandise, embossed print

// White monochrome — coords derived from 64-unit viewBox scaled to 800 (×12.5)
// cx=6→75, cx=10→125, cx=25→312, cx=35→437, cx=39→487, cx=54→675, cx=58→725
// r=4→50, stroke-width=3.5→44, bar-w=4→50, bar-h=28→350, bar-y=18→225, rx=1.5→19
const iconWhite = `
<svg width="800" height="800" viewBox="0 0 800 800"
  xmlns="http://www.w3.org/2000/svg">
  <circle cx="75"  cy="400" r="50" fill="white"/>
  <line x1="125" y1="400" x2="312" y2="400"
    stroke="white" stroke-width="44" stroke-linecap="round"/>
  <rect x="312" y="225" width="50" height="350" rx="19" fill="white"/>
  <rect x="437" y="225" width="50" height="350" rx="19" fill="white"/>
  <line x1="487" y1="400" x2="675" y2="400"
    stroke="white" stroke-width="44" stroke-linecap="round"/>
  <circle cx="725" cy="400" r="50" fill="white"/>
</svg>`;

// ─── Render ──────────────────────────────────────────────────────────────────

async function render(svgString, filename, w, h) {
  const buf = Buffer.from(svgString);
  await sharp(buf, { density: 300 })
    .resize(w, h)
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, filename));
  console.log(`✓ ${filename} (${w}×${h})`);
}

await Promise.all([
  // Icon only (no BG)
  render(iconTransparent,  "icon-transparent.png",              800, 800),
  render(iconWhite,        "icon-white.png",                    800, 800),

  // Wordmarks
  render(wordmarkOnDark,   "wordmark-on-dark.png",              880, 160),
  render(wordmarkOnLight,  "wordmark-on-light.png",             880, 160),

  // Stacked
  render(stackedOnDark,    "stacked-on-dark.png",               600, 700),
  render(stackedOnLight,   "stacked-on-light.png",              600, 700),
]);

console.log("\nAll transparent variants saved to web/public/social/");
