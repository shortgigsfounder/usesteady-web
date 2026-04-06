/**
 * AppIcon — UseSteady brand mark for the web app.
 *
 * The Policy Gate: an execution path pierces a governance barrier.
 * Blue (entry/untrusted) → Gate → Green (verified/completed).
 */

interface AppIconProps {
  size?: number;
  className?: string;
}

export function AppIcon({ size = 32, className = "" }: AppIconProps) {
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
      <rect width="64" height="64" rx="12" fill="#0b0b0c" />

      {/* Entry origin dot */}
      <circle cx="6" cy="32" r="4" fill="#3b82f6" />

      {/* Entry path — blue */}
      <line x1="10" y1="32" x2="25" y2="32" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" />

      {/* Gate — left bar (blue), right bar (green) */}
      <rect x="25" y="18" width="4" height="28" rx="1.5" fill="#3b82f6" />
      <rect x="35" y="18" width="4" height="28" rx="1.5" fill="#22c55e" />

      {/* Exit path — green */}
      <line x1="39" y1="32" x2="54" y2="32" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" />

      {/* Verified ping ring — animated */}
      <circle
        cx="58" cy="32" r="4"
        fill="#22c55e"
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          animation: "us-verified-ping 2.4s ease-out infinite",
        }}
      />

      {/* Terminal dot — verified (static, sits on top of ring) */}
      <circle cx="58" cy="32" r="4" fill="#22c55e" />
    </svg>
  );
}
