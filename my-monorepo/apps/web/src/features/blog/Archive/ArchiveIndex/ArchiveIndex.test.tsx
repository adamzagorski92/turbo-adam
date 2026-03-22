import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router";
import { ArchiveIndex } from "./ArchiveIndex";
import {
  ARCHIVE_CONFIG,
  ARCHIVE_DATES,
  ARCHIVE_YEARS,
} from "@constans/archiveMock";
import { ROUTES } from "@constans/routes";

const renderArchiveIndex = () =>
  render(
    <MemoryRouter>
      <ArchiveIndex />
    </MemoryRouter>,
  );

describe("ArchiveIndex", () => {
  it('renders "Archiwum" heading', () => {
    renderArchiveIndex();

    expect(
      screen.getByRole("heading", { name: /Archiwum/i }),
    ).toBeInTheDocument();
  });

  it("renders links for all standard archive types from ARCHIVE_CONFIG", () => {
    renderArchiveIndex();

    Object.entries(ARCHIVE_CONFIG).forEach(([key, config]) => {
      const link = screen.getByRole("link", {
        name: new RegExp(config.heading, "i"),
      });
      expect(link).toHaveAttribute("href", ROUTES.blogArchiveType(key));
    });
  });

  it("renders a dates section with date links", () => {
    renderArchiveIndex();

    const sampleDate = ARCHIVE_DATES.find((d) => d.slug === "2026/sty")!;
    expect(
      screen.getByRole("link", { name: new RegExp(sampleDate.label, "i") }),
    ).toHaveAttribute("href", `${ROUTES.blogArchive}/${sampleDate.slug}`);
  });

  it("renders dates heading", () => {
    renderArchiveIndex();

    expect(screen.getByRole("heading", { name: /Daty/i })).toBeInTheDocument();
  });

  it("renders years heading", () => {
    renderArchiveIndex();

    expect(screen.getByRole("heading", { name: /Lata/i })).toBeInTheDocument();
  });

  it("renders unique year links pointing to /blog/archive/:year", () => {
    renderArchiveIndex();

    ARCHIVE_YEARS.forEach((year) => {
      const link = screen.getByRole("link", { name: year });
      expect(link).toHaveAttribute("href", ROUTES.blogArchiveType(year));
    });
  });

  it("renders correct number of year links", () => {
    renderArchiveIndex();

    const yearLinks = ARCHIVE_YEARS.map((year) =>
      screen.getByRole("link", { name: year }),
    );
    expect(yearLinks.length).toBe(ARCHIVE_YEARS.length);
  });
});
