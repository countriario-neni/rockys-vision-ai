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
    "Rocky's Vision AI is a two-founder content, marketing and AI systems studio for growing brands, built inside Rocky Solutions LLC — creative direction paired with real software and AI engineering.",
  alternates: { canonical: "/about/" },
};

const STORY = [
  "Rocky's Vision AI is the content and AI systems studio inside Rocky Solutions LLC. The parent company builds AI systems and custom software for businesses; this is the arm that points that capability at content, marketing and the automation every business now needs — regardless of category.",
  "The reason we built it this way is that modern marketing has a specific problem. Every category is saturated with content, attention is expensive, and the brands that win are the ones producing genuinely good creative and answering customers fast, at a volume most studios cannot sustain. That is a production problem and an engineering problem at the same time.",
  "So we built the studio around both. One founder runs creative and growth. The other builds the systems — the generation pipelines, the AI agents, the campaign tooling, the tracking — that let two people produce at the volume any business demands. It is a small operation on purpose: you get the founders, not a handoff chain.",
];

export default function About() {
  return (
    <>
      <header className="section" style={{ paddingTop: "clamp(7rem, 14vw, 10rem)", paddingBottom: 0 }}>
        <div className="shell">
          <Reveal>
            <p className="eyebrow">About</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display display-xl" style={{ margin: "1.25rem 0 0", maxWidth: "16ch" }}>
              A studio built for <span>every</span> industry
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
                    color: i === 0 ? "var(--ink)" : "var(--ink-dim)",
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
                <a className="link" href={SITE.parentUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--ink-dim)" }}>
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
