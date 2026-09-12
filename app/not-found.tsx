import Link from "next/link";
import { SERVICES } from "@/content/services";

export default function NotFound() {
  return (
    <section className="section" style={{ minHeight: "72svh", display: "grid", alignItems: "center", paddingTop: "clamp(8rem, 16vw, 11rem)" }}>
      <div className="shell">
        <p className="eyebrow">404</p>
        <h1 className="display display-lg" style={{ margin: "1rem 0 0", maxWidth: "16ch" }}>
          That page isn&rsquo;t <span style={{ color: "var(--ox-300)" }}>here</span>
        </h1>
        <p className="lede" style={{ marginTop: "1.5rem" }}>
          The link is wrong or the page has moved. The four things we actually do are below.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: ".7rem", marginTop: "2.25rem" }}>
          <Link prefetch={false} href="/" className="btn btn-primary">Back to home</Link>
          {SERVICES.map((service) => (
            <Link prefetch={false} key={service.slug} href={`/services/${service.slug}/`} className="btn btn-ghost">
              {service.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
