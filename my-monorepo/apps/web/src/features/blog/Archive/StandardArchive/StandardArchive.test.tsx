import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router";

import StandardArchive from "./StandardArchive";
import { ARCHIVE_TAGS } from "@constans/archiveMock";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import { ROUTES } from "@constans/routes";

const renderStandardArchive = (archive: string) =>
  render(
    <MemoryRouter>
      <StandardArchive archive={archive} />
    </MemoryRouter>,
  );

describe("StandardArchive", () => {
  it('renders "Tagi" heading when archive is "tags"', () => {
    renderStandardArchive("tags");

    expect(screen.getByRole("heading", { name: /Tagi/i })).toBeInTheDocument();
  });

  it('renders "Kategorie" heading when archive is "categories"', () => {
    renderStandardArchive("categories");

    expect(
      screen.getByRole("heading", { name: /Kategorie/i }),
    ).toBeInTheDocument();
  });

  it('renders "Autorzy" heading when archive is "authors"', () => {
    renderStandardArchive("authors");

    expect(
      screen.getByRole("heading", { name: /Autorzy/i }),
    ).toBeInTheDocument();
  });

  it('renders "Typy" heading when archive is "types"', () => {
    renderStandardArchive("types");

    expect(screen.getByRole("heading", { name: /Typy/i })).toBeInTheDocument();
  });

  it("renders archive items as links for tags archive", () => {
    renderStandardArchive("tags");

    const links = screen.getAllByRole("link");
    expect(links.length).toBe(ARCHIVE_TAGS.length);

    ARCHIVE_TAGS.forEach((tag) => {
      expect(
        screen.getByText(new RegExp(`^${tag.label}\\s`)),
      ).toBeInTheDocument();
    });
  });

  it("renders article count next to each tag item", () => {
    renderStandardArchive("tags");

    const turborepoCount = ARTICLES_CARD_MOCK.filter((a) =>
      a.tags.includes("Turborepo"),
    ).length;

    expect(
      screen.getByText(new RegExp(`Turborepo\\s*\\(${turborepoCount}\\)`)),
    ).toBeInTheDocument();
  });

  it("renders article count next to each category item", () => {
    renderStandardArchive("categories");

    const frontendCount = ARTICLES_CARD_MOCK.filter((a) =>
      a.categories.includes("Frontend"),
    ).length;

    expect(
      screen.getByText(new RegExp(`Frontend\\s*\\(${frontendCount}\\)`)),
    ).toBeInTheDocument();
  });

  it("generates links to /blog/archive/:archive/:slug", () => {
    renderStandardArchive("tags");

    const links = screen.getAllByRole("link");
    const firstLink = links[0];

    expect(firstLink.getAttribute("href")).toBe(
      ROUTES.blogArchiveSub("tags", ARCHIVE_TAGS[0].slug),
    );
  });

  it('renders "Nie znaleziono archiwum" for unknown archive type', () => {
    renderStandardArchive("unknown");

    expect(screen.getByText(/Nie znaleziono archiwum/i)).toBeInTheDocument();
  });
});
