/**
 * Transparent-background versions of the Twitter/X and OG social assets.
 * Run: node generate-social-transparent2.mjs
 *
 * Each asset comes in two flavours:
 *   on-dark  — for placing on dark / colored backgrounds (light text)
 *   on-light — for placing on white / light backgrounds (dark text)
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";

const OUT = "public/social";
fs.mkdirSync(OUT, { recursive: true });

// ─── Tokens ─────────────────────────────────────────────────────────────────

const GREEN  = "#22c55e";
const BLUE   = "#3b82f6";
const VIOLET = "#8b5cf6";
const AMBER  = "#f59e0b";

const D_TEXT1  = "#e6edf3";
const D_TEXT2  = "#9da7b3";
const D_BORDER = "rgba(255,255,255,0.12)";
const D_PILL   = "rgba(255,255,255,0.08)";

const L_TEXT1  = "#0f172a";
const L_TEXT2  = "#334155";
const L_TEXT3  = "#64748b";
const L_BORDER = "rgba(0,0,0,0.12)";
const L_PILL   = "rgba(0,0,0,0.06)";

// ─── Gate mark (no background rect) ─────────────────────────────────────────

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

// ─── Twitter/X Banner 1500×500 ───────────────────────────────────────────────

const twitterOnDark = `
<svg width="1500" height="500" viewBox="0 0 1500 500" xmlns="http://www.w3.org/2000/svg">
  ${gate(100, 170, 160)}
  <text x="300" y="235"
    font-family="'Consolas','Courier New',monospace"
    font-size="72" font-weight="700" letter-spacing="-2"
    fill="${D_TEXT1}">UseSteady</text>
  <text x="302" y="294"
    font-family="'Consolas','Courier New',monospace"
    font-size="26" letter-spacing="0.5"
    fill="${D_TEXT2}">If it can't be reviewed, it doesn't run.</text>
  <line x1="100" y1="360" x2="1400" y2="360" stroke="${D_BORDER}" stroke-width="1"/>
  <text x="100" y="400" font-family="'Consolas','Courier New',monospace" font-size="16" fill="${BLUE}">Compile-time policy decides</text>
  <text x="400" y="400" font-family="'Consolas','Courier New',monospace" font-size="16" fill="${VIOLET}">Runtime enforces</text>
  <text x="610" y="400" font-family="'Consolas','Courier New',monospace" font-size="16" fill="${AMBER}">Artifact records</text>
  <text x="800" y="400" font-family="'Consolas','Courier New',monospace" font-size="16" fill="${GREEN}">Replay verifies</text>
  <rect x="1200" y="372" width="210" height="38" rx="19"
    fill="${D_PILL}" stroke="${D_BORDER}" stroke-width="1.5"/>
  <text x="1305" y="397"
    font-family="'Consolas','Courier New',monospace" font-size="15"
    text-anchor="middle" fill="${D_TEXT2}">Private Alpha</text>
</svg>`;

const twitterOnLight = `
<svg width="1500" height="500" viewBox="0 0 1500 500" xmlns="http://www.w3.org/2000/svg">
  ${gate(100, 170, 160)}
  <text x="300" y="235"
    font-family="'Consolas','Courier New',monospace"
    font-size="72" font-weight="700" letter-spacing="-2"
    fill="${L_TEXT1}">UseSteady</text>
  <text x="302" y="294"
    font-family="'Consolas','Courier New',monospace"
    font-size="26" letter-spacing="0.5"
    fill="${L_TEXT2}">If it can't be reviewed, it doesn't run.</text>
  <line x1="100" y1="360" x2="1400" y2="360" stroke="${L_BORDER}" stroke-width="1"/>
  <text x="100" y="400" font-family="'Consolas','Courier New',monospace" font-size="16" fill="${BLUE}">Compile-time policy decides</text>
  <text x="400" y="400" font-family="'Consolas','Courier New',monospace" font-size="16" fill="${VIOLET}">Runtime enforces</text>
  <text x="610" y="400" font-family="'Consolas','Courier New',monospace" font-size="16" fill="${AMBER}">Artifact records</text>
  <text x="800" y="400" font-family="'Consolas','Courier New',monospace" font-size="16" fill="${GREEN}">Replay verifies</text>
  <rect x="1200" y="372" width="210" height="38" rx="19"
    fill="${L_PILL}" stroke="${L_BORDER}" stroke-width="1.5"/>
  <text x="1305" y="397"
    font-family="'Consolas','Courier New',monospace" font-size="15"
    text-anchor="middle" fill="${L_TEXT3}">Private Alpha</text>
</svg>`;

// ─── OG / Link Preview 1200×630 ──────────────────────────────────────────────

const ogOnDark = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <!-- Subtle card outline so it reads as a card on dark BG -->
  <rect x="1" y="1" width="1198" height="628" rx="16"
    fill="none" stroke="${D_BORDER}" stroke-width="1.5"/>

  ${gate(100, 210, 130)}

  <text x="270" y="280"
    font-family="'Consolas','Courier New',monospace"
    font-size="64" font-weight="700" letter-spacing="-1.5"
    fill="${D_TEXT1}">UseSteady</text>
  <text x="272" y="322"
    font-family="'Consolas','Courier New',monospace"
    font-size="24" fill="${D_TEXT2}">If it can't be reviewed, it doesn't run.</text>
  <text x="272" y="362"
    font-family="'Consolas','Courier New',monospace"
    font-size="18" fill="rgba(255,255,255,0.3)">Turn plain language into controlled system execution.</text>

  <line x1="100" y1="430" x2="1100" y2="430" stroke="${D_BORDER}" stroke-width="1"/>

  <text x="100" y="500"
    font-family="'Consolas','Courier New',monospace" font-size="18"
    fill="rgba(255,255,255,0.25)">usesteady.dev</text>

  <rect x="880" y="468" width="220" height="44" rx="22"
    fill="${D_PILL}" stroke="${BLUE}" stroke-width="1.5" stroke-opacity="0.4"/>
  <text x="990" y="496"
    font-family="'Consolas','Courier New',monospace" font-size="16"
    text-anchor="middle" fill="${BLUE}">Private Alpha →</text>
</svg>`;

const ogOnLight = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="1" width="1198" height="628" rx="16"
    fill="none" stroke="${L_BORDER}" stroke-width="1.5"/>

  ${gate(100, 210, 130)}

  <text x="270" y="280"
    font-family="'Consolas','Courier New',monospace"
    font-size="64" font-weight="700" letter-spacing="-1.5"
    fill="${L_TEXT1}">UseSteady</text>
  <text x="272" y="322"
    font-family="'Consolas','Courier New',monospace"
    font-size="24" fill="${L_TEXT2}">If it can't be reviewed, it doesn't run.</text>
  <text x="272" y="362"
    font-family="'Consolas','Courier New',monospace"
    font-size="18" fill="${L_TEXT3}">Turn plain language into controlled system execution.</text>

  <line x1="100" y1="430" x2="1100" y2="430" stroke="${L_BORDER}" stroke-width="1"/>

  <text x="100" y="500"
    font-family="'Consolas','Courier New',monospace" font-size="18"
    fill="${L_TEXT3}">usesteady.dev</text>

  <rect x="880" y="468" width="220" height="44" rx="22"
    fill="${L_PILL}" stroke="${BLUE}" stroke-width="1.5" stroke-opacity="0.5"/>
  <text x="990" y="496"
    font-family="'Consolas','Courier New',monospace" font-size="16"
    text-anchor="middle" fill="${BLUE}">Private Alpha →</text>
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
  render(twitterOnDark,  "twitter-banner-on-dark.png",   1500, 500),
  render(twitterOnLight, "twitter-banner-on-light.png",  1500, 500),
  render(ogOnDark,       "og-image-on-dark.png",         1200, 630),
  render(ogOnLight,      "og-image-on-light.png",        1200, 630),
]);

console.log("\nAll transparent social variants saved to web/public/social/");
