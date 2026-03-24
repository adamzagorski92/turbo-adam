import { describe, it, expect } from "vitest";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import type { ArticleCard } from "@constans/articlesCardMock";
import { TAGS, CATEGORIES, AUTHORS } from "@constans/blogData";
import type { BlogEntity } from "@constans/blogData";

describe("ArticleCard interface — new archive fields", () => {
  it("each article has a non-empty categories array", () => {
    ARTICLES_CARD_MOCK.forEach((article: ArticleCard) => {
      expect(article).toHaveProperty("categories");
      expect(Array.isArray(article.categories)).toBe(true);
      expect(article.categories.length).toBeGreaterThan(0);
    });
  });

  it("each article authors array contains valid author IDs", () => {
    const validAuthorIds = AUTHORS.map((a: BlogEntity) => a.id);
    ARTICLES_CARD_MOCK.forEach((article: ArticleCard) => {
      expect(article).toHaveProperty("authors");
      expect(Array.isArray(article.authors)).toBe(true);
      expect(article.authors.length).toBeGreaterThan(0);
      article.authors.forEach((authorId: string) => {
        expect(validAuthorIds).toContain(authorId);
      });
    });
  });

  it("each article still has the original author string field", () => {
    ARTICLES_CARD_MOCK.forEach((article: ArticleCard) => {
      expect(typeof article.author).toBe("string");
      expect(article.author.length).toBeGreaterThan(0);
    });
  });

  it("each article author display field matches the label of its author ID", () => {
    const authorLabelMap: Record<string, string> = Object.fromEntries(
      AUTHORS.map((a: BlogEntity) => [a.id, a.label]),
    );
    ARTICLES_CARD_MOCK.forEach((article: ArticleCard) => {
      expect(authorLabelMap[article.authors[0]]).toBe(article.author);
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

  it('each article dates array has format "YYYY/mmm"', () => {
    ARTICLES_CARD_MOCK.forEach((article: ArticleCard) => {
      article.dates.forEach((d: string) => {
        expect(d).toMatch(/^\d{4}\/[a-ząćęłńóśźż]{3}$/);
      });
    });
  });
});

describe("ArticleCard data consistency with blogData", () => {
  it("all tags used in articles exist in TAGS", () => {
    const tagIds = TAGS.map((t: BlogEntity) => t.id);

    ARTICLES_CARD_MOCK.forEach((article: ArticleCard) => {
      article.tags.forEach((tag: string) => {
        expect(tagIds).toContain(tag);
      });
    });
  });

  it("all categories used in articles exist in CATEGORIES", () => {
    const categoryIds = CATEGORIES.map((c: BlogEntity) => c.id);

    ARTICLES_CARD_MOCK.forEach((article: ArticleCard) => {
      article.categories.forEach((cat: string) => {
        expect(categoryIds).toContain(cat);
      });
    });
  });
});
