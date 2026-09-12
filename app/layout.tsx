import type { Metadata } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import { SITE } from "@/content/site";
import { FOUNDERS } from "@/content/founders";
import { SERVICES, CAPABILITIES } from "@/content/services";
import LenisProvider from "@/components/motion/lenis-provider";
import Nav from "@/components/ui/nav";
import Footer from "@/components/ui/footer";
import WhatsAppFab from "@/components/ui/whatsapp-fab";
import "./globals.css";

// Archivo carries the athletic display weight without tipping into gym-poster cliché.
const display = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.pitch,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.domain,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.pitch,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.pitch,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.domain}/#org`,
      name: SITE.name,
      url: SITE.domain,
      description: SITE.pitch,
      parentOrganization: { "@type": "Organization", name: SITE.parent, url: SITE.parentUrl },
      founder: FOUNDERS.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.role })),
      areaServed: SITE.markets.map((m) => ({ "@type": "Country", name: m })),
      email: `mailto:${SITE.email}`,
      sameAs: [SITE.linkedin, SITE.parentUrl],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE.domain}/#service`,
      name: SITE.name,
      url: SITE.domain,
      parentOrganization: { "@id": `${SITE.domain}/#org` },
      description: SITE.pitch,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Content and marketing services for fitness brands",
        itemListElement: [
          ...SERVICES.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.summary, url: `${SITE.domain}/services/${s.slug}/` },
          })),
          ...CAPABILITIES.map((c) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: c.title, description: c.body },
          })),
        ],
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LenisProvider />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
