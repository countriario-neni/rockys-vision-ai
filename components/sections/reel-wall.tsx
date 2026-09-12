"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/motion/reveal";

const FRAMES = [
  { src: "/reel/physique-lowkey.jpg", label: "Physique", tag: "Hook · 0:03" },
  { src: "/reel/arm-detail.jpg", label: "Detail", tag: "B-roll" },
  { src: "/reel/supplement-hold.jpg", label: "Product", tag: "UGC cut" },
  { src: "/reel/gym-dark.jpg", label: "Training", tag: "Reels · 9:16" },
  { src: "/reel/physique-studio.jpg", label: "Studio", tag: "Ad variant" },
  { src: "/reel/gym-duo.jpg", label: "Athletes", tag: "Campaign" },
];

/*
  A wall of 9:16 frames in real CSS 3D. Two inputs drive it:
    --p   scroll progress of the section through the viewport (-1 .. 1)
    --mx  pointer position across the wall (-1 .. 1)
  Both are written as custom properties on the container and consumed in CSS, so the
  JS never touches layout and the whole thing composites on the GPU.

  These are stock photographs standing in for the format we produce — labelled as
  reference frames, not presented as our own client work.
*/
export default function ReelWall() {
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
      // 0 when the section centre sits at the viewport centre, ±1 at the edges.
      const centre = rect.top + rect.height / 2;
      const p = Math.max(-1, Math.min(1, (centre - vh / 2) / (vh / 2 + rect.height / 2)));
      node.style.setProperty("--p", p.toFixed(4));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const my = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      node.style.setProperty("--mx", Math.max(-1, Math.min(1, mx)).toFixed(3));
      node.style.setProperty("--my", Math.max(-1, Math.min(1, my)).toFixed(3));
    };

    const onLeave = () => {
      node.style.setProperty("--mx", "0");
      node.style.setProperty("--my", "0");
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    node.addEventListener("pointermove", onPointer, { passive: true });
    node.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      node.removeEventListener("pointermove", onPointer);
      node.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="section reel-section" aria-labelledby="reel-heading">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">The format</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 id="reel-heading" className="display display-lg" style={{ margin: "1rem 0 0", maxWidth: "18ch" }}>
            Nine by sixteen, <span style={{ color: "var(--ox-300)" }}>every week</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="lede" style={{ marginTop: "1.5rem" }}>
            Vertical video is where supplement and apparel brands are won. This is the shape of
            the work: hook, product, proof, cut to the platform it lands on.
          </p>
        </Reveal>
      </div>

      <div className="reel-stage" ref={ref}>
        <div className="reel-row">
          {FRAMES.map((frame, i) => (
            <figure className="reel-card" key={frame.src} style={{ "--i": i - (FRAMES.length - 1) / 2 } as React.CSSProperties}>
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
              <img src={frame.src} alt="" loading="lazy" decoding="async" aria-hidden="true" />
              <span className="reel-sheen" aria-hidden="true" />
              <figcaption>
                <span className="reel-tag">{frame.tag}</span>
                <span className="reel-label">{frame.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="shell">
        <Reveal>
          <p className="eyebrow eyebrow-dim" style={{ marginTop: "clamp(1.5rem, 3vw, 2.5rem)" }}>
            Reference frames showing format and treatment &mdash; not client work
          </p>
        </Reveal>
      </div>

      <style>{`
        .reel-section { overflow: hidden; padding-bottom: clamp(3rem, 7vw, 6rem); }
        .reel-stage {
          --p: 0; --mx: 0; --my: 0;
          margin-top: clamp(2.5rem, 6vw, 4rem);
          perspective: 1400px;
          perspective-origin: 50% 50%;
        }
        .reel-row {
          display: flex;
          gap: clamp(.75rem, 1.6vw, 1.4rem);
          justify-content: center;
          transform-style: preserve-3d;
          padding-inline: var(--gutter);
          /* Scroll drives a gentle counter-rotation and drift across the whole row. */
          transform:
            translate3d(calc(var(--p) * -3.5%), 0, 0)
            rotateX(calc(var(--my) * 3deg + var(--p) * 2.5deg))
            rotateY(calc(var(--mx) * 7deg));
          transition: transform .5s var(--ease);
          will-change: transform;
        }
        .reel-card {
          position: relative;
          flex: 0 0 auto;
          width: clamp(132px, 14vw, 208px);
          aspect-ratio: 9 / 16;
          margin: 0;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--rule);
          background: var(--deep);
          transform-style: preserve-3d;
          /* Cards further from centre sit deeper and rotate more — the 3D fan. */
          transform:
            rotateY(calc(var(--i) * -5deg))
            translateZ(calc(var(--i) * var(--i) * -14px))
            translateY(calc(var(--i) * var(--i) * 5px + var(--p) * var(--i) * 10px));
          transition: transform .6s var(--ease), border-color .4s var(--ease), box-shadow .6s var(--ease);
          box-shadow: 0 22px 50px rgb(2 0 13 / .55);
          will-change: transform;
        }
        .reel-card:hover {
          transform: rotateY(0deg) translateZ(46px) translateY(-6px);
          border-color: var(--ox-400);
          z-index: 2;
        }
        .reel-card img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: grayscale(.5) contrast(1.12) brightness(.86);
          transition: filter .6s var(--ease), transform .8s var(--ease);
        }
        .reel-card:hover img { filter: grayscale(0) contrast(1.04) brightness(1); transform: scale(1.04); }
        .reel-sheen {
          position: absolute; inset: 0;
          background:
            linear-gradient(180deg, rgb(2 0 13 / .1) 0%, transparent 35%, rgb(2 0 13 / .82) 100%),
            radial-gradient(90% 70% at 50% 0%, rgb(163 36 28 / .22) 0%, transparent 70%);
          pointer-events: none;
        }
        .reel-card figcaption {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          padding: .75rem .8rem;
          display: grid; gap: .2rem;
        }
        .reel-tag {
          font-family: var(--font-mono), monospace;
          font-size: .54rem; letter-spacing: .16em; text-transform: uppercase;
          color: var(--ox-300);
        }
        .reel-label {
          font-family: var(--font-display), system-ui, sans-serif;
          font-weight: 800; text-transform: uppercase; letter-spacing: -.01em;
          font-size: .82rem; line-height: 1;
        }

        /* Below the fan's comfortable width, drop 3D and let it scroll like a filmstrip. */
        @media (max-width: 820px) {
          .reel-stage { perspective: none; }
          .reel-row {
            transform: none;
            justify-content: flex-start;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding-bottom: 1rem;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .reel-row::-webkit-scrollbar { display: none; }
          .reel-card {
            transform: none;
            width: 46vw;
            scroll-snap-align: center;
          }
          .reel-card:hover { transform: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .reel-row, .reel-card { transform: none !important; transition: none !important; }
        }
      `}</style>
    </section>
  );
}
