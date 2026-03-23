import { describe, it, expect } from "vitest";
import { filterArticles } from "./filterArticles";
import type { FilterNode } from "@features/blog/SideTreeNavigation/types/menu.types";
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
    const articles = [
      makeArticle({ tags: ["React"] }),
      makeArticle({ tags: ["Vue"] }),
    ];
    const tree: FilterNode[] = [
      {
        id: "tags",
        label: "Tagi",
        children: [{ id: "react", label: "React" }],
      },
    ];

    const result = filterArticles(articles, tree, null);

    expect(result).toEqual(articles);
  });

  it("returns empty array when selectedIds is empty (nothing selected)", () => {
    const articles = [
      makeArticle({ tags: ["React"] }),
      makeArticle({ tags: ["Vue"] }),
    ];
    const tree: FilterNode[] = [
      {
        id: "tags",
        label: "Tagi",
        children: [{ id: "react", label: "React" }],
      },
    ];

    const result = filterArticles(articles, tree, makeGrouped({}));

    expect(result).toEqual([]);
  });

  it("excludes article when any of its tags is unchecked", () => {
    const articles = [
      makeArticle({ tags: ["Turborepo", "React"] }),
      makeArticle({ tags: ["React"] }),
    ];
    const tree: FilterNode[] = [
      {
        id: "tags",
        label: "Tagi",
        children: [
          { id: "turborepo", label: "Turborepo" },
          { id: "react", label: "React" },
        ],
      },
    ];

    // Only "react" selected → first article has unchecked "turborepo" → excluded
    const result = filterArticles(
      articles,
      tree,
      makeGrouped({ tags: ["react"] }),
    );

    expect(result).toEqual([articles[1]]);
  });

  it("shows article when all its tags are selected", () => {
    const articles = [
      makeArticle({ tags: ["Turborepo", "React"] }),
      makeArticle({ tags: ["React"] }),
    ];
    const tree: FilterNode[] = [
      {
        id: "tags",
        label: "Tagi",
        children: [
          { id: "turborepo", label: "Turborepo" },
          { id: "react", label: "React" },
        ],
      },
    ];

    const result = filterArticles(
      articles,
      tree,
      makeGrouped({ tags: ["react", "turborepo"] }),
    );

    expect(result).toEqual(articles);
  });

  it("excludes article when its author is unchecked", () => {
    const articles = [
      makeArticle({ tags: ["React"], authors: ["Adam"] }),
      makeArticle({ tags: ["React"], authors: ["Jan"] }),
    ];
    const tree: FilterNode[] = [
      {
        id: "tags",
        label: "Tagi",
        children: [{ id: "react", label: "React" }],
      },
      {
        id: "authors",
        label: "Autorzy",
        children: [
          { id: "adam", label: "Adam" },
          { id: "jan", label: "Jan" },
        ],
      },
    ];

    // "jan" unchecked → second article excluded
    const result = filterArticles(
      articles,
      tree,
      makeGrouped({ tags: ["react"], authors: ["adam"] }),
    );

    expect(result).toEqual([articles[0]]);
  });

  it("excludes article when its date is unchecked", () => {
    const articles = [
      makeArticle({ dates: ["mar-2026"] }),
      makeArticle({ dates: ["lut-2026"] }),
    ];
    const tree: FilterNode[] = [
      {
        id: "dates",
        label: "Daty",
        children: [
          { id: "2026/mar", label: "Marzec 2026" },
          { id: "2026/lut", label: "Luty 2026" },
        ],
      },
    ];

    const result = filterArticles(
      articles,
      tree,
      makeGrouped({ dates: ["2026/mar"] }),
    );

    expect(result).toEqual([articles[0]]);
  });

  it("excludes article when its type is unchecked", () => {
    const articles = [
      makeArticle({ types: ["sponsored"] }),
      makeArticle({ types: ["unsponsored"] }),
    ];
    const tree: FilterNode[] = [
      {
        id: "types",
        label: "Typy",
        children: [
          { id: "sponsored", label: "sponsored" },
          { id: "unsponsored", label: "unsponsored" },
        ],
      },
    ];

    const result = filterArticles(
      articles,
      tree,
      makeGrouped({ types: ["unsponsored"] }),
    );

    expect(result).toEqual([articles[1]]);
  });

  it("category passes when any subcategory is selected", () => {
    const articles = [
      makeArticle({ categories: ["Frontend"] }),
      makeArticle({ categories: ["Backend"] }),
    ];
    const tree: FilterNode[] = [
      {
        id: "categories",
        label: "Kategorie",
        children: [
          {
            id: "frontend",
            label: "Frontend",
            children: [
              { id: "react", label: "React" },
              { id: "typescript", label: "TypeScript" },
            ],
          },
          {
            id: "backend",
            label: "Backend",
            children: [{ id: "node", label: "Node.js" }],
          },
        ],
      },
    ];

    const result = filterArticles(
      articles,
      tree,
      makeGrouped({ categories: { frontend: ["react"] } }),
    );

    expect(result).toEqual([articles[0]]);
  });

  it("excludes article when all subcategories of its category are unchecked", () => {
    const articles = [
      makeArticle({ categories: ["Frontend"] }),
      makeArticle({ categories: ["Backend"] }),
    ];
    const tree: FilterNode[] = [
      {
        id: "categories",
        label: "Kategorie",
        children: [
          {
            id: "frontend",
            label: "Frontend",
            children: [
              { id: "react", label: "React" },
              { id: "typescript", label: "TypeScript" },
            ],
          },
          {
            id: "backend",
            label: "Backend",
            children: [{ id: "node", label: "Node.js" }],
          },
        ],
      },
    ];

    // Only "node" selected → "Frontend" has no selected subcategory → excluded
    const result = filterArticles(
      articles,
      tree,
      makeGrouped({ categories: { backend: ["node"] } }),
    );

    expect(result).toEqual([articles[1]]);
  });

  it("leaf category must be directly selected", () => {
    const articles = [
      makeArticle({ categories: ["DevOps"] }),
      makeArticle({ categories: ["Frontend"] }),
    ];
    const tree: FilterNode[] = [
      {
        id: "categories",
        label: "Kategorie",
        children: [
          {
            id: "frontend",
            label: "Frontend",
            children: [{ id: "react", label: "React" }],
          },
          { id: "devops", label: "DevOps" },
        ],
      },
    ];

    const result = filterArticles(
      articles,
      tree,
      makeGrouped({ categories: { devops: ["devops"] } }),
    );

    expect(result).toEqual([articles[0]]);
  });

  it("article with multiple categories passes only if all are covered", () => {
    const articles = [
      makeArticle({ categories: ["Frontend", "Narzędzia"] }),
      makeArticle({ categories: ["Frontend"] }),
    ];
    const tree: FilterNode[] = [
      {
        id: "categories",
        label: "Kategorie",
        children: [
          {
            id: "frontend",
            label: "Frontend",
            children: [{ id: "react", label: "React" }],
          },
          { id: "narzedzia", label: "Narzędzia" },
        ],
      },
    ];

    // "react" selected → Frontend covered; "narzedzia" NOT selected → first article excluded
    const result = filterArticles(
      articles,
      tree,
      makeGrouped({ categories: { frontend: ["react"] } }),
    );

    expect(result).toEqual([articles[1]]);
  });

  it("unchecking any single property is enough to hide the article", () => {
    const articles = [
      makeArticle({
        tags: ["React"],
        authors: ["Adam"],
        types: ["sponsored"],
        dates: ["mar-2026"],
      }),
    ];
    const tree: FilterNode[] = [
      {
        id: "tags",
        label: "Tagi",
        children: [{ id: "react", label: "React" }],
      },
      {
        id: "authors",
        label: "Autorzy",
        children: [{ id: "adam", label: "Adam" }],
      },
      {
        id: "types",
        label: "Typy",
        children: [{ id: "sponsored", label: "sponsored" }],
      },
      {
        id: "dates",
        label: "Daty",
        children: [{ id: "2026/mar", label: "Marzec 2026" }],
      },
    ];

    // All selected except author → article hidden
    const result = filterArticles(
      articles,
      tree,
      makeGrouped({
        tags: ["react"],
        types: ["sponsored"],
        dates: ["2026/mar"],
      }),
    );

    expect(result).toEqual([]);
  });
});
