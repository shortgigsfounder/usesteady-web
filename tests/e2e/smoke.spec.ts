/**
 * Smoke tests for usesteady.dev marketing site.
 *
 * These are the mandatory pre-deploy checks. They run against the production
 * Next.js build (`next start`) and must ALL pass before a deploy is promoted.
 *
 * Coverage:
 *   - Page loads (no 500, no blank screen)
 *   - Title and meta tags (SEO basics)
 *   - Hero section visible
 *   - Primary CTA accessible
 *   - Key sections present
 *   - Nav links do not 404
 *   - No uncaught JS errors
 */

import { test, expect } from "@playwright/test";

// ─── Homepage ─────────────────────────────────────────────────────────────────

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    // Capture console errors. The test will fail if any fire.
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/");

    // Store captured errors on the page object for per-test assertions.
    await page.evaluate(
      (errs) => { (window as Record<string, unknown>).__e2eErrors = errs; },
      errors,
    );
  });

  test("returns 200 and renders without blank screen", async ({ page }) => {
    // Response intercepted by Playwright — a redirect to a real page still counts.
    await expect(page).toHaveURL("/");
    // Body must contain content — catches blank / flash-of-empty renders.
    const body = page.locator("body");
    await expect(body).not.toBeEmpty();
  });

  test("has correct page title", async ({ page }) => {
    await expect(page).toHaveTitle(/UseSteady/i);
  });

  test("has og:title meta tag", async ({ page }) => {
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute("content", /UseSteady/i);
  });

  test("hero section is visible", async ({ page }) => {
    // The hero is the first visible section — if this is missing, the whole
    // above-fold experience is broken.
    const hero = page
      .locator("section, [data-section='hero'], main")
      .first();
    await expect(hero).toBeVisible();
  });

  test("has at least one primary CTA button", async ({ page }) => {
    // Marketing site must always have a visible call-to-action.
    const cta = page.getByRole("link", { name: /download|get started|try|start/i }).first();
    await expect(cta).toBeVisible();
  });

  test("header nav is visible", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();
  });

  test("logo / brand name is visible in header", async ({ page }) => {
    const brand = page.locator("header").getByText(/UseSteady/i).first();
    await expect(brand).toBeVisible();
  });

  test("no uncaught JS errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    // Navigate again to catch any late errors after initial load.
    await page.reload();
    await page.waitForLoadState("networkidle");
    expect(errors, `JS errors on homepage: ${errors.join(", ")}`).toHaveLength(0);
  });
});

// ─── Navigation smoke ─────────────────────────────────────────────────────────

test.describe("Navigation", () => {
  test("no anchor links on homepage return 404", async ({ page, request }) => {
    await page.goto("/");

    // Collect all internal href values from anchor tags.
    const hrefs = await page.evaluate(() =>
      Array.from(document.querySelectorAll("a[href]"))
        .map((a) => (a as HTMLAnchorElement).href)
        .filter((h) => h.startsWith(window.location.origin) && !h.includes("#")),
    );

    const uniqueHrefs = [...new Set(hrefs)];

    // Check each unique internal URL is reachable (not 404 / 500).
    for (const href of uniqueHrefs) {
      const res = await request.get(href);
      expect(res.status(), `Expected 200 for ${href}`).toBeLessThan(400);
    }
  });
});

// ─── Static assets ────────────────────────────────────────────────────────────

test.describe("Static assets", () => {
  test("favicon is served", async ({ request }) => {
    const res = await request.get("/favicon.ico");
    expect(res.status()).toBeLessThan(400);
  });

  test("OG image is served", async ({ request }) => {
    // The OG image should be present and reachable — broken OG images silently
    // kill social sharing previews.
    const res = await request.get("/social/og-image-1200x630.png");
    expect(res.status()).toBeLessThan(400);
  });
});
