import type { Metadata } from "next";
import { SITE } from "@/content/site";
import LegalPage, { type LegalSection } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} handles personal information. This site sets no cookies, runs no analytics and stores nothing you type into it.`,
  alternates: { canonical: "/privacy/" },
};

/*
  Written to describe what this site actually does, which is very little: it is a
  static export with no backend, no analytics and no cookies. If a form, analytics
  script or CRM embed is ever added, the matching section here must change with it.
*/
const SECTIONS: LegalSection[] = [
  {
    heading: "What this site collects",
    paragraphs: [
      "Nothing. This website is a static export served as plain files. It sets no cookies, runs no analytics or advertising scripts, embeds no tracking pixels, and has no database or backend that could store what you type.",
      "The contact form does not submit anything to us over the web. Pressing send opens your own email client with the details you entered already filled in — you remain in control, and nothing leaves your device unless you choose to send that email.",
    ],
  },
  {
    heading: "Information you choose to send us",
    paragraphs: [
      "When you email us, message us on WhatsApp, or book a call, you share whatever you put in that message: typically your name, your contact details and a description of your business.",
      "We use it only to reply to you, to prepare a written scope, and to carry out work you engage us for. We do not sell it, rent it, or share it for anyone else's marketing.",
    ],
  },
  {
    heading: "Third-party services",
    paragraphs: [
      "Some links take you to services we do not operate, each with its own privacy policy and its own data handling:",
    ],
    bullets: [
      "Cal.com — used for booking discovery calls. Anything you enter into the booking form is handled by Cal.com.",
      "WhatsApp (Meta) — used as a messaging channel. Messages are handled under Meta's terms.",
      "LinkedIn — linked from the footer, for professional contact.",
      "GitHub Pages — hosts this site. Like any web host, it processes request logs, which may include IP addresses, to serve the pages and protect the service.",
    ],
  },
  {
    heading: "How long we keep things",
    paragraphs: [
      "Correspondence is kept while a conversation or engagement is active, and for as long afterwards as we need it for our own business records and tax obligations. You can ask us to delete your correspondence at any time and we will, except where we are required to retain it.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "Depending on where you live, you may have the right to ask what personal information we hold about you, to have it corrected, to have it deleted, to receive a copy of it, and to object to how we use it. Residents of California, the EU and the UK have these rights under the CCPA/CPRA, the GDPR and the UK GDPR respectively.",
      "We do not sell or share personal information as those terms are defined under California law, and we have no targeted-advertising program to opt out of. To exercise any right, email us at the address below; we will respond within the period the applicable law requires.",
    ],
  },
  {
    heading: "Children",
    paragraphs: [
      "This is a business-to-business service. It is not directed at children, and we do not knowingly collect personal information from anyone under 16.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "If what the site does changes — an analytics tool, a real form backend, a chat widget — this page changes with it, and the date at the top is updated. We do not make quiet changes.",
    ],
  },
];

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="September 16, 2026"
      intro="The short version: this site collects nothing about you. The longer version, including what happens when you email or message us, is below."
      sections={SECTIONS}
    />
  );
}
