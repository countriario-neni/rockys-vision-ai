"use client";

import { useEffect, useRef } from "react";
import { SITE } from "@/content/site";
import { FOUNDERS } from "@/content/founders";
import { whatsappHref } from "@/lib/contact";

const HEADLINE = ["The", "content", "engine", "behind", "fitness", "brands."];

// Transparent cutouts of the two founders, bottom-faded, shown rising into frame.
// Swap these files for stylised avatars whenever they exist — nothing else changes.
const AVATARS = [
  { founder: FOUNDERS[0], src: FOUNDERS[0].cutout, delay: 0.35, depth: 0.6 },
  { founder: FOUNDERS[1], src: FOUNDERS[1].cutout, delay: 0.55, depth: 1 },
];

/*
  Entrance is pure CSS keyframes with staggered delays — no mount state, so it plays
  identically whether or not React has hydrated. JS only writes pointer parallax as
  custom properties; the avatars and glows read them with different multipliers so
  the scene has depth.
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
        node.style.setProperty("--mx", x.toFixed(3));
        node.style.setProperty("--my", y.toFixed(3));
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
      <div aria-hidden="true" className="hero-glow hero-glow-deep" />
      <div aria-hidden="true" className="hero-glow hero-glow-ox" />
      <div aria-hidden="true" className="hero-vignette" />

      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-in" style={{ marginBottom: "clamp(1.25rem, 3vw, 2rem)" }}>
            Content &amp; marketing &middot; Supplements &middot; Gyms &middot; Apparel
          </p>

          <h1 id="hero-heading" className="display display-xl metal-host" style={{ margin: 0 }}>
            {HEADLINE.map((word, i) => (
              <span className="hero-word" key={word + i}>
                <span className="hero-word-inner metal" style={{ animationDelay: `${140 + i * 85}ms` }}>
                  {word === "fitness" ? <span>{word}</span> : word}
                </span>
              </span>
            ))}
          </h1>

          <p className="lede hero-in" style={{ margin: "clamp(1.5rem, 3vw, 2.25rem) 0 0", animationDelay: "750ms" }}>
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

        <div className="hero-cast" aria-label="The founders">
          {AVATARS.map(({ founder, src, delay, depth }, i) => (
            <figure
              key={founder.name}
              className="hero-avatar"
              style={{ "--rise-delay": `${delay}s`, "--depth": depth, "--i": i } as React.CSSProperties}
            >
              <div className="hero-avatar-plinth" aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
              <img src={src} alt={founder.imageAlt} decoding="async" fetchPriority={i === 0 ? "high" : "auto"} />
              <figcaption>
                <span className="hero-avatar-name">{founder.short}</span>
                <span className="hero-avatar-role">{founder.heroRole ?? founder.role.replace("Co-founder — ", "")}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <style>{`
        .hero {
          --mx: 0; --my: 0;
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding-top: 7rem;
          padding-bottom: clamp(2rem, 5vw, 4rem);
        }
        .hero h1 {
          /* two-column hero: sized so "ENGINE BEHIND" holds one line at desktop widths */
          font-size: clamp(2.2rem, 4.7vw, 4.6rem);
          line-height: .92;
        }
        .hero-grid {
          position: relative;
          display: grid;
          gap: clamp(2rem, 4vw, 3rem);
          align-items: end;
          width: 100%;
        }
        @media (min-width: 980px) {
          .hero-grid { grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); }
        }

        @keyframes hero-rise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes hero-word {
          from { transform: translateY(105%); }
          to   { transform: none; }
        }
        @keyframes avatar-rise {
          from { transform: translateY(58%) scale(.96); opacity: 0; }
          60%  { opacity: 1; }
          to   { transform: none; opacity: 1; }
        }
        @keyframes avatar-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-9px) rotate(-.6deg); }
        }

        .hero-in { opacity: 0; animation: hero-rise .9s var(--ease) forwards; }
        .hero-word { display: inline-block; overflow: hidden; vertical-align: bottom; padding-bottom: .06em; }
        .hero-word-inner {
          display: inline-block;
          padding-right: .24em;
          transform: translateY(105%);
          animation: hero-word 1s var(--ease-out) forwards;
        }
        .hero-actions { display: flex; flex-wrap: wrap; gap: .85rem; margin-top: clamp(1.5rem, 3vw, 2.25rem); }

        /* ---- the cast ---- */
        .hero-cast {
          position: relative;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          align-items: end;
          gap: 0;
          min-height: clamp(260px, 38vw, 520px);
          transform: translate3d(calc(var(--mx) * -10px), calc(var(--my) * -8px), 0);
          transition: transform .8s var(--ease);
        }
        .hero-avatar {
          position: relative;
          margin: 0;
          display: grid;
          justify-items: center;
          align-content: end;
          /* bring the two busts into an overlapping pair rather than two separate tiles */
          margin-inline: calc(var(--i) * -6%) calc((1 - var(--i)) * -6%);
          z-index: calc(2 - var(--i));
          opacity: 0;
          animation: avatar-rise 1.3s var(--ease-out) forwards;
          animation-delay: var(--rise-delay);
        }
        .hero-avatar img {
          display: block;
          width: 100%;
          max-width: 360px;
          height: auto;
          position: relative;
          z-index: 1;
          transform: translate3d(calc(var(--mx) * var(--depth) * 14px), calc(var(--my) * var(--depth) * 10px), 0);
          transition: transform .8s var(--ease);
          animation: avatar-float 6.5s ease-in-out infinite;
          animation-delay: calc(var(--rise-delay) + 1.3s);
          filter:
            drop-shadow(0 26px 34px rgb(2 0 13 / .75))
            drop-shadow(0 0 40px rgb(163 36 28 / .18))
            contrast(1.06) saturate(.92);
        }
        .hero-avatar-plinth {
          /* the glow disc behind each bust — reads as a lit pedestal */
          position: absolute;
          left: 50%; bottom: 8%;
          width: 78%;
          aspect-ratio: 1;
          transform: translateX(-50%);
          border-radius: 50%;
          background:
            radial-gradient(circle at 50% 60%, rgb(10 45 86 / .95) 0%, rgb(7 32 63 / .6) 38%, transparent 70%);
          filter: blur(14px);
          z-index: 0;
        }
        .hero-avatar figcaption {
          position: relative;
          z-index: 2;
          display: grid;
          justify-items: center;
          gap: .25rem;
          margin-top: -.35rem;
          text-align: center;
        }
        .hero-avatar-name {
          font-family: var(--font-display), system-ui, sans-serif;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -.01em;
          font-size: clamp(1.05rem, 1.8vw, 1.5rem);
          line-height: 1;
          background-image: linear-gradient(180deg, #8f857e 0%, #fff8f2 55%, #b9ada4 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          padding-bottom: .08em;
        }
        .hero-avatar-role {
          font-family: var(--font-mono), monospace;
          font-size: .58rem;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--ox-300);
        }

        .hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          transform: translate3d(calc(var(--mx) * 34px), calc(var(--my) * 34px), 0);
          transition: transform .9s var(--ease);
        }
        .hero-glow-deep {
          width: min(72vw, 900px); aspect-ratio: 1;
          top: -18%; right: -12%;
          background: radial-gradient(circle, var(--deep-2) 0%, transparent 68%);
          opacity: .85;
        }
        .hero-glow-ox {
          width: min(52vw, 640px); aspect-ratio: 1;
          bottom: -22%; left: -10%;
          background: radial-gradient(circle, var(--ox-900) 0%, transparent 66%);
          opacity: .9;
        }
        .hero-vignette {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgb(2 0 13 / .45) 0%, transparent 28%, rgb(2 0 13 / .7) 100%);
          pointer-events: none;
        }

        @media (max-width: 979px) {
          .hero { align-items: flex-start; }
          .hero-cast { min-height: 0; max-width: 520px; }
          .hero-avatar img { max-width: 240px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-in, .hero-word-inner, .hero-avatar, .hero-avatar img {
            animation: none; opacity: 1; transform: none;
          }
        }
      `}</style>
    </section>
  );
}
