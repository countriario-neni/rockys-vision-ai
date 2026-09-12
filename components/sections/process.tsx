import { PROCESS } from "@/content/services";
import Reveal from "@/components/motion/reveal";

export default function Process() {
  return (
    <section id="process" className="section" aria-labelledby="process-heading">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">How it runs</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 id="process-heading" className="display display-lg" style={{ margin: "1rem 0 0", maxWidth: "16ch" }}>
            From call to <span style={{ color: "var(--ox-300)" }}>cadence</span>
          </h2>
        </Reveal>

        <ol className="process-grid">
          {PROCESS.map((item, i) => (
            <Reveal as="li" key={item.step} delay={i * 100} className="process-item">
              <span className="process-step">{item.step}</span>
              <h3 className="display" style={{ fontSize: "1.15rem", margin: "1.1rem 0 0", letterSpacing: "-0.01em" }}>
                {item.title}
              </h3>
              <p className="body-dim" style={{ fontSize: ".93rem", marginTop: ".6rem", marginBottom: 0 }}>
                {item.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>

      <style>{`
        .process-grid {
          list-style: none;
          padding: 0;
          margin: clamp(2.5rem, 6vw, 4rem) 0 0;
          display: grid;
          gap: clamp(1.5rem, 3vw, 2rem);
          grid-template-columns: 1fr;
          counter-reset: none;
        }
        @media (min-width: 700px) { .process-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1080px) { .process-grid { grid-template-columns: repeat(4, 1fr); } }
        .process-item {
          padding-top: 1.5rem;
          border-top: 1px solid var(--rule);
          position: relative;
        }
        .process-item::before {
          /* The dot that sits on the rule and marks each step. */
          content: "";
          position: absolute;
          top: -4px;
          left: 0;
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: var(--ox-400);
        }
        .process-step {
          font-family: var(--font-mono), monospace;
          font-size: .7rem;
          letter-spacing: .18em;
          color: var(--cream-faint);
        }
      `}</style>
    </section>
  );
}
