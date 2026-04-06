import type { MetadataRoute } from "next";

const BASE = "https://usesteady.dev";

/**
 * Sitemap pillar structure.
 *
 * Priority tiers:
 *   1.0  — Pillar page (homepage / product page)
 *   0.8  — High-value anchor sections (deep-link targets)
 *   0.6  — Supporting pages (future: blog, docs, changelog)
 *
 * changeFrequency:
 *   "weekly"  — active product page being iterated
 *   "monthly" — stable reference pages
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // ── Pillar page ───────────────────────────────────────────────────────────
    {
      url:              BASE,
      lastModified:     now,
      changeFrequency:  "weekly",
      priority:         1.0,
    },

    // ── Section anchors (hashlinks for now; promote to pages if content grows)
    // These signal to crawlers the page has depth on these topics.
    {
      url:             `${BASE}/#demo`,
      lastModified:    now,
      changeFrequency: "weekly",
      priority:        0.8,
    },
    {
      url:             `${BASE}/#transformation`,
      lastModified:    now,
      changeFrequency: "weekly",
      priority:        0.8,
    },
    {
      url:             `${BASE}/#how-it-works`,
      lastModified:    now,
      changeFrequency: "monthly",
      priority:        0.7,
    },

    // ── Future cluster pages (uncomment when live) ────────────────────────────
    // { url: `${BASE}/docs`,         changeFrequency: "weekly",  priority: 0.8 },
    // { url: `${BASE}/changelog`,    changeFrequency: "weekly",  priority: 0.7 },
    // { url: `${BASE}/blog`,         changeFrequency: "daily",   priority: 0.7 },
    // { url: `${BASE}/pricing`,      changeFrequency: "monthly", priority: 0.6 },
  ];
}
