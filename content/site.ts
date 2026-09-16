// Single source of truth for brand, domain and contact details.
// Every absolute URL in metadata derives from SITE.domain — never hardcode the domain.
export const SITE = {
  name: "Rocky's Vision AI",
  shortName: "Vision AI",
  parent: "Rocky Solutions LLC",
  parentUrl: "https://portfolio.hirerockysolutions.com",
  domain: "https://hirerockysolutions.com",
  tagline: "Content, marketing and AI systems for growing brands",

  // The one-line pitch. Reused as the meta description and the hero body.
  pitch:
    "We build the content engine behind ambitious brands — short-form video, AI-generated creative, paid ads and the social presence that ties them together, engineered by people who also ship the software underneath it.",

  // Contact. Booking is the primary CTA; WhatsApp is the low-friction fallback.
  // These are Rocky Solutions' live channels — verified, not placeholders.
  // TODO(owner): create a Vision AI specific Cal.com event and swap bookingUrl to it.
  bookingUrl: "https://cal.com/rakesh-gogineni-udonap/ai-systems-free-audit",
  whatsapp: "+91 90638 55903",
  phoneUs: "+1 201 347 7569",
  /** Second India line, added 2026-09-16. Voice only — WhatsApp stays on the number above. */
  phoneIn: "+91 63096 10316",
  email: "rakesh@rockysolutionsllc.com",
  linkedin: "https://www.linkedin.com/in/goginenirakeshbabu/",

  // Dual market. Copy stays currency-neutral; pricing is deliberately not published.
  markets: ["India", "United States", "United Kingdom", "UAE"],

  /*
    Registered US entity, per the Missouri Articles of Organization on file. Published
    in the footer, the legal pages and the JSON-LD PostalAddress.

    Deliberately city + state only. The principal office address on the filing is the
    owner's residence, and a street address in the page footer is scraped, indexed and
    cached permanently. Locality is enough to establish the US business for search and
    for the governing-law clause. Do not add `street` without the owner's explicit
    say-so — a test enforces this.
  */
  entity: {
    legalName: "Rocky Solutions LLC",
    city: "Wentzville",
    state: "Missouri",
    /** USPS abbreviation, for the schema.org addressRegion. */
    stateCode: "MO",
    country: "US",
  },
} as const;

// The four things the founders are experts in, stated up front. This is the strip that
// separates Vision AI from a content shop: the same people build the systems.
export const EXPERTISE = [
  {
    title: "Software & technical leadership",
    body: "Production software, architecture and the technical lead role itself — we have shipped and led builds, not just briefed them.",
  },
  {
    title: "AI systems",
    body: "Custom AI agents and generation pipelines that businesses own outright, rather than no-code setups that break on the first real edge case.",
  },
  {
    title: "Growth marketing",
    body: "Creative, channels and campaigns run against revenue, with the tracking set up properly so the numbers survive scrutiny.",
  },
  {
    title: "Increasing prospects",
    body: "Filling the top of the funnel and keeping it full — outbound engines, inbound content and the follow-up that turns attention into booked calls.",
  },
] as const;

/*
  The four stages of a business's life, as the home-page orbit tells it. Each hook is a
  brand statement in our own voice — not a quotation, not attributed to anyone — and
  the body names what we build at that stage. The orbit cycles through them in order.
*/
export const LIFECYCLE = [
  {
    stage: "Launch",
    hook: "Be seen before anyone knows you exist.",
    body: "Brand, site and the first content in market — built in weeks, and owned outright.",
  },
  {
    stage: "Attract",
    hook: "Buyers, not just followers.",
    body: "Short-form video, search and paid campaigns that put you in front of people ready to spend.",
  },
  {
    stage: "Convert",
    hook: "Every enquiry answered. Every lead followed up.",
    body: "AI chat and voice agents that qualify, book and hand off to your team — around the clock.",
  },
  {
    stage: "Scale",
    hook: "Growth that compounds instead of stalls.",
    body: "Pipelines, tracking and automation you own, so the engine runs without adding headcount.",
  },
] as const;

export const NAV = [
  { label: "Services", href: "/services/" },
  { label: "Process", href: "/#process" },
  { label: "Founders", href: "/#founders" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
] as const;
