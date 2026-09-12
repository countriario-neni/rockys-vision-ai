import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES } from "@/content/services";
import { SITE } from "@/content/site";
import Reveal from "@/components/motion/reveal";
import Cta from "@/components/sections/cta";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};

  const title = `${service.title} for fitness brands`;
  return {
    title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}/` },
    openGraph: {
      title: `${title} — ${SITE.name}`,
      description: service.summary,
      url: `${SITE.domain}/services/${service.slug}/`,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      <header className="band svc-head">
        <div className="svc-head-media" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
          <img src={service.image} alt="" fetchPriority="high" decoding="async" />
        </div>
        <div className="slab" aria-hidden="true" />
        <div className="shell" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <p className="eyebrow" style={{ color: "var(--cream)" }}>
              <Link prefetch={false} href="/services/" className="link" style={{ color: "inherit" }}>
                Services
              </Link>{" "}
              / {service.number}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display display-xl" style={{ margin: "1.25rem 0 0", color: "#fff", maxWidth: "14ch" }}>
              {service.title}
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="lede" style={{ marginTop: "1.5rem", color: "rgb(235 222 212 / .88)" }}>{service.short}</p>
          </Reveal>
        </div>
      </header>

      <section className="section" aria-labelledby="intro-heading">
        <div className="shell svc-intro">
          <h2 id="intro-heading" className="eyebrow" style={{ marginTop: ".4rem" }}>The short version</h2>
          <Reveal>
            <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.45rem)", lineHeight: 1.5, margin: 0, textWrap: "pretty" }}>
              {service.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section band" aria-labelledby="deliverables-heading">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">What you get</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="deliverables-heading" className="display display-lg" style={{ margin: "1rem 0 0", maxWidth: "14ch" }}>
              In the <span>scope</span>
            </h2>
          </Reveal>

          <div className="deliv-grid">
            {service.deliverables.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 80}>
                <article className="card" style={{ padding: "clamp(1.35rem, 2.5vw, 1.8rem)", height: "100%" }}>
                  <h3 className="display" style={{ fontSize: "1.02rem", margin: 0, letterSpacing: "-0.005em" }}>
                    {item.title}
                  </h3>
                  <p className="body-dim" style={{ fontSize: ".92rem", marginTop: ".7rem", marginBottom: 0 }}>
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="how-heading">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">How we run it</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="how-heading" className="display display-lg" style={{ margin: "1rem 0 0", maxWidth: "14ch" }}>
              The <span>method</span>
            </h2>
          </Reveal>

          <ol className="method-grid">
            {service.process.map((item, i) => (
              <Reveal as="li" key={item.step} delay={i * 90} className="method-item">
                <span className="method-step">{item.step}</span>
                <h3 className="display" style={{ fontSize: "1.1rem", margin: "1rem 0 0", letterSpacing: "-0.008em" }}>
                  {item.title}
                </h3>
                <p className="body-dim" style={{ fontSize: ".92rem", marginTop: ".6rem", marginBottom: 0 }}>
                  {item.body}
                </p>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={120}>
            <div className="fit-block">
              <p className="eyebrow" style={{ margin: 0 }}>Built for</p>
              <ul className="fit-list">
                {service.fitFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="other-heading" style={{ paddingTop: 0 }}>
        <div className="shell">
          <h2 id="other-heading" className="eyebrow" style={{ marginBottom: "1.5rem" }}>
            The other three
          </h2>
          <div className="other-grid">
            {others.map((other) => (
              <Link prefetch={false} key={other.slug} href={`/services/${other.slug}/`} className="card other-card">
                <span className="eyebrow eyebrow-dim">{other.number}</span>
                <span className="display" style={{ fontSize: "1.1rem", display: "block", marginTop: ".6rem" }}>
                  {other.title}
                </span>
                <span className="body-dim" style={{ fontSize: ".88rem", display: "block", marginTop: ".5rem" }}>
                  {other.short}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Cta
        heading={`Talk to us about ${service.title.toLowerCase()}.`}
        body="Thirty minutes on your category and your catalogue, and a written scope a few days later. No deck, no obligation."
      />

      <style>{`
        .svc-head {
          position: relative; overflow: hidden;
          padding: clamp(8rem, 16vw, 12rem) 0 clamp(3.5rem, 7vw, 5.5rem);
          min-height: 60vh; display: flex; align-items: flex-end;
        }
        .svc-head-media { position: absolute; inset: 0; }
        .svc-head-media img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .svc-head-media::after {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(90deg, rgb(7 32 63 / .92) 0%, rgb(7 32 63 / .7) 50%, rgb(7 32 63 / .3) 100%);
        }
        .svc-head .slab { opacity: .85; }
        .svc-intro { display: grid; gap: clamp(1rem, 3vw, 2.5rem); }
        @media (min-width: 900px) { .svc-intro { grid-template-columns: 14rem minmax(0, 1fr); } }
        .deliv-grid {
          margin-top: clamp(2.5rem, 6vw, 4rem);
          display: grid; gap: clamp(.9rem, 2vw, 1.25rem);
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) { .deliv-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1040px) { .deliv-grid { grid-template-columns: repeat(3, 1fr); } }
        .method-grid {
          list-style: none; padding: 0;
          margin: clamp(2.5rem, 6vw, 4rem) 0 0;
          display: grid; gap: clamp(1.5rem, 3vw, 2rem);
          grid-template-columns: 1fr;
        }
        @media (min-width: 700px) { .method-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1080px) { .method-grid { grid-template-columns: repeat(4, 1fr); } }
        .method-item { padding-top: 1.5rem; border-top: 1px solid var(--rule); position: relative; }
        .method-item::before {
          content: ""; position: absolute; top: -4px; left: 0;
          width: 7px; height: 7px; border-radius: 999px; background: var(--ox-400);
        }
        .method-step {
          font-family: var(--font-mono), monospace;
          font-size: .7rem; letter-spacing: .18em; color: var(--ink-faint);
        }
        .fit-block {
          margin-top: clamp(2.5rem, 5vw, 3.5rem);
          padding-top: 1.75rem;
          border-top: 1px solid var(--rule);
        }
        .fit-list {
          list-style: none; padding: 0; margin: 1rem 0 0;
          display: flex; flex-wrap: wrap; gap: .5rem;
        }
        .fit-list li {
          font-family: var(--font-mono), monospace;
          font-size: .68rem; letter-spacing: .12em; text-transform: uppercase;
          color: var(--ink-dim);
          border: 1px solid var(--rule); border-radius: 999px; padding: .45rem .85rem;
        }
        .other-grid {
          display: grid; gap: clamp(.9rem, 2vw, 1.25rem);
          grid-template-columns: 1fr;
        }
        @media (min-width: 760px) { .other-grid { grid-template-columns: repeat(3, 1fr); } }
        .other-card {
          padding: clamp(1.35rem, 2.5vw, 1.75rem);
          text-decoration: none; color: var(--ink);
        }
      `}</style>
    </>
  );
}
