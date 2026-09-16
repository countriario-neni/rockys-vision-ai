import { describe, it, expect } from "vitest";
import { SITE, NAV, EXPERTISE, LIFECYCLE } from "@/content/site";
import { SERVICES, CAPABILITIES, PROCESS, FAQS } from "@/content/services";
import { FOUNDERS } from "@/content/founders";
import { whatsappHref } from "@/lib/contact";
import { existsSync } from "node:fs";
import { join } from "node:path";

/*
  These guard the two rules that matter most for this site: it must deploy to the right
  host, and it must never publish proof it does not have. Both are easy to break by
  accident later — a copied placeholder domain, or a "trusted by" list added in a hurry.
*/

describe("domain and deploy target", () => {
  it("points at the apex the CNAME claims, not the portfolio subdomain", () => {
    expect(SITE.domain).toBe("https://hirerockysolutions.com");
    expect(SITE.domain).not.toContain("portfolio.");
  });

  it("never uses the retired rockysolutionsllc.com placeholder as the site domain", () => {
    expect(SITE.domain).not.toContain("rockysolutionsllc.com");
  });

  it("keeps the parent link pointing at the portfolio", () => {
    expect(SITE.parentUrl).toBe("https://portfolio.hirerockysolutions.com");
  });
});

describe("US entity details", () => {
  it("fills every published entity field", () => {
    for (const [field, value] of Object.entries(SITE.entity)) {
      expect(value, `SITE.entity.${field}`).not.toBe("FILL_ME");
      expect(value.trim().length, `SITE.entity.${field}`).toBeGreaterThan(0);
    }
  });

  it("matches the Missouri Articles of Organization", () => {
    expect(SITE.entity.legalName).toBe("Rocky Solutions LLC");
    expect(SITE.entity.state).toBe("Missouri");
    expect(SITE.entity.stateCode).toBe("MO");
    expect(SITE.entity.country).toBe("US");
  });

  it("publishes no street address, because the one on file is a residence", () => {
    // Locality is deliberate: see the comment on SITE.entity. Adding a street here
    // would put the owner's home address in the footer of every page and into the
    // structured data search engines cache.
    expect(SITE.entity).not.toHaveProperty("street");
    const published = JSON.stringify(SITE.entity);
    expect(published).not.toMatch(/\d+\s+\w+.*\b(dr|drive|st|street|ave|avenue|rd|road|ln|lane|way|ct|court|blvd)\b/i);
  });
});

describe("no fabricated proof", () => {
  const allCopy = JSON.stringify({ SITE, SERVICES, CAPABILITIES, FAQS, FOUNDERS, EXPERTISE, LIFECYCLE });

  it("has no data structure that could hold a testimonial or client logo", () => {
    // Checked as shape, not as wording: the FAQ legitimately uses the word
    // "testimonial" in the promise never to fake one. What must not exist is a field
    // holding a quote, an attributed name, or a logo path.
    const keys = new Set<string>();
    const walk = (value: unknown) => {
      if (Array.isArray(value)) return value.forEach(walk);
      if (value && typeof value === "object") {
        for (const [k, v] of Object.entries(value)) {
          keys.add(k.toLowerCase());
          walk(v);
        }
      }
    };
    walk({ SITE, SERVICES, CAPABILITIES, FAQS, FOUNDERS, EXPERTISE, LIFECYCLE });

    for (const banned of ["testimonial", "testimonials", "quote", "clients", "logos", "review", "reviews"]) {
      expect(keys).not.toContain(banned);
    }
  });

  it("makes no borrowed-credibility claims in the copy", () => {
    expect(allCopy).not.toMatch(/trusted by/i);
    expect(allCopy).not.toMatch(/\bas seen (in|on)\b/i);
    expect(allCopy).not.toMatch(/\bour clients include\b/i);
  });

  it("publishes no pricing, because pricing is deliberately quoted per scope", () => {
    expect(allCopy).not.toMatch(/[₹$]\s?\d/);
    expect(allCopy).not.toMatch(/\bper month\b.*\b\d{3,}\b/i);
  });

  it("makes no numeric performance claims", () => {
    // e.g. "3x ROAS", "10,000 leads", "+250% growth" — none of which we can evidence yet.
    expect(allCopy).not.toMatch(/\b\d+(\.\d+)?\s?x\b\s*(roas|return|growth)/i);
    expect(allCopy).not.toMatch(/\+\s?\d{2,}\s?%/);
  });
});

describe("service model", () => {
  it("has five core lines with unique slugs", () => {
    expect(SERVICES).toHaveLength(5);
    expect(new Set(SERVICES.map((s) => s.slug)).size).toBe(5);
  });

  it("gives every service the content its page renders", () => {
    for (const service of SERVICES) {
      expect(service.slug).toMatch(/^[a-z0-9-]+$/);
      expect(service.intro.length).toBeGreaterThan(80);
      expect(service.deliverables.length).toBeGreaterThanOrEqual(4);
      expect(service.process).toHaveLength(4);
      expect(service.fitFor.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("gives every solution tile a photo that exists on disk", () => {
    // Fourteen tiles, fourteen generated frames. A missing file ships as a broken image.
    const tiles = [...SERVICES, ...CAPABILITIES];
    expect(tiles).toHaveLength(14);
    expect(new Set(tiles.map((t) => t.slug)).size).toBe(14);
    for (const tile of tiles) {
      expect(tile.image).toBe(`/solutions/${tile.slug}.jpg`);
      expect(existsSync(join(process.cwd(), "public", tile.image))).toBe(true);
    }
  });

  it("keeps the process and FAQ blocks populated", () => {
    expect(PROCESS).toHaveLength(4);
    expect(FAQS.length).toBeGreaterThanOrEqual(5);
    expect(CAPABILITIES.length).toBeGreaterThanOrEqual(8);
  });
});

describe("founders", () => {
  it("lists both founders with a portrait and a role", () => {
    expect(FOUNDERS).toHaveLength(2);
    const names = FOUNDERS.map((f) => f.name);
    expect(names).toContain("Rakesh Babu Gogineni");
    expect(names).toContain("Hashwanth Kota");

    for (const founder of FOUNDERS) {
      expect(founder.image).toMatch(/^\/founders\/.+\.(jpg|png|webp)$/);
      expect(founder.imageAlt).toContain(founder.name);
      expect(founder.role).toContain("Co-founder");
      expect(founder.focus.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("covers the expertise the studio claims", () => {
    const focus = FOUNDERS.flatMap((f) => f.focus).join(" ").toLowerCase();
    expect(focus).toContain("technical leadership");
    expect(focus).toContain("growth marketing");
    expect(focus).toMatch(/ai systems|software architecture/);
  });
});

describe("contact channels", () => {
  it("builds a WhatsApp link with a bare international number", () => {
    const href = whatsappHref();
    expect(href).toMatch(/^https:\/\/wa\.me\/\d{10,15}\?text=/);
    expect(href).not.toContain("+");
    expect(href).not.toContain(" ");
  });

  it("encodes a custom message", () => {
    expect(whatsappHref("hello there")).toContain("hello%20there");
  });

  it("has a reachable booking URL and email", () => {
    expect(SITE.bookingUrl).toMatch(/^https:\/\/cal\.com\//);
    expect(SITE.email).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]+$/);
  });
});

describe("navigation", () => {
  it("uses trailing-slash paths so the static export resolves without a redirect", () => {
    for (const item of NAV) {
      if (item.href.startsWith("/#")) continue;
      expect(item.href.endsWith("/")).toBe(true);
    }
  });
});
