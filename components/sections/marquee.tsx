import { SERVICES, CAPABILITIES } from "@/content/services";

// Where an agency site would run a client-logo strip, this runs the solutions list —
// the studio publishes no client names. Duplicated once so the -50% translate loops
// seamlessly. Decorative, so hidden from assistive tech — every item is a real link
// in the grid below.
const WORDS = [...SERVICES.map((s) => s.title), ...CAPABILITIES.map((c) => c.title)];

export default function Marquee() {
  return (
    <div aria-hidden="true" className="strip">
      <div className="strip-label">What we run</div>
      <div className="strip-scroller">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="marquee-group">
              {WORDS.map((word) => (
                <span key={word} className="marquee-item">
                  <span style={{ color: "var(--ox-500)" }}>&#9670;</span>
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .strip {
          display: flex; align-items: stretch; overflow: hidden;
          background: #fff;
          border-bottom: 1px solid var(--rule);
          position: relative; z-index: 2;
          box-shadow: 0 10px 30px rgb(7 32 63 / .08);
        }
        .strip-label {
          flex: none;
          background: var(--deep); color: var(--cream);
          font-family: var(--font-mono), monospace;
          font-size: .68rem; letter-spacing: .18em; text-transform: uppercase;
          padding: 1.4rem 1.6rem;
          display: grid; place-items: center;
        }
        .strip-scroller { overflow: hidden; flex: 1; min-width: 0; display: flex; align-items: center; }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 48s linear infinite;
        }
        .strip:hover .marquee-track { animation-play-state: paused; }
        .marquee-group { display: flex; }
        .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          padding-inline: 1.5rem;
          font-family: var(--font-display), system-ui, sans-serif;
          font-weight: 600;
          font-size: 0.92rem;
          color: var(--ink-dim);
          white-space: nowrap;
        }
        @media (max-width: 600px) { .strip-label { display: none; } }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
