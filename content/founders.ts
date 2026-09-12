export type Founder = {
  name: string;
  short: string;
  role: string;
  image: string;
  imageAlt: string;
  bio: string;
  focus: string[];
  links?: { label: string; href: string }[];
};

/*
  Two founders, shown on the home page. Bios describe role, expertise and
  accountability only — no invented credentials, clients or dates. Rakesh's details
  come from the Rocky Solutions portfolio; Hash's were supplied by the owner.
*/
export const FOUNDERS: Founder[] = [
  {
    name: "Rakesh Babu Gogineni",
    short: "Rakesh",
    role: "Co-founder — AI Systems & Technical Lead",
    image: "/founders/rakesh.jpg",
    imageAlt: "Portrait of Rakesh Babu Gogineni, co-founder of Rocky's Vision AI",
    bio: "Rakesh is an AI automation engineer and the founder of Rocky Solutions LLC. He designs and deploys custom AI systems end to end — architecture through production — and leads the technical side of every build: the generation pipelines, the campaign tooling, and the tracking that shows what your spend actually returned. Custom-coded systems you own, not no-code setups that break at the first edge case.",
    focus: [
      "AI systems engineering",
      "Software architecture",
      "Technical leadership",
      "Automation & tracking",
    ],
    links: [
      { label: "Portfolio", href: "https://portfolio.hirerockysolutions.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/goginenirakeshbabu/" },
    ],
  },
  {
    name: "Hashwanth Kota",
    short: "Hash",
    role: "Co-founder — Growth & Creative",
    image: "/founders/hash.jpg",
    imageAlt: "Portrait of Hashwanth Kota, co-founder of Rocky's Vision AI",
    bio: "Hash runs growth and the creative that drives it — the hooks, the edit, the way a brand sounds in a caption and looks in a three-second cut. He owns the work people actually stop scrolling for, and the prospecting engine behind it: getting your brand in front of more of the right buyers, then turning that attention into booked calls and orders.",
    focus: [
      "Growth marketing",
      "Short-form direction",
      "Brand & art direction",
      "Prospecting & pipeline",
    ],
  },
];
