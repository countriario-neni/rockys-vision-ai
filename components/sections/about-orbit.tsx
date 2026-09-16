import Link from "next/link";
import { SITE, LIFECYCLE } from "@/content/site";
import Reveal from "@/components/motion/reveal";
import Logo from "@/components/ui/logo";

/*
  The orbit graphic (logo centred, badges circling) now tells a business's life:
  Launch, Attract, Convert, Scale. The stages light up in turn — badge on the ring and
  hook in the list together — on a 12-second cycle, so the lifecycle plays rather than
  sits. All CSS: the same --i index drives the orbit position and the highlight delay.
*/
const STAGE_SECONDS = 3;
const CYCLE = `${LIFECYCLE.length * STAGE_SECONDS}s`;

export default function AboutOrbit() {
  return (
    <section id="about" className="section about" aria-labelledby="about-heading">
      <div className="shell about-grid">
        <Reveal className="orbit-wrap">
          <div className="orbit" aria-hidden="true">
            <span className="orbit-ring orbit-ring-a" />
            <span className="orbit-ring orbit-ring-b">
              {LIFECYCLE.map((_, i) => (
                <span key={i} className="orbit-dot" style={{ "--i": i } as React.CSSProperties} />
              ))}
            </span>
            <div className="orbit-core">
              <Logo />
            </div>
            <div className="orbit-spin">
              {LIFECYCLE.map((item, i) => (
                <span key={item.stage} className="orbit-badge" style={{ "--i": i } as React.CSSProperties}>
                  <span className="orbit-badge-inner">
                    <span className="orbit-badge-index">{String(i + 1).padStart(2, "0")}</span>
                    {item.stage}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow eyebrow-chev">About {SITE.shortName}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="about-heading" className="display display-lg" style={{ margin: "1rem 0 0", maxWidth: "16ch" }}>
              Built for every stage of a business
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p style={{ marginTop: "1.25rem", fontSize: "1.05rem", color: "var(--ox-700)", fontWeight: 500 }}>
              Launch it. Fill it. Convert it. Scale it — with the same team at every step.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="body-dim" style={{ marginTop: ".75rem", maxWidth: "52ch" }}>
              {SITE.name} is a specialist studio inside {SITE.parent}. Wherever your business
              is on the curve, we build the content, the campaigns and the AI systems for what
              comes next — and we own the engineering underneath, so it keeps working.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <ol className="stages">
              {LIFECYCLE.map((item, i) => (
                <li key={item.stage} className="stage" style={{ "--i": i } as React.CSSProperties}>
                  <span className="stage-index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="stage-hook">
                      <span className="stage-name">{item.stage}.</span> {item.hook}
                    </p>
                    <p className="stage-body body-dim">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={320}>
            <Link prefetch={false} href="/about/" className="btn btn-primary" style={{ marginTop: "1.75rem" }}>
              Discover more
            </Link>
          </Reveal>
        </div>
      </div>

      <style>{`
        .about {
          --cycle: ${CYCLE};
          --stage: ${STAGE_SECONDS}s;
          background:
            radial-gradient(60% 80% at 0% 50%, var(--cream) 0%, transparent 70%),
            var(--ground);
          overflow: hidden;
        }
        .about-grid { display: grid; gap: clamp(2.5rem, 6vw, 5rem); align-items: center; }
        @media (min-width: 940px) { .about-grid { grid-template-columns: 1fr 1.1fr; } }
        .orbit-wrap { display: grid; place-items: center; }
        .orbit {
          position: relative;
          width: min(100%, 420px); aspect-ratio: 1;
          display: grid; place-items: center;
        }
        .orbit-ring {
          position: absolute; inset: 0; border-radius: 50%;
          border: 1px solid var(--rule-strong);
        }
        /* The dashed inner ring rotates slowly with four dots riding it. */
        .orbit-ring-b {
          inset: 17%;
          border: 2px dashed rgb(163 36 28 / .55);
          animation: orbit 75s linear infinite;
        }
        .orbit-dot {
          position: absolute; inset: -2px;
          rotate: calc(var(--i) * 90deg + 30deg);
        }
        .orbit-dot::before {
          content: ""; position: absolute; left: 50%; top: 0;
          width: 14px; height: 14px; border-radius: 50%;
          background: var(--ox-500); translate: -50% -50%;
          box-shadow: 0 0 0 4px var(--ground);
        }
        .orbit-core {
          width: 46%; aspect-ratio: 1; border-radius: 50%;
          background: #fff;
          box-shadow: 0 20px 50px rgb(7 32 63 / .14), 0 0 0 10px rgb(235 222 212 / .6), 0 0 0 11px rgb(163 36 28 / .35);
          display: grid; place-items: center;
          position: relative; z-index: 2;
          font-size: .78rem;
        }
        .orbit-spin {
          position: absolute; inset: 0;
          animation: orbit 75s linear infinite;
        }
        .orbit-badge {
          position: absolute; inset: 0;
          rotate: calc(var(--i) * 90deg);
        }
        /*
          Two animations on the badge: the counter-rotation that keeps its text upright,
          and the stage highlight. The highlight is a 12s cycle; each badge is delayed by
          its index times one stage, so exactly one is lit at a time, in lifecycle order.
        */
        .orbit-badge-inner {
          position: absolute; left: 50%; top: 0;
          translate: -50% -50%;
          rotate: calc(var(--i) * -90deg);
          width: 100px; height: 100px; border-radius: 50%;
          background: #fff;
          box-shadow: 0 12px 30px rgb(7 32 63 / .14);
          display: grid; place-items: center; align-content: center; gap: .1rem;
          font-family: var(--font-display), system-ui, sans-serif;
          font-weight: 700; font-size: .8rem; text-align: center;
          color: var(--ox-900);
          animation:
            orbit-counter 75s linear infinite,
            stage-lit var(--cycle) ease-in-out infinite;
          animation-delay: 0s, calc(var(--i) * var(--stage));
        }
        .orbit-badge-index {
          font-family: var(--font-mono), monospace;
          font-weight: 500; font-size: .58rem; letter-spacing: .16em;
          color: var(--ox-500);
          opacity: .8;
        }
        @keyframes stage-lit {
          0%, 2% { background: #fff; color: var(--ox-900); box-shadow: 0 12px 30px rgb(7 32 63 / .14); scale: 1; }
          6%, 22% {
            background: var(--ox-700); color: var(--cream);
            box-shadow: 0 16px 36px rgb(107 23 18 / .38), 0 0 0 6px rgb(163 36 28 / .18);
            scale: 1.1;
          }
          25%, 100% { background: #fff; color: var(--ox-900); box-shadow: 0 12px 30px rgb(7 32 63 / .14); scale: 1; }
        }
        .orbit-badge-inner:is(:hover) { background: var(--ox-700); color: var(--cream); }

        /* The list beside the orbit, lit in the same rhythm. */
        .stages {
          list-style: none; padding: 0; margin: 1.5rem 0 0;
          display: grid; gap: .35rem;
        }
        .stage {
          display: grid; grid-template-columns: 2.2rem 1fr; gap: .4rem;
          padding: .7rem .8rem .7rem .6rem;
          border-radius: 10px;
          border-left: 3px solid transparent;
          animation: stage-row var(--cycle) ease-in-out infinite;
          animation-delay: calc(var(--i) * var(--stage));
        }
        .stage-index {
          font-family: var(--font-mono), monospace;
          font-size: .66rem; letter-spacing: .18em; padding-top: .3rem;
          color: var(--ink-faint);
        }
        .stage-hook {
          margin: 0; font-size: 1rem; line-height: 1.35;
          font-family: var(--font-display), system-ui, sans-serif; font-weight: 700;
          letter-spacing: -0.01em; color: var(--heading);
          text-wrap: pretty;
        }
        .stage-name { color: var(--accent-hi); }
        .stage-body { margin: .3rem 0 0; font-size: .9rem; line-height: 1.5; }
        @keyframes stage-row {
          0%, 2% { background: transparent; border-left-color: transparent; translate: 0 0; }
          6%, 22% { background: rgb(235 222 212 / .7); border-left-color: var(--ox-500); translate: 4px 0; }
          25%, 100% { background: transparent; border-left-color: transparent; translate: 0 0; }
        }

        @media (max-width: 600px) {
          .orbit { width: min(100% - 5rem, 360px); margin-block: 2.5rem; }
          .orbit-badge-inner { width: 76px; height: 76px; font-size: .68rem; }
          .orbit-badge-index { font-size: .5rem; }
          .orbit-core { font-size: .62rem; }
          .stage { grid-template-columns: 1.8rem 1fr; }
        }
        /*
          Reduced motion: the global rule stops the loops, which would freeze every stage
          unlit. Light all of them softly instead so the list still reads as four steps.
        */
        @media (prefers-reduced-motion: reduce) {
          .stage { border-left-color: var(--ox-500); background: rgb(235 222 212 / .45); }
        }
      `}</style>
    </section>
  );
}
