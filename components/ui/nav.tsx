"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/content/site";
import { SERVICES, CAPABILITIES } from "@/content/services";
import { whatsappHref } from "@/lib/contact";
import Logo from "./logo";

const SOLUTIONS = [
  ...SERVICES.map((s) => ({ label: s.title, href: `/services/${s.slug}/` })),
  ...CAPABILITIES.map((c) => ({ label: c.title, href: `/services/#${c.slug}` })),
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The mobile sheet covers the page, so the body must not scroll behind it.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMenu(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="btn btn-primary"
        style={{
          position: "absolute",
          left: "1rem",
          top: "-100px",
          zIndex: 100,
          transition: "top .2s",
        }}
        onFocus={(e) => (e.currentTarget.style.top = "1rem")}
        onBlur={(e) => (e.currentTarget.style.top = "-100px")}
      >
        Skip to content
      </a>

      <header
        className={`site-header ${scrolled ? "is-scrolled" : ""}`}
        style={{
          position: "fixed",
          insetInline: 0,
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          className="shell"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
            height: scrolled ? 66 : 84,
            transition: "height .45s var(--ease)",
          }}
        >
          <Link prefetch={false} href="/" aria-label="Rocky's Vision AI — home" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo compact={scrolled} />
          </Link>

          <nav aria-label="Primary" className="nav-desktop">
            {NAV.map((item) =>
              item.label === "Services" ? (
                <div
                  key={item.href}
                  className="nav-drop"
                  onPointerEnter={() => setMenu(true)}
                  onPointerLeave={() => setMenu(false)}
                >
                  <Link
                    prefetch={false}
                    href={item.href}
                    className="nav-link"
                    aria-haspopup="true"
                    aria-expanded={menu}
                    onFocus={() => setMenu(true)}
                  >
                    {item.label}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <div className={`nav-menu ${menu ? "is-open" : ""}`} onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setMenu(false)}>
                    {SOLUTIONS.map((s) => (
                      <Link prefetch={false} key={s.href} href={s.href} className="nav-menu-item" onClick={() => setMenu(false)}>
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link prefetch={false} key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="nav-connect">
            <span className="nav-connect-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" strokeLinejoin="round" />
              </svg>
            </span>
            <span>
              <span className="nav-connect-label">Connect with us</span>
              <span className="nav-connect-num">{SITE.whatsapp}</span>
            </span>
          </a>

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span style={{ transform: open ? "translateY(4px) rotate(45deg)" : "none" }} />
            <span style={{ opacity: open ? 0 : 1 }} />
            <span style={{ transform: open ? "translateY(-4px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </header>

      <div
        id="mobile-nav"
        hidden={!open}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 45,
          background: "var(--ground)",
          paddingTop: 100,
          overflowY: "auto",
        }}
      >
        <nav aria-label="Mobile" className="shell" style={{ display: "grid", gap: "0.25rem", paddingBottom: "3rem" }}>
          {NAV.map((item, i) => (
            <Link
              prefetch={false}
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="display display-md"
              style={{
                textDecoration: "none",
                padding: "0.55rem 0",
                borderBottom: "1px solid var(--rule)",
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(12px)",
                transition: `opacity .5s var(--ease) ${i * 60}ms, transform .5s var(--ease) ${i * 60}ms`,
              }}
            >
              {item.label}
            </Link>
          ))}
          <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: "1.75rem" }}>
            Get a free plan
          </a>
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ marginTop: ".6rem" }}>
            WhatsApp {SITE.whatsapp}
          </a>
        </nav>
      </div>

      <style>{`
        .site-header {
          background: rgb(247 242 238 / 0.9);
          backdrop-filter: blur(14px) saturate(140%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
          border-bottom: 1px solid transparent;
          transition: background .45s var(--ease), border-color .45s var(--ease), box-shadow .45s var(--ease);
        }
        .site-header.is-scrolled {
          background: rgb(247 242 238 / 0.96);
          border-color: var(--rule);
          box-shadow: 0 6px 24px rgb(7 32 63 / 0.08);
        }
        .nav-desktop { display: none; align-items: center; gap: 1.9rem; }
        .nav-link {
          display: inline-flex; align-items: center; gap: .35rem;
          font-size: .92rem; font-weight: 500; color: var(--ink);
          text-decoration: none; padding: .4rem 0;
          transition: color .3s var(--ease);
        }
        .nav-link:hover { color: var(--ox-500); }
        .nav-drop { position: relative; }
        .nav-menu {
          position: absolute; top: 100%; left: -1rem;
          min-width: 16rem;
          background: #fff;
          border: 1px solid var(--rule);
          border-radius: 10px;
          box-shadow: 0 18px 40px rgb(7 32 63 / .14);
          padding: .5rem;
          display: grid;
          opacity: 0; transform: translateY(8px); pointer-events: none;
          transition: opacity .3s var(--ease), transform .3s var(--ease);
        }
        .nav-menu.is-open { opacity: 1; transform: none; pointer-events: auto; }
        .nav-menu-item {
          display: block; font-size: .88rem; color: var(--ink);
          text-decoration: none; padding: .5rem .75rem; border-radius: 6px;
          transition: background .25s var(--ease), color .25s var(--ease);
        }
        .nav-menu-item:hover { background: var(--cream); color: var(--ox-700); }
        .nav-connect {
          display: none; align-items: center; gap: .7rem;
          text-decoration: none; color: var(--ink);
        }
        .nav-connect-icon {
          width: 40px; height: 40px; border-radius: 999px;
          display: grid; place-items: center;
          color: var(--ox-500); border: 1px solid var(--rule-strong);
          transition: background .3s var(--ease), color .3s var(--ease);
        }
        .nav-connect:hover .nav-connect-icon { background: var(--ox-700); color: var(--cream); }
        .nav-connect-label { display: block; font-size: .7rem; color: var(--ink-faint); letter-spacing: .04em; }
        .nav-connect-num { display: block; font-size: .88rem; font-weight: 600; }
        .nav-toggle {
          display: grid; gap: 4px; width: 44px; height: 44px; place-content: center;
          background: none; border: 0; cursor: pointer; padding: 0;
        }
        .nav-toggle span {
          display: block; width: 24px; height: 1.5px; background: var(--ink);
          transition: transform .35s var(--ease), opacity .2s var(--ease);
        }
        @media (min-width: 960px) {
          .nav-desktop { display: flex; }
          .nav-connect { display: inline-flex; }
          .nav-toggle { display: none; }
        }
      `}</style>
    </>
  );
}
