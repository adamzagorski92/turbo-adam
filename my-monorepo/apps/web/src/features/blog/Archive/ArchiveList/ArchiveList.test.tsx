import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

import ArchiveList from "./ArchiveList";

describe("ArchiveList", () => {
  it("renders heading with provided text", () => {
    render(
      <ArchiveList heading="Test heading">
        <li>Item</li>
      </ArchiveList>,
    );

    expect(
      screen.getByRole("heading", { name: /Test heading/i }),
    ).toBeInTheDocument();
  });

  it("renders children inside a list", () => {
    render(
      <ArchiveList heading="Heading">
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

  it("renders a section with aria-label matching heading", () => {
    render(
      <ArchiveList heading="Tagi">
        <li>Item</li>
      </ArchiveList>,
    );

    const section = screen.getByRole("region", { name: /Tagi/i });
    expect(section).toBeInTheDocument();
  });
});
