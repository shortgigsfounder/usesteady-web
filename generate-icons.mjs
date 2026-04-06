import sharp from "sharp";

const svgSrc = `
<svg width="512" height="512" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="12" fill="#0b0b0c"/>
  <circle cx="6" cy="32" r="4" fill="#3b82f6"/>
  <line x1="10" y1="32" x2="25" y2="32" stroke="#3b82f6" stroke-width="3.5" stroke-linecap="round"/>
  <rect x="25" y="18" width="4" height="28" rx="1.5" fill="#3b82f6"/>
  <rect x="35" y="18" width="4" height="28" rx="1.5" fill="#22c55e"/>
  <line x1="39" y1="32" x2="54" y2="32" stroke="#22c55e" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="58" cy="32" r="4" fill="#22c55e"/>
</svg>
`;

const buf = Buffer.from(svgSrc);

await Promise.all([
  sharp(buf).resize(1024, 1024).toFile("public/icon.png"),
  sharp(buf).resize(512, 512).toFile("public/icon-512.png"),
  sharp(buf).resize(192, 192).toFile("public/icon-192.png"),
  sharp(buf).resize(180, 180).toFile("public/apple-icon.png"),
  sharp(buf).resize(32, 32).toFile("public/favicon-32.png"),
  sharp(buf).resize(16, 16).toFile("public/favicon-16.png"),
]);

console.log("All icon sizes generated.");
