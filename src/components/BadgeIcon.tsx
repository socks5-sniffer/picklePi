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
// Level 2 — Input Investigator  (Button controls LED)
// Top-down view of a tactile button: corner pins, outer body, dome, LED burst
// ─────────────────────────────────────────────────────────────────────────────
function Level2Icon() {
  return (
    <>
      {/* Button body */}
      <rect x="30" y="30" width="40" height="40" rx="5" fill="#1e293b" stroke="#fcd34d" strokeWidth="2" />
      {/* Corner pins */}
      {[[26,37],[26,63],[74,37],[74,63]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#fcd34d" opacity="0.7" />
      ))}
      {/* Centre dome (depressed button cap) */}
      <circle cx="50" cy="50" r="10" fill="#fcd34d" opacity="0.15" stroke="#fcd34d" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="5"  fill="#fcd34d" opacity="0.7" />
      {/* Press indicator arrow */}
      <path d="M50 20 L46 26 L50 24 L54 26 Z" fill="#fcd34d" opacity="0.6" />
      {/* LED burst (top-right) */}
      <circle cx="74" cy="26" r="5" fill="#f97316" opacity="0.9" />
      {[0,60,120,180,240,300].map((deg,i) => {
        const r = (deg * Math.PI) / 180;
        return <line key={i} x1={74 + Math.cos(r)*6} y1={26 + Math.sin(r)*6} x2={74 + Math.cos(r)*9} y2={26 + Math.sin(r)*9} stroke="#f97316" strokeWidth="1.2" opacity="0.7" />;
      })}
      <text x="50" y="82" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="6" fill="#fcd34d" letterSpacing="0.5">INPUT</text>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Level 3 — PWM Tamer  (PWM brightness / duty cycle)
// A duty-cycle waveform: wide pulse → narrower pulse → narrowest pulse
// ─────────────────────────────────────────────────────────────────────────────
function Level3Icon() {
  // baseline y=62, top y=32, width spans 18..82
  const base = 65;
  const top  = 33;
  // three pulses with decreasing duty: 80% → 50% → 20%
  const pulses = [
    { x: 18, period: 18, duty: 0.8 },
    { x: 38, period: 16, duty: 0.5 },
    { x: 56, period: 14, duty: 0.25 },
    { x: 72, period: 12, duty: 0.1 },
  ];
  const segs: string[] = [];
  pulses.forEach(({ x, period, duty }) => {
    const hi = Math.round(period * duty);
    segs.push(`M${x},${base} L${x},${top} L${x + hi},${top} L${x + hi},${base} L${x + period},${base}`);
  });
  return (
    <>
      {/* Baseline */}
      <line x1="15" y1={base} x2="85" y2={base} stroke="#a78bfa" strokeWidth="0.8" opacity="0.25" />
      {/* Waveform */}
      {segs.map((d, i) => <path key={i} d={d} fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinejoin="round" />)}
      {/* Label */}
      <text x="50" y="82" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="6" fill="#a78bfa" letterSpacing="0.5">PWM</text>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Level 4 — Signal Wrangler  (Buzzer / TonalBuzzer / musical notes)
// A speaker cone with radiating sound arcs and a musical note
// ─────────────────────────────────────────────────────────────────────────────
function Level4Icon() {
  return (
    <>
      {/* Speaker body */}
      <rect x="22" y="40" width="14" height="20" rx="2" fill="#22d3ee" opacity="0.8" />
      {/* Cone */}
      <path d="M36 37 L52 28 L52 72 L36 63 Z" fill="#22d3ee" opacity="0.5" />
      {/* Sound arcs */}
      <path d="M56 38 Q66 51 56 64" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M61 33 Q75 51 61 69" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
      <path d="M65 28 Q83 51 65 74" fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
      {/* Musical note */}
      <text x="21" y="30" fontFamily="serif" fontSize="14" fill="#22d3ee" opacity="0.6">♪</text>
      <text x="50" y="82" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="5.5" fill="#22d3ee" letterSpacing="0.5">SIGNAL</text>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Level 5 — Sensor Specialist  (PIR motion sensor)
// A PIR dome with detection fan and movement spark
// ─────────────────────────────────────────────────────────────────────────────
function Level5Icon() {
  return (
    <>
      {/* PIR dome body */}
      <path d="M38 62 Q38 42 50 42 Q62 42 62 62 Z" fill="#34d399" opacity="0.25" stroke="#34d399" strokeWidth="1.5" />
      {/* Dome highlight */}
      <path d="M42 62 Q42 47 50 47 Q58 47 58 62" fill="none" stroke="#34d399" strokeWidth="1" opacity="0.5" />
      {/* PCB base */}
      <rect x="35" y="62" width="30" height="6" rx="2" fill="#34d399" opacity="0.6" />
      {/* Pins */}
      <line x1="42" y1="68" x2="42" y2="74" stroke="#34d399" strokeWidth="1.5" />
      <line x1="50" y1="68" x2="50" y2="74" stroke="#34d399" strokeWidth="1.5" />
      <line x1="58" y1="68" x2="58" y2="74" stroke="#34d399" strokeWidth="1.5" />
      {/* Detection cone arcs */}
      <path d="M28 35 Q50 20 72 35" fill="none" stroke="#34d399" strokeWidth="1.5" strokeDasharray="2,2" opacity="0.7" />
      <path d="M22 40 Q50 22 78 40" fill="none" stroke="#34d399" strokeWidth="1.2" strokeDasharray="2,2" opacity="0.45" />
      {/* Motion spark */}
      <path d="M24 55 L28 50 L26 50 L30 44" fill="none" stroke="#6ee7b7" strokeWidth="2" strokeLinecap="round" />
      <text x="50" y="86" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="5.5" fill="#34d399" letterSpacing="0.5">SENSOR</text>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Level 6 — Motion Intelligence  (ADXL345 accelerometer, 3-axis, I2C)
// Three coloured axes (X/Y/Z) with a vector arrow showing resultant force
// ─────────────────────────────────────────────────────────────────────────────
function Level6Icon() {
  const O = { x: 50, y: 56 }; // origin
  const axes = [
    { dx: 28, dy: 0,   col: '#ef4444', lbl: 'X', lx: 81, ly: 58 },
    { dx: -14, dy: -24, col: '#22c55e', lbl: 'Y', lx: 33, ly: 29 },
    { dx: 0,  dy: 22,  col: '#3b82f6', lbl: 'Z', lx: 50, ly: 82 },
  ];
  return (
    <>
      {/* IC chip at origin */}
      <rect x="44" y="50" width="12" height="12" rx="2" fill="#1e293b" stroke="#fb923c" strokeWidth="1.5" />
      {axes.map(({ dx, dy, col, lbl, lx, ly }) => (
        <g key={lbl}>
          <line
            x1={O.x} y1={O.y}
            x2={O.x + dx} y2={O.y + dy}
            stroke={col} strokeWidth="2" strokeLinecap="round"
          />
          {/* Arrowhead */}
          <circle cx={O.x + dx} cy={O.y + dy} r="2.5" fill={col} />
          <text x={lx} y={ly} textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="7" fill={col}>{lbl}</text>
        </g>
      ))}
      {/* Resultant vector */}
      <line x1={O.x} y1={O.y} x2="65" y2="34" stroke="#fdba74" strokeWidth="1.5" strokeDasharray="2,1" strokeLinecap="round" />
      <polygon points="65,29 62,37 69,35" fill="#fdba74" />
      <text x="50" y="24" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="5.5" fill="#fb923c" letterSpacing="0.5">I2C</text>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Level 7 — Mini Systems Architect  (State machine, threading)
// A 3-node state diagram with directed arrows
// ─────────────────────────────────────────────────────────────────────────────
function Level7Icon() {
  const nodes = [
    { cx: 34, cy: 38, label: 'IDLE' },
    { cx: 66, cy: 38, label: 'ARM' },
    { cx: 50, cy: 64, label: 'ALRT' },
  ];
  // Arrows (from -> to), offset so they don't overlap node centres
  const arrows = [
    { x1: 44, y1: 38, x2: 56, y2: 38 },   // IDLE → ARM
    { x1: 63, y1: 47, x2: 53, y2: 58 },   // ARM  → ALRT
    { x1: 46, y1: 62, x2: 36, y2: 46 },   // ALRT → IDLE
  ];
  return (
    <>
      {arrows.map((a, i) => (
        <g key={i}>
          <line x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke="#818cf8" strokeWidth="1.5" markerEnd={`url(#arr${i})`} />
        </g>
      ))}
      {nodes.map(({ cx, cy, label }) => (
        <g key={label}>
          <circle cx={cx} cy={cy} r="10" fill="#1e293b" stroke="#818cf8" strokeWidth="1.8" />
          <text x={cx} y={cy + 2.5} textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="4.5" fill="#818cf8">{label}</text>
        </g>
      ))}
      {/* Manual arrowheads */}
      <polygon points="57,35 55,42 62,39" fill="#818cf8" />
      <polygon points="52,59 60,53 54,51" fill="#818cf8" />
      <polygon points="35,47 40,57 43,49" fill="#818cf8" />
      <text x="50" y="83" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="5.5" fill="#818cf8" letterSpacing="0.5">FSM</text>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Level 8 — Analog Alchemist  (MCP3008 ADC, SPI, potentiometer)
// A potentiometer dial with tick marks, pointer & the ADC chip below
// ─────────────────────────────────────────────────────────────────────────────
function Level8Icon() {
  const cx = 50, cy = 46, R = 18;
  // Tick marks from 210° to -30° (= 330°) in 30° steps
  const ticks = [210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150];
  // Pointer at ~270° (full sweep centre)
  const ptr = 270 * (Math.PI / 180);
  return (
    <>
      {/* Dial track arc (210° to 150° going clockwise = 300° sweep) */}
      <path
        d={`M${cx + R * Math.cos(210 * Math.PI/180)},${cy + R * Math.sin(210 * Math.PI/180)} A${R},${R} 0 1 1 ${cx + R * Math.cos(150 * Math.PI/180)},${cy + R * Math.sin(150 * Math.PI/180)}`}
        fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" opacity="0.35"
      />
      {/* Filled arc (value portion ~60%) */}
      <path
        d={`M${cx + R * Math.cos(210 * Math.PI/180)},${cy + R * Math.sin(210 * Math.PI/180)} A${R},${R} 0 0 1 ${cx + R * Math.cos(ptr)},${cy + R * Math.sin(ptr)}`}
        fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round"
      />
      {ticks.map((deg, i) => {
        const a = deg * Math.PI / 180;
        const r1 = R - 3, r2 = R;
        return <line key={i} x1={cx + r1*Math.cos(a)} y1={cy + r1*Math.sin(a)} x2={cx + r2*Math.cos(a)} y2={cy + r2*Math.sin(a)} stroke="#fbbf24" strokeWidth="1" opacity="0.5" />;
      })}
      {/* Centre circle */}
      <circle cx={cx} cy={cy} r="6" fill="#1e293b" stroke="#fbbf24" strokeWidth="1.5" />
      {/* Pointer */}
      <line x1={cx} y1={cy} x2={cx + 13*Math.cos(ptr)} y2={cy + 13*Math.sin(ptr)} stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
      {/* ADC chip label */}
      <rect x="36" y="68" width="28" height="10" rx="2" fill="#1e293b" stroke="#fbbf24" strokeWidth="1" opacity="0.8" />
      <text x="50" y="76" textAnchor="middle" fontFamily="monospace" fontSize="5" fill="#fbbf24">MCP3008</text>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Level 9 — Sonar Scout  (HC-SR04 ultrasonic distance)
// Two transducer cylinders with concentric sonar arcs in front
// ─────────────────────────────────────────────────────────────────────────────
function Level9Icon() {
  const arcs = [20, 30, 40]; // radii
  return (
    <>
      {/* Two transducer cylinders */}
      {[36, 52].map((x, i) => (
        <g key={i}>
          <ellipse cx={x} cy={60} rx="6" ry="3" fill="#38bdf8" opacity="0.5" />
          <rect x={x-6} y={44} width={12} height={16} rx="3" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          <ellipse cx={x} cy={44} rx="6" ry="3" fill="#38bdf8" opacity="0.8" />
        </g>
      ))}
      {/* Sonar arcs pointing upward */}
      {arcs.map((r, i) => (
        <path key={i}
          d={`M${44 - r},44 A${r},${r} 0 0 1 ${44 + r},44`}
          fill="none" stroke="#38bdf8" strokeWidth="1.5"  
          opacity={1 - i * 0.25}
          strokeDasharray={i > 0 ? '2,2' : undefined}
        />
      ))}
      {/* Distance marker line */}
      <line x1="44" y1="22" x2="72" y2="22" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
      <text x="73" y="25" fontFamily="monospace" fontSize="7" fill="#38bdf8" opacity="0.7">d</text>
      <text x="50" y="83" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="5.5" fill="#38bdf8" letterSpacing="0.5">SONAR</text>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Level 10 — Systems Architect  (relay, DS18B20 temp, fail-safe)
// A PCB layout: grid of traces connecting component pads
// ─────────────────────────────────────────────────────────────────────────────
function Level10Icon() {
  const col = '#9d4edd';
  const traces = [
    'M28,40 H48', 'M52,40 H72',
    'M28,60 H48', 'M52,60 H72',
    'M40,28 V48', 'M40,52 V72',
    'M60,28 V48', 'M60,52 V72',
  ];
  const pads = [
    [28,40],[72,40],[28,60],[72,60],
    [40,28],[40,72],[60,28],[60,72],
    [50,50],
  ];
  return (
    <>
      {/* PCB grid dots */}
      {Array.from({length:5},(_,row)=>Array.from({length:5},(_,col2)=>(
        <circle key={`${row}-${col2}`} cx={28+col2*11} cy={28+row*11} r="0.8" fill={col} opacity="0.25" />
      )))}
      {traces.map((d,i) => <path key={i} d={d} fill="none" stroke={col} strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />)}
      {pads.map(([x,y],i) => <circle key={i} cx={x} cy={y} r="3.5" fill="#1e293b" stroke={col} strokeWidth="1.5" />)}
      {/* Central CPU */}
      <rect x="44" y="44" width="12" height="12" rx="2" fill={col} opacity="0.4" />
      <rect x="46" y="46" width="8" height="8" rx="1" fill={col} opacity="0.8" />
      <text x="50" y="82" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="5.5" fill={col} letterSpacing="0.5">SYSTEM</text>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Level 11 — Optical Guardian  (laser tripwire)
// A laser emitter aiming a beam at a photoresistor; beam shown broken by figure
// ─────────────────────────────────────────────────────────────────────────────
function Level11Icon() {
  const col = '#facc15';
  return (
    <>
      {/* Laser emitter (left) */}
      <rect x="15" y="46" width="14" height="8" rx="2" fill={col} opacity="0.8" />
      <polygon points="29,47 34,50 29,53" fill={col} />
      {/* Beam — solid first half */}
      <line x1="34" y1="50" x2="46" y2="50" stroke={col} strokeWidth="2" strokeLinecap="round" />
      {/* Beam break (intruder dot) */}
      <circle cx="50" cy="50" r="5" fill="#dc2626" opacity="0.85" />
      <line x1="48" y1="48" x2="52" y2="52" stroke="white" strokeWidth="1.2" />
      <line x1="52" y1="48" x2="48" y2="52" stroke="white" strokeWidth="1.2" />
      {/* Beam — dashed second half (broken) */}
      <line x1="55" y1="50" x2="71" y2="50" stroke={col} strokeWidth="2" strokeLinecap="round" strokeDasharray="2,2" opacity="0.5" />
      {/* Photoresistor (right) */}
      <circle cx="75" cy="50" r="6" fill="#1e293b" stroke={col} strokeWidth="1.8" />
      <path d="M72,50 Q75,46 78,50 Q75,54 72,50" fill="none" stroke={col} strokeWidth="1" />
      {/* Alarm arc above photoresistor */}
      <path d="M69 42 Q75 37 81 42" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M71 38 Q75 32 79 38" fill="none" stroke="#ef4444" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <text x="50" y="82" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="5.5" fill={col} letterSpacing="0.5">OPTICAL</text>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Level 12 — Security Engineer  (Hall effect, Reed switch, magnetic deadbolt)
// A padlock with a magnetic field line around the shackle
// ─────────────────────────────────────────────────────────────────────────────
function Level12Icon() {
  const col = '#ef4444';
  return (
    <>
      {/* Shackle */}
      <path d="M38,50 L38,36 Q38,24 50,24 Q62,24 62,36 L62,50" fill="none" stroke={col} strokeWidth="4" strokeLinecap="round" />
      {/* Padlock body */}
      <rect x="30" y="50" width="40" height="28" rx="5" fill="#1e293b" stroke={col} strokeWidth="2" />
      {/* Keyhole */}
      <circle cx="50" cy="61" r="5" fill={col} opacity="0.25" stroke={col} strokeWidth="1.5" />
      <rect x="47.5" y="63" width="5" height="8" rx="1" fill={col} opacity="0.6" />
      {/* Magnetic field arcs around shackle top */}
      <path d="M33,30 Q30,20 38,16" fill="none" stroke="#fca5a5" strokeWidth="1.2" strokeDasharray="2,2" strokeLinecap="round" opacity="0.7" />
      <path d="M67,30 Q70,20 62,16" fill="none" stroke="#fca5a5" strokeWidth="1.2" strokeDasharray="2,2" strokeLinecap="round" opacity="0.7" />
      {/* N / S poles */}
      <text x="22" y="33" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#fca5a5" opacity="0.8">N</text>
      <text x="72" y="33" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#fca5a5" opacity="0.8">S</text>
      <text x="50" y="88" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="5.5" fill={col} letterSpacing="0.5">SECURE</text>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Level 13 — Inertial Defender  (vibration sensor, ADXL345, G-force, tamper)
// A shield with concentric impact-wave rings and a lightning bolt
// ─────────────────────────────────────────────────────────────────────────────
function Level13Icon() {
  const col = '#818cf8';
  return (
    <>
      {/* Shield outline */}
      <path d="M50,20 L72,30 L72,56 Q72,72 50,80 Q28,72 28,56 L28,30 Z"
        fill="#1e293b" stroke={col} strokeWidth="2.5" />
      {/* Inner shield */}
      <path d="M50,27 L65,35 L65,56 Q65,67 50,73 Q35,67 35,56 L35,35 Z"
        fill="none" stroke={col} strokeWidth="1" opacity="0.35" />
      {/* Impact rings */}
      {[8, 14, 20].map((r, i) => (
        <circle key={i} cx="50" cy="52" r={r} fill="none" stroke={col} strokeWidth="1.2"
          opacity={0.6 - i * 0.18} strokeDasharray={i > 0 ? '2,2' : undefined} />
      ))}
      {/* Lightning bolt (impact / shock) */}
      <path d="M50,36 L44,52 L49,52 L43,68 L58,50 L52,50 Z"
        fill={col} opacity="0.9" />
      <text x="50" y="91" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="5.5" fill={col} letterSpacing="0.5">INERTIAL</text>
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
          {level === 1  ? <Level1Icon  /> :
           level === 2  ? <Level2Icon  /> :
           level === 3  ? <Level3Icon  /> :
           level === 4  ? <Level4Icon  /> :
           level === 5  ? <Level5Icon  /> :
           level === 6  ? <Level6Icon  /> :
           level === 7  ? <Level7Icon  /> :
           level === 8  ? <Level8Icon  /> :
           level === 9  ? <Level9Icon  /> :
           level === 10 ? <Level10Icon /> :
           level === 11 ? <Level11Icon /> :
           level === 12 ? <Level12Icon /> :
                          <Level13Icon />}
        </g>

        {/* 4. Glass shine overlay */}
        <polygon points={HEX_INNER} fill={`url(#${uid}-shine)`} />
      </g>
    </svg>
  );
}
