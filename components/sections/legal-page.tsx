import { SITE } from "@/content/site";
import Reveal from "@/components/motion/reveal";

export type LegalSection = { heading: string; paragraphs: string[]; bullets?: string[] };

/*
  Shared shell for /privacy/ and /terms/. Both are plain prose documents, so the
  layout is a single measured column rather than the marketing grid used elsewhere.
*/
export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <header className="section" style={{ paddingTop: "clamp(7rem, 14vw, 10rem)", paddingBottom: 0 }}>
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Legal</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display display-xl" style={{ margin: "1.25rem 0 0", maxWidth: "18ch" }}>
              {title}
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="eyebrow eyebrow-dim" style={{ marginTop: "1.5rem" }}>
              Last updated {updated}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="lede" style={{ marginTop: "1.25rem" }}>{intro}</p>
          </Reveal>
        </div>
      </header>

      <section className="section" aria-label={title}>
        <div className="shell legal-body">
          {sections.map((section, i) => (
            <Reveal key={section.heading} delay={Math.min(i * 40, 200)}>
              <h2 className="display" style={{ fontSize: "1.24rem", margin: i === 0 ? 0 : "2.5rem 0 0" }}>
                {section.heading}
              </h2>
              {section.paragraphs.map((para) => (
                <p key={para} className="body-dim" style={{ fontSize: ".97rem", marginTop: ".9rem", marginBottom: 0 }}>
                  {para}
                </p>
              ))}
              {section.bullets?.length ? (
                <ul className="legal-list">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </Reveal>
          ))}

          <Reveal delay={240}>
            <h2 className="display" style={{ fontSize: "1.24rem", margin: "2.5rem 0 0" }}>
              Contact
            </h2>
            <p className="body-dim" style={{ fontSize: ".97rem", marginTop: ".9rem" }}>
              Questions about this document go to{" "}
              <a className="link" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
              .
            </p>
            <address className="legal-address">
              {SITE.entity.legalName}
              <br />
              {SITE.entity.city}, {SITE.entity.state}, United States
              <br />
              A Missouri limited liability company
            </address>
          </Reveal>
        </div>
      </section>

      <style>{`
        .legal-body { max-width: 68ch; }
        .legal-list {
          list-style: none; padding: 0; margin: 1rem 0 0;
          display: grid; gap: .5rem;
        }
        .legal-list li {
          position: relative; padding-left: 1.4rem;
          color: var(--ink-dim); font-size: .95rem; line-height: 1.55;
        }
        .legal-list li::before {
          content: ""; position: absolute; left: 0; top: .6em;
          width: 6px; height: 6px; border-radius: 999px; background: var(--ox-400);
        }
        .legal-address {
          font-style: normal;
          margin-top: 1rem;
          color: var(--ink-dim);
          font-size: .95rem;
          line-height: 1.7;
        }
      `}</style>
    </>
  );
}
