import { describe, it, expect } from "vitest";
import { resolveArchive, toArticleItems } from "./resolveArchive";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import { ROUTES } from "@constans/routes";
import { getArchiveConfig, getArchiveDates } from "@utils/archiveConfig";

const t = (key: string): string => {
  const map: Record<string, string> = {
    "blog.sections.tags": "Tagi",
    "blog.sections.categories": "Kategorie",
  };
  return map[key] ?? key;
};

const archiveConfig = getArchiveConfig(t);
const archiveDates = getArchiveDates(t);

describe("toArticleItems", () => {
  it("maps articles to link items with string keys", () => {
    const articles = ARTICLES_CARD_MOCK.slice(0, 2);
    const items = toArticleItems(articles);

    expect(items).toHaveLength(2);
    expect(items[0]).toEqual({
      key: String(articles[0].id),
      label: articles[0].title,
      to: ROUTES.blogArticle(articles[0].slug),
    });
  });
});

describe("resolveArchive", () => {
  it("returns not-found when archive is undefined", () => {
    const result = resolveArchive(
      ARTICLES_CARD_MOCK,
      archiveConfig,
      archiveDates,
      undefined,
    );
    expect(result).toEqual({ kind: "not-found" });
  });

  it("returns not-found for unknown archive type", () => {
    const result = resolveArchive(
      ARTICLES_CARD_MOCK,
      archiveConfig,
      archiveDates,
      "unknown",
    );
    expect(result).toEqual({ kind: "not-found" });
  });

  it("resolves known archive type with item counts", () => {
    const result = resolveArchive(
      ARTICLES_CARD_MOCK,
      archiveConfig,
      archiveDates,
      "tags",
    );

    expect(result.kind).toBe("items");
    if (result.kind !== "items") return;
    expect(result.ariaLabel).toBe("Tagi");
    expect(result.items.length).toBeGreaterThan(0);
    expect(result.items[0].label).toMatch(/\(\d+\)$/);
  });

  it("resolves articles filtered by tag sub", () => {
    const result = resolveArchive(
      ARTICLES_CARD_MOCK,
      archiveConfig,
      archiveDates,
      "tags",
      "a11y",
    );

    expect(result.kind).toBe("items");
    if (result.kind !== "items") return;
    expect(result.ariaLabel).toBe("A11y");
    result.items.forEach((item) => {
      expect(item.to).toMatch(/^\/blog\//);
    });
  });

  it("resolves articles filtered by category sub", () => {
    const result = resolveArchive(
      ARTICLES_CARD_MOCK,
      archiveConfig,
      archiveDates,
      "categories",
      "frontend",
    );

    expect(result.kind).toBe("items");
    if (result.kind !== "items") return;
    expect(result.ariaLabel).toBe("Frontend");
  });

  it("returns not-found for unknown sub in known archive", () => {
    const result = resolveArchive(
      ARTICLES_CARD_MOCK,
      archiveConfig,
      archiveDates,
      "tags",
      "nonexistent",
    );
    expect(result).toEqual({ kind: "not-found" });
  });

  it("resolves articles filtered by year/month date", () => {
    const result = resolveArchive(
      ARTICLES_CARD_MOCK,
      archiveConfig,
      archiveDates,
      "2026",
      "sty",
    );

    expect(result.kind).toBe("items");
    if (result.kind !== "items") return;
    expect(result.items.length).toBeGreaterThan(0);
  });

  it("returns not-found for unknown date sub", () => {
    const result = resolveArchive(
      ARTICLES_CARD_MOCK,
      archiveConfig,
      archiveDates,
      "9999",
      "xyz",
    );
    expect(result).toEqual({ kind: "not-found" });
  });

  it("resolves articles for year-only archive", () => {
    const result = resolveArchive(
      ARTICLES_CARD_MOCK,
      archiveConfig,
      archiveDates,
      "2026",
    );

    expect(result.kind).toBe("items");
    if (result.kind !== "items") return;
    expect(result.ariaLabel).toBe("2026");
    expect(result.items.length).toBeGreaterThan(0);
  });

  it("returns not-found for year with no articles", () => {
    const result = resolveArchive(
      ARTICLES_CARD_MOCK,
      archiveConfig,
      archiveDates,
      "1999",
    );
    expect(result).toEqual({ kind: "not-found" });
  });
});
