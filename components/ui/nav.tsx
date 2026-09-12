"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/content/site";
import Logo from "./logo";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
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
        style={{
          position: "fixed",
          insetInline: 0,
          top: 0,
          zIndex: 50,
          background: scrolled ? "rgb(2 0 13 / 0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
          borderBottom: `1px solid ${scrolled ? "var(--rule)" : "transparent"}`,
          transition: "background .45s var(--ease), border-color .45s var(--ease)",
        }}
      >
        <div
          className="shell"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
            height: scrolled ? 66 : 82,
            transition: "height .45s var(--ease)",
          }}
        >
          <Link prefetch={false} href="/" aria-label="Rocky's Vision AI — home" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo compact={scrolled} />
          </Link>

          <nav aria-label="Primary" className="nav-desktop">
            {NAV.map((item) => (
              <Link prefetch={false} key={item.href} href={item.href} className="link" style={{ fontSize: "0.9rem" }}>
                {item.label}
              </Link>
            ))}
            <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: "0.7rem 1.35rem", fontSize: "0.78rem" }}>
              Book a call
            </a>
          </nav>

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
          background: "var(--void)",
          paddingTop: 100,
        }}
      >
        <nav aria-label="Mobile" className="shell" style={{ display: "grid", gap: "0.25rem" }}>
          {NAV.map((item, i) => (
            <Link
              prefetch={false}
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="display display-md"
              style={{
                textDecoration: "none",
                color: "var(--cream)",
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
          <a
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ marginTop: "1.75rem" }}
          >
            Book a call
          </a>
        </nav>
      </div>

      <style>{`
        .nav-desktop { display: none; align-items: center; gap: 2rem; }
        .nav-toggle {
          display: grid; gap: 4px; width: 44px; height: 44px; place-content: center;
          background: none; border: 0; cursor: pointer; padding: 0;
        }
        .nav-toggle span {
          display: block; width: 24px; height: 1.5px; background: var(--cream);
          transition: transform .35s var(--ease), opacity .2s var(--ease);
        }
        @media (min-width: 900px) {
          .nav-desktop { display: flex; }
          .nav-toggle { display: none; }
        }
      `}</style>
    </>
  );
}
