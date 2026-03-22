import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router";

import ArticleArchive from "./ArticleArchive";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import { ROUTES } from "@constans/routes";

const sampleArticles = ARTICLES_CARD_MOCK.slice(0, 3);

const renderArticleArchive = (heading: string, articles = sampleArticles) =>
  render(
    <MemoryRouter>
      <ArticleArchive heading={heading} articles={articles} />
    </MemoryRouter>,
  );

describe("ArticleArchive", () => {
  it("renders section with aria-label matching heading", () => {
    renderArticleArchive("A11y");

    expect(screen.getByRole("region", { name: /A11y/i })).toBeInTheDocument();
  });

  it("does not render a visible h2 heading", () => {
    renderArticleArchive("A11y");

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renders article titles as links", () => {
    renderArticleArchive("Test");

    sampleArticles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeInTheDocument();
    });

    const links = screen.getAllByRole("link");
    expect(links.length).toBe(sampleArticles.length);
  });

  it("generates links to blog article pages", () => {
    renderArticleArchive("Test");

    const links = screen.getAllByRole("link");
    expect(links[0].getAttribute("href")).toBe(
      ROUTES.blogArticle(sampleArticles[0].slug),
    );
  });
});
