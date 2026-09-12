import { CAPABILITIES } from "@/content/services";
import Reveal from "@/components/motion/reveal";

// The supporting menu. Deliberately quieter than the four core lines: these wrap
// around the engine rather than being sold as standalone retainers.
export default function Capabilities() {
  return (
    <section id="capabilities" className="section" aria-labelledby="capabilities-heading">
      <div className="shell">
        <div className="cap-head">
          <div>
            <Reveal>
              <p className="eyebrow">Also on the table</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="capabilities-heading" className="display display-lg" style={{ margin: "1rem 0 0", maxWidth: "14ch" }}>
                Everything <span style={{ color: "var(--ox-300)" }}>around</span> it
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="body-dim" style={{ fontSize: ".97rem", maxWidth: "42ch", margin: 0 }}>
              A content engine leaks if the site is slow, the tracking is wrong or the brand looks
              different on every asset. We cover the surrounding work so the core four are not
              carrying a broken system.
            </p>
          </Reveal>
        </div>

        <div className="cap-grid">
          {CAPABILITIES.map((cap, i) => (
            <Reveal key={cap.title} delay={(i % 4) * 70}>
              <article className="card cap-card">
                <h3 className="display" style={{ fontSize: "1.02rem", margin: 0, letterSpacing: "-0.005em" }}>
                  {cap.title}
                </h3>
                <p className="body-dim" style={{ fontSize: ".9rem", marginTop: ".7rem", marginBottom: 0 }}>
                  {cap.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .cap-head {
          display: grid;
          gap: clamp(1.5rem, 3vw, 2rem);
        }
        @media (min-width: 900px) {
          .cap-head { grid-template-columns: 1fr 1fr; align-items: end; }
        }
        .cap-grid {
          margin-top: clamp(2.5rem, 6vw, 4rem);
          display: grid;
          gap: clamp(.9rem, 2vw, 1.25rem);
          grid-template-columns: 1fr;
        }
        @media (min-width: 620px) { .cap-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1000px) { .cap-grid { grid-template-columns: repeat(4, 1fr); } }
        .cap-card { padding: clamp(1.25rem, 2.5vw, 1.6rem); height: 100%; }
      `}</style>
    </section>
  );
}
