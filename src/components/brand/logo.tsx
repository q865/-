import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Компактная иконка для шапки / favicon */
  variant?: "mark" | "full";
};

/** Логотип «Воздушное облако» — облако с гелевыми шарами. */
export function Logo({ className, variant = "mark" }: LogoProps) {
  if (variant === "full") {
    return (
      <svg
        viewBox="0 0 320 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-auto w-full", className)}
        role="img"
        aria-label="Воздушное облако"
      >
        <defs>
          <linearGradient id="logo-sky" x1="160" y1="0" x2="160" y2="240" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EAF6FF" />
            <stop offset="1" stopColor="#D4EBFA" />
          </linearGradient>
          <filter id="logo-cloud-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#3d3a36" floodOpacity="0.1" />
          </filter>
        </defs>
        <rect width="320" height="240" rx="24" fill="url(#logo-sky)" />
        <LogoSparkles />
        <LogoBalloons />
        <LogoCloud filter="url(#logo-cloud-shadow)" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="Воздушное облако"
    >
      <defs>
        <linearGradient id="logo-mark-bg" x1="24" y1="4" x2="24" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F0F8FF" />
          <stop offset="1" stopColor="#DCEEF8" />
        </linearGradient>
        <filter id="logo-mark-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#3d3a36" floodOpacity="0.12" />
        </filter>
      </defs>
      <rect width="48" height="48" rx="14" fill="url(#logo-mark-bg)" />
      <LogoSparkles compact />
      <LogoBalloons compact />
      <LogoCloud compact filter="url(#logo-mark-shadow)" />
    </svg>
  );
}

function LogoSparkles({ compact }: { compact?: boolean }) {
  const dots = compact
    ? [
        { cx: 10, cy: 14, r: 0.7 },
        { cx: 38, cy: 18, r: 0.6 },
        { cx: 14, cy: 8, r: 0.5 },
      ]
    : [
        { cx: 48, cy: 52, r: 2.5 },
        { cx: 268, cy: 44, r: 2 },
        { cx: 72, cy: 28, r: 1.5 },
        { cx: 240, cy: 72, r: 1.8 },
      ];

  return (
    <g fill="#FFFFFF" opacity={compact ? 0.85 : 0.9}>
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={d.r} />
      ))}
    </g>
  );
}

function LogoBalloons({ compact }: { compact?: boolean }) {
  const anchor = compact ? { x: 24, y: 30 } : { x: 160, y: 148 };
  const scale = compact ? 1 : 1;

  const balloons = compact
    ? [
        { cx: 16, cy: 14, rx: 4.2, ry: 5.2, fill: "#9B7FD4", rot: -8 },
        { cx: 24, cy: 10, rx: 4.5, ry: 5.5, fill: "#FFD93D", rot: 0 },
        { cx: 32, cy: 13, rx: 4, ry: 5, fill: "#FF9F43", rot: 10 },
        { cx: 20, cy: 20, rx: 3.6, ry: 4.6, fill: "#FF8FAB", rot: -14 },
        { cx: 28, cy: 19, rx: 3.8, ry: 4.8, fill: "#7BC67E", rot: 8 },
        { cx: 24, cy: 16, rx: 3.4, ry: 4.2, fill: "#5DCCF5", rot: 4 },
      ]
    : [
        { cx: 118, cy: 58, rx: 18, ry: 22, fill: "#9B7FD4", rot: -12 },
        { cx: 148, cy: 42, rx: 20, ry: 24, fill: "#FFD93D", rot: -4 },
        { cx: 178, cy: 48, rx: 19, ry: 23, fill: "#FF9F43", rot: 8 },
        { cx: 202, cy: 62, rx: 17, ry: 21, fill: "#FF8FAB", rot: 14 },
        { cx: 132, cy: 78, rx: 16, ry: 20, fill: "#7BC67E", rot: -10 },
        { cx: 162, cy: 72, rx: 17, ry: 21, fill: "#5DCCF5", rot: 2 },
        { cx: 192, cy: 82, rx: 15, ry: 19, fill: "#C4A0FF", rot: 18 },
        { cx: 108, cy: 88, rx: 14, ry: 18, fill: "#FFB347", rot: -18 },
      ];

  return (
    <g>
      {balloons.map((b, i) => (
        <g key={i} transform={`rotate(${b.rot * scale} ${b.cx} ${b.cy})`}>
          <ellipse cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry} fill={b.fill} />
          <ellipse
            cx={b.cx - b.rx * 0.25}
            cy={b.cy - b.ry * 0.28}
            rx={b.rx * 0.22}
            ry={b.ry * 0.18}
            fill="#FFFFFF"
            opacity={0.55}
          />
          <path
            d={`M ${b.cx} ${b.cy + b.ry} Q ${b.cx} ${b.cy + b.ry + (compact ? 2.5 : 8)} ${anchor.x} ${anchor.y}`}
            stroke="#8a8480"
            strokeWidth={compact ? 0.6 : 1.2}
            strokeLinecap="round"
            fill="none"
            opacity={0.55}
          />
          <circle cx={b.cx} cy={b.cy + b.ry} r={compact ? 0.5 : 1.2} fill="#8a8480" opacity={0.6} />
        </g>
      ))}
    </g>
  );
}

function LogoCloud({
  compact,
  filter,
}: {
  compact?: boolean;
  filter?: string;
}) {
  if (compact) {
    return (
      <g filter={filter}>
        <path
          d="M8 34h32c4.4 0 8-3.6 8-8 0-3.5-2.3-6.5-5.5-7.5.3-4-3.4-7.5-7.5-7.5-2 0-3.8.8-5 2.1-1.5-2.4-4-3.8-6.7-3.8-4.6 0-8.3 3.7-8.3 8.3 0 .8.1 1.5.3 2.2-3.3 1-5.8 4-5.8 2.8 0 5.1 2.1 5.7 4.8 1.2-.3 2.4-.5 3.8-.5 4.4 0 8 3.6 8 8z"
          fill="#FFFFFF"
        />
      </g>
    );
  }

  return (
    <g filter={filter}>
      <path
        d="M72 168c0-18 13-32 29-35-2-14 10-27 24-27 8 0 15 4 19 11 5-8 14-13 24-13 15 0 28 12 28 28 0 2-.2 4-.5 6 14 3 24 15 24 30 0 17-14 31-31 31H88c-14 0-25-11-25-25 0-12 9-22 20-25-1-2-1.5-4.5-1.5-7 0-11 9-20 20-20 5 0 9 2 12 5 4-8 12-14 21-14 12 0 22 10 23 22-4 1.5-7 4-9 7-6-6-14-10-23-10-16 0-29 13-29 29 0 2.5.4 5 1.2 7.5-10 3.5-17 13-17 24 0 14 11 25 25 25h144c16 0 29-13 29-29 0-15-11-28-26-31 1-3 1.5-6 1.5-9 0-16-13-29-29-29-10 0-19 5-24 13-4-7-11-11-19-11-14 0-26 13-24 27-16 3-29 17-29 35 0 19 15 34 34 34H88c-19 0-34-15-34-34z"
        fill="#FFFFFF"
      />
      <ellipse cx="160" cy="172" rx="88" ry="8" fill="#E8DDD0" opacity={0.35} />
    </g>
  );
}
