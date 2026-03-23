import { describe, it, expect, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, within, act } from "@testing-library/react";
import SideTreeNavigation from "./SideTreeNavigation";
import { useBlogFilterStore } from "@stores/useBlogFilterStore";
import type { FilterNode } from "./types/menu.types";

const tree: FilterNode[] = [
  {
    id: "categories",
    label: "Kategorie",
    children: [
      {
        id: "frontend",
        label: "Frontend",
        children: [
          { id: "react", label: "React" },
          { id: "vue", label: "Vue" },
        ],
      },
    ],
  },
  {
    id: "tags",
    label: "Tagi",
    children: [
      { id: "tag-a", label: "Tag A" },
      { id: "tag-b", label: "Tag B" },
    ],
  },
];

describe("SideTreeNavigation badge", () => {
  beforeEach(() => {
    useBlogFilterStore.setState({ selectedIds: null });
  });

  it("does not show badge when selectedIds is null (default state)", () => {
    render(<SideTreeNavigation tree={tree} />);

    expect(screen.queryByLabelText("filtr zmieniony")).not.toBeInTheDocument();
  });

  it("shows badge on modified section (tags partially selected)", () => {
    render(<SideTreeNavigation tree={tree} />);

    act(() => {
      useBlogFilterStore.getState().setSelectedIds({
        categories: { frontend: ["react", "vue"] },
        tags: ["tag-a"],
        authors: [],
        dates: [],
        types: [],
      });
    });

    const tagiButton = screen.getByRole("button", { name: /Tagi/ });
    const li = tagiButton.closest("li")!;
    expect(within(li).getByLabelText("filtr zmieniony")).toBeInTheDocument();
  });

  it("does not show badge on unmodified section when another section is modified", () => {
    render(<SideTreeNavigation tree={tree} />);

    act(() => {
      useBlogFilterStore.getState().setSelectedIds({
        categories: { frontend: ["react", "vue"] },
        tags: ["tag-a"],
        authors: [],
        dates: [],
        types: [],
      });
    });

    const kategorieButton = screen.getByRole("button", { name: /Kategorie/ });
    const li = kategorieButton.closest("li")!;
    expect(
      within(li).queryByLabelText("filtr zmieniony"),
    ).not.toBeInTheDocument();
  });

  it("shows badge on categories when a subcategory is removed", () => {
    render(<SideTreeNavigation tree={tree} />);

    act(() => {
      useBlogFilterStore.getState().setSelectedIds({
        categories: { frontend: ["react"] },
        tags: ["tag-a", "tag-b"],
        authors: [],
        dates: [],
        types: [],
      });
    });

    const kategorieButton = screen.getByRole("button", { name: /Kategorie/ });
    const li = kategorieButton.closest("li")!;
    expect(within(li).getByLabelText("filtr zmieniony")).toBeInTheDocument();
  });
});
