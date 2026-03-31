import { describe, it, expect } from "vitest";
import { searchArticles } from "./searchArticles";
import type { ArticleCard } from "@constans/articlesCardMock";

const makeArticle = (id: number, title: string): ArticleCard => ({
  id,
  slug: `article-${id}`,
  title,
  subtitle: "",
  excerpt: "",
  date: "2026-01-01",
  tags: [],
  categories: [],
  authors: [],
  types: [],
  dates: [],
});

const articles: ArticleCard[] = [
  makeArticle(1, "Jak zbudować monorepo z Turborepo"),
  makeArticle(2, "CSS Design System od zera"),
  makeArticle(3, "React Hook Form — walidacja formularzy"),
  makeArticle(4, "TypeScript generyki w praktyce"),
  makeArticle(5, "Docker i Docker Compose dla deweloperów"),
];

describe("searchArticles", () => {
  it("returns all articles when query is empty", () => {
    expect(searchArticles(articles, "")).toEqual(articles);
  });

  it("returns all articles when query is shorter than 2 chars", () => {
    expect(searchArticles(articles, "a")).toEqual(articles);
  });

  it("returns all articles when query is only whitespace", () => {
    expect(searchArticles(articles, "   ")).toEqual(articles);
  });

  it("finds article by exact title substring", () => {
    const results = searchArticles(articles, "monorepo");
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe(1);
  });

  it("finds article by fuzzy match", () => {
    const results = searchArticles(articles, "Turborepo");
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results[0].id).toBe(1);
  });

  it("returns empty array when nothing matches", () => {
    const results = searchArticles(articles, "kubernetes nginx");
    expect(results).toHaveLength(0);
  });

  it("searches case-insensitively", () => {
    const results = searchArticles(articles, "css design");
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results[0].id).toBe(2);
  });

  it("returns empty array when given empty articles list", () => {
    expect(searchArticles([], "monorepo")).toEqual([]);
  });

  it("trims whitespace from query before searching", () => {
    const results = searchArticles(articles, "  Docker  ");
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results[0].id).toBe(5);
  });
});
