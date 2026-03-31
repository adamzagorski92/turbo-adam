import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

import { TableOfContent } from "./TableOfContent";
import type { Heading } from "./useActiveHeading";

const mockHeadings: Heading[] = [
  { id: "introduction", text: "Introduction", level: 2 },
  { id: "background", text: "Background", level: 3 },
  { id: "conclusion", text: "Conclusion", level: 2 },
];

const mockUseActiveHeading =
  vi.fn<
    (
      containerSelector: string,
      contentKey: string,
    ) => { headings: Heading[]; activeId: string }
  >();

vi.mock("./useActiveHeading", () => ({
  useActiveHeading: (...args: [string, string]) =>
    mockUseActiveHeading(...args),
}));

const renderTableOfContent = (slug = "test-article") =>
  render(
    <MemoryRouter>
      <TableOfContent slug={slug} />
    </MemoryRouter>,
  );

describe("TableOfContent", () => {
  beforeEach(() => {
    mockUseActiveHeading.mockReturnValue({
      headings: mockHeadings,
      activeId: "introduction",
    });
  });

  it("returns null when there are no headings", () => {
    mockUseActiveHeading.mockReturnValue({ headings: [], activeId: "" });
    const { container } = renderTableOfContent();
    expect(container.innerHTML).toBe("");
  });

  it("renders navigation with correct aria-label", () => {
    renderTableOfContent();
    expect(
      screen.getByRole("navigation", { name: "Spis treści" }),
    ).toBeInTheDocument();
  });

  it("renders title heading", () => {
    renderTableOfContent();
    expect(
      screen.getByRole("heading", { name: "Spis treści" }),
    ).toBeInTheDocument();
  });

  it("renders all headings as links", () => {
    renderTableOfContent();
    expect(
      screen.getByRole("link", { name: "Introduction" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Background" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Conclusion" }),
    ).toBeInTheDocument();
  });

  it("sets correct href on links", () => {
    renderTableOfContent();
    expect(screen.getByRole("link", { name: "Introduction" })).toHaveAttribute(
      "href",
      "#introduction",
    );
    expect(screen.getByRole("link", { name: "Conclusion" })).toHaveAttribute(
      "href",
      "#conclusion",
    );
  });

  it("applies active class to the active heading", () => {
    renderTableOfContent();
    const activeLink = screen.getByRole("link", { name: "Introduction" });
    expect(activeLink.className).toContain("active");
  });

  it("does not apply active class to inactive headings", () => {
    renderTableOfContent();
    const inactiveLink = screen.getByRole("link", { name: "Conclusion" });
    expect(inactiveLink.className).not.toContain("active");
  });

  it("applies nested class to h3 headings", () => {
    renderTableOfContent();
    const nestedLink = screen.getByRole("link", { name: "Background" });
    expect(nestedLink.className).toContain("nested");
  });

  it("does not apply nested class to h2 headings", () => {
    renderTableOfContent();
    const h2Link = screen.getByRole("link", { name: "Introduction" });
    expect(h2Link.className).not.toContain("nested");
  });

  it("calls scrollIntoView on click", async () => {
    const user = userEvent.setup();
    const mockEl = document.createElement("div");
    mockEl.id = "introduction";
    mockEl.scrollIntoView = vi.fn();
    document.body.appendChild(mockEl);

    renderTableOfContent();
    await user.click(screen.getByRole("link", { name: "Introduction" }));

    expect(mockEl.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    });

    document.body.removeChild(mockEl);
  });

  it("passes slug to useActiveHeading", () => {
    renderTableOfContent("my-article");
    expect(mockUseActiveHeading).toHaveBeenCalledWith("article", "my-article");
  });
});
