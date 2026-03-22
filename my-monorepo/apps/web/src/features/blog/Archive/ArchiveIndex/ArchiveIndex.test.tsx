import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("renders first 3 archive type links initially", () => {
    renderArchiveIndex();

    const entries = Object.entries(ARCHIVE_CONFIG);
    entries.slice(0, 3).forEach(([key, config]) => {
      const link = screen.getByRole("link", {
        name: new RegExp(config.heading, "i"),
      });
      expect(link).toHaveAttribute("href", ROUTES.blogArchiveType(key));
    });
  });

  it('shows all archive types after clicking "Pokaż wszystkie"', async () => {
    renderArchiveIndex();
    const user = userEvent.setup();

    const buttons = screen.getAllByRole("button", {
      name: /Pokaż wszystkie/i,
    });
    await user.click(buttons[0]);

    Object.entries(ARCHIVE_CONFIG).forEach(([key, config]) => {
      const link = screen.getByRole("link", {
        name: new RegExp(config.heading, "i"),
      });
      expect(link).toHaveAttribute("href", ROUTES.blogArchiveType(key));
    });
  });

  it("renders first 3 reversed date links initially", () => {
    renderArchiveIndex();

    const reversedDates = [...ARCHIVE_DATES].reverse();
    reversedDates.slice(0, 3).forEach((date) => {
      expect(
        screen.getByRole("link", { name: new RegExp(date.label, "i") }),
      ).toHaveAttribute("href", `${ROUTES.blogArchive}/${date.slug}`);
    });
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

  it('renders "Pokaż wszystkie" buttons for sections with more than 3 items', () => {
    renderArchiveIndex();

    const buttons = screen.getAllByRole("button", {
      name: /Pokaż wszystkie/i,
    });
    expect(buttons.length).toBe(2);
  });

  it('collapses section back after clicking "Zwiń"', async () => {
    renderArchiveIndex();
    const user = userEvent.setup();

    const showAllButtons = screen.getAllByRole("button", {
      name: /Pokaż wszystkie/i,
    });
    await user.click(showAllButtons[0]);

    const collapseButton = screen.getByRole("button", { name: /Zwiń/i });
    await user.click(collapseButton);

    expect(
      screen.getAllByRole("button", { name: /Pokaż wszystkie/i }).length,
    ).toBe(2);
  });
});
