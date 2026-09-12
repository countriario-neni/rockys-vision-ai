"use client";

import { useEffect, useRef } from "react";
import { SITE } from "@/content/site";
import { whatsappHref } from "@/lib/contact";

const HEADLINE = ["The", "content", "engine", "behind", "fitness", "brands."];

/*
  The entrance is pure CSS keyframes with staggered delays — no mount state, so it plays
  identically whether or not React has hydrated, and it cannot flash unstyled. The only
  JS here is the pointer parallax on the ambient glows, which writes custom properties
  and never touches layout.
*/
export default function Hero() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        node.style.setProperty("--px", `${x * 34}px`);
        node.style.setProperty("--py", `${y * 34}px`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} aria-labelledby="hero-heading" className="hero">
      {/* Ambient field: deep-navy bloom, oxblood counterweight, and a fine grid. */}
      <div aria-hidden="true" className="hero-glow hero-glow-deep" />
      <div aria-hidden="true" className="hero-glow hero-glow-ox" />
      <div aria-hidden="true" className="hero-grid" />
      <div aria-hidden="true" className="hero-vignette" />

      <div className="shell" style={{ position: "relative", width: "100%" }}>
        <p className="eyebrow hero-in" style={{ marginBottom: "clamp(1.25rem, 3vw, 2rem)" }}>
          Content &amp; marketing &middot; Supplements &middot; Gyms &middot; Apparel
        </p>

        <h1 id="hero-heading" className="display display-xl" style={{ margin: 0 }}>
          {HEADLINE.map((word, i) => (
            <span className="hero-word" key={word + i}>
              <span
                className="hero-word-inner"
                style={{
                  color: word === "fitness" ? "var(--ox-300)" : undefined,
                  animationDelay: `${140 + i * 85}ms`,
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero-foot">
          <p className="lede hero-in" style={{ margin: 0, animationDelay: "750ms" }}>
            {SITE.pitch}
          </p>

          <div className="hero-in hero-actions" style={{ animationDelay: "900ms" }}>
            <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Book a discovery call
            </a>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              WhatsApp us
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          padding-top: 8rem;
          padding-bottom: clamp(2.5rem, 6vw, 4.5rem);
        }

        @keyframes hero-rise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes hero-word {
          from { transform: translateY(105%); }
          to   { transform: none; }
        }

        .hero-in {
          opacity: 0;
          animation: hero-rise .9s var(--ease) forwards;
        }
        .hero-word {
          display: inline-block;
          overflow: hidden;
          vertical-align: bottom;
        }
        .hero-word-inner {
          display: inline-block;
          padding-right: .24em;
          transform: translateY(105%);
          animation: hero-word 1s var(--ease-out) forwards;
        }
        .hero-actions { display: flex; flex-wrap: wrap; gap: .85rem; }

        .hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          transform: translate3d(var(--px, 0), var(--py, 0), 0);
          transition: transform .9s var(--ease);
        }
        .hero-glow-deep {
          width: min(72vw, 900px);
          aspect-ratio: 1;
          top: -18%;
          right: -12%;
          background: radial-gradient(circle, var(--deep-2) 0%, transparent 68%);
          opacity: .85;
        }
        .hero-glow-ox {
          width: min(52vw, 640px);
          aspect-ratio: 1;
          bottom: -22%;
          left: -10%;
          background: radial-gradient(circle, var(--ox-900) 0%, transparent 66%);
          opacity: .9;
        }
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, var(--rule) 1px, transparent 1px),
            linear-gradient(to bottom, var(--rule) 1px, transparent 1px);
          background-size: clamp(48px, 7vw, 96px) clamp(48px, 7vw, 96px);
          opacity: .5;
          mask-image: radial-gradient(120% 90% at 50% 45%, #000 20%, transparent 78%);
          -webkit-mask-image: radial-gradient(120% 90% at 50% 45%, #000 20%, transparent 78%);
          pointer-events: none;
        }
        .hero-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgb(2 0 13 / .55) 0%, transparent 30%, rgb(2 0 13 / .85) 100%);
          pointer-events: none;
        }
        .hero-foot {
          margin-top: clamp(2rem, 5vw, 3.5rem);
          display: grid;
          gap: clamp(1.5rem, 4vw, 2.5rem);
        }
        @media (min-width: 900px) {
          .hero-foot {
            grid-template-columns: minmax(0, 1fr) auto;
            align-items: end;
            gap: 3rem;
          }
        }

        /* No entrance choreography at all — content is simply present. */
        @media (prefers-reduced-motion: reduce) {
          .hero-in, .hero-word-inner {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
