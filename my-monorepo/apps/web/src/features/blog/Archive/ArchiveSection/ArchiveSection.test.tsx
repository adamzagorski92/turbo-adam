import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router";
import ArchiveSection from "./ArchiveSection";

const fewItems = [
  { key: "1", label: "Item 1", to: "/item-1" },
  { key: "2", label: "Item 2", to: "/item-2" },
];

const manyItems = [
  { key: "1", label: "Item 1", to: "/item-1" },
  { key: "2", label: "Item 2", to: "/item-2" },
  { key: "3", label: "Item 3", to: "/item-3" },
  { key: "4", label: "Item 4", to: "/item-4" },
  { key: "5", label: "Item 5", to: "/item-5" },
];

describe("ArchiveSection", () => {
  it("renders heading as h3 when heading prop is provided", () => {
    render(
      <MemoryRouter>
        <ArchiveSection heading="Daty" items={fewItems} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { level: 3, name: "Daty" }),
    ).toBeInTheDocument();
  });

  it("does not render heading when heading prop is omitted", () => {
    render(
      <MemoryRouter>
        <ArchiveSection items={fewItems} />
      </MemoryRouter>,
    );

    expect(screen.queryByRole("heading", { level: 3 })).not.toBeInTheDocument();
  });

  it("renders all items as links when items.length <= 3", () => {
    render(
      <MemoryRouter>
        <ArchiveSection items={fewItems} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Item 1" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Item 2" })).toBeInTheDocument();
  });

  it("renders only first 3 items when items.length > 3 (initially collapsed)", () => {
    render(
      <MemoryRouter>
        <ArchiveSection items={manyItems} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Item 1" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Item 2" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Item 3" })).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Item 4" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Item 5" }),
    ).not.toBeInTheDocument();
  });

  it('shows "Pokaż wszystkie" button when items.length > 3', () => {
    render(
      <MemoryRouter>
        <ArchiveSection items={manyItems} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("button", { name: "Pokaż wszystkie" }),
    ).toBeInTheDocument();
  });

  it('does not show "Pokaż wszystkie" button when items.length <= 3', () => {
    render(
      <MemoryRouter>
        <ArchiveSection items={fewItems} />
      </MemoryRouter>,
    );

    expect(
      screen.queryByRole("button", { name: "Pokaż wszystkie" }),
    ).not.toBeInTheDocument();
  });

  it('shows all items and changes button text to "Zwiń" after clicking "Pokaż wszystkie"', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ArchiveSection items={manyItems} />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "Pokaż wszystkie" }));

    expect(screen.getByRole("link", { name: "Item 4" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Item 5" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Zwiń" })).toBeInTheDocument();
  });

  it('collapses back to 3 items after clicking "Zwiń"', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ArchiveSection items={manyItems} />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "Pokaż wszystkie" }));
    await user.click(screen.getByRole("button", { name: "Zwiń" }));

    expect(screen.getByRole("link", { name: "Item 1" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Item 2" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Item 3" })).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Item 4" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Item 5" }),
    ).not.toBeInTheDocument();
  });
});
