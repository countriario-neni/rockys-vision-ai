import { SITE } from "@/content/site";
import Reveal from "@/components/motion/reveal";

/*
  This section exists because the studio is new and has no case studies. Rather than
  fill the slot where social proof normally sits with stock logos or invented numbers,
  it states the position plainly and turns the honesty into the argument. Replace it
  with a real work section once there are named clients and results to publish.
*/
const POINTS = [
  {
    title: "We are new, and we are not hiding it",
    body: "There are no client logos on this page because we will not borrow credibility we have not earned. What you can judge instead is the work in front of you: this site, its writing, and how it behaves on your phone.",
  },
  {
    title: "Start with one line, not the whole account",
    body: "Take a single service for a month. If the work is good, expand it. If it is not, you have lost a month and not a year — and we would rather lose the pitch than be carried by a contract.",
  },
  {
    title: "Nothing invented, ever",
    body: "No fabricated testimonials, no borrowed transformation photos, no results we did not produce. That rule applies to our marketing and to yours — it is why brands in a compliance-sensitive category can work with us.",
  },
  {
    title: "Two operators, direct access",
    body: "You get the founders' phones. There is no layer of account management to route a question through, and no junior quietly inheriting your brand three weeks in.",
  },
];

export default function StraightTalk() {
  return (
    <section className="section" aria-labelledby="straight-heading" style={{ background: "var(--cream)" }}>
      <div className="shell">
        <div className="center">
          <Reveal>
            <p className="eyebrow eyebrow-chev">Why choose us</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="straight-heading" className="display display-lg" style={{ margin: "1rem auto 0", maxWidth: "17ch" }}>
              Why trust a <span>new</span> studio
            </h2>
          </Reveal>
        </div>

        <div className="talk-grid">
          {POINTS.map((point, i) => (
            <Reveal key={point.title} delay={i * 90}>
              <article className="card talk-item">
                <h3 className="display" style={{ fontSize: "1.12rem", margin: 0, letterSpacing: "-0.008em" }}>
                  {point.title}
                </h3>
                <p className="body-dim" style={{ fontSize: ".95rem", marginTop: ".75rem", marginBottom: 0 }}>
                  {point.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="eyebrow eyebrow-dim center" style={{ marginTop: "clamp(2.5rem, 5vw, 3.5rem)", display: "block" }}>
            Working with brands across {SITE.markets.join(", ")}
          </p>
        </Reveal>
      </div>

      <style>{`
        .talk-grid {
          margin-top: clamp(2.5rem, 6vw, 4rem);
          display: grid;
          gap: clamp(1rem, 2vw, 1.5rem);
          grid-template-columns: 1fr;
        }
        @media (min-width: 800px) { .talk-grid { grid-template-columns: repeat(2, 1fr); } }
        .talk-item {
          padding: clamp(1.4rem, 2.5vw, 1.9rem);
          border-top: 4px solid var(--ox-700);
          border-radius: 0 0 12px 12px;
          height: 100%;
        }
      `}</style>
    </section>
  );
}
