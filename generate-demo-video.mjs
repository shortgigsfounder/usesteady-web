/**
 * generate-demo-video.mjs
 *
 * Renders 5 SVG frames → PNG → assembles via ffmpeg → /public/demo.mp4
 * Run: node generate-demo-video.mjs
 */

import sharp from "sharp";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const W = 1280;
const H = 720;
const FRAMES_DIR = path.join(__dirname, "demo-frames");
const VIDEO_OUT  = path.join(__dirname, "public", "demo.mp4");

if (!fs.existsSync(FRAMES_DIR)) fs.mkdirSync(FRAMES_DIR, { recursive: true });

// ── Colour tokens (dark theme) ────────────────────────────────────────────────
const C = {
  bg0:    "#080d1b",
  bg1:    "#0f1628",
  surf:   "#161f35",
  elev:   "#1e2d47",
  brd:    "#2a3d5c",
  brdHi:  "#3a5078",
  t1:     "#f0f4ff",
  t2:     "#c8d5ec",
  t3:     "#8899bb",
  t4:     "#526080",
  blue:   "#4090f7",
  green:  "#2acc70",
  amber:  "#f0a020",
  violet: "#9060f0",
  red:    "#e05050",
};

// ── SVG helpers ───────────────────────────────────────────────────────────────
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const r = (x, y, w, h, rx = 0, fill = "none", stroke = "none", sw = 1) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;

const t = (x, y, txt, size = 12, fill = C.t2, font = "Consolas,monospace", anchor = "start", weight = "normal") =>
  `<text x="${x}" y="${y}" font-family="${font}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${esc(txt)}</text>`;

const lbl = (x, y, txt, fill = C.t4) =>
  `<text x="${x}" y="${y}" font-family="Consolas,monospace" font-size="9" fill="${fill}" letter-spacing="1.5">${esc(txt.toUpperCase())}</text>`;

const ln = (x1, y1, x2, y2, stroke = C.brd, sw = 1) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}"/>`;

// ── Frame wrapper ─────────────────────────────────────────────────────────────
// Card: x=120, y=62, w=1040, h=590  chrome=46px  content from y=108+pad
const CARD = { x: 120, y: 62, w: 1040, h: 590 };
const CHROME_H = 46;
const PAD = 32;
// Content origin
const CX = CARD.x + PAD;           // 152
const CY = CARD.y + CHROME_H + PAD; // 140
const CW = CARD.w - PAD * 2;       // 976

function wrap(title, accent, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="${W}" y2="${H}" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="${C.bg0}"/>
    <stop offset="100%" stop-color="${C.bg1}"/>
  </linearGradient>
</defs>

<!-- Background -->
${r(0, 0, W, H, 0, "url(#bg)")}

<!-- Brand -->
${t(40, 40, "UseSteady", 14, C.t3, "Consolas,monospace", "start", "bold")}
${t(40, 706, "Private Alpha  |  demo.usesteady.com", 9, C.t4)}

<!-- Card shadow -->
${r(CARD.x + 3, CARD.y + 4, CARD.w, CARD.h, 16, "#000000", "none")}

<!-- Card -->
${r(CARD.x, CARD.y, CARD.w, CARD.h, 16, C.surf, C.brd)}

<!-- Chrome bar -->
${r(CARD.x, CARD.y, CARD.w, CHROME_H + 8, 16, C.elev)}
${r(CARD.x, CARD.y + CHROME_H - 8, CARD.w, 16, 0, C.elev)}
${ln(CARD.x, CARD.y + CHROME_H, CARD.x + CARD.w, CARD.y + CHROME_H, C.brd)}

<!-- Traffic lights -->
<circle cx="${CARD.x + 26}" cy="${CARD.y + 23}" r="5.5" fill="${C.red}" opacity="0.55"/>
<circle cx="${CARD.x + 46}" cy="${CARD.y + 23}" r="5.5" fill="${C.amber}" opacity="0.55"/>
<circle cx="${CARD.x + 66}" cy="${CARD.y + 23}" r="5.5" fill="${accent}" opacity="0.75"/>

<!-- Title -->
${t(CARD.x + 90, CARD.y + 27, title, 11, C.t4)}

${body}
</svg>`;
}

// ── Scene 1 — Intent Input ────────────────────────────────────────────────────
function scene1() {
  const ix = CX, iy = CY, iw = CW;
  const INPUT_H = 72;

  return wrap("UseSteady \u2014 New Request", C.blue, `
${lbl(ix, iy + 18, "What do you want to do?")}

<!-- Input box -->
${r(ix, iy + 26, iw, INPUT_H, 8, C.elev, C.green, 1.5)}
${t(ix + 16, iy + 52, "Change bg-white to bg-slate-950 in app/globals.css,", 12, C.t1)}
${t(ix + 16, iy + 70, "run tests, and commit with message \u201cchore: bg update\u201d", 12, C.t2)}
<!-- cursor -->
<rect x="${ix + 16 + 517}" y="${iy + 56}" width="2" height="14" fill="${C.green}" opacity="0.85"/>

<!-- Mode tabs -->
${r(ix, iy + 110, 76, 26, 4, C.blue + "30", C.blue, 1)}
${t(ix + 12, iy + 127, "Intent", 10, C.blue)}
${r(ix + 80, iy + 110, 88, 26, 4, "none", C.brd)}
${t(ix + 96, iy + 127, "Structured", 10, C.t4)}

<!-- Proposed Request label + box -->
${lbl(ix, iy + 156, "Proposed Governed Request", C.t4)}

${r(ix, iy + 168, iw, 140, 8, C.elev, C.brd)}
${lbl(ix + 16, iy + 186, "Preview", C.t4)}
${t(ix + 16, iy + 206, "fs.apply_patch(", 12, C.blue)}
${t(ix + 32, iy + 224, 'path="app/globals.css"', 12, C.t2)}
${t(ix + 32, iy + 242, 'search="bg-white"   replace="bg-slate-950"', 12, C.t2)}
${t(ix + 16, iy + 260, ")", 12, C.blue)}
${t(ix + 200, iy + 280, "then  test.run_all()   then  git.commit(\"chore: bg update\")", 11, C.t3)}

<!-- Use Proposed Request button -->
${r(ix, iy + 328, 260, 42, 8, C.blue)}
${t(ix + 50, iy + 354, "Use Proposed Request \u2192", 13, "#ffffff", "Consolas,monospace", "start", "bold")}

${t(ix + 278, iy + 354, "This becomes the governed execution plan.", 11, C.t4)}
`);
}

// ── Scene 2 — Plan Review ─────────────────────────────────────────────────────
function scene2() {
  const ix = CX, iy = CY, iw = CW;

  const step = (n, color, name, detail, policy, policyColor, yOffset) => `
${r(ix, iy + yOffset, iw, 68, 8, C.elev, C.brd)}
<circle cx="${ix + 22}" cy="${iy + yOffset + 34}" r="11" fill="${color}25"/>
${t(ix + 16, iy + yOffset + 39, n, 12, color, "Consolas,monospace", "middle", "bold")}
${t(ix + 42, iy + yOffset + 24, name, 13, C.t1, "Consolas,monospace", "start", "bold")}
${t(ix + 42, iy + yOffset + 42, detail, 11, C.t3)}
${r(ix + iw - 210, iy + yOffset + 20, 194, 22, 4, policyColor + "22", policyColor + "66")}
${t(ix + iw - 200, iy + yOffset + 35, policy, 9, policyColor, "Consolas,monospace", "start", "bold")}`;

  return wrap("UseSteady \u2014 Plan Review", C.violet, `
<!-- Header -->
${lbl(ix, iy + 14, "Compiler Output \u2014 Annotated Plan", C.t4)}

${step("1", C.amber, "n001  \u2014  fs.apply_patch",
  "path: app/globals.css   action: mutate file",
  "ALLOW_WITH_APPROVAL", C.amber, 26)}

${step("2", C.green, "n002  \u2014  test.run_all",
  "scope: all   read-only   no side effects",
  "ALLOW", C.green, 106)}

${step("3", C.amber, "n003  \u2014  git.commit",
  'message: "chore: bg update"   write operation',
  "ALLOW_WITH_APPROVAL", C.amber, 186)}

<!-- Compiler verdict -->
${r(ix, iy + 274, iw, 54, 8, C.green + "12", C.green + "50", 1.5)}
${t(ix + 20, iy + 296, "\u2713  Compiler verdict: ACCEPTED \u2014 plan is structurally valid", 13, C.green, "Consolas,monospace", "start", "bold")}
${t(ix + 20, iy + 314, "2 steps require your approval  \u00b7  1 step auto-allowed  \u00b7  0 denied", 11, C.t3)}

<!-- Execute button -->
${r(ix, iy + 348, 280, 44, 8, C.green)}
${t(ix + 52, iy + 375, "Execute Accepted Plan \u2192", 13, C.bg0, "Consolas,monospace", "start", "bold")}

${r(ix + 296, iy + 356, 160, 28, 6, C.green + "18", C.green + "55")}
${t(ix + 308, iy + 374, "\u2713 AUTHORITATIVE", 10, C.green, "Consolas,monospace", "start", "bold")}
`);
}

// ── Scene 3 — Approval Gate ───────────────────────────────────────────────────
function scene3() {
  const ix = CX, iy = CY;
  const LEFT_W = 620;
  const RIGHT_X = ix + LEFT_W + 24;
  const RIGHT_W = CW - LEFT_W - 24;

  return wrap("UseSteady \u2014 Approval Required", C.amber, `
<!-- Warning banner -->
${r(ix, iy + 8, CW, 78, 10, C.amber + "14", C.amber + "55", 1.5)}
<!-- Triangle icon -->
<polygon points="${ix+24},${iy+70} ${ix+46},${iy+30} ${ix+68},${iy+70}" fill="${C.amber}" opacity="0.7"/>
${t(ix + 46, iy + 64, "!", 18, C.bg0, "Arial,sans-serif", "middle", "bold")}
${t(ix + 80, iy + 48, "Approval Required", 18, C.t1, "Arial,sans-serif", "start", "bold")}
${t(ix + 80, iy + 68, "Step n001 requires your explicit sign-off before execution continues.", 11, C.amber)}

<!-- LEFT: Step detail grid -->
${lbl(ix, iy + 110, "Step Details")}
${r(ix, iy + 124, LEFT_W, 156, 8, C.elev, C.brd)}

${t(ix + 16, iy + 150, "Step", 11, C.t4)} ${t(ix + 130, iy + 150, "n001  \u2014  fs.apply_patch", 12, C.t1)}
${ln(ix, iy + 160, ix + LEFT_W, iy + 160)}
${t(ix + 16, iy + 180, "Path", 11, C.t4)} ${t(ix + 130, iy + 180, "app/globals.css", 12, C.blue)}
${ln(ix, iy + 190, ix + LEFT_W, iy + 190)}
${t(ix + 16, iy + 210, "Policy", 11, C.t4)} ${t(ix + 130, iy + 210, "ALLOW_WITH_APPROVAL", 12, C.amber)}
${ln(ix, iy + 220, ix + LEFT_W, iy + 220)}
${t(ix + 16, iy + 240, "Reason", 11, C.t4)} ${t(ix + 130, iy + 240, "File mutation detected \u2014 review required", 12, C.t2)}
${ln(ix, iy + 250, ix + LEFT_W, iy + 250)}
${t(ix + 16, iy + 264, "Diff", 11, C.t4)}
${t(ix + 130, iy + 258, "- bg-white", 11, C.red)}
${t(ix + 130, iy + 274, "+ bg-slate-950", 11, C.green)}

<!-- Approve / Deny -->
${r(ix, iy + 300, 240, 44, 8, C.blue)}
${t(ix + 62, iy + 327, "Approve \u2192", 14, "#ffffff", "Consolas,monospace", "start", "bold")}

${r(ix + 254, iy + 300, 160, 44, 8, C.elev, C.brdHi)}
${t(ix + 294, iy + 327, "Deny", 14, C.t3, "Consolas,monospace", "start")}

<!-- RIGHT: Execution trace -->
${lbl(RIGHT_X, iy + 110, "Execution Trace")}
${r(RIGHT_X, iy + 124, RIGHT_W, 156, 8, C.elev, C.brd)}

${t(RIGHT_X + 14, iy + 152, "o", 13, C.amber)} ${t(RIGHT_X + 30, iy + 152, "n001  WAITING", 12, C.amber)}
${ln(RIGHT_X, iy + 162, RIGHT_X + RIGHT_W, iy + 162)}
${t(RIGHT_X + 14, iy + 182, "o", 13, C.t4)} ${t(RIGHT_X + 30, iy + 182, "n002  QUEUED", 12, C.t4)}
${ln(RIGHT_X, iy + 192, RIGHT_X + RIGHT_W, iy + 192)}
${t(RIGHT_X + 14, iy + 212, "o", 13, C.t4)} ${t(RIGHT_X + 30, iy + 212, "n003  QUEUED", 12, C.t4)}
${ln(RIGHT_X, iy + 222, RIGHT_X + RIGHT_W, iy + 222)}
${t(RIGHT_X + 14, iy + 248, "Policy gate active.", 10, C.t4)}
${t(RIGHT_X + 14, iy + 264, "Awaiting user decision.", 10, C.t4)}

<!-- Reminder strip -->
${r(ix, iy + 364, CW, 36, 6, C.brd + "30", C.brd)}
${t(ix + 16, iy + 387, "Nothing runs until you approve. Your decision is logged in the audit trail.", 11, C.t3)}
`);
}

// ── Scene 4 — Executing ───────────────────────────────────────────────────────
function scene4() {
  const ix = CX, iy = CY, iw = CW;

  return wrap("UseSteady \u2014 Executing", C.green, `
<!-- Status header -->
${r(ix, iy + 8, iw, 62, 10, C.green + "10", C.green + "45", 1.5)}
<circle cx="${ix + 36}" cy="${iy + 39}" r="16" fill="${C.green}35"/>
<circle cx="${ix + 36}" cy="${iy + 39}" r="10" fill="${C.green}50"/>
${t(ix + 30, iy + 44, "v", 14, C.bg0, "Arial,sans-serif", "middle", "bold")}
${t(ix + 64, iy + 36, "Plan Approved \u2014 Executing", 17, C.t1, "Arial,sans-serif", "start", "bold")}
${t(ix + 64, iy + 56, "n001 approved by user  \u00b7  n002 auto-allowed  \u00b7  n003 pending approval", 11, C.t3)}

<!-- Log -->
${lbl(ix, iy + 92, "Live Execution Log")}
${r(ix, iy + 104, iw, 228, 8, "#050912", C.brd)}

${t(ix + 16, iy + 132, "[00:00.001]  > n001 \u2014 fs.apply_patch \u2014 STARTING", 11, C.t3)}
${t(ix + 16, iy + 152, "[00:00.024]    reading app/globals.css (1.2 KB)", 11, C.t4)}
${t(ix + 16, iy + 172, "[00:00.031]    applying patch: bg-white -> bg-slate-950", 11, C.t3)}
${t(ix + 16, iy + 192, "[00:00.045]  v n001 \u2014 fs.apply_patch \u2014 COMPLETED  (21ms)", 11, C.green)}

${t(ix + 16, iy + 220, "[00:00.046]  > n002 \u2014 test.run_all \u2014 STARTING", 11, C.t3)}
${t(ix + 16, iy + 240, "[00:00.812]    passed: 24   failed: 0   skipped: 1", 11, C.t3)}
${t(ix + 16, iy + 260, "[00:00.813]  v n002 \u2014 test.run_all \u2014 COMPLETED  (767ms)", 11, C.green)}

${t(ix + 16, iy + 288, "[00:00.814]  ! n003 \u2014 git.commit \u2014 APPROVAL REQUIRED", 11, C.amber)}
<!-- cursor blink -->
<rect x="${ix + 16}" y="${iy + 300}" width="7" height="12" fill="${C.green}" opacity="0.7"/>

<!-- Approval gate for n003 -->
${r(ix, iy + 352, iw, 96, 8, C.amber + "10", C.amber + "45", 1.5)}
${t(ix + 20, iy + 380, "! Approval Gate \u2014 n003 \u2014 git.commit", 13, C.amber, "Consolas,monospace", "start", "bold")}
${t(ix + 20, iy + 400, 'message: "chore: bg update"   policy: ALLOW_WITH_APPROVAL', 11, C.t3)}
${r(ix + 20, iy + 412, 196, 28, 6, C.blue)}
${t(ix + 66, iy + 431, "Approve \u2192", 12, "#ffffff", "Consolas,monospace", "start", "bold")}
${r(ix + 228, iy + 412, 120, 28, 6, C.elev, C.brdHi)}
${t(ix + 264, iy + 431, "Deny", 12, C.t3)}
`);
}

// ── Scene 5 — VERIFIED ────────────────────────────────────────────────────────
function scene5() {
  const ix = CX, iy = CY, iw = CW;
  const LEFT_W = 500;
  const RIGHT_X = ix + LEFT_W + 24;
  const RIGHT_W = iw - LEFT_W - 24;

  return wrap("UseSteady \u2014 Run Complete", C.green, `
<!-- COMPLETED banner -->
${r(ix, iy + 8, iw, 68, 10, C.green + "16", C.green + "60", 1.5)}
<circle cx="${ix + 36}" cy="${iy + 42}" r="20" fill="${C.green}30"/>
<circle cx="${ix + 36}" cy="${iy + 42}" r="13" fill="${C.green}50"/>
${t(ix + 30, iy + 48, "v", 16, C.bg0, "Arial,sans-serif", "middle", "bold")}
${t(ix + 66, iy + 38, "COMPLETED", 22, C.green, "Arial,sans-serif", "start", "bold")}
${t(ix + 66, iy + 60, "3 steps  \u00b7  all approved  \u00b7  1.41s total  \u00b7  0 errors", 11, C.t3)}

<!-- LEFT: Execution trace -->
${lbl(ix, iy + 100, "Execution Trace")}
${r(ix, iy + 114, LEFT_W, 174, 8, C.elev, C.brd)}

${t(ix + 16, iy + 140, "n001  fs.apply_patch", 12, C.t1, "Consolas,monospace", "start", "bold")}
${t(ix + 16, iy + 158, "      app/globals.css   21ms", 11, C.t3)}
${r(ix + LEFT_W - 74, iy + 130, 60, 20, 4, C.green + "20", C.green + "55")}
${t(ix + LEFT_W - 62, iy + 144, "DONE", 9, C.green, "Consolas,monospace", "start", "bold")}
${ln(ix + 16, iy + 168, ix + LEFT_W - 16, iy + 168)}

${t(ix + 16, iy + 188, "n002  test.run_all", 12, C.t1, "Consolas,monospace", "start", "bold")}
${t(ix + 16, iy + 206, "      24 passed   767ms", 11, C.t3)}
${r(ix + LEFT_W - 74, iy + 178, 60, 20, 4, C.green + "20", C.green + "55")}
${t(ix + LEFT_W - 62, iy + 192, "DONE", 9, C.green, "Consolas,monospace", "start", "bold")}
${ln(ix + 16, iy + 216, ix + LEFT_W - 16, iy + 216)}

${t(ix + 16, iy + 236, "n003  git.commit", 12, C.t1, "Consolas,monospace", "start", "bold")}
${t(ix + 16, iy + 254, '      "chore: bg update"   3ms', 11, C.t3)}
${r(ix + LEFT_W - 74, iy + 226, 60, 20, 4, C.green + "20", C.green + "55")}
${t(ix + LEFT_W - 62, iy + 240, "DONE", 9, C.green, "Consolas,monospace", "start", "bold")}

<!-- RIGHT: VERIFIED badge -->
${lbl(RIGHT_X, iy + 100, "Replay Verification")}
${r(RIGHT_X, iy + 114, RIGHT_W, 174, 8, C.green + "08", C.green + "55", 1.5)}

${r(RIGHT_X + 20, iy + 132, RIGHT_W - 40, 56, 10, C.green + "20", C.green + "70", 2)}
${t(RIGHT_X + RIGHT_W / 2, iy + 155, "v  VERIFIED", 16, C.green, "Consolas,monospace", "middle", "bold")}
${t(RIGHT_X + RIGHT_W / 2, iy + 176, "Replay hash matches", 10, C.green + "cc", "Consolas,monospace", "middle")}

${t(RIGHT_X + 20, iy + 210, "All steps match recorded artifact.", 11, C.t2)}
${t(RIGHT_X + 20, iy + 228, "No drift detected.", 11, C.t3)}
${t(RIGHT_X + 20, iy + 250, "checksum  a7f3c2e1d9b6", 10, C.t4)}
${t(RIGHT_X + 20, iy + 266, "sealed    2026-04-04T09:14:33Z", 10, C.t4)}

<!-- Audit trail -->
${lbl(ix, iy + 310, "Audit Trail")}
${r(ix, iy + 324, iw, 100, 8, C.elev, C.brd)}

${t(ix + 16, iy + 350, "intent   ->", 11, C.blue)}
${t(ix + 110, iy + 350, '"Change bg-white to bg-slate-950 in app/globals.css..."', 11, C.t3)}

${t(ix + 16, iy + 372, "approved ->", 11, C.green)}
${t(ix + 110, iy + 372, "n001 by user@workstation   n003 by user@workstation", 11, C.t3)}

${t(ix + 16, iy + 394, "artifact ->", 11, C.violet)}
${t(ix + 110, iy + 394, "run_20260404_091433   sealed   immutable", 11, C.t3)}

${t(ix + 16, iy + 416, "verified ->", 11, C.green)}
${t(ix + 110, iy + 416, "replay hash matches   VERIFIED", 11, C.green)}
`);
}

// ── Render + assemble ─────────────────────────────────────────────────────────
const DENSITY = 144;

async function renderFrame(svg, file) {
  await sharp(Buffer.from(svg), { density: DENSITY })
    .resize(W, H)
    .png({ compressionLevel: 6 })
    .toFile(file);
  console.log("  rendered", path.basename(file));
}

const scenes = [
  { fn: scene1, dur: 2.5 },
  { fn: scene2, dur: 3.0 },
  { fn: scene3, dur: 3.5 },
  { fn: scene4, dur: 2.5 },
  { fn: scene5, dur: 4.0 },
];

console.log("Rendering frames...");
const framePaths = [];
for (let i = 0; i < scenes.length; i++) {
  const p = path.join(FRAMES_DIR, `frame${String(i + 1).padStart(2, "0")}.png`);
  await renderFrame(scenes[i].fn(), p);
  framePaths.push({ path: p, dur: scenes[i].dur });
}

// Write concat manifest
// ffmpeg concat demuxer requires Unix-style paths and the last file repeated
const concatLines = framePaths
  .map((f) => `file '${f.path.replace(/\\/g, "/")}'\nduration ${f.dur}`)
  .join("\n");
// ffmpeg needs last file twice (no trailing duration) to end cleanly
const concatFile = path.join(FRAMES_DIR, "frames.txt");
fs.writeFileSync(
  concatFile,
  concatLines + `\nfile '${framePaths.at(-1).path.replace(/\\/g, "/")}'`
);
console.log("  wrote frames.txt");

// Assemble
const concatPath = concatFile.replace(/\\/g, "/");
const videoPath  = VIDEO_OUT.replace(/\\/g, "/");

const cmd = [
  "ffmpeg -y",
  `-f concat -safe 0 -i "${concatPath}"`,
  `-vf "scale=${W}:${H}:flags=lanczos,format=yuv420p"`,
  `-c:v libx264 -preset slow -crf 20`,
  `-movflags +faststart`,
  `"${videoPath}"`,
].join(" ");

console.log("\nAssembling video...");
execSync(cmd, { stdio: "inherit" });

console.log(`\n✓  demo.mp4 written to ${VIDEO_OUT}`);
console.log(`   Total duration: ~${framePaths.reduce((s, f) => s + f.dur, 0)}s`);
