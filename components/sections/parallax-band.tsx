"use client";

import { useEffect, useRef } from "react";
import { SITE } from "@/content/site";
import { whatsappHref } from "@/lib/contact";

/*
  Full-bleed statement band. The image sits in an over-sized wrapper and is translated
  against scroll for real parallax depth; the duotone overlay pulls a stock photograph
  into the brand's two-colour world so it does not read as a stock photograph.
*/
export default function ParallaxBand() {
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
    <section className="band-section" ref={ref} aria-labelledby="band-heading">
      <div className="band-media" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
        <img src="/media/gym-wide.jpg" alt="" loading="lazy" decoding="async" />
        <span className="band-duotone" />
      </div>
      <span className="band-scrim" aria-hidden="true" />

      <div className="shell band-content">
        <p className="eyebrow">The gap we close</p>
        <h2 id="band-heading" className="display display-lg" style={{ margin: "1rem 0 0", maxWidth: "20ch" }}>
          Most brands post <span style={{ color: "var(--ox-300)" }}>enough</span>. Almost none post <span style={{ color: "var(--ox-300)" }}>well</span>, weekly.
        </h2>
        <p className="lede" style={{ marginTop: "1.5rem" }}>
          Consistency beats brilliance in this category, and almost nobody manages both. The
          engine exists so you do not have to choose.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".85rem", marginTop: "2.25rem" }}>
          <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Book a discovery call
          </a>
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            WhatsApp us
          </a>
        </div>
      </div>

      <style>{`
        .band-section {
          --p: 0;
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding-block: clamp(5rem, 13vw, 11rem);
          border-block: 1px solid var(--rule);
        }
        .band-media {
          position: absolute;
          inset: -14% 0;
          z-index: -2;
        }
        .band-media img {
          width: 100%; height: 100%;
          object-fit: cover;
          transform: translate3d(0, calc(var(--p) * 7%), 0) scale(1.08);
          transition: transform .4s linear;
          will-change: transform;
        }
        /* Duotone: crush to luminance, then map shadows to void and highlights to oxblood. */
        .band-duotone {
          position: absolute; inset: 0;
          background: linear-gradient(150deg, var(--deep) 0%, var(--ox-900) 100%);
          mix-blend-mode: color;
          opacity: .92;
        }
        .band-scrim {
          position: absolute; inset: 0;
          z-index: -1;
          background:
            linear-gradient(90deg, rgb(2 0 13 / .94) 0%, rgb(2 0 13 / .78) 45%, rgb(2 0 13 / .5) 100%),
            linear-gradient(180deg, var(--void) 0%, transparent 22%, transparent 78%, var(--void) 100%);
        }
        .band-content { position: relative; }
        @media (prefers-reduced-motion: reduce) {
          .band-media img { transform: none; }
        }
      `}</style>
    </section>
  );
}
