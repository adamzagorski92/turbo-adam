import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return { ...actual, useParams: vi.fn() };
});

import { useParams } from "react-router";
import { MemoryRouter } from "react-router";
import { Archive } from "./Archive";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import { ROUTES } from "@constans/routes";

const mockUseParams = vi.mocked(useParams);

const renderArchive = () =>
  render(
    <MemoryRouter>
      <Archive />
    </MemoryRouter>,
  );

describe("Archive", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders StandardArchive for known archive types", () => {
    mockUseParams.mockReturnValue({ archive: "tags" });

    renderArchive();

    expect(screen.getByRole("region", { name: /Tagi/i })).toBeInTheDocument();
  });

  it("renders articles filtered by tag", () => {
    mockUseParams.mockReturnValue({ archive: "tags", sub: "a11y" });

    const expectedArticles = ARTICLES_CARD_MOCK.filter((a) =>
      a.tags.includes("A11y"),
    );

    renderArchive();

    expect(screen.getByRole("region", { name: /A11y/i })).toBeInTheDocument();
    expectedArticles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeInTheDocument();
    });
  });

  it("renders articles filtered by category", () => {
    mockUseParams.mockReturnValue({ archive: "categories", sub: "frontend" });

    const expectedArticles = ARTICLES_CARD_MOCK.filter((a) =>
      a.categories.includes("Frontend"),
    );

    renderArchive();

    expect(
      screen.getByRole("region", { name: /Frontend/i }),
    ).toBeInTheDocument();
    expectedArticles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeInTheDocument();
    });
  });

  it("renders articles for a year/month date", () => {
    mockUseParams.mockReturnValue({ archive: "2026", sub: "sty" });

    const expectedArticles = ARTICLES_CARD_MOCK.filter((a) =>
      a.dates.includes("sty-2026"),
    );

    renderArchive();

    expect(
      screen.getByRole("region", { name: /Styczeń 2026/i }),
    ).toBeInTheDocument();
    expectedArticles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeInTheDocument();
    });
  });

  it("renders all articles for a year-only archive", () => {
    mockUseParams.mockReturnValue({ archive: "2026" });

    const expectedArticles = ARTICLES_CARD_MOCK.filter((a) =>
      a.dates.some((d) => d.endsWith("-2026")),
    );

    renderArchive();

    expect(screen.getByRole("region", { name: "2026" })).toBeInTheDocument();
    expectedArticles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeInTheDocument();
    });
  });

  it("generates article links with correct href", () => {
    mockUseParams.mockReturnValue({ archive: "tags", sub: "a11y" });

    const expectedArticles = ARTICLES_CARD_MOCK.filter((a) =>
      a.tags.includes("A11y"),
    );

    renderArchive();

    const links = screen.getAllByRole("link");
    expect(links[0].getAttribute("href")).toBe(
      ROUTES.blogArticle(expectedArticles[0].slug),
    );
  });

  it('renders "Nie znaleziono archiwum" for unknown archive type', () => {
    mockUseParams.mockReturnValue({ archive: "unknown" });

    renderArchive();

    expect(screen.getByText(/Nie znaleziono archiwum/i)).toBeInTheDocument();
  });

  it('renders "Nie znaleziono archiwum" when archive param is missing', () => {
    mockUseParams.mockReturnValue({});

    renderArchive();

    expect(screen.getByText(/Nie znaleziono archiwum/i)).toBeInTheDocument();
  });

  it('renders "Nie znaleziono archiwum" for unknown sub slug', () => {
    mockUseParams.mockReturnValue({ archive: "tags", sub: "nonexistent" });

    renderArchive();

    expect(screen.getByText(/Nie znaleziono archiwum/i)).toBeInTheDocument();
  });

  it('renders "Nie znaleziono archiwum" for unknown date', () => {
    mockUseParams.mockReturnValue({ archive: "9999", sub: "xyz" });

    renderArchive();

    expect(screen.getByText(/Nie znaleziono archiwum/i)).toBeInTheDocument();
  });

  it('renders "Nie znaleziono archiwum" for year with no articles', () => {
    mockUseParams.mockReturnValue({ archive: "1999" });

    renderArchive();

    expect(screen.getByText(/Nie znaleziono archiwum/i)).toBeInTheDocument();
  });
});
