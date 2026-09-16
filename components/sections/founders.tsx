"use client";

import { useState } from "react";
import { FOUNDERS, type Founder } from "@/content/founders";
import Reveal from "@/components/motion/reveal";

/*
  Two founders, on the home page by request. The portrait falls back to a monogram if
  the image is missing so a not-yet-supplied photo degrades to something deliberate
  rather than a broken-image icon.
*/
function Portrait({ founder }: { founder: Founder }) {
  const [failed, setFailed] = useState(false);
  const initials = founder.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="portrait">
      <span className="portrait-plinth" aria-hidden="true" />
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer
        <img
          src={founder.cutout}
          alt={founder.imageAlt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="display portrait-monogram" aria-hidden="true">
          {initials}
        </span>
      )}
    </div>
  );
}

export default function Founders() {
  return (
    <section id="founders" className="section" aria-labelledby="founders-heading">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Who you work with</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 id="founders-heading" className="display display-lg" style={{ margin: "1rem 0 0", maxWidth: "20ch" }}>
            Two founders. <span>No handoff.</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="lede" style={{ marginTop: "1.5rem" }}>
            You pitch to the people who do the work. There is no account manager between the
            call you booked and the person cutting your video.
          </p>
        </Reveal>

        <div className="founders-grid">
          {FOUNDERS.map((founder, i) => (
            <Reveal key={founder.name} delay={i * 120}>
              <article className="card founder-card">
                <Portrait founder={founder} />

                <div className="founder-body">
                  <p className="eyebrow" style={{ margin: 0 }}>{founder.role}</p>
                  <h3 className="display display-md" style={{ margin: ".7rem 0 0" }}>
                    {founder.name}
                  </h3>
                  <p className="body-dim" style={{ fontSize: ".97rem", marginTop: ".9rem" }}>
                    {founder.bio}
                  </p>

                  <ul className="founder-focus">
                    {founder.focus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  {founder.links?.length ? (
                    <p style={{ marginTop: "1.25rem", marginBottom: 0 }}>
                      {founder.links.map((link) => (
                        <a
                          key={link.href}
                          className="link"
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: ".9rem",
                            marginRight: "1.25rem",
                            display: "inline-flex",
                            alignItems: "center",
                            minHeight: 40,
                          }}
                        >
                          {link.label} &#8599;
                        </a>
                      ))}
                    </p>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .founders-grid {
          margin-top: clamp(2.5rem, 6vw, 4rem);
          display: grid;
          gap: clamp(1.25rem, 3vw, 2rem);
          grid-template-columns: 1fr;
        }
        @media (min-width: 860px) {
          .founders-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .founder-card {
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: clamp(1.5rem, 3vw, 2.1rem);
        }
        /*
          The two source photos are very different — one is a subject on a light circular
          vignette, the other a full-frame office portrait. A circular frame at a fixed
          size is what makes them read as one set; the ring and desaturation finish the job.
        */
        .portrait {
          position: relative;
          width: clamp(150px, 30vw, 220px);
          aspect-ratio: 1;
          flex: none;
          display: grid;
          place-items: end center;
          overflow: visible;
        }
        .portrait-plinth {
          position: absolute;
          left: 50%; bottom: 4%;
          width: 92%; aspect-ratio: 1;
          transform: translateX(-50%);
          border-radius: 50%;
          background:
            radial-gradient(circle at 50% 60%, var(--cream) 0%, rgb(235 222 212 / .6) 40%, transparent 70%),
            radial-gradient(circle at 50% 95%, rgb(163 36 28 / .2) 0%, transparent 55%);
          filter: blur(12px);
        }
        .portrait img {
          position: relative;
          width: 100%; height: auto;
          display: block;
          filter:
            drop-shadow(0 18px 26px rgb(7 32 63 / .25))
            contrast(1.06) saturate(.92);
          transition: transform .8s var(--ease), filter .8s var(--ease);
          animation: portrait-float 7s ease-in-out infinite;
        }
        .founder-card:nth-child(2) .portrait img { animation-delay: -3.5s; }
        .founder-card:hover .portrait img {
          transform: translateY(-6px) scale(1.03);
          filter: drop-shadow(0 24px 32px rgb(7 32 63 / .3)) contrast(1.04) saturate(1);
        }
        @keyframes portrait-float {
          0%, 100% { translate: 0 0; }
          50%      { translate: 0 -7px; }
        }
        .portrait-monogram {
          font-size: 2.2rem;
          color: var(--ox-700);
          letter-spacing: -.04em;
        }
        @media (prefers-reduced-motion: reduce) {
          .portrait img { animation: none; }
        }
        .founder-body { padding: clamp(1.4rem, 3vw, 1.9rem) 0 0; position: relative; z-index: 1; }
        .founder-focus {
          list-style: none; padding: 0;
          margin: 1.4rem 0 0;
          display: flex; flex-wrap: wrap; gap: .5rem;
        }
        .founder-focus li {
          font-family: var(--font-mono), monospace;
          font-size: .66rem;
          letter-spacing: .13em;
          text-transform: uppercase;
          color: var(--ink-dim);
          border: 1px solid var(--rule);
          border-radius: 999px;
          padding: .42rem .8rem;
        }
      `}</style>
    </section>
  );
}
