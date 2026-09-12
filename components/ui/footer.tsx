import Link from "next/link";
import { SITE } from "@/content/site";
import { SERVICES } from "@/content/services";
import { whatsappHref } from "@/lib/contact";
import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="hairline" style={{ background: "var(--void)" }}>
      <div className="shell" style={{ paddingBlock: "clamp(3rem, 7vw, 5rem)" }}>
        <div className="footer-grid">
          <div style={{ maxWidth: "34ch" }}>
            <Logo />
            <p className="body-dim" style={{ marginTop: "1rem", fontSize: "0.95rem" }}>
              {SITE.tagline}. A specialist studio inside{" "}
              <a className="link" href={SITE.parentUrl} target="_blank" rel="noopener noreferrer">
                {SITE.parent}
              </a>
              .
            </p>
            <p className="eyebrow eyebrow-dim" style={{ marginTop: "1.5rem" }}>
              {SITE.markets.join(" · ")}
            </p>
          </div>

          <div>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>Services</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.6rem" }}>
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link prefetch={false} className="link" href={`/services/${s.slug}/`} style={{ fontSize: "0.92rem" }}>
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link prefetch={false} className="link" href="/services/" style={{ fontSize: "0.92rem", color: "var(--cream-dim)" }}>
                  All capabilities
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>Company</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.6rem" }}>
              <li><Link prefetch={false} className="link" href="/about/" style={{ fontSize: "0.92rem" }}>About</Link></li>
              <li><Link prefetch={false} className="link" href="/#founders" style={{ fontSize: "0.92rem" }}>Founders</Link></li>
              <li><Link prefetch={false} className="link" href="/#process" style={{ fontSize: "0.92rem" }}>Process</Link></li>
              <li><Link prefetch={false} className="link" href="/contact/" style={{ fontSize: "0.92rem" }}>Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>Talk to us</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.6rem" }}>
              <li>
                <a className="link" href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.92rem" }}>
                  Book a discovery call
                </a>
              </li>
              <li>
                <a className="link" href={whatsappHref()} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.92rem" }}>
                  WhatsApp
                </a>
              </li>
              <li>
                <a className="link" href={`mailto:${SITE.email}`} style={{ fontSize: "0.92rem" }}>
                  {SITE.email}
                </a>
              </li>
              <li>
                <a className="link" href={SITE.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.92rem" }}>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="hairline"
          style={{
            marginTop: "clamp(2.5rem, 6vw, 4rem)",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "space-between",
          }}
        >
          <p className="eyebrow eyebrow-dim" style={{ margin: 0 }}>
            &copy; {new Date().getFullYear()} {SITE.name}
          </p>
          <p className="eyebrow eyebrow-dim" style={{ margin: 0 }}>
            Built in-house
          </p>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          gap: clamp(2rem, 5vw, 3rem);
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1000px) {
          .footer-grid { grid-template-columns: 1.6fr 1fr 1fr 1fr; }
        }
      `}</style>
    </footer>
  );
}
