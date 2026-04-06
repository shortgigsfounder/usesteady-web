/**
 * AppIcon — UseSteady brand mark.
 *
 * The Policy Gate: an execution path pierces a governance barrier.
 * Blue (entry/untrusted) → Gate → Green (verified/completed).
 *
 * Props:
 *   size        — pixel size (default 32)
 *   variant     — "default" | "hero"
 *                 "default": dark background rect, for nav / chrome bars
 *                 "hero":    no background rect, larger strokes, glow — for
 *                            large hero / marketing display use
 *   className   — extra Tailwind / CSS classes
 */

interface AppIconProps {
  size?:      number;
  variant?:   "default" | "hero";
  className?: string;
}

export function AppIcon({ size = 32, variant = "default", className = "" }: AppIconProps) {
  const isHero    = variant === "hero";
  const sw        = isHero ? 4.5   : 3.5;   // stroke width
  const gateW     = isHero ? 5     : 4;     // gate bar width
  const gateY1    = isHero ? 14    : 18;    // gate bar top
  const gateH     = isHero ? 36    : 28;    // gate bar height
  const dotR      = isHero ? 4.5   : 4;     // terminal dot radius
  const pingR     = isHero ? 4.5   : 4;     // ping ring radius

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="UseSteady"
    >
      {/* Background — only in default variant */}
      {!isHero && <rect width="64" height="64" rx="12" fill="#0b0b0c" />}

      {/* Hero variant: subtle glow behind the gate */}
      {isHero && (
        <>
          <defs>
            <radialGradient id="gate-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#3b82f6" stopOpacity="0.18" />
              <stop offset="55%"  stopColor="#22c55e" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="16" y="10" width="32" height="44" rx="8" fill="url(#gate-glow)" />
        </>
      )}

      {/* Entry origin dot — blue */}
      <circle cx="6" cy="32" r={dotR} fill="#3b82f6" />

      {/* Entry path — blue */}
      <line
        x1={6 + dotR} y1="32"
        x2="25"        y2="32"
        stroke="#3b82f6" strokeWidth={sw} strokeLinecap="round"
      />

      {/* Gate bars */}
      <rect x="25"          y={gateY1} width={gateW} height={gateH} rx="2" fill="#3b82f6" />
      <rect x={25 + gateW + 6} y={gateY1} width={gateW} height={gateH} rx="2" fill="#22c55e" />

      {/* Exit path — green */}
      <line
        x1={25 + gateW + 6 + gateW} y1="32"
        x2="54"                       y2="32"
        stroke="#22c55e" strokeWidth={sw} strokeLinecap="round"
      />

      {/* Verified ping ring — animated */}
      <circle
        cx="58" cy="32" r={pingR}
        fill="#22c55e"
        style={{
          transformBox:    "fill-box",
          transformOrigin: "center",
          animation:       "us-verified-ping 2.4s ease-out infinite",
        }}
      />

      {/* Terminal dot — verified (static, sits on top) */}
      <circle cx="58" cy="32" r={dotR} fill="#22c55e" />
    </svg>
  );
}
