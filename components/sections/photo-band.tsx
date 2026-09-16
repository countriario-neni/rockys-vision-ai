import { SITE } from "@/content/site";
import Reveal from "@/components/motion/reveal";

// Skyhit's full-bleed photo band with a diagonal slab carrying the line and a round
// button. Static export means no video, so the round button books the call instead.
export default function PhotoBand() {
  return (
    <section className="pband" aria-label="We are ready to help your brand grow">
      <div className="pband-media" aria-hidden="true">
        {/* Same loop as the portrait hero; its first frame is this still, so it takes over seamlessly. */}
        <video
          className="pband-video"
          poster="/reel/creative-studio.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        >
          <source src="/media/hero-loop-portrait.mp4" type="video/mp4" />
        </video>
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
        <img className="pband-still" src="/reel/creative-studio.jpg" alt="" loading="lazy" decoding="async" />
      </div>
      <div className="slab pband-slab" aria-hidden="true" />

      <div className="shell pband-row">
        <Reveal className="pband-copy">
          <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="pband-play" aria-label="Book a discovery call">
            <span className="pband-ring" aria-hidden="true" />
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </a>
          <p className="pband-line">
            We are ready to help your brand grow
          </p>
          <p className="pband-sub">One line for a month. Expand it if the work is good.</p>
        </Reveal>
      </div>

      <style>{`
        .pband {
          position: relative; overflow: hidden;
          min-height: clamp(380px, 52vw, 560px);
          display: flex; align-items: center;
          background: var(--deep);
        }
        .pband-media { position: absolute; inset: 0; }
        .pband-media video,
        .pband-media img {
          width: 100%; height: 100%; object-fit: cover; object-position: 40% 30%; display: block;
          filter: saturate(.85);
        }
        .pband-media .pband-still { display: none; }
        @media (prefers-reduced-motion: reduce), (prefers-reduced-data: reduce) {
          .pband-media .pband-video { display: none; }
          .pband-media .pband-still { display: block; }
        }
        .pband-slab { width: clamp(40%, 44vw, 52%); }
        .pband-row { position: relative; z-index: 1; display: flex; justify-content: flex-end; padding-block: 3rem; }
        .pband-copy {
          max-width: 22rem; color: var(--cream);
          display: grid; gap: 1rem; justify-items: start;
        }
        .pband-play {
          position: relative;
          width: 72px; height: 72px; border-radius: 50%;
          display: grid; place-items: center;
          background: var(--deep); color: var(--cream);
          box-shadow: 0 14px 34px rgb(2 0 13 / .4);
          transition: transform .4s var(--ease), background .4s var(--ease);
        }
        .pband-play:hover { transform: scale(1.06); background: var(--void); }
        .pband-ring {
          position: absolute; inset: 0; border-radius: 50%;
          border: 2px solid var(--cream);
          animation: pulse-ring 2.4s var(--ease-out) infinite;
        }
        .pband-line {
          margin: 0;
          font-family: var(--font-display), system-ui, sans-serif;
          font-weight: 700;
          font-size: clamp(1.6rem, 3.2vw, 2.4rem);
          line-height: 1.15;
          color: #fff;
          text-wrap: balance;
        }
        .pband-sub { margin: 0; font-size: .92rem; color: rgb(235 222 212 / .85); }
        @media (max-width: 720px) {
          .pband { display: block; min-height: 0; background: var(--ox-700); }
          .pband-media { position: relative; aspect-ratio: 16 / 10; }
          .pband-slab { display: none; }
          .pband-row { padding-block: 2rem 2.5rem; }
          .pband-copy { max-width: none; }
        }
      `}</style>
    </section>
  );
}
