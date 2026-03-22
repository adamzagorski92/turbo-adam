import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router";

import DateArchive from "./DateArchive";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import { ROUTES } from "@constans/routes";

const renderDateArchive = (year: string, month?: string) =>
  render(
    <MemoryRouter>
      <DateArchive year={year} month={month} />
    </MemoryRouter>,
  );

describe("DateArchive", () => {
  it('renders "Styczeń 2026" heading when year="2026" and month="sty"', () => {
    renderDateArchive("2026", "sty");

    expect(
      screen.getByRole("heading", { name: /Styczeń 2026/i }),
    ).toBeInTheDocument();
  });

  it("renders articles matching the date filter", () => {
    const expectedArticles = ARTICLES_CARD_MOCK.filter((a) =>
      a.dates.includes("sty-2026"),
    );

    renderDateArchive("2026", "sty");

    expectedArticles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeInTheDocument();
    });

    const links = screen.getAllByRole("link");
    expect(links.length).toBe(expectedArticles.length);
  });

  it("generates links to blog article pages", () => {
    const expectedArticles = ARTICLES_CARD_MOCK.filter((a) =>
      a.dates.includes("sty-2026"),
    );

    renderDateArchive("2026", "sty");

    const links = screen.getAllByRole("link");
    expect(links[0].getAttribute("href")).toBe(
      ROUTES.blogArticle(expectedArticles[0].slug),
    );
  });

  it('renders "Nie znaleziono archiwum" for unknown date', () => {
    renderDateArchive("9999", "xyz");

    expect(screen.getByText(/Nie znaleziono archiwum/i)).toBeInTheDocument();
  });

  it('renders "Luty 2026" heading when year="2026" and month="lut"', () => {
    renderDateArchive("2026", "lut");

    expect(
      screen.getByRole("heading", { name: /Luty 2026/i }),
    ).toBeInTheDocument();
  });

  describe("year-only mode", () => {
    it("renders year as heading when only year is provided", () => {
      renderDateArchive("2026");

      expect(screen.getByRole("heading", { name: "2026" })).toBeInTheDocument();
    });

    it("renders all articles from the given year", () => {
      const expectedArticles = ARTICLES_CARD_MOCK.filter((a) =>
        a.dates.some((d) => d.endsWith("-2026")),
      );

      renderDateArchive("2026");

      expectedArticles.forEach((article) => {
        expect(screen.getByText(article.title)).toBeInTheDocument();
      });

      const links = screen.getAllByRole("link");
      expect(links.length).toBe(expectedArticles.length);
    });

    it("generates links to blog article pages in year-only mode", () => {
      const expectedArticles = ARTICLES_CARD_MOCK.filter((a) =>
        a.dates.some((d) => d.endsWith("-2026")),
      );

      renderDateArchive("2026");

      const links = screen.getAllByRole("link");
      expect(links[0].getAttribute("href")).toBe(
        ROUTES.blogArticle(expectedArticles[0].slug),
      );
    });

    it('renders "Nie znaleziono archiwum" for year with no articles', () => {
      renderDateArchive("1999");

      expect(screen.getByText(/Nie znaleziono archiwum/i)).toBeInTheDocument();
    });
  });
});
