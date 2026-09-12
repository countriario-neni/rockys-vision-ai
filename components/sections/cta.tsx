import { SITE } from "@/content/site";
import { whatsappHref } from "@/lib/contact";
import Reveal from "@/components/motion/reveal";

export default function Cta({
  heading = "Let's see what your brand could be posting.",
  body = "Thirty minutes, no deck. Tell us your category and what you have tried, and we will tell you honestly whether we are the right studio for it.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section id="contact-cta" className="section" aria-labelledby="cta-heading">
      <div className="shell">
        <div className="cta-panel">
          <div aria-hidden="true" className="cta-glow" />

          <div style={{ position: "relative" }}>
            <Reveal>
              <p className="eyebrow">Next step</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="cta-heading" className="display display-lg" style={{ margin: "1rem 0 0", maxWidth: "16ch" }}>
                {heading}
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="lede" style={{ marginTop: "1.5rem" }}>{body}</p>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".85rem", marginTop: "2.25rem" }}>
                <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Book a discovery call
                </a>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  WhatsApp {SITE.whatsapp}
                </a>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <p className="eyebrow eyebrow-dim" style={{ marginTop: "2rem" }}>
                Or email{" "}
                <a className="link" href={`mailto:${SITE.email}`} style={{ color: "var(--cream-dim)" }}>
                  {SITE.email}
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <style>{`
        .cta-panel {
          position: relative;
          overflow: hidden;
          border: 1px solid var(--rule-strong);
          border-radius: 20px;
          padding: clamp(2rem, 6vw, 4.5rem);
          background: linear-gradient(150deg, var(--deep) 0%, var(--void) 62%);
        }
        .cta-glow {
          position: absolute;
          width: min(60vw, 620px);
          aspect-ratio: 1;
          right: -14%;
          bottom: -46%;
          border-radius: 50%;
          background: radial-gradient(circle, var(--ox-900) 0%, transparent 66%);
          filter: blur(70px);
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}
