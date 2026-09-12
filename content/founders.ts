export type Founder = {
  name: string;
  short: string;
  role: string;
  /** Short role label under the hero avatar, where the full title would wrap. */
  heroRole?: string;
  image: string;
  /** Transparent, bottom-faded bust used for the rising-avatar treatment. */
  cutout: string;
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
    heroRole: "AI Systems & Technical Lead",
    image: "/founders/rakesh.jpg",
    cutout: "/founders/rakesh-cutout.png",
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
    role: "Co-founder — Head of HR, Senior Software Developer & Growth",
    heroRole: "HR · Software · Growth · Clients",
    image: "/founders/hash.jpg",
    cutout: "/founders/hash-cutout.png",
    imageAlt: "Portrait of Hashwanth Kota, co-founder of Rocky's Vision AI",
    bio: "Hash is a senior software developer who also runs the people side of the studio — as Head of Human Resources he builds and looks after the production bench we bring in for shoot days and volume. He leads growth marketing and owns every client relationship end to end: from the first call through scoping, delivery and the monthly review, you deal with Hash directly, and he is accountable for the work landing.",
    focus: [
      "Head of Human Resources",
      "Senior software development",
      "Growth marketing",
      "Client relationship management",
    ],
  },
];
