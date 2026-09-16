import type { Metadata } from "next";
import { SITE } from "@/content/site";
import { SERVICES } from "@/content/services";
import { whatsappHref } from "@/lib/contact";
import Reveal from "@/components/motion/reveal";
import Faq from "@/components/sections/faq";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a thirty-minute discovery call with Rocky's Vision AI, or message us on WhatsApp. Growing brands in India, the US, the UK and the UAE.",
  alternates: { canonical: "/contact/" },
};

const CHANNELS = [
  {
    label: "Book a discovery call",
    detail: "Thirty minutes. The fastest way to a written scope.",
    action: "Open the calendar",
    href: SITE.bookingUrl,
    external: true,
    primary: true,
  },
  {
    label: "WhatsApp",
    detail: SITE.whatsapp,
    action: "Start a chat",
    href: whatsappHref(),
    external: true,
    primary: false,
  },
  {
    label: "Call us",
    detail: SITE.phoneIn,
    action: `Or ${SITE.phoneUs} in the US`,
    href: `tel:${SITE.phoneIn.replace(/\s/g, "")}`,
    external: false,
    primary: false,
  },
  {
    label: "Email",
    detail: SITE.email,
    action: "Write to us",
    href: `mailto:${SITE.email}`,
    external: false,
    primary: false,
  },
  {
    label: "LinkedIn",
    detail: "Rakesh Babu Gogineni",
    action: "Connect",
    href: SITE.linkedin,
    external: true,
    primary: false,
  },
];

export default function Contact() {
  return (
    <>
      <header className="section" style={{ paddingTop: "clamp(7rem, 14vw, 10rem)", paddingBottom: 0 }}>
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Contact</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display display-xl" style={{ margin: "1.25rem 0 0", maxWidth: "14ch" }}>
              Tell us what you <span>sell</span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="lede" style={{ marginTop: "1.75rem" }}>
              Bring your category, your catalog and what you have already tried. We will tell
              you honestly whether we are the right studio for it — and if we are not, who is.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section" aria-labelledby="channels-heading">
        <div className="shell">
          <h2 id="channels-heading" className="eyebrow" style={{ marginBottom: "1.75rem" }}>
            Ways to reach us
          </h2>

          <div className="channel-grid">
            {CHANNELS.map((channel, i) => (
              <Reveal key={channel.label} delay={i * 80}>
                <a
                  className="card channel-card"
                  href={channel.href}
                  {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  style={channel.primary ? { borderColor: "var(--ox-400)" } : undefined}
                >
                  <span className="eyebrow" style={{ color: channel.primary ? "var(--accent-hi)" : "var(--ink-faint)" }}>
                    {channel.label}
                  </span>
                  <span className="display" style={{ fontSize: "1.16rem", display: "block", marginTop: ".8rem" }}>
                    {channel.detail}
                  </span>
                  <span className="body-dim" style={{ fontSize: ".86rem", display: "block", marginTop: "1.2rem" }}>
                    {channel.action} &#8599;
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="brief-block">
              <p className="eyebrow" style={{ margin: 0 }}>What to bring to the call</p>
              <ul className="brief-list">
                <li>What you sell, and to whom</li>
                <li>What you are posting now, and where</li>
                <li>What you have spent on ads, and what it returned</li>
                <li>Which of our service lines you think you need</li>
              </ul>
              <p className="body-dim" style={{ fontSize: ".92rem", marginTop: "1.5rem", marginBottom: 0, maxWidth: "60ch" }}>
                Not sure which line? That is the call. Our core lines are{" "}
                {SERVICES.map((s) => s.title).join(", ")} — most brands start with one.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Faq />

      <style>{`
        .channel-grid {
          display: grid; gap: clamp(.9rem, 2vw, 1.25rem);
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) { .channel-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1040px) { .channel-grid { grid-template-columns: repeat(4, 1fr); } }
        .channel-card {
          padding: clamp(1.35rem, 2.5vw, 1.8rem);
          text-decoration: none; color: var(--ink);
          display: block; height: 100%;
        }
        .brief-block {
          margin-top: clamp(2.5rem, 5vw, 3.5rem);
          padding-top: 1.75rem;
          border-top: 1px solid var(--rule);
        }
        .brief-list {
          list-style: none; padding: 0; margin: 1.1rem 0 0;
          display: grid; gap: .55rem;
        }
        .brief-list li {
          position: relative; padding-left: 1.4rem;
          color: var(--ink-dim); font-size: .96rem;
        }
        .brief-list li::before {
          content: ""; position: absolute; left: 0; top: .62em;
          width: 6px; height: 6px; border-radius: 999px; background: var(--ox-400);
        }
      `}</style>
    </>
  );
}
