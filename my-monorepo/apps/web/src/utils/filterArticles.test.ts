import { describe, it, expect } from "vitest";
import { filterArticles } from "./filterArticles";
import type { ArticleCard } from "@constans/articlesCardMock";
import type { GroupedIds } from "@stores/useBlogFilterStore";

const makeArticle = (
  overrides: Partial<
    Pick<ArticleCard, "tags" | "categories" | "authors" | "types" | "dates">
  >,
): ArticleCard =>
  ({
    tags: [],
    categories: [],
    authors: [],
    types: [],
    dates: [],
    ...overrides,
  }) as ArticleCard;

const makeGrouped = (partial: Partial<GroupedIds>): GroupedIds => ({
  categories: {},
  tags: [],
  authors: [],
  dates: [],
  types: [],
  ...partial,
});

describe("filterArticles", () => {
  it("returns all articles when selectedIds is null", () => {
    const articles = [makeArticle({ tags: ["performance"] })];

    expect(filterArticles(articles, null)).toEqual(articles);
  });

  it("returns empty array when selectedIds is empty (nothing selected)", () => {
    const articles = [makeArticle({ tags: ["performance"] })];

    expect(filterArticles(articles, makeGrouped({}))).toEqual([]);
  });

  it("excludes article when any of its tags is unchecked", () => {
    const articles = [
      makeArticle({ tags: ["monorepo", "performance"] }),
      makeArticle({ tags: ["performance"] }),
    ];

    expect(
      filterArticles(articles, makeGrouped({ tags: ["performance"] })),
    ).toEqual([articles[1]]);
  });

  it("shows article when all its tags are selected", () => {
    const articles = [
      makeArticle({ tags: ["monorepo", "performance"] }),
      makeArticle({ tags: ["performance"] }),
    ];

    expect(
      filterArticles(
        articles,
        makeGrouped({ tags: ["performance", "monorepo"] }),
      ),
    ).toEqual(articles);
  });

  it("excludes article when its author is unchecked", () => {
    const articles = [
      makeArticle({ tags: ["performance"], authors: ["adam"] }),
      makeArticle({ tags: ["performance"], authors: ["ewa"] }),
    ];

    expect(
      filterArticles(
        articles,
        makeGrouped({ tags: ["performance"], authors: ["adam"] }),
      ),
    ).toEqual([articles[0]]);
  });

  it("excludes article when its date is unchecked", () => {
    const articles = [
      makeArticle({ dates: ["2026/mar"] }),
      makeArticle({ dates: ["2026/lut"] }),
    ];

    expect(
      filterArticles(articles, makeGrouped({ dates: ["2026/mar"] })),
    ).toEqual([articles[0]]);
  });

  it("excludes article when its type is unchecked", () => {
    const articles = [
      makeArticle({ types: ["sponsored"] }),
      makeArticle({ types: ["unsponsored"] }),
    ];

    expect(
      filterArticles(articles, makeGrouped({ types: ["unsponsored"] })),
    ).toEqual([articles[1]]);
  });

  it("category passes when group has any selected subcategory", () => {
    const articles = [
      makeArticle({ categories: ["frontend"] }),
      makeArticle({ categories: ["backend"] }),
    ];

    expect(
      filterArticles(
        articles,
        makeGrouped({ categories: { frontend: ["react"] } }),
      ),
    ).toEqual([articles[0]]);
  });

  it("excludes article when all subcategories of its category group are deselected", () => {
    const articles = [
      makeArticle({ categories: ["frontend"] }),
      makeArticle({ categories: ["backend"] }),
    ];

    expect(
      filterArticles(
        articles,
        makeGrouped({ categories: { backend: ["node"] } }),
      ),
    ).toEqual([articles[1]]);
  });

  it("leaf category passes when directly selected", () => {
    const articles = [
      makeArticle({ categories: ["devops"] }),
      makeArticle({ categories: ["frontend"] }),
    ];

    expect(
      filterArticles(
        articles,
        makeGrouped({ categories: { devops: ["devops"] } }),
      ),
    ).toEqual([articles[0]]);
  });

  it("article with multiple categories passes only if all are active", () => {
    const articles = [
      makeArticle({ categories: ["frontend", "narzedzia"] }),
      makeArticle({ categories: ["frontend"] }),
    ];

    expect(
      filterArticles(
        articles,
        makeGrouped({ categories: { frontend: ["react"] } }),
      ),
    ).toEqual([articles[1]]);
  });

  it("unchecking any single property is enough to hide the article", () => {
    const articles = [
      makeArticle({
        tags: ["performance"],
        authors: ["adam"],
        types: ["sponsored"],
        dates: ["2026/mar"],
      }),
    ];

    expect(
      filterArticles(
        articles,
        makeGrouped({
          tags: ["performance"],
          types: ["sponsored"],
          dates: ["2026/mar"],
        }),
      ),
    ).toEqual([]);
  });
});
