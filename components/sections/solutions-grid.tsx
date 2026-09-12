import Link from "next/link";
import {
  Clapperboard, Sparkles, Megaphone, Share2, Search, MapPin, Palette, PenTool,
  Code2, Users, ShoppingBag, Mail, BarChart3, type LucideIcon,
} from "lucide-react";
import { SERVICES, CAPABILITIES } from "@/content/services";
import Reveal from "@/components/motion/reveal";

// One animated icon per tile, the way the reference site runs a small animated
// pictogram on each service card. Lucide (ISC licence) — no image files.
const ICONS: Record<string, LucideIcon> = {
  "short-form-video": Clapperboard,
  "ai-creative": Sparkles,
  "paid-ads": Megaphone,
  "social-media-management": Share2,
  "search-engine-optimisation": Search,
  "local-seo": MapPin,
  "branding-and-identity": Palette,
  "graphic-design": PenTool,
  "software-and-web-development": Code2,
  "lead-generation": Users,
  "ecommerce": ShoppingBag,
  "email-and-retention": Mail,
  "analytics-and-tracking": BarChart3,
};

type Tile = { slug: string; title: string; short: string; image: string; href: string; core: boolean };

// The four core lines first, then the nine supporting capabilities: thirteen tiles,
// each with its own photograph. Core lines link to their pages; capabilities anchor
// into the services index.
const TILES: Tile[] = [
  ...SERVICES.map((s) => ({ slug: s.slug, title: s.title, short: s.short, image: s.image, href: `/services/${s.slug}/`, core: true })),
  ...CAPABILITIES.map((c) => ({ slug: c.slug, title: c.title, short: c.body, image: c.image, href: `/services/#${c.slug}`, core: false })),
];

function Tile({ tile, i }: { tile: Tile; i: number }) {
  const Icon = ICONS[tile.slug];
  return (
    <Reveal delay={(i % 4) * 80}>
      <Link
        prefetch={false}
        href={tile.href}
        id={tile.core ? undefined : tile.slug}
        className={`tile ${i % 2 === 1 ? "tile-dark" : ""}`}
      >
        <span className="tile-media">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
          <img src={tile.image} alt="" loading="lazy" decoding="async" width={1024} height={1024} />
        </span>
        <span className="tile-body">
          <span className="tile-icon" aria-hidden="true">
            <Icon size={26} strokeWidth={1.7} />
          </span>
          {tile.core && <span className="eyebrow" style={{ fontSize: ".62rem" }}>Core line</span>}
          <span className="tile-title">{tile.title}</span>
          <span className="body-dim" style={{ fontSize: ".86rem", lineHeight: 1.5 }}>
            {tile.short}
          </span>
          <span className="tile-more">Read more</span>
        </span>
      </Link>
    </Reveal>
  );
}

type Props = { heading?: string };

export default function SolutionsGrid({ heading = "Everything a fitness brand needs to grow" }: Props) {
  return (
    <section id="services" className="section" aria-labelledby="solutions-heading">
      <div className="shell">
        <div className="center">
            <Reveal>
              <p className="eyebrow eyebrow-chev">Our solutions</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="solutions-heading" className="display display-lg" style={{ margin: "1rem auto 0", maxWidth: "22ch" }}>
                {heading}
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="lede" style={{ marginTop: "1.25rem", fontSize: "1.05rem" }}>
                Four core lines carry the work. The rest exists to keep those four from leaking —
                a fast site, correct tracking, a brand that looks the same on every asset.
              </p>
            </Reveal>
          </div>

        <div className="sol-grid sol-grid-core">
          {TILES.filter((t) => t.core).map((tile, i) => (
            <Tile key={tile.slug} tile={tile} i={i} />
          ))}
        </div>
        <div className="sol-grid sol-grid-caps">
          {TILES.filter((t) => !t.core).map((tile, i) => (
            <Tile key={tile.slug} tile={tile} i={i + 1} />
          ))}
        </div>

        <Reveal delay={120}>
          <p className="eyebrow eyebrow-dim center" style={{ marginTop: "2rem", display: "block" }}>
            Tile images are generated reference frames, produced in-house — not client work.
          </p>
        </Reveal>
      </div>

      <style>{`
        .sol-grid {
          margin-top: clamp(2.5rem, 5vw, 3.5rem);
          display: grid;
          gap: clamp(.9rem, 2vw, 1.4rem);
          grid-template-columns: 1fr;
        }
        .sol-grid > * { height: 100%; min-width: 0; }
        .sol-grid-caps { margin-top: clamp(.9rem, 2vw, 1.4rem); }
        @media (min-width: 480px) { .sol-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 900px) {
          .sol-grid-core { grid-template-columns: repeat(4, 1fr); }
          .sol-grid-caps { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </section>
  );
}
