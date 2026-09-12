// Single source of truth for brand, domain and contact details.
// Every absolute URL in metadata derives from SITE.domain — never hardcode the domain.
export const SITE = {
  name: "Rocky's Vision AI",
  shortName: "Vision AI",
  parent: "Rocky Solutions LLC",
  parentUrl: "https://portfolio.hirerockysolutions.com",
  domain: "https://hirerockysolutions.com",
  tagline: "Content, marketing and AI systems for fitness brands",

  // The one-line pitch. Reused as the meta description and the hero body.
  pitch:
    "We build the content engine behind supplement brands, gyms and fitness apparel labels — short-form video, AI-generated creative, paid ads and the social presence that ties them together, engineered by people who also ship the software underneath it.",

  // Contact. Booking is the primary CTA; WhatsApp is the low-friction fallback.
  // These are Rocky Solutions' live channels — verified, not placeholders.
  // TODO(owner): create a Vision AI specific Cal.com event and swap bookingUrl to it.
  bookingUrl: "https://cal.com/rakesh-gogineni-udonap/ai-systems-free-audit",
  whatsapp: "+91 90638 55903",
  phoneUs: "+1 201 347 7569",
  email: "rakesh@rockysolutionsllc.com",
  linkedin: "https://www.linkedin.com/in/goginenirakeshbabu/",

  // Dual market. Copy stays currency-neutral; pricing is deliberately not published.
  markets: ["India", "United States", "United Kingdom", "UAE"],
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

export const NAV = [
  { label: "Services", href: "/services/" },
  { label: "Process", href: "/#process" },
  { label: "Founders", href: "/#founders" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
] as const;
