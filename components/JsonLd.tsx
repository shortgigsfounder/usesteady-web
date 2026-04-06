/**
 * JsonLd — injects structured data (schema.org) into <head>.
 *
 * Three schemas:
 *   1. SoftwareApplication — tells Google what the product is
 *   2. Organization        — brand entity for Knowledge Panel
 *   3. WebSite             — enables Sitelinks Searchbox if ever needed
 */

const BASE = "https://usesteady.dev";

const schemas = [
  // ── 1. Software product ───────────────────────────────────────────────────
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "UseSteady",
    url: BASE,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Windows, Linux",
    description:
      "UseSteady turns plain language into controlled, verifiable system execution. Every action is reviewed, approved, and verified before it runs. Nothing executes silently.",
    featureList: [
      "Plain-language intent capture",
      "Governed request generation",
      "Compile-time policy enforcement",
      "Human approval gate for mutations",
      "Deterministic runtime execution",
      "Append-only execution artifact",
      "Replay verification",
      "Local-first with Ollama support",
    ],
    screenshot: `${BASE}/social/og-image-1200x630.png`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InviteOnly",
      description: "Private alpha — applying via X (@UseSteady)",
    },
    author: {
      "@type": "Organization",
      name: "UseSteady",
      url: BASE,
    },
  },

  // ── 2. Organization ───────────────────────────────────────────────────────
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "UseSteady",
    url: BASE,
    logo: `${BASE}/icon-512.png`,
    description:
      "UseSteady is building a controlled execution layer for developers — where every system action is reviewed, approved, and verifiable.",
    sameAs: [
      "https://twitter.com/UseSteady",
      "https://x.com/UseSteady",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: "https://x.com/UseSteady",
    },
  },

  // ── 3. WebSite ────────────────────────────────────────────────────────────
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "UseSteady",
    url: BASE,
    description:
      "Turn plain language into controlled system execution. Review it. Approve it. Then it runs.",
  },
];

export default function JsonLd() {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // dangerouslySetInnerHTML is correct and safe here —
          // the content is a static object we fully control.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
