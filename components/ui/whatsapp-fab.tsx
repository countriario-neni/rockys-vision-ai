"use client";

import { useEffect, useState } from "react";
import { whatsappHref } from "@/lib/contact";

// Low-friction fallback CTA. Held back until the visitor has scrolled past the hero,
// so it never competes with the primary booking button above the fold.
export default function WhatsAppFab() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Rocky's Vision AI on WhatsApp"
      style={{
        position: "fixed",
        right: "clamp(1rem, 3vw, 2rem)",
        bottom: "clamp(1rem, 3vw, 2rem)",
        zIndex: 60,
        width: 54,
        height: 54,
        borderRadius: 999,
        display: "grid",
        placeItems: "center",
        background: "var(--ox-500)",
        color: "var(--ink)",
        border: "1px solid var(--ox-400)",
        boxShadow: "0 10px 30px rgb(2 0 13 / 0.6)",
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(14px) scale(0.9)",
        pointerEvents: shown ? "auto" : "none",
        transition: "opacity .5s var(--ease), transform .5s var(--ease), background .3s var(--ease)",
      }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.42 1.32-1.95 1.36-.5.05-.98.24-3.3-.69-2.78-1.1-4.55-3.94-4.69-4.12-.14-.19-1.12-1.49-1.12-2.84s.71-2.02.96-2.29c.25-.28.55-.35.73-.35.18 0 .37 0 .53.01.17.01.4-.06.62.48.24.57.8 1.97.87 2.11.07.14.12.31.02.5-.09.19-.14.31-.28.47-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.28.72 1.19 1.55 1.93 1.07.95 1.97 1.25 2.25 1.39.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.25.09 1.6.75 1.87.89.28.14.46.21.53.33.07.11.07.65-.17 1.33Z" />
      </svg>
    </a>
  );
}
