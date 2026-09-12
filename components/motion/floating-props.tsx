"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
  Glossy "3D" fitness props that float in section corners — the equivalent of the chrome
  moon/lego/cursor objects on the reference site, drawn as SVG so they are vector-sharp,
  a few KB, and locked to the brand palette (oxblood chrome, navy glass, cream specular).

  Motion is two layers: a CSS bob/tilt loop per prop, and a scroll parallax written as a
  custom property on the group. Each prop gets a different depth so they drift at
  different speeds. Everything is transforms only.
*/

type Variant = "dumbbell" | "kettlebell" | "shaker" | "play";

const GRADIENTS = (
  <defs>
    <linearGradient id="fp-ox" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#e3594a" />
      <stop offset="0.45" stopColor="#a3241c" />
      <stop offset="1" stopColor="#3f0d0c" />
    </linearGradient>
    <linearGradient id="fp-navy" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#2b5a96" />
      <stop offset="0.5" stopColor="#0a2d56" />
      <stop offset="1" stopColor="#02000d" />
    </linearGradient>
    <linearGradient id="fp-cream" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#fff8f2" />
      <stop offset="0.5" stopColor="#ebded4" />
      <stop offset="1" stopColor="#8f857e" />
    </linearGradient>
    <radialGradient id="fp-spec" cx="0.3" cy="0.25" r="0.6">
      <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
      <stop offset="0.35" stopColor="#ffffff" stopOpacity="0.18" />
      <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
    </radialGradient>
    <radialGradient id="fp-shade" cx="0.7" cy="0.85" r="0.7">
      <stop offset="0" stopColor="#02000d" stopOpacity="0.55" />
      <stop offset="1" stopColor="#02000d" stopOpacity="0" />
    </radialGradient>
    <filter id="fp-soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.2" />
    </filter>
  </defs>
);

function Dumbbell() {
  return (
    <svg viewBox="0 0 200 120" width="100%" height="100%" aria-hidden="true">
      {GRADIENTS}
      {/* bar */}
      <rect x="52" y="52" width="96" height="16" rx="8" fill="url(#fp-cream)" />
      <rect x="52" y="52" width="96" height="6" rx="3" fill="#ffffff" opacity=".45" />
      {/* plates */}
      {[
        [18, 20, 30, 80],
        [40, 30, 20, 60],
        [140, 30, 20, 60],
        [152, 20, 30, 80],
      ].map(([x, y, w, h], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} rx="8" fill="url(#fp-ox)" />
          <rect x={x} y={y} width={w} height={h} rx="8" fill="url(#fp-spec)" />
          <rect x={x} y={y} width={w} height={h} rx="8" fill="url(#fp-shade)" />
          <rect x={x + 4} y={y + 6} width="4" height={h - 12} rx="2" fill="#ffffff" opacity=".35" />
        </g>
      ))}
    </svg>
  );
}

function Kettlebell() {
  return (
    <svg viewBox="0 0 160 180" width="100%" height="100%" aria-hidden="true">
      {GRADIENTS}
      {/* handle */}
      <path d="M40 78 C40 22, 120 22, 120 78" fill="none" stroke="url(#fp-cream)" strokeWidth="18" strokeLinecap="round" />
      <path d="M44 74 C44 30, 116 30, 116 74" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity=".45" />
      {/* bell */}
      <circle cx="80" cy="118" r="56" fill="url(#fp-navy)" />
      <circle cx="80" cy="118" r="56" fill="url(#fp-spec)" />
      <circle cx="80" cy="118" r="56" fill="url(#fp-shade)" />
      <ellipse cx="58" cy="92" rx="16" ry="9" fill="#ffffff" opacity=".28" filter="url(#fp-soft)" />
      {/* face plate */}
      <circle cx="80" cy="122" r="22" fill="url(#fp-ox)" />
      <circle cx="80" cy="122" r="22" fill="url(#fp-spec)" />
    </svg>
  );
}

function Shaker() {
  return (
    <svg viewBox="0 0 120 200" width="100%" height="100%" aria-hidden="true">
      {GRADIENTS}
      {/* body */}
      <path d="M28 60 L92 60 L84 186 Q60 196 36 186 Z" fill="url(#fp-navy)" />
      <path d="M28 60 L92 60 L84 186 Q60 196 36 186 Z" fill="url(#fp-spec)" />
      <path d="M28 60 L92 60 L84 186 Q60 196 36 186 Z" fill="url(#fp-shade)" />
      {/* fill line */}
      <path d="M34 120 L86 120 L82 182 Q60 190 38 182 Z" fill="url(#fp-ox)" opacity=".85" />
      {/* lid */}
      <rect x="22" y="40" width="76" height="24" rx="8" fill="url(#fp-ox)" />
      <rect x="22" y="40" width="76" height="24" rx="8" fill="url(#fp-spec)" />
      <rect x="46" y="18" width="28" height="26" rx="6" fill="url(#fp-cream)" />
      {/* highlight streak */}
      <path d="M40 70 L44 176" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" opacity=".28" filter="url(#fp-soft)" />
    </svg>
  );
}

function Play() {
  return (
    <svg viewBox="0 0 160 160" width="100%" height="100%" aria-hidden="true">
      {GRADIENTS}
      <rect x="14" y="14" width="132" height="132" rx="38" fill="url(#fp-ox)" />
      <rect x="14" y="14" width="132" height="132" rx="38" fill="url(#fp-spec)" />
      <rect x="14" y="14" width="132" height="132" rx="38" fill="url(#fp-shade)" />
      <path d="M64 50 L112 80 L64 110 Z" fill="url(#fp-cream)" />
      <ellipse cx="52" cy="40" rx="22" ry="10" fill="#ffffff" opacity=".3" filter="url(#fp-soft)" />
    </svg>
  );
}

const SHAPES: Record<Variant, () => ReactNode> = {
  dumbbell: Dumbbell,
  kettlebell: Kettlebell,
  shaker: Shaker,
  play: Play,
};

export type PropSpec = {
  variant: Variant;
  /** CSS inset values for absolute placement, e.g. { top: "6%", left: "3%" } */
  at: Partial<Record<"top" | "right" | "bottom" | "left", string>>;
  size?: number;       // px at desktop, scales down on mobile
  depth?: number;      // -1..1, parallax multiplier
  delay?: number;      // s, offsets the bob loop so props do not move in unison
  tilt?: number;       // deg, resting rotation
};

export default function FloatingProps({ props, className = "" }: { props: PropSpec[]; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - vh / 2) / vh));
      node.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={`fprops ${className}`.trim()} aria-hidden="true">
      {props.map((spec, i) => {
        const Shape = SHAPES[spec.variant];
        return (
          <div
            key={i}
            className="fprop"
            style={
              {
                ...spec.at,
                "--size": `${spec.size ?? 150}px`,
                "--depth": spec.depth ?? 0.5,
                "--delay": `${spec.delay ?? i * -1.7}s`,
                "--tilt": `${spec.tilt ?? (i % 2 ? 12 : -10)}deg`,
              } as React.CSSProperties
            }
          >
            <div className="fprop-inner">
              <Shape />
            </div>
          </div>
        );
      })}

      <style>{`
        .fprops {
          --p: 0;
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        .fprop {
          position: absolute;
          width: clamp(72px, 11vw, var(--size));
          aspect-ratio: 1;
          /* scroll parallax: deeper props travel further */
          transform: translate3d(0, calc(var(--p) * var(--depth) * -90px), 0);
          transition: transform .3s linear;
          will-change: transform;
          filter: drop-shadow(0 22px 30px rgb(2 0 13 / .65));
        }
        .fprop-inner {
          width: 100%; height: 100%;
          transform: rotate(var(--tilt));
          animation: fprop-bob 7s ease-in-out infinite;
          animation-delay: var(--delay);
        }
        @keyframes fprop-bob {
          0%, 100% { transform: rotate(var(--tilt)) translateY(0); }
          50%      { transform: rotate(calc(var(--tilt) + 6deg)) translateY(-16px); }
        }
        @media (max-width: 720px) {
          .fprop { opacity: .55; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fprop { transform: none; }
          .fprop-inner { animation: none; }
        }
      `}</style>
    </div>
  );
}
