import { describe, it, expect } from "vitest";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import type { ArticleCard } from "@constans/articlesCardMock";
import { ARCHIVE_TAGS, ARCHIVE_CATEGORIES } from "@constans/archiveMock";
import type { ArchiveItem } from "@constans/archiveMock";

describe("ArticleCard interface — new archive fields", () => {
  it("each article has a non-empty categories array", () => {
    ARTICLES_CARD_MOCK.forEach((article: ArticleCard) => {
      expect(article).toHaveProperty("categories");
      expect(Array.isArray(article.categories)).toBe(true);
      expect(article.categories.length).toBeGreaterThan(0);
    });
  });

  it("each article has a non-empty authors array", () => {
    ARTICLES_CARD_MOCK.forEach((article: ArticleCard) => {
      expect(article).toHaveProperty("authors");
      expect(Array.isArray(article.authors)).toBe(true);
      expect(article.authors.length).toBeGreaterThan(0);
    });
  });

  it("each article still has the original author string field", () => {
    ARTICLES_CARD_MOCK.forEach((article: ArticleCard) => {
      expect(typeof article.author).toBe("string");
      expect(article.author.length).toBeGreaterThan(0);
    });
  });

  it("each article authors array contains the same value as author field", () => {
    ARTICLES_CARD_MOCK.forEach((article: ArticleCard) => {
      expect(article.authors).toContain(article.author);
    });
  });

  it("each article has a non-empty types array", () => {
    ARTICLES_CARD_MOCK.forEach((article: ArticleCard) => {
      expect(article).toHaveProperty("types");
      expect(Array.isArray(article.types)).toBe(true);
      expect(article.types.length).toBeGreaterThan(0);
    });
  });

  it('each article types array contains only "sponsored" or "unsponsored"', () => {
    ARTICLES_CARD_MOCK.forEach((article: ArticleCard) => {
      article.types.forEach((type: string) => {
        expect(["sponsored", "unsponsored"]).toContain(type);
      });
    });
  });

  it("each article has a non-empty dates array", () => {
    ARTICLES_CARD_MOCK.forEach((article: ArticleCard) => {
      expect(article).toHaveProperty("dates");
      expect(Array.isArray(article.dates)).toBe(true);
      expect(article.dates.length).toBeGreaterThan(0);
    });
  });

  it('each article dates array has Polish short-month format like "sty-2026"', () => {
    ARTICLES_CARD_MOCK.forEach((article: ArticleCard) => {
      article.dates.forEach((d: string) => {
        expect(d).toMatch(/^[a-ząćęłńóśźż]{3}-\d{4}$/);
      });
    });
  });
});

describe("ArticleCard data consistency with archive", () => {
  it("all tags used in articles exist in ARCHIVE_TAGS", () => {
    const archiveTagLabels = ARCHIVE_TAGS.map((t: ArchiveItem) => t.label);

    ARTICLES_CARD_MOCK.forEach((article: ArticleCard) => {
      article.tags.forEach((tag: string) => {
        expect(archiveTagLabels).toContain(tag);
      });
    });
  });

  it("all categories used in articles exist in ARCHIVE_CATEGORIES", () => {
    const archiveCategoryLabels = ARCHIVE_CATEGORIES.map(
      (c: ArchiveItem) => c.label,
    );

    ARTICLES_CARD_MOCK.forEach((article: ArticleCard) => {
      article.categories.forEach((cat: string) => {
        expect(archiveCategoryLabels).toContain(cat);
      });
    });
  });
});
