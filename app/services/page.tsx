import type { Metadata } from "next";
import ServicesList from "@/components/sections/services-list";
import Capabilities from "@/components/sections/capabilities";
import Process from "@/components/sections/process";
import Cta from "@/components/sections/cta";
import Reveal from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Short-form video, AI creative, paid ads and social media management for supplement brands, gyms and fitness apparel labels — plus SEO, branding, software and ecommerce around them.",
  alternates: { canonical: "/services/" },
};

export default function ServicesIndex() {
  return (
    <>
      <header className="section" style={{ paddingTop: "clamp(8rem, 16vw, 12rem)", paddingBottom: 0 }}>
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Services</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display display-xl" style={{ margin: "1.25rem 0 0", fontSize: "clamp(2.5rem, 8vw, 6.5rem)" }}>
              What we <span style={{ color: "var(--ox-300)" }}>run</span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="lede" style={{ marginTop: "1.75rem" }}>
              Four core lines carry the work. Everything else exists to keep those four from
              leaking — a fast site, correct tracking, a brand that looks the same on every asset.
            </p>
          </Reveal>
        </div>
      </header>

      <ServicesList />
      <Capabilities />
      <Process />
      <Cta />
    </>
  );
}
