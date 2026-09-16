import type { Metadata } from "next";
import { SITE } from "@/content/site";
import LegalPage, { type LegalSection } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms covering use of the ${SITE.name} website. Client engagements are governed by a signed scope of work, not by this page.`,
  alternates: { canonical: "/terms/" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "What these terms cover",
    paragraphs: [
      `These terms govern your use of this website. The site is operated by ${SITE.entity.legalName}, a limited liability company registered in the State of ${SITE.entity.state}, United States.`,
      "They do not govern client work: every engagement with us runs under a separate written scope of work signed by both sides, and where that document and this page disagree, that document wins.",
    ],
  },
  {
    heading: "No offer, no guarantee",
    paragraphs: [
      "Everything on this site is descriptive of services we offer. It is not an offer capable of acceptance, and nothing here forms a contract until we have both signed a scope of work.",
      "We publish no performance claims, no client results and no testimonials, precisely so that nothing on this site can be read as a promise about what your campaigns will return. Marketing outcomes depend on your product, your market and your budget, and we do not guarantee any particular result.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      `The design, copy, code and imagery of this site belong to ${SITE.entity.legalName} unless stated otherwise. You may read, link to and quote it with attribution; you may not copy the site wholesale or present our writing as your own.`,
      "Imagery in the solution tiles and page backgrounds is generated in-house with an open-weights model and is labeled on the page as reference material. It is not client work, not a case study, and does not depict real customers.",
    ],
  },
  {
    heading: "Ownership of client work",
    paragraphs: [
      "For client engagements, ownership of deliverables is set out in the scope of work. Our default is that you own the finished creative and the systems we build for you on full payment, and we retain ownership of our own pre-existing tooling and methods.",
    ],
  },
  {
    heading: "AI-generated material",
    paragraphs: [
      "We use generative models in parts of our production process. Where a viewer could reasonably be misled — a generated presenter or a synthetic voice, in particular — we disclose it, on our own material and on yours. We do not fabricate testimonials, endorsements or results.",
    ],
  },
  {
    heading: "Third-party links",
    paragraphs: [
      "This site links to services we do not control, including Cal.com, WhatsApp and LinkedIn. We are not responsible for their content, availability or practices, and your use of them is governed by their terms.",
    ],
  },
  {
    heading: "Availability and disclaimer",
    paragraphs: [
      "This site is provided as-is. We aim to keep it accurate and available, but we do not warrant that it will be uninterrupted or error-free, and to the fullest extent permitted by law we exclude implied warranties.",
      "To the fullest extent permitted by law, our liability arising out of your use of this website is limited to the amount you have paid us for it, which for a visitor is nothing. This limitation does not apply to liability that cannot lawfully be excluded, and it does not affect liability under a signed scope of work, which that document governs.",
    ],
  },
  {
    heading: "Governing law",
    paragraphs: [
      `These terms are governed by the laws of the State of ${SITE.entity.state}, United States, without regard to its conflict-of-law rules. The courts of that state have exclusive jurisdiction over disputes arising from use of this website.`,
    ],
  },
  {
    heading: "Changes to these terms",
    paragraphs: [
      "We may update these terms. The date at the top always reflects the current version, and continuing to use the site after a change means you accept it.",
    ],
  },
];

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="September 16, 2026"
      intro="These cover the website itself. Client work is governed by a signed scope of work, which takes precedence over anything on this page."
      sections={SECTIONS}
    />
  );
}
