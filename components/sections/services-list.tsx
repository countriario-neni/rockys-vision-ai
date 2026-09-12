"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { SERVICES } from "@/content/services";
import Reveal from "@/components/motion/reveal";

// Presentational only — which reference frame accompanies which line on hover.
const PREVIEW: Record<string, string> = {
  "short-form-video": "/reel/gym-dark.jpg",
  "ai-creative": "/reel/supplement-hold.jpg",
  "paid-ads": "/reel/physique-studio.jpg",
  "social-media-management": "/reel/gym-duo.jpg",
};

/*
  The four core lines as an editorial index rather than a card grid — a numbered list
  of large type reads as a body of work, where four cards read as a brochure. On a
  pointer device, hovering a row floats the matching frame under the cursor; the
  element is written to directly rather than through state so it tracks at frame rate.
*/
export default function ServicesList() {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<string | null>(null);

  const move = (e: React.PointerEvent) => {
    const node = previewRef.current;
    if (!node) return;
    node.style.setProperty("--x", `${e.clientX}px`);
    node.style.setProperty("--y", `${e.clientY}px`);
  };

  return (
    <section
      id="services"
      className="section"
      aria-labelledby="services-heading"
      onPointerMove={move}
    >
      <div className="shell">
        <Reveal>
          <p className="eyebrow">What we do</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 id="services-heading" className="display display-lg" style={{ margin: "1rem 0 0", maxWidth: "18ch" }}>
            Four lines that <span style={{ color: "var(--ox-300)" }}>compound</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="lede" style={{ marginTop: "1.5rem" }}>
            Each one works alone. Run together, the creative feeds the ads, the ads teach the
            creative, and the social layer keeps both in front of the same audience every week.
          </p>
        </Reveal>

        <div style={{ marginTop: "clamp(3rem, 7vw, 5rem)" }}>
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 90}>
              <Link
                prefetch={false}
                href={`/services/${service.slug}/`}
                className="svc-row"
                onPointerEnter={() => setActive(service.slug)}
                onPointerLeave={() => setActive(null)}
                onFocus={() => setActive(null)}
              >
                <span className="svc-num">{service.number}</span>

                <span className="svc-main">
                  <span className="display display-md svc-title">{service.title}</span>
                  <span className="body-dim svc-summary">{service.summary}</span>
                </span>

                <span className="svc-arrow" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      <div ref={previewRef} className={`svc-preview ${active ? "is-on" : ""}`} aria-hidden="true">
        {SERVICES.map((service) => (
          // eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer
          <img
            key={service.slug}
            src={PREVIEW[service.slug]}
            alt=""
            loading="lazy"
            decoding="async"
            style={{ opacity: active === service.slug ? 1 : 0 }}
          />
        ))}
      </div>

      <style>{`
        .svc-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: clamp(1rem, 3vw, 2.5rem);
          align-items: start;
          padding: clamp(1.5rem, 3.5vw, 2.4rem) 0;
          border-top: 1px solid var(--rule);
          text-decoration: none;
          color: var(--cream);
          position: relative;
          transition: border-color .5s var(--ease);
        }
        .svc-row:last-child { border-bottom: 1px solid var(--rule); }
        .svc-row::before {
          content: "";
          position: absolute;
          inset: 0 calc(var(--gutter) * -0.5);
          background: linear-gradient(90deg, rgb(163 36 28 / .10) 0%, transparent 70%);
          opacity: 0;
          transition: opacity .5s var(--ease);
          pointer-events: none;
        }
        .svc-row:hover::before, .svc-row:focus-visible::before { opacity: 1; }
        .svc-num {
          font-family: var(--font-mono), monospace;
          font-size: .72rem;
          letter-spacing: .16em;
          color: var(--cream-faint);
          padding-top: .55rem;
          transition: color .4s var(--ease);
        }
        .svc-row:hover .svc-num { color: var(--ox-300); }
        .svc-main { display: grid; gap: .6rem; }
        .svc-title { transition: color .4s var(--ease); }
        .svc-row:hover .svc-title { color: var(--ox-300); }
        .svc-summary { font-size: .98rem; max-width: 56ch; }
        .svc-arrow {
          display: grid;
          place-items: center;
          width: 44px; height: 44px;
          border: 1px solid var(--rule);
          border-radius: 999px;
          color: var(--cream-dim);
          flex: none;
          transition: transform .5s var(--ease), border-color .4s var(--ease), color .4s var(--ease), background .4s var(--ease);
        }
        .svc-row:hover .svc-arrow {
          transform: translateX(6px);
          border-color: var(--ox-400);
          background: var(--ox-500);
          color: var(--cream);
        }

        .svc-preview {
          --x: 50vw; --y: 50vh;
          position: fixed;
          top: 0; left: 0;
          width: 190px;
          aspect-ratio: 9 / 16;
          border-radius: 12px;
          overflow: hidden;
          pointer-events: none;
          z-index: 40;
          border: 1px solid var(--ox-400);
          box-shadow: 0 24px 60px rgb(2 0 13 / .7);
          opacity: 0;
          transform: translate3d(calc(var(--x) + 28px), calc(var(--y) - 50%), 0) scale(.82) rotate(-3deg);
          transition: opacity .35s var(--ease), transform .45s var(--ease);
          will-change: transform;
        }
        .svc-preview.is-on {
          opacity: 1;
          transform: translate3d(calc(var(--x) + 28px), calc(var(--y) - 50%), 0) scale(1) rotate(-3deg);
        }
        .svc-preview img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          filter: grayscale(.35) contrast(1.1);
          transition: opacity .4s var(--ease);
        }

        @media (max-width: 640px) {
          .svc-arrow { width: 36px; height: 36px; }
        }
        /* Touch and reduced-motion users get no floating cursor object at all. */
        @media (hover: none), (prefers-reduced-motion: reduce) {
          .svc-preview { display: none; }
        }
      `}</style>
    </section>
  );
}
