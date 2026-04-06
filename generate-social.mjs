/**
 * Generates all UseSteady social marketing assets.
 * Run: node generate-social.mjs
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";

const OUT = "public/social";
fs.mkdirSync(OUT, { recursive: true });

// ─── Shared design tokens ───────────────────────────────────────────────────

const BG       = "#0b0b0c";
const SURFACE  = "#111214";
const BORDER   = "#1f2328";
const TEXT1    = "#e6edf3";
const TEXT2    = "#9da7b3";
const TEXT3    = "#4a5568";
const GREEN    = "#22c55e";
const BLUE     = "#3b82f6";

// ─── Policy Gate mark (inline SVG fragment) ─────────────────────────────────

function gateMarkSvg(x, y, size) {
  const s = size / 64;
  return `
    <!-- Gate mark at ${x},${y} size ${size} -->
    <rect x="${x}" y="${y}" width="${size}" height="${size}" rx="${12 * s}" fill="${BG}" />
    <!-- Entry origin dot -->
    <circle cx="${x + 6*s}" cy="${y + 32*s}" r="${4*s}" fill="${BLUE}"/>
    <!-- Entry path -->
    <line x1="${x + 10*s}" y1="${y + 32*s}" x2="${x + 25*s}" y2="${y + 32*s}"
      stroke="${BLUE}" stroke-width="${3.5*s}" stroke-linecap="round"/>
    <!-- Gate bars -->
    <rect x="${x + 25*s}" y="${y + 18*s}" width="${4*s}" height="${28*s}" rx="${1.5*s}" fill="${BLUE}"/>
    <rect x="${x + 35*s}" y="${y + 18*s}" width="${4*s}" height="${28*s}" rx="${1.5*s}" fill="${GREEN}"/>
    <!-- Exit path -->
    <line x1="${x + 39*s}" y1="${y + 32*s}" x2="${x + 54*s}" y2="${y + 32*s}"
      stroke="${GREEN}" stroke-width="${3.5*s}" stroke-linecap="round"/>
    <!-- Terminal dot -->
    <circle cx="${x + 58*s}" cy="${y + 32*s}" r="${4*s}" fill="${GREEN}"/>
  `;
}

// ─── 1. Twitter/X Banner — 1500×500 ─────────────────────────────────────────

const twitterBanner = `
<svg width="1500" height="500" viewBox="0 0 1500 500" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1500" height="500" fill="${BG}"/>

  <!-- Subtle radial glows -->
  <radialGradient id="glow1" cx="20%" cy="30%" r="50%">
    <stop offset="0%" stop-color="${BLUE}" stop-opacity="0.07"/>
    <stop offset="100%" stop-color="${BG}" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="glow2" cx="80%" cy="70%" r="40%">
    <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.05"/>
    <stop offset="100%" stop-color="${BG}" stop-opacity="0"/>
  </radialGradient>
  <rect width="1500" height="500" fill="url(#glow1)"/>
  <rect width="1500" height="500" fill="url(#glow2)"/>

  <!-- Gate mark — large, left aligned -->
  ${gateMarkSvg(100, 170, 160)}

  <!-- Wordmark -->
  <text x="300" y="235"
    font-family="'Consolas','Courier New',monospace"
    font-size="72" font-weight="700" letter-spacing="-2"
    fill="${TEXT1}">UseSteady</text>

  <!-- Tagline -->
  <text x="302" y="294"
    font-family="'Consolas','Courier New',monospace"
    font-size="26" font-weight="400" letter-spacing="0.5"
    fill="${TEXT2}">If it can't be reviewed, it doesn't run.</text>

  <!-- Bottom rule strip -->
  <line x1="100" y1="360" x2="1400" y2="360" stroke="${BORDER}" stroke-width="1"/>

  <!-- Trust pillars -->
  <text x="100" y="400" font-family="'Consolas','Courier New',monospace" font-size="16" fill="${BLUE}">Compile-time policy decides</text>
  <text x="400" y="400" font-family="'Consolas','Courier New',monospace" font-size="16" fill="#8b5cf6">Runtime enforces</text>
  <text x="610" y="400" font-family="'Consolas','Courier New',monospace" font-size="16" fill="#f59e0b">Artifact records</text>
  <text x="800" y="400" font-family="'Consolas','Courier New',monospace" font-size="16" fill="${GREEN}">Replay verifies</text>

  <!-- Private alpha pill -->
  <rect x="1200" y="372" width="210" height="38" rx="19"
    fill="none" stroke="${BORDER}" stroke-width="1.5"/>
  <text x="1305" y="397"
    font-family="'Consolas','Courier New',monospace" font-size="15"
    text-anchor="middle" fill="${TEXT2}">Private Alpha</text>
</svg>`;

// ─── 2. OG / Link Preview — 1200×630 ────────────────────────────────────────

const ogImage = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${BG}"/>

  <radialGradient id="og1" cx="15%" cy="25%" r="55%">
    <stop offset="0%" stop-color="${BLUE}" stop-opacity="0.09"/>
    <stop offset="100%" stop-color="${BG}" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="og2" cx="85%" cy="75%" r="40%">
    <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.06"/>
    <stop offset="100%" stop-color="${BG}" stop-opacity="0"/>
  </radialGradient>
  <rect width="1200" height="630" fill="url(#og1)"/>
  <rect width="1200" height="630" fill="url(#og2)"/>

  <!-- Card surface -->
  <rect x="60" y="60" width="1080" height="510" rx="16"
    fill="${SURFACE}" stroke="${BORDER}" stroke-width="1"/>

  <!-- Gate mark -->
  ${gateMarkSvg(100, 210, 130)}

  <!-- Wordmark -->
  <text x="270" y="280"
    font-family="'Consolas','Courier New',monospace"
    font-size="64" font-weight="700" letter-spacing="-1.5"
    fill="${TEXT1}">UseSteady</text>

  <!-- Tagline -->
  <text x="272" y="322"
    font-family="'Consolas','Courier New',monospace"
    font-size="24" fill="${TEXT2}">If it can't be reviewed, it doesn't run.</text>

  <!-- Descriptor line -->
  <text x="272" y="362"
    font-family="'Consolas','Courier New',monospace"
    font-size="18" fill="${TEXT3}">Turn plain language into controlled system execution.</text>

  <!-- Divider -->
  <line x1="100" y1="430" x2="1100" y2="430" stroke="${BORDER}" stroke-width="1"/>

  <!-- Bottom domain -->
  <text x="100" y="500"
    font-family="'Consolas','Courier New',monospace" font-size="18"
    fill="${TEXT3}">usesteady.dev</text>

  <!-- CTA pill -->
  <rect x="880" y="468" width="220" height="44" rx="22"
    fill="${BLUE}" opacity="0.15" stroke="${BLUE}" stroke-width="1.5" stroke-opacity="0.4"/>
  <text x="990" y="496"
    font-family="'Consolas','Courier New',monospace" font-size="16"
    text-anchor="middle" fill="${BLUE}">Private Alpha →</text>
</svg>`;

// ─── 3. Profile Picture — 800×800 ───────────────────────────────────────────

const profilePic = `
<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="800" rx="0" fill="${BG}"/>

  <radialGradient id="pp1" cx="30%" cy="30%" r="60%">
    <stop offset="0%" stop-color="${BLUE}" stop-opacity="0.1"/>
    <stop offset="100%" stop-color="${BG}" stop-opacity="0"/>
  </radialGradient>
  <rect width="800" height="800" fill="url(#pp1)"/>

  <!-- Gate mark centered, large -->
  ${gateMarkSvg(168, 168, 464)}
</svg>`;

// ─── 4. LinkedIn Banner — 1584×396 ──────────────────────────────────────────

const linkedinBanner = `
<svg width="1584" height="396" viewBox="0 0 1584 396" xmlns="http://www.w3.org/2000/svg">
  <rect width="1584" height="396" fill="${BG}"/>

  <radialGradient id="li1" cx="15%" cy="50%" r="50%">
    <stop offset="0%" stop-color="${BLUE}" stop-opacity="0.08"/>
    <stop offset="100%" stop-color="${BG}" stop-opacity="0"/>
  </radialGradient>
  <rect width="1584" height="396" fill="url(#li1)"/>

  <!-- Gate mark -->
  ${gateMarkSvg(80, 128, 140)}

  <!-- Wordmark -->
  <text x="256" y="210"
    font-family="'Consolas','Courier New',monospace"
    font-size="60" font-weight="700" letter-spacing="-1.5"
    fill="${TEXT1}">UseSteady</text>

  <!-- Tagline -->
  <text x="258" y="256"
    font-family="'Consolas','Courier New',monospace"
    font-size="22" fill="${TEXT2}">If it can't be reviewed, it doesn't run. · Private Alpha</text>

  <!-- Right side URL -->
  <text x="1484" y="210"
    font-family="'Consolas','Courier New',monospace" font-size="20"
    text-anchor="end" fill="${TEXT3}">usesteady.dev</text>

  <!-- Bottom strip -->
  <rect x="0" y="370" width="1584" height="4" fill="${BORDER}"/>
  <rect x="0" y="370" width="320" height="4" fill="${BLUE}" opacity="0.6"/>
  <rect x="320" y="370" width="200" height="4" fill="${GREEN}" opacity="0.6"/>
</svg>`;

// ─── Render all ─────────────────────────────────────────────────────────────

async function render(svgString, filename, w, h) {
  const buf = Buffer.from(svgString);
  await sharp(buf, { density: 300 })
    .resize(w, h)
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, filename));
  console.log(`✓ ${filename} (${w}×${h})`);
}

await Promise.all([
  render(profilePic,     "profile-800x800.png",       800,  800),
  render(twitterBanner,  "twitter-banner-1500x500.png", 1500, 500),
  render(ogImage,        "og-image-1200x630.png",      1200, 630),
  render(linkedinBanner, "linkedin-banner-1584x396.png", 1584, 396),
]);

console.log(`\nAll social assets saved to web/public/social/`);
