import Link from "next/link";
import { SITE } from "@/content/site";
import { SERVICES, CAPABILITIES } from "@/content/services";
import { whatsappHref } from "@/lib/contact";
import Logo from "./logo";

const EXPLORE = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "Process", href: "/#process" },
  { label: "Founders", href: "/#founders" },
  { label: "Contact", href: "/contact/" },
];

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <p className="foot-head">
      {children}
      <span aria-hidden="true" className="foot-head-rule" />
    </p>
  );
}

export default function Footer() {
  return (
    <footer className="band" style={{ background: "var(--deep)" }}>
      <div className="shell" style={{ paddingBlock: "clamp(3rem, 7vw, 5rem)" }}>
        <div className="footer-grid">
          <div style={{ maxWidth: "32ch" }}>
            <Logo />
            <p className="body-dim" style={{ marginTop: "1rem", fontSize: "0.92rem" }}>
              {SITE.name} is the content, marketing and AI systems studio inside{" "}
              <a className="link" href={SITE.parentUrl} target="_blank" rel="noopener noreferrer">
                {SITE.parent}
              </a>
              . Short-form video, generated creative, paid ads and the software underneath, for
              growing brands in {SITE.markets.join(", ")}.
            </p>
            <div className="foot-social">
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.5 8.5H3.6V21h2.9V8.5ZM5 3.3a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM21 13.4c0-3.2-1.7-5.2-4.5-5.2-1.6 0-2.6.8-3.1 1.6V8.5h-2.9V21h2.9v-6.6c0-1.6.6-2.7 2.1-2.7 1.4 0 2 1 2 2.7V21H21v-7.6Z" />
                </svg>
              </a>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.42 1.32-1.95 1.36-.5.05-.98.24-3.3-.69-2.78-1.1-4.55-3.94-4.69-4.12-.14-.19-1.12-1.49-1.12-2.84s.71-2.02.96-2.29c.25-.28.55-.35.73-.35.18 0 .37 0 .53.01.17.01.4-.06.62.48.24.57.8 1.97.87 2.11.07.14.12.31.02.5-.09.19-.14.31-.28.47-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.28.72 1.19 1.55 1.93 1.07.95 1.97 1.25 2.25 1.39.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.25.09 1.6.75 1.87.89.28.14.46.21.53.33.07.11.07.65-.17 1.33Z" />
                </svg>
              </a>
              <a href={`mailto:${SITE.email}`} aria-label="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <Heading>Explore</Heading>
            <ul className="foot-list">
              {EXPLORE.map((item) => (
                <li key={item.href}>
                  <Link prefetch={false} className="link" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Heading>Solutions</Heading>
            <ul className="foot-list">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link prefetch={false} className="link" href={`/services/${s.slug}/`}>
                    {s.title}
                  </Link>
                </li>
              ))}
              {CAPABILITIES.slice(0, 4).map((c) => (
                <li key={c.slug}>
                  <Link prefetch={false} className="link" href={`/services/#${c.slug}`}>
                    {c.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link prefetch={false} className="link" href="/services/" style={{ color: "var(--ink-dim)" }}>
                  All solutions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <Heading>Contact</Heading>
            <ul className="foot-list foot-contact">
              <li>
                <span aria-hidden="true">&#9906;</span>
                <span>{SITE.markets.join(" · ")}</span>
              </li>
              <li>
                <span aria-hidden="true">&#9742;</span>
                <a className="link" href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                  {SITE.whatsapp}
                </a>
              </li>
              <li>
                <span aria-hidden="true">&#9742;</span>
                <a className="link" href={`tel:${SITE.phoneUs.replace(/\s/g, "")}`}>
                  {SITE.phoneUs}
                </a>
              </li>
              <li>
                <span aria-hidden="true">&#9993;</span>
                <a className="link" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
              </li>
              <li>
                <span aria-hidden="true">&#9635;</span>
                <a className="link" href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book a discovery call
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline foot-bottom">
          <p className="eyebrow eyebrow-dim" style={{ margin: 0 }}>
            &copy; {new Date().getFullYear()} {SITE.entity.legalName} &middot; All rights reserved
          </p>
          <nav aria-label="Legal" className="foot-legal">
            <Link prefetch={false} className="link" href="/privacy/">
              Privacy Policy
            </Link>
            <Link prefetch={false} className="link" href="/terms/">
              Terms of Service
            </Link>
          </nav>
        </div>

        <address className="foot-address">
          {SITE.entity.legalName} &middot; a Missouri limited liability company &middot;{" "}
          {SITE.entity.city}, {SITE.entity.state}, United States
        </address>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          gap: clamp(2rem, 5vw, 3rem);
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) { .footer-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1000px) { .footer-grid { grid-template-columns: 1.5fr 0.8fr 1.1fr 1.2fr; } }
        .foot-head {
          margin: 0 0 1.1rem;
          display: flex; align-items: center; gap: .8rem;
          font-family: var(--font-display), system-ui, sans-serif;
          font-weight: 700; font-size: 1rem; color: var(--cream);
        }
        .foot-head-rule {
          flex: none; width: 56px; height: 1px; background: var(--ox-300);
          position: relative;
        }
        .foot-head-rule::after {
          content: ""; position: absolute; right: -4px; top: 50%;
          width: 8px; height: 8px; border-radius: 50%;
          border: 1px solid var(--ox-300); translate: 0 -50%;
        }
        .foot-list { list-style: none; padding: 0; margin: 0; display: grid; gap: .6rem; font-size: .92rem; }
        .foot-contact li { display: flex; gap: .6rem; align-items: flex-start; }
        .foot-contact li > span:first-child { color: var(--ox-300); flex: none; width: 1.2em; }
        .foot-social { display: flex; gap: .6rem; margin-top: 1.4rem; }
        .foot-social a {
          width: 40px; height: 40px; border-radius: 50%;
          display: grid; place-items: center;
          color: var(--cream); background: rgb(235 222 212 / .12);
          transition: background .3s var(--ease), transform .3s var(--ease);
        }
        .foot-social a:hover { background: var(--ox-500); transform: translateY(-2px); }
        .foot-bottom {
          margin-top: clamp(2.5rem, 6vw, 4rem);
          padding-top: 1.5rem;
          display: flex; flex-wrap: wrap; gap: 1rem; justify-content: space-between;
        }
        .foot-legal { display: flex; flex-wrap: wrap; gap: 1.5rem; font-size: .8rem; }
        .foot-address {
          font-style: normal;
          margin-top: 1rem;
          font-size: .8rem;
          color: var(--ink-faint);
        }
      `}</style>
    </footer>
  );
}
