import Link from "next/link";
import { SITE } from "@/content/site";

/*
  Full-bleed photograph, headline on the left, an oxblood slab cutting the right edge
  and the primary "Our services" button — the classic agency hero. Entrance is pure CSS
  keyframes with staggered delays, so it plays identically before and after hydration.
*/
export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="hero">
      <div className="hero-media" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
        <img src="/media/gym-wide.jpg" alt="" fetchPriority="high" decoding="async" />
      </div>
      <div className="hero-scrim" aria-hidden="true" />
      <div className="slab hero-slab" aria-hidden="true" />

      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-in" style={{ color: "var(--cream)", marginBottom: "1.25rem" }}>
            Content &amp; marketing &middot; Supplements &middot; Gyms &middot; Apparel
          </p>

          <h1 id="hero-heading" className="hero-title">
            <span className="hero-in" style={{ animationDelay: "120ms" }}>The content engine</span>
            <span className="hero-in hero-title-accent" style={{ animationDelay: "240ms" }}>
              behind fitness brands
              <svg className="hero-mark" viewBox="0 0 40 40" aria-hidden="true">
                <path d="M20 4 36 34H4Z" fill="var(--ox-300)" />
                <path d="M20 14 29 30H11Z" fill="var(--deep)" />
              </svg>
            </span>
          </h1>

          <p className="hero-in hero-lede" style={{ animationDelay: "380ms" }}>
            Short-form video, AI-generated creative, paid ads and the social presence that ties
            them together — engineered by the people who also build the software underneath.
          </p>

          <div className="hero-in hero-actions" style={{ animationDelay: "520ms" }}>
            <Link prefetch={false} href="/services/" className="btn btn-primary">
              Our services
            </Link>
            <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-cream">
              Get a free plan
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: clamp(560px, 82vh, 820px);
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--deep);
          color: var(--cream);
          padding-top: 84px;
        }
        .hero-media { position: absolute; inset: 0; }
        .hero-media img {
          width: 100%; height: 100%; object-fit: cover; object-position: 60% 40%;
          display: block;
          animation: hero-zoom 14s var(--ease-out) both;
        }
        @keyframes hero-zoom { from { transform: scale(1.08); } to { transform: scale(1); } }
        .hero-scrim {
          position: absolute; inset: 0;
          background:
            linear-gradient(90deg, rgb(7 32 63 / .88) 0%, rgb(7 32 63 / .62) 45%, rgb(7 32 63 / .15) 100%),
            linear-gradient(0deg, rgb(2 0 13 / .5) 0%, transparent 40%);
        }
        .hero-slab {
          opacity: .92;
          animation: slide-in-right 1.1s var(--ease-out) both;
          animation-delay: 200ms;
        }
        .hero-grid { position: relative; z-index: 1; padding-block: clamp(3rem, 8vw, 6rem); }
        .hero-copy { max-width: 46rem; }
        .hero-title {
          margin: 0;
          font-family: var(--font-display), system-ui, sans-serif;
          font-weight: 800;
          font-size: clamp(2.5rem, 6.4vw, 5.2rem);
          line-height: 1.02;
          letter-spacing: -0.025em;
          color: #fff;
          text-wrap: balance;
          text-shadow: 0 4px 30px rgb(2 0 13 / .45);
        }
        .hero-title > span { display: block; }
        .hero-title-accent { color: var(--cream); }
        .hero-mark {
          display: inline-block; width: .62em; height: .62em; margin-left: .22em;
          vertical-align: .08em;
          animation: hero-mark-bob 4s ease-in-out infinite;
        }
        @keyframes hero-mark-bob { 0%,100% { translate: 0 0; } 50% { translate: 0 -.12em; } }
        .hero-lede {
          margin: clamp(1.25rem, 2.5vw, 1.75rem) 0 0;
          max-width: 40rem;
          font-size: clamp(1.02rem, 1.5vw, 1.2rem);
          line-height: 1.6;
          color: rgb(235 222 212 / .86);
          text-wrap: pretty;
        }
        .hero-actions {
          display: flex; flex-wrap: wrap; gap: .75rem;
          margin-top: clamp(1.75rem, 3vw, 2.4rem);
        }
        .hero-in { animation: rise .9s var(--ease-out) both; }
        @media (max-width: 720px) {
          .hero { min-height: 0; padding-top: 72px; }
          .hero-grid { padding-block: clamp(2.5rem, 10vw, 4rem); }
          .hero-media img { object-position: 70% 30%; }
          .hero-scrim {
            background:
              linear-gradient(180deg, rgb(7 32 63 / .55) 0%, rgb(7 32 63 / .82) 60%, rgb(7 32 63 / .94) 100%);
          }
          .hero-slab {
            width: 46%; opacity: .9;
            clip-path: polygon(55% 0, 100% 0, 100% 100%, 0 100%);
            inset-block: 40% 0;
          }
        }
      `}</style>
    </section>
  );
}
