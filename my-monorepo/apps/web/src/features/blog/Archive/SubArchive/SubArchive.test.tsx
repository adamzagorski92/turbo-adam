import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router";

import SubArchive from "./SubArchive";
import { ARCHIVE_CONFIG } from "@constans/archiveMock";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import { ROUTES } from "@constans/routes";

const renderSubArchive = (archive: string, sub: string) =>
  render(
    <MemoryRouter>
      <SubArchive archive={archive} sub={sub} />
    </MemoryRouter>,
  );

describe("SubArchive", () => {
  it('renders articles filtered by tag when archive="tags" and sub="a11y"', () => {
    const expectedArticles = ARTICLES_CARD_MOCK.filter((a) =>
      a.tags.includes("A11y"),
    );

    renderSubArchive("tags", "a11y");

    expect(screen.getByRole("heading", { name: /A11y/i })).toBeInTheDocument();

    expectedArticles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeInTheDocument();
    });

    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(expectedArticles.length);
  });

  it('renders articles filtered by category when archive="categories" and sub="frontend"', () => {
    const expectedArticles = ARTICLES_CARD_MOCK.filter((a) =>
      a.categories.includes("Frontend"),
    );

    renderSubArchive("categories", "frontend");

    expect(
      screen.getByRole("heading", { name: /Frontend/i }),
    ).toBeInTheDocument();

    expectedArticles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeInTheDocument();
    });

    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(expectedArticles.length);
  });

  it("generates links to blog article pages", () => {
    const expectedArticles = ARTICLES_CARD_MOCK.filter((a) =>
      a.tags.includes("A11y"),
    );

    renderSubArchive("tags", "a11y");

    const links = screen.getAllByRole("link");
    expect(links[0].getAttribute("href")).toBe(
      ROUTES.blogArticle(expectedArticles[0].slug),
    );
  });

  it('renders "Nie znaleziono archiwum" for unknown archive type', () => {
    renderSubArchive("unknown", "whatever");

    expect(screen.getByText(/Nie znaleziono archiwum/i)).toBeInTheDocument();
  });

  it('renders "Nie znaleziono archiwum" for unknown sub slug', () => {
    renderSubArchive("tags", "nonexistent-slug");

    expect(screen.getByText(/Nie znaleziono archiwum/i)).toBeInTheDocument();
  });

  it("renders correct number of articles for a tag", () => {
    const tagItems = ARCHIVE_CONFIG["tags"].items;
    const firstTag = tagItems[0];
    const expectedCount = ARTICLES_CARD_MOCK.filter((a) =>
      a.tags.includes(firstTag.label),
    ).length;

    renderSubArchive("tags", firstTag.slug);

    const links = screen.getAllByRole("link");
    expect(links.length).toBe(expectedCount);
  });
});
