import Link from "next/link";
import { SITE, EXPERTISE } from "@/content/site";
import Reveal from "@/components/motion/reveal";
import Logo from "@/components/ui/logo";

// Skyhit's about block: an orbit graphic on the left (logo centred, badges circling),
// copy on the right. The badges are the four expertise areas rather than partner
// certifications — the studio holds none, and says so elsewhere on the page.
const SHORT = ["Software", "AI systems", "Growth", "Prospects"];

export default function AboutOrbit() {
  return (
    <section id="about" className="section about" aria-labelledby="about-heading">
      <div className="shell about-grid">
        <Reveal className="orbit-wrap">
          <div className="orbit" aria-hidden="true">
            <span className="orbit-ring orbit-ring-a" />
            <span className="orbit-ring orbit-ring-b">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="orbit-dot" style={{ "--i": i } as React.CSSProperties} />
              ))}
            </span>
            <div className="orbit-core">
              <Logo />
            </div>
            <div className="orbit-spin">
              {EXPERTISE.map((item, i) => (
                <span key={item.title} className="orbit-badge" style={{ "--i": i } as React.CSSProperties}>
                  <span className="orbit-badge-inner">{SHORT[i]}</span>
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
              A content studio built by engineers
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p style={{ marginTop: "1.25rem", fontSize: "1.05rem", color: "var(--ox-700)", fontWeight: 500 }}>
              Committed to content, campaigns and AI systems that any growing brand can actually
              run.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="body-dim" style={{ marginTop: ".75rem", maxWidth: "52ch" }}>
              {SITE.name} is a specialist studio inside {SITE.parent}. We make the short-form
              video, generated creative and paid campaigns that move product, service and retail
              brands — and we build the software and tracking underneath, so the numbers survive
              scrutiny.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <ul className="about-points">
              {EXPERTISE.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <span className="body-dim"> — {item.body}</span>
                </li>
              ))}
            </ul>
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
        /* The reference site's dashed inner ring: it rotates slowly with four dots riding it. */
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
        .orbit-badge-inner {
          position: absolute; left: 50%; top: 0;
          translate: -50% -50%;
          rotate: calc(var(--i) * -90deg);
          width: 96px; height: 96px; border-radius: 50%;
          background: #fff;
          box-shadow: 0 12px 30px rgb(7 32 63 / .14);
          display: grid; place-items: center;
          font-family: var(--font-display), system-ui, sans-serif;
          font-weight: 700; font-size: .78rem; text-align: center;
          color: var(--ox-900);
          animation: orbit-counter 75s linear infinite;
        }
        .about-points {
          list-style: none; padding: 0; margin: 1.25rem 0 0;
          display: grid; gap: .55rem; font-size: .93rem;
        }
        .about-points li { padding-left: 1.1rem; position: relative; }
        .about-points li::before {
          content: ""; position: absolute; left: 0; top: .62em;
          width: 6px; height: 6px; border-radius: 50%; background: var(--ox-500);
        }
        @media (max-width: 600px) {
          .orbit { width: min(100% - 5rem, 360px); margin-block: 2.5rem; }
          .orbit-badge-inner { width: 72px; height: 72px; font-size: .66rem; }
          .orbit-core { font-size: .62rem; }
        }
      `}</style>
    </section>
  );
}
