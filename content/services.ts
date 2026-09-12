export type Service = {
  slug: string;
  number: string;
  title: string;
  short: string;
  summary: string;
  intro: string;
  deliverables: { title: string; body: string }[];
  process: { step: string; title: string; body: string }[];
  fitFor: string[];
};

// The four core service lines. Each gets its own page and is a primary SEO entry point.
export const SERVICES: Service[] = [
  {
    slug: "short-form-video",
    number: "01",
    title: "Short-Form Video",
    short: "Reels, Shorts and TikToks built to stop the scroll",
    summary:
      "The format that moves supplement and apparel brands. Hook-first edits, shot or sourced, cut to a posting cadence you can actually sustain.",
    intro:
      "Fitness is the most video-saturated category on the internet. A tub of protein does not sell itself in a static grid post — it sells in three seconds of movement, tension and a claim someone believes. We produce short-form at the volume the algorithm rewards, without the quality collapse that usually comes with volume.",
    deliverables: [
      {
        title: "Hook-first editing",
        body: "Every cut is built backwards from the first three seconds. We write and test multiple openings against the same body so the winner is found, not guessed.",
      },
      {
        title: "Shoot direction",
        body: "Shot lists, athlete direction and lighting notes your team can execute in a gym, or a full remote-directed shoot day where we run the session over call.",
      },
      {
        title: "Captions and on-screen type",
        body: "Burned-in captions styled to your brand, sized for sound-off viewing, timed to the beat rather than to the transcript.",
      },
      {
        title: "Format variants",
        body: "One shoot cut for Reels, Shorts, TikTok and paid placements, each reframed properly rather than letterboxed.",
      },
      {
        title: "Posting cadence",
        body: "A calendar you can hold — volume matched to what your catalogue and athlete access can actually feed.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Content audit",
        body: "We look at what you have posted, what performed, and what your competitors are doing that you are not.",
      },
      {
        step: "02",
        title: "Hook bank",
        body: "A running library of openings, claims and formats specific to your product category.",
      },
      {
        step: "03",
        title: "Production",
        body: "Shot, sourced or AI-generated, depending on what the concept needs and what your budget supports.",
      },
      {
        step: "04",
        title: "Cut and ship",
        body: "Edited, captioned, reframed and delivered on cadence, with the winners fed back into the hook bank.",
      },
    ],
    fitFor: [
      "Supplement brands",
      "Gym and studio chains",
      "Fitness apparel labels",
      "Coaches scaling past word of mouth",
    ],
  },
  {
    slug: "ai-creative",
    number: "02",
    title: "AI Creative",
    short: "Generated visuals, avatars and ad variants at production quality",
    summary:
      "The Vision in Vision AI. Generated product visuals, presenters and endless ad variants — used where it beats a camera, and never where it does not.",
    intro:
      "AI generation is not a gimmick line on a rate card, and it is not a replacement for a real shoot. It is the fastest way we know to test forty creative directions in the time a studio books one. We use it for variant volume, for product visuals that would cost a studio day, and for presenters in markets where you have no athlete on the ground — and we tell you plainly when a camera is the better call.",
    deliverables: [
      {
        title: "Product visualisation",
        body: "Generated environments and hero shots for tubs, bottles, packs and apparel, matched to your existing brand photography.",
      },
      {
        title: "AI presenters and avatars",
        body: "Consistent on-screen presenters for markets or languages where you have no talent, with disclosure handled honestly.",
      },
      {
        title: "Voiceover and localisation",
        body: "Synthetic voice for scale, human voice where it matters, and the same script running across multiple languages.",
      },
      {
        title: "Ad variant generation",
        body: "Dozens of creative variants from a single concept, built specifically to feed the testing volume paid social demands.",
      },
      {
        title: "Pipeline build",
        body: "Where it pays off, we build you the generation pipeline itself so your team can run it without us.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Concept",
        body: "We agree the idea and decide, per asset, whether generation or a camera serves it better.",
      },
      {
        step: "02",
        title: "Style lock",
        body: "Reference boards and seeds locked so generated output sits inside your brand, not beside it.",
      },
      {
        step: "03",
        title: "Generation",
        body: "Batch production with human selection at every gate — nothing ships because a model produced it.",
      },
      {
        step: "04",
        title: "Finish",
        body: "Colour, retouch, motion and audio applied by hand so the output reads as brand work, not as output.",
      },
    ],
    fitFor: [
      "Brands testing at paid-social volume",
      "Catalogues too large to shoot",
      "Multi-market launches",
      "Teams without local talent access",
    ],
  },
  {
    slug: "paid-ads",
    number: "03",
    title: "Paid Ads & Performance",
    short: "Meta and Google campaigns judged on what they return",
    summary:
      "Creative, campaign structure and the reporting that ties spend to revenue. Built for brands who want the number, not the dashboard screenshot.",
    intro:
      "Most fitness ad accounts fail on creative volume, not on targeting. Platforms have taken most of the targeting decisions away — what is left is how many genuinely different creative angles you can put into the machine, and how honestly you read the result. We run both halves: the creative and the account.",
    deliverables: [
      {
        title: "Creative production for paid",
        body: "Ads built as ads — not organic posts boosted, which is where most fitness budgets quietly disappear.",
      },
      {
        title: "Campaign structure",
        body: "Account architecture on Meta and Google that lets you read a result instead of guessing at one.",
      },
      {
        title: "Testing programme",
        body: "A standing cadence of angle, hook and offer tests, with a documented rule for when a variant is killed.",
      },
      {
        title: "Landing pages",
        body: "Where the offer needs one, we build the page the ad points at, rather than sending paid traffic to a homepage.",
      },
      {
        title: "Reporting",
        body: "Spend against revenue, in plain language, on a fixed schedule. No vanity metrics in the headline.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Account review",
        body: "What has run, what it cost, what it returned, and where the structure is hiding the answer.",
      },
      {
        step: "02",
        title: "Offer and angle map",
        body: "The set of distinct reasons a customer buys — each becomes a creative line to test.",
      },
      {
        step: "03",
        title: "Launch and test",
        body: "Live campaigns with a defined testing budget kept separate from the proven spend.",
      },
      {
        step: "04",
        title: "Scale or kill",
        body: "Winners get budget and fresh variants; losers get shut off on the rule, not on a feeling.",
      },
    ],
    fitFor: [
      "Ecommerce supplement brands",
      "Gyms running local acquisition",
      "Apparel launches",
      "Anyone whose ROAS stopped making sense",
    ],
  },
  {
    slug: "social-media-management",
    number: "04",
    title: "Social Media Management",
    short: "The whole presence, run end to end",
    summary:
      "Strategy, calendar, publishing, community and athlete coordination — the unglamorous operating layer that makes everything else compound.",
    intro:
      "Content without an operating layer is a pile of files. Social management is the part that turns individual assets into a presence: a calendar that holds, replies that go out the same day, athlete and influencer relationships that get coordinated rather than chased, and a monthly read of what actually moved.",
    deliverables: [
      {
        title: "Channel strategy",
        body: "What each platform is for, who it talks to, and what a win looks like on it — decided once, then executed against.",
      },
      {
        title: "Content calendar",
        body: "Planned in advance, approved in one place, published on schedule across Instagram, TikTok, YouTube, Facebook and LinkedIn.",
      },
      {
        title: "Community management",
        body: "Comments and DMs answered in your voice, within a response window we agree, including the ones that are complaints.",
      },
      {
        title: "Athlete and influencer coordination",
        body: "Briefs out, assets in, usage rights tracked, and the relationship kept warm between campaigns.",
      },
      {
        title: "Monthly reporting",
        body: "What grew, what stalled, what we are changing next month — one page, no dashboard tour.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Presence audit",
        body: "Every channel reviewed for voice, cadence, performance and the gaps a competitor is filling.",
      },
      {
        step: "02",
        title: "Operating plan",
        body: "Cadence, formats, approval flow and response windows written down and agreed.",
      },
      {
        step: "03",
        title: "Run it",
        body: "Daily publishing and community work, with a weekly check-in that is short by design.",
      },
      {
        step: "04",
        title: "Review and adjust",
        body: "A monthly read that changes the next month's plan — otherwise the report was decoration.",
      },
    ],
    fitFor: [
      "Brands with no in-house social team",
      "Teams drowning in community management",
      "Multi-location gym groups",
      "Labels running athlete rosters",
    ],
  },
];

// Supporting capabilities. Listed and sold, but without dedicated pages — they wrap
// around the four core lines rather than standing alone.
export const CAPABILITIES = [
  {
    title: "Search Engine Optimisation",
    body: "Technical and content SEO for supplement and fitness ecommerce, built around the queries that carry buying intent.",
  },
  {
    title: "Local SEO",
    body: "Google Business Profile, maps ranking and citations for gyms and studios competing inside a five-kilometre radius.",
  },
  {
    title: "Branding & Identity",
    body: "Positioning, naming, logo systems and the guidelines that stop a brand drifting across fifty pieces of content.",
  },
  {
    title: "Graphic Design",
    body: "Packaging, labels, banners, thumbnails, ad statics and the everyday design a content engine consumes.",
  },
  {
    title: "Software & Web Development",
    body: "Production software, internal tools and fast static-first marketing sites, built and led by an engineer rather than assembled from a template.",
  },
  {
    title: "Lead Generation",
    body: "Outbound engines and inbound capture that put more qualified fitness buyers in front of your offer, then follow up until they book.",
  },
  {
    title: "Ecommerce",
    body: "Shopify and headless storefronts for supplement and apparel catalogues, wired to your ad and analytics stack.",
  },
  {
    title: "Email & Retention",
    body: "Flows and campaigns that make a second purchase happen — the cheapest revenue a supplement brand has.",
  },
  {
    title: "Analytics & Tracking",
    body: "Pixels, server-side events and attribution set up properly, so the numbers your ads report survive scrutiny.",
  },
] as const;

export const PROCESS = [
  {
    step: "01",
    title: "Discovery call",
    body: "Thirty minutes. Your category, your catalogue, what you have tried, and what a win would actually look like for you.",
  },
  {
    step: "02",
    title: "Audit and plan",
    body: "We review your content, ads and channels, then come back with a written plan and a scope. No obligation attached to it.",
  },
  {
    step: "03",
    title: "Build the engine",
    body: "Creative direction locked, pipelines set up, calendar and campaigns live. The heavy month.",
  },
  {
    step: "04",
    title: "Run and compound",
    body: "Monthly cadence of production, testing and reporting — where the work starts paying back.",
  },
] as const;

export const FAQS = [
  {
    q: "You are new — why should we hand you our brand?",
    a: "Because we are not asking you to. Start with a single service line for one month and judge the work, not the pitch. We would rather earn the rest of the account than talk you into it. This site is the first thing we built; it is a fair sample of the standard we hold.",
  },
  {
    q: "Do you publish your pricing?",
    a: "No. Scope varies too much between a single-location gym and a supplement brand running a seven-figure ad budget for a rate card to mean anything. Book a call and you get a written scope and price within a few days.",
  },
  {
    q: "Do you work with brands outside India?",
    a: "Yes. We work with brands in India, the US, the UK and the UAE. Calls are scheduled in your timezone and reporting follows your currency.",
  },
  {
    q: "Who actually does the work?",
    a: "The two of us, plus a production bench we bring in for shoot days and volume. You will not be handed to an account manager you have never met.",
  },
  {
    q: "Can you work with our existing team or agency?",
    a: "Yes. Plenty of brands want the creative engine handled while an in-house team keeps ownership of strategy, or want us running paid while someone else runs organic. We will scope to fit around what already works.",
  },
  {
    q: "Do you disclose when creative is AI-generated?",
    a: "Yes, wherever a viewer could reasonably be misled — generated presenters and synthetic voice especially. We will not fake a testimonial, an athlete or a result, for you or for us.",
  },
] as const;
