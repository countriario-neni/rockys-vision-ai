"use client";

import { useEffect, useRef } from "react";

/*
  Full-viewport animated pixel static, in brand colours only.

  A tiny canvas (~160px wide) is stretched to the viewport with image smoothing off,
  which is what gives the chunky, dithered "signal" texture rather than fine film grain.
  Redrawn at ~12fps — enough to feel alive, cheap enough to be invisible on a phone.
  Under reduced motion it paints one frame and stops, so the texture stays but the
  flicker does not.
*/
const CELL = 9;            // css pixels per static cell
const FPS = 12;
const PALETTE: [number, number, number][] = [
  [2, 0, 13],              // void
  [2, 0, 13],
  [2, 0, 13],
  [5, 16, 34],             // void → deep midpoint
  [7, 32, 63],             // deep
  [10, 45, 86],            // deep-2
  [63, 13, 12],            // oxblood, rare
];

export default function PixelStatic() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = 0;
    let w = 0;
    let h = 0;
    let img: ImageData | null = null;

    const resize = () => {
      w = Math.max(1, Math.ceil(window.innerWidth / CELL));
      h = Math.max(1, Math.ceil(window.innerHeight / CELL));
      canvas.width = w;
      canvas.height = h;
      img = ctx.createImageData(w, h);
      paint();
    };

    const paint = () => {
      if (!img) return;
      const d = img.data;
      const n = PALETTE.length;
      for (let i = 0; i < d.length; i += 4) {
        // Skew toward the dark end so the field reads as texture, not confetti.
        const r = Math.random();
        // ~84% void-range, ~15% navy, ~1% oxblood
        const idx = r < 0.84 ? Math.floor(r * 4.7) : r < 0.99 ? 4 + Math.floor((r - 0.84) * 13.3) : n - 1;
        const [cr, cg, cb] = PALETTE[Math.min(idx, n - 1)];
        d[i] = cr;
        d[i + 1] = cg;
        d[i + 2] = cb;
        d[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last < 1000 / FPS) return;
      last = t;
      paint();
    };

    resize();
    window.addEventListener("resize", resize);

    // Pause when the tab is hidden; there is no reason to burn a phone battery for a background.
    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVisibility);
    if (!reduced) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        imageRendering: "pixelated",
        opacity: 0.62,
      }}
    />
  );
}
