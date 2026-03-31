import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router";
import { ArchiveIndex } from "./ArchiveIndex";
import { ARCHIVE_YEARS } from "@utils/archiveConfig";
import { PUBLICATION_DATES, BLOG_SECTIONS } from "@constans/blogData";
import { ROUTES } from "@constans/routes";

const MAX_VISIBLE = 12;

const ARCHIVE_SECTION_IDS = ["tags", "categories", "authors", "types"];
const archiveSections = BLOG_SECTIONS.filter((s) =>
  ARCHIVE_SECTION_IDS.includes(s.id),
);

const renderArchiveIndex = () =>
  render(
    <MemoryRouter>
      <ArchiveIndex />
    </MemoryRouter>,
  );

describe("ArchiveIndex", () => {
  it('renders "Typy" section heading', () => {
    renderArchiveIndex();

    expect(screen.getByRole("heading", { name: /Typy/i })).toBeInTheDocument();
  });

  it("renders all archive type links", () => {
    renderArchiveIndex();

    archiveSections.forEach((section) => {
      const link = screen.getByRole("link", {
        name: new RegExp(section.label, "i"),
      });
      expect(link).toHaveAttribute("href", ROUTES.blogArchiveType(section.id));
    });
  });

  it("renders section headings for Daty and Lata", () => {
    renderArchiveIndex();

    expect(screen.getByRole("heading", { name: /Daty/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Lata/i })).toBeInTheDocument();
  });

  it("truncates dates section to 12 items and shows toggle button", () => {
    renderArchiveIndex();

    const reversedDates = [...PUBLICATION_DATES].reverse();
    reversedDates.slice(0, MAX_VISIBLE).forEach((date) => {
      expect(
        screen.getByRole("link", { name: new RegExp(date.label, "i") }),
      ).toBeInTheDocument();
    });

    reversedDates.slice(MAX_VISIBLE).forEach((date) => {
      expect(
        screen.queryByRole("link", { name: new RegExp(date.label, "i") }),
      ).not.toBeInTheDocument();
    });

    expect(
      screen.getByRole("button", { name: /Pokaż wszystkie/i }),
    ).toBeInTheDocument();
  });

  it("expands all dates after clicking toggle", async () => {
    renderArchiveIndex();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /Pokaż wszystkie/i }));

    const reversedDates = [...PUBLICATION_DATES].reverse();
    reversedDates.forEach((date) => {
      expect(
        screen.getByRole("link", { name: new RegExp(date.label, "i") }),
      ).toHaveAttribute("href", `${ROUTES.blogArchive}/${date.id}`);
    });
  });

  it("collapses dates back after clicking toggle twice", async () => {
    renderArchiveIndex();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /Pokaż wszystkie/i }));
    await user.click(screen.getByRole("button", { name: /Zwiń/i }));

    expect(
      screen.getByRole("button", { name: /Pokaż wszystkie/i }),
    ).toBeInTheDocument();
  });

  it("renders all year links", () => {
    renderArchiveIndex();

    ARCHIVE_YEARS.forEach((year) => {
      const link = screen.getByRole("link", { name: year });
      expect(link).toHaveAttribute("href", ROUTES.blogArchiveType(year));
    });
  });
});
