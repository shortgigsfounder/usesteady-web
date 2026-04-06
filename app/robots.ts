import type { MetadataRoute } from "next";

const BASE = "https://usesteady.dev";

/**
 * robots.txt strategy:
 *   - Allow all crawlers on the public marketing site.
 *   - Disallow any internal/preview paths that may appear during development.
 *   - Point all crawlers to the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Main crawlers — full access to marketing content
        userAgent: "*",
        allow:     "/",
        disallow:  [
          "/api/",      // no API routes should be indexed
          "/_next/",    // Next.js internals
          "/demo-frames/", // generated build artifacts
        ],
      },
      {
        // GPTBot, Claude, etc. — allow indexing for AI discovery
        // but disallow bulk crawl of generated assets
        userAgent: ["GPTBot", "Claude-Web", "anthropic-ai", "PerplexityBot"],
        allow:     "/",
        disallow:  ["/api/", "/_next/", "/demo-frames/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host:    BASE,
  };
}
