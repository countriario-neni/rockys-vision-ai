import { SITE } from "@/content/site";
import Reveal from "@/components/motion/reveal";

type Props = {
  heading?: string;
  cta?: string;
  image?: string;
};

// Skyhit's mid-page band: a photograph under a navy scrim, one line of copy, one
// button. Used twice on the home page with different photos.
export default function CtaBand({
  heading = "Accelerate your brand's growth with a content engine built for fitness",
  cta = "Get a free plan",
  image = "/reel/gym-duo.jpg",
}: Props) {
  return (
    <section className="cta-band band" aria-label="Call to action">
      <div className="cta-band-media" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
        <img src={image} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="shell cta-band-row">
        <Reveal>
          <p className="cta-band-heading">{heading}</p>
        </Reveal>
        <Reveal delay={120}>
          <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary cta-band-btn">
            {cta}
          </a>
        </Reveal>
      </div>

      <style>{`
        .cta-band { position: relative; overflow: hidden; padding-block: clamp(2.5rem, 5vw, 3.5rem); }
        .cta-band-media { position: absolute; inset: 0; }
        .cta-band-media img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 30%; display: block; }
        .cta-band-media::after {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(90deg, rgb(7 32 63 / .96) 0%, rgb(7 32 63 / .82) 50%, rgb(7 32 63 / .55) 100%);
        }
        .cta-band-row {
          position: relative; z-index: 1;
          display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
          gap: 1.5rem 3rem;
        }
        .cta-band-heading {
          margin: 0;
          font-family: var(--font-display), system-ui, sans-serif;
          font-weight: 600;
          font-size: clamp(1.35rem, 2.6vw, 2rem);
          line-height: 1.25;
          max-width: 26ch;
          color: #fff;
          text-wrap: balance;
        }
        .cta-band-btn { font-size: 1.02rem; padding: 1.05rem 2.1rem; }
      `}</style>
    </section>
  );
}
