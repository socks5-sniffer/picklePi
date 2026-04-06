import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Per-level colour themes
// a = start, b = mid / accent, c = end (gradient runs a → b → c)
// glow = outer pulse colour when badge is earned
// ─────────────────────────────────────────────────────────────────────────────
type Theme = { a: string; b: string; c: string; glow: string };

const THEMES: Record<number, Theme> = {
  1:  { a: '#ef4444', b: '#22c55e', c: '#3b82f6', glow: '#86efac' }, // RGB
  2:  { a: '#f59e0b', b: '#fcd34d', c: '#f97316', glow: '#fcd34d' }, // amber / input
  3:  { a: '#8b5cf6', b: '#a78bfa', c: '#c084fc', glow: '#a78bfa' }, // purple / PWM
  4:  { a: '#06b6d4', b: '#22d3ee', c: '#0284c7', glow: '#67e8f9' }, // cyan  / signal
  5:  { a: '#10b981', b: '#34d399', c: '#059669', glow: '#6ee7b7' }, // emerald / sensor
  6:  { a: '#f97316', b: '#fb923c', c: '#ea580c', glow: '#fdba74' }, // orange / motion
  7:  { a: '#6366f1', b: '#818cf8', c: '#4338ca', glow: '#a5b4fc' }, // indigo / systems
  8:  { a: '#d97706', b: '#fbbf24', c: '#b45309', glow: '#fde68a' }, // gold   / analog
  9:  { a: '#0ea5e9', b: '#38bdf8', c: '#0369a1', glow: '#7dd3fc' }, // sky    / sonar
  10: { a: '#7c3aed', b: '#9d4edd', c: '#5b21b6', glow: '#c084fc' }, // deep purple
  11: { a: '#eab308', b: '#facc15', c: '#ca8a04', glow: '#fef08a' }, // yellow / optical
  12: { a: '#dc2626', b: '#ef4444', c: '#991b1b', glow: '#fca5a5' }, // red    / security
  13: { a: '#4f46e5', b: '#818cf8', c: '#3730a3', glow: '#a5b4fc' }, // indigo / inertial
};

// ─────────────────────────────────────────────────────────────────────────────
// Shared hexagon geometry  (viewBox 0 0 100 102)
// Centre (50, 51), outer circumradius 46, inner 41
// ─────────────────────────────────────────────────────────────────────────────
const HEX_OUTER = '50,5 90,28 90,74 50,97 10,74 10,28';
const HEX_INNER = '50,10 85.5,30.5 85.5,71.5 50,92 14.5,71.5 14.5,30.5';

// ─────────────────────────────────────────────────────────────────────────────
// Level 1 icon: three overlapping circles showing additive RGB colour mixing.
// mix-blend-mode: screen on a dark base recreates the physics of the RGB LED:
//   R + G = Yellow  |  R + B = Magenta  |  G + B = Cyan  |  R+G+B = White
// ─────────────────────────────────────────────────────────────────────────────
function Level1Icon() {
  return (
    <>
      {/* Red */}
      <circle cx="50" cy="34" r="13" fill="#ff1111" style={{ mixBlendMode: 'screen' }} />
      {/* Green */}
      <circle cx="59" cy="49" r="13" fill="#11ff11" style={{ mixBlendMode: 'screen' }} />
      {/* Blue */}
      <circle cx="41" cy="49" r="13" fill="#1111ff" style={{ mixBlendMode: 'screen' }} />

      {/* GPIO label inside the badge */}
      <text
        x="50" y="73"
        textAnchor="middle"
        fontFamily="monospace"
        fontWeight="bold"
        fontSize="9"
        fill="#cbd5e1"
        letterSpacing="1"
      >
        GPIO
      </text>
      <text
        x="50" y="82"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="5.5"
        fill="#64748b"
        letterSpacing="1"
      >
        INITIATE
      </text>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Placeholder icon for levels 2-13 (same badge shell, level number in centre).
// Swap in a custom icon here once each level's design is approved.
// ─────────────────────────────────────────────────────────────────────────────
function DefaultIcon({ level, theme }: { level: number; theme: Theme }) {
  return (
    <>
      {/* Subtle inner hex ring */}
      <polygon
        points="50,22 68,32 68,52 50,62 32,52 32,32"
        fill="none"
        stroke={theme.b}
        strokeWidth="1"
        opacity="0.25"
      />
      <polygon
        points="50,28 62,35 62,49 50,56 38,49 38,35"
        fill="none"
        stroke={theme.b}
        strokeWidth="0.75"
        opacity="0.15"
      />
      {/* Level number */}
      <text
        x="50" y="44"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="monospace"
        fontWeight="bold"
        fontSize="22"
        fill={theme.b}
        opacity="0.9"
      >
        {level}
      </text>
      {/* "LVL" label */}
      <text
        x="50" y="56"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="5.5"
        fill={theme.b}
        opacity="0.5"
        letterSpacing="1.5"
      >
        LVL
      </text>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Public component
// ─────────────────────────────────────────────────────────────────────────────
interface BadgeIconProps {
  level: number;
  name: string;
  earned: boolean;
  size?: number;
}

export default function BadgeIcon({ level, name, earned, size = 48 }: BadgeIconProps) {
  const theme = THEMES[level] ?? THEMES[1];
  // Unique IDs so multiple badges on the same page don't clash in <defs>
  const uid = `bdg-l${level}`;

  return (
    <svg
      viewBox="0 0 100 102"
      width={size}
      height={Math.round(size * 1.02)}
      xmlns="http://www.w3.org/2000/svg"
      style={!earned ? { filter: 'grayscale(1)', opacity: 0.3 } : undefined}
      aria-label={earned ? name : 'Badge locked'}
      role="img"
    >
      <defs>
        {/* Tricolour gradient for the hexagon border */}
        <linearGradient id={`${uid}-brd`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={theme.a} />
          <stop offset="50%"  stopColor={theme.b} />
          <stop offset="100%" stopColor={theme.c} />
        </linearGradient>

        {/* Dark background gradient for the interior */}
        <linearGradient id={`${uid}-bg`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0c1527" />
        </linearGradient>

        {/* Glass-shine radial gradient (subtle top highlight) */}
        <radialGradient id={`${uid}-shine`} cx="50%" cy="10%" r="65%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.13" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0"    />
        </radialGradient>

        {/* Pulsing outer glow — only for earned badges */}
        {earned && (
          <filter id={`${uid}-glow`} x="-28%" y="-28%" width="156%" height="156%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur">
              <animate
                attributeName="stdDeviation"
                values="1.5;3.5;1.5"
                dur="2.8s"
                repeatCount="indefinite"
              />
            </feGaussianBlur>
            <feFlood floodColor={theme.glow} floodOpacity="0.65" result="colour" />
            <feComposite in="colour" in2="blur" operator="in" result="coloured-blur" />
            <feMerge>
              <feMergeNode in="coloured-blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}

        {/* Clip path so icon content stays inside the inner hex */}
        <clipPath id={`${uid}-clip`}>
          <polygon points={HEX_INNER} />
        </clipPath>
      </defs>

      <g filter={earned ? `url(#${uid}-glow)` : undefined}>
        {/* 1. Outer hexagon — gradient fill forms the visible coloured border */}
        <polygon points={HEX_OUTER} fill={`url(#${uid}-brd)`} />

        {/* 2. Inner hexagon — dark fill covers centre of the gradient */}
        <polygon points={HEX_INNER} fill={`url(#${uid}-bg)`} />

        {/* 3. Icon content clipped to inner hex */}
        <g clipPath={`url(#${uid}-clip)`}>
          {level === 1
            ? <Level1Icon />
            : <DefaultIcon level={level} theme={theme} />
          }
        </g>

        {/* 4. Glass shine overlay */}
        <polygon points={HEX_INNER} fill={`url(#${uid}-shine)`} />
      </g>
    </svg>
  );
}
