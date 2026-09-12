import type { Metadata } from "next";
import { SITE } from "@/content/site";
import Founders from "@/components/sections/founders";
import Expertise from "@/components/sections/expertise";
import StraightTalk from "@/components/sections/straight-talk";
import Cta from "@/components/sections/cta";
import Reveal from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Rocky's Vision AI is a two-founder content and marketing studio for fitness brands, built inside Rocky Solutions LLC — creative direction paired with real software and AI engineering.",
  alternates: { canonical: "/about/" },
};

const STORY = [
  "Rocky's Vision AI is the fitness studio inside Rocky Solutions LLC. The parent company builds AI systems and custom software for businesses; this is the arm that points that capability at one industry we care about — supplements, gyms, apparel and the people selling them.",
  "The reason we split it out is that fitness marketing has a specific problem. The category is saturated with content, the claims are regulated, the audience can smell a fake transformation photo from three frames away, and the brands that win are the ones producing genuinely good creative at a volume most studios cannot sustain. That is a production problem and an engineering problem at the same time.",
  "So we built the studio around both. One founder runs creative and growth. The other builds the systems — the generation pipelines, the campaign tooling, the tracking — that let two people produce at the volume the category demands. It is a small operation on purpose: you get the founders, not a handoff chain.",
];

export default function About() {
  return (
    <>
      <header className="section" style={{ paddingTop: "clamp(8rem, 16vw, 12rem)", paddingBottom: 0 }}>
        <div className="shell">
          <Reveal>
            <p className="eyebrow">About</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display display-xl" style={{ margin: "1.25rem 0 0", fontSize: "clamp(2.5rem, 8vw, 6.5rem)", maxWidth: "16ch" }}>
              A studio built for <span style={{ color: "var(--ox-300)" }}>one</span> industry
            </h1>
          </Reveal>
        </div>
      </header>

      <section className="section" aria-labelledby="story-heading">
        <div className="shell story-grid">
          <h2 id="story-heading" className="eyebrow" style={{ marginTop: ".4rem" }}>
            Why we exist
          </h2>
          <div>
            {STORY.map((para, i) => (
              <Reveal key={i} delay={i * 80}>
                <p
                  style={{
                    fontSize: "clamp(1.05rem, 1.7vw, 1.28rem)",
                    lineHeight: 1.6,
                    marginTop: i === 0 ? 0 : "1.5rem",
                    marginBottom: 0,
                    color: i === 0 ? "var(--cream)" : "var(--cream-dim)",
                    textWrap: "pretty",
                    maxWidth: "64ch",
                  }}
                >
                  {para}
                </p>
              </Reveal>
            ))}

            <Reveal delay={260}>
              <p className="eyebrow eyebrow-dim" style={{ marginTop: "2.5rem" }}>
                Serving brands in {SITE.markets.join(", ")} · Part of{" "}
                <a className="link" href={SITE.parentUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--cream-dim)" }}>
                  {SITE.parent}
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Expertise />
      <Founders />
      <StraightTalk />
      <Cta />

      <style>{`
        .story-grid { display: grid; gap: clamp(1rem, 3vw, 2.5rem); }
        @media (min-width: 900px) { .story-grid { grid-template-columns: 14rem minmax(0, 1fr); } }
      `}</style>
    </>
  );
}
