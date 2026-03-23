import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

import ArchiveList from "./ArchiveList";

describe("ArchiveList", () => {
  it("renders heading with provided text", () => {
    render(
      <ArchiveList heading="Test heading" ariaLabel="Test heading">
        <li>Item</li>
      </ArchiveList>,
    );

    expect(
      screen.getByRole("heading", { name: /Test heading/i }),
    ).toBeInTheDocument();
  });

  it("does not render heading when heading is omitted", () => {
    render(
      <ArchiveList ariaLabel="Tagi">
        <li>Item</li>
      </ArchiveList>,
    );

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renders children inside a list", () => {
    render(
      <ArchiveList ariaLabel="Heading">
        <li>First</li>
        <li>Second</li>
      </ArchiveList>,
    );

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(2);
    expect(items[0]).toHaveTextContent("First");
    expect(items[1]).toHaveTextContent("Second");
  });

  it("renders a section with aria-label", () => {
    render(
      <ArchiveList ariaLabel="Tagi">
        <li>Item</li>
      </ArchiveList>,
    );

    const section = screen.getByRole("region", { name: /Tagi/i });
    expect(section).toBeInTheDocument();
  });
});
