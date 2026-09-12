import { FAQS } from "@/content/services";
import Reveal from "@/components/motion/reveal";

// Native <details> rather than a JS accordion: it works before hydration, it is
// keyboard accessible for free, and it is findable by in-page browser search.
export default function Faq() {
  return (
    <section id="faq" className="section" aria-labelledby="faq-heading">
      <div className="shell faq-shell">
        <div>
          <Reveal>
            <p className="eyebrow">Questions</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="faq-heading" className="display display-lg" style={{ margin: "1rem 0 0", maxWidth: "12ch" }}>
              Before you <span style={{ color: "var(--ox-300)" }}>ask</span>
            </h2>
          </Reveal>
        </div>

        <div>
          {FAQS.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 60}>
              <details className="faq-item">
                <summary>
                  <span>{faq.q}</span>
                  <span className="faq-icon" aria-hidden="true" />
                </summary>
                <p className="body-dim">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .faq-shell { display: grid; gap: clamp(2rem, 5vw, 4rem); }
        @media (min-width: 950px) {
          .faq-shell { grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.4fr); align-items: start; }
        }
        .faq-item {
          border-top: 1px solid var(--rule);
        }
        .faq-item:last-of-type { border-bottom: 1px solid var(--rule); }
        .faq-item summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding: 1.35rem 0;
          cursor: pointer;
          list-style: none;
          font-family: var(--font-display), system-ui, sans-serif;
          font-weight: 700;
          font-size: 1.02rem;
          letter-spacing: -0.005em;
          transition: color .35s var(--ease);
        }
        .faq-item summary::-webkit-details-marker { display: none; }
        .faq-item summary:hover { color: var(--ox-300); }
        .faq-icon {
          position: relative;
          flex: none;
          width: 14px; height: 14px;
        }
        .faq-icon::before, .faq-icon::after {
          content: "";
          position: absolute;
          background: var(--ox-300);
          transition: transform .4s var(--ease), opacity .3s var(--ease);
        }
        .faq-icon::before { inset: 6px 0; height: 1.5px; }
        .faq-icon::after { inset: 0 6px; width: 1.5px; }
        .faq-item[open] .faq-icon::after { transform: rotate(90deg); opacity: 0; }
        .faq-item p {
          margin: 0 0 1.5rem;
          font-size: .96rem;
          max-width: 62ch;
        }
      `}</style>
    </section>
  );
}
