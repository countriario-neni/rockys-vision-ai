const WORDS = [
  "Short-form video",
  "AI creative",
  "Paid ads",
  "Social management",
  "SEO",
  "Branding",
  "Graphic design",
  "Web development",
  "Ecommerce",
  "Email & retention",
];

// Duplicated once so the -50% translate loops seamlessly. Decorative, so hidden
// from assistive tech — every word here is a real link elsewhere on the page.
export default function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="hairline"
      style={{
        borderBottom: "1px solid var(--rule)",
        overflow: "hidden",
        background: "rgb(7 32 63 / 0.25)",
        paddingBlock: "1.1rem",
      }}
    >
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee-group">
            {WORDS.map((word) => (
              <span key={word} className="marquee-item">
                <span style={{ color: "var(--ox-300)" }}>&#9679;</span>
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 42s linear infinite;
        }
        .marquee-group { display: flex; }
        .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          padding-inline: 1.6rem;
          font-family: var(--font-mono), monospace;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--cream-dim);
          white-space: nowrap;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
