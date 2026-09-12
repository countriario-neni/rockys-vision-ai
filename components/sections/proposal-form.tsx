"use client";

import { useState, type FormEvent } from "react";
import { SITE } from "@/content/site";
import { whatsappHref } from "@/lib/contact";
import Reveal from "@/components/motion/reveal";

/*
  Skyhit's "get my free proposal" block: what happens next on the left, the form on
  the right. The site is a static export with no backend, so submitting opens the
  visitor's mail client with the message prefilled; the booking and WhatsApp links
  sit beside it for people who would rather not email.
*/
const NEXT = [
  "We read what you send and reply within one working day",
  "A thirty-minute call on your category and catalogue",
  "A written scope a few days later — no deck, no obligation",
];

export default function ProposalForm() {
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const brand = String(data.get("brand") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = `Free plan request — ${brand || name}`;
    const body = [`Name: ${name}`, `Phone: ${phone}`, `Brand: ${brand}`, "", message].join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="proposal" className="section" aria-labelledby="proposal-heading">
      <div className="shell">
        <div className="center">
          <Reveal>
            <p className="eyebrow eyebrow-chev">Start here</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="proposal-heading" className="display display-lg" style={{ margin: "1rem auto 0", maxWidth: "20ch" }}>
              Get my free plan
            </h2>
          </Reveal>
        </div>

        <div className="prop-grid">
          <Reveal className="prop-info">
            <h3 className="display" style={{ fontSize: "1.3rem", margin: 0 }}>
              No pitch deck. A plan you can act on.
            </h3>
            <p className="body-dim" style={{ marginTop: ".75rem", fontSize: ".95rem" }}>
              Tell us what you sell and where it is stuck. We answer with a written scope for one
              line of work — priced for your brand, not from a rate card — and you decide whether
              to run it for a month.
            </p>
            <p className="display" style={{ fontSize: "1.02rem", margin: "1.5rem 0 .5rem" }}>
              What will be the next step?
            </p>
            <ul className="prop-steps">
              {NEXT.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
            <p className="display" style={{ fontSize: "1.02rem", margin: "1.5rem 0 .5rem" }}>
              Talk to a founder:
            </p>
            <p style={{ margin: 0, fontSize: ".95rem" }}>
              <a className="link" href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                WhatsApp {SITE.whatsapp}
              </a>
            </p>
            <p style={{ margin: ".4rem 0 0", fontSize: ".95rem" }}>
              <a className="link" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </p>
          </Reveal>

          <Reveal delay={120} className="prop-form-wrap">
            <p className="eyebrow" style={{ margin: 0 }}>Contact info</p>
            <h3 className="display" style={{ fontSize: "1.4rem", margin: ".6rem 0 0" }}>Keep in touch</h3>
            <p className="body-dim" style={{ fontSize: ".9rem", margin: ".5rem 0 1.25rem" }}>
              Submitting opens an email to us with your details filled in.
            </p>
            <form onSubmit={submit} className="prop-form">
              <label>
                <span className="sr-only">Name</span>
                <input className="field" name="name" placeholder="Name" required autoComplete="name" />
              </label>
              <label>
                <span className="sr-only">Phone number</span>
                <input className="field" name="phone" placeholder="Phone number" type="tel" autoComplete="tel" />
              </label>
              <label>
                <span className="sr-only">Brand or gym</span>
                <input className="field" name="brand" placeholder="Brand, gym or label" autoComplete="organization" />
              </label>
              <label>
                <span className="sr-only">Message</span>
                <textarea className="field" name="message" placeholder="What do you sell, and where is it stuck?" rows={4} required />
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", alignItems: "center" }}>
                <button type="submit" className="btn btn-primary">
                  Send my request
                </button>
                <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  Or book a call
                </a>
              </div>
              <p aria-live="polite" className="body-dim" style={{ fontSize: ".85rem", margin: 0, minHeight: "1.2em" }}>
                {sent ? "Your mail client should have opened. If it did not, email us directly at the address on the left." : ""}
              </p>
            </form>
          </Reveal>
        </div>
      </div>

      <style>{`
        .prop-grid {
          margin-top: clamp(2.5rem, 5vw, 3.5rem);
          display: grid; gap: clamp(1.5rem, 3vw, 2.5rem);
          background: var(--cream);
          border-radius: 16px;
          padding: clamp(1.5rem, 4vw, 3rem);
        }
        @media (min-width: 900px) { .prop-grid { grid-template-columns: 1fr 1fr; } }
        .prop-steps { list-style: none; padding: 0; margin: 0; display: grid; gap: .45rem; font-size: .93rem; }
        .prop-steps li { padding-left: 1.5rem; position: relative; }
        .prop-steps li::before {
          content: "\\2713"; position: absolute; left: 0; top: 0;
          color: var(--ox-500); font-weight: 700;
        }
        .prop-form-wrap {
          background: #fff; border-radius: 12px;
          padding: clamp(1.25rem, 3vw, 2rem);
          box-shadow: 0 16px 40px rgb(7 32 63 / .08);
        }
        .prop-form { display: grid; gap: .7rem; }
        .prop-form label { display: block; }
        .prop-form textarea { resize: vertical; min-height: 6rem; }
        .sr-only {
          position: absolute; width: 1px; height: 1px; overflow: hidden;
          clip: rect(0 0 0 0); white-space: nowrap;
        }
      `}</style>
    </section>
  );
}
