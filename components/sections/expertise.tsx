import { EXPERTISE } from "@/content/site";
import Reveal from "@/components/motion/reveal";
import FloatingProps from "@/components/motion/floating-props";

/*
  Sits directly under the hero. Most fitness agencies are creative shops that outsource
  anything technical; this strip states the opposite up front, because it is the actual
  differentiator and the reason the AI work is credible.
*/
export default function Expertise() {
  return (
    <section className="section" aria-labelledby="expertise-heading" style={{ paddingBottom: 0, overflow: "hidden" }}>
      <FloatingProps
        props={[
          { variant: "dumbbell", at: { top: "4%", right: "2%" }, size: 190, depth: 0.7, tilt: -14 },
          { variant: "play", at: { bottom: "-6%", left: "1%" }, size: 120, depth: 1.1, tilt: 10 },
        ]}
      />
      <div className="shell" style={{ position: "relative", zIndex: 1 }}>
        <Reveal>
          <p className="eyebrow">What we are expert in</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 id="expertise-heading" className="display display-lg" style={{ margin: "1rem 0 0", maxWidth: "22ch" }}>
            A creative studio with an <span style={{ color: "var(--ox-300)" }}>engineering</span> spine
          </h2>
        </Reveal>

        <div className="exp-grid">
          {EXPERTISE.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <article className="exp-item">
                <span className="exp-index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display" style={{ fontSize: "1.08rem", margin: ".9rem 0 0", letterSpacing: "-0.008em" }}>
                  {item.title}
                </h3>
                <p className="body-dim" style={{ fontSize: ".92rem", marginTop: ".6rem", marginBottom: 0 }}>
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .exp-grid {
          margin-top: clamp(2.25rem, 5vw, 3.5rem);
          display: grid;
          gap: clamp(1.25rem, 3vw, 2rem);
          grid-template-columns: 1fr;
        }
        @media (min-width: 700px) { .exp-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1080px) { .exp-grid { grid-template-columns: repeat(4, 1fr); } }
        .exp-item {
          padding: clamp(1.4rem, 2.5vw, 1.8rem);
          border: 1px solid var(--rule);
          border-radius: 14px;
          background: linear-gradient(165deg, rgb(7 32 63 / .32) 0%, transparent 75%);
          height: 100%;
        }
        .exp-index {
          font-family: var(--font-mono), monospace;
          font-size: .68rem;
          letter-spacing: .2em;
          color: var(--ox-300);
        }
      `}</style>
    </section>
  );
}
