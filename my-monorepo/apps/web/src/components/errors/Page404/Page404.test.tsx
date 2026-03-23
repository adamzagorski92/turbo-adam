import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import Page404 from "./Page404";

describe("Page404 component", () => {
  it("renders without crashing", () => {
    render(<Page404 i18nKey="blog.articleNotFound" />);

    expect(screen.getByText("Nie znaleziono artykułu.")).toBeInTheDocument();
  });

  it("displays the correct message based on i18nKey", () => {
    render(<Page404 i18nKey="blog.archiveNotFound" />);

    expect(screen.getByText("Nie znaleziono archiwum")).toBeInTheDocument();
  });

  it("renders inside a paragraph element", () => {
    render(<Page404 i18nKey="blog.articleNotFound" />);

    const paragraph = screen.getByText("Nie znaleziono artykułu.");
    expect(paragraph.tagName).toBe("P");
  });
});
