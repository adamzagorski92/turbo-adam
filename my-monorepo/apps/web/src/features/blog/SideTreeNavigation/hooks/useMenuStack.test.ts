import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFilterNavigation } from "./useMenuStack";
import { useBlogFilterStore } from "@stores/useBlogFilterStore";
import type { FilterNode } from "../types/menu.types";
import type { GroupedIds } from "@stores/useBlogFilterStore";

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
      {
        id: "backend",
        label: "Backend",
        children: [{ id: "node", label: "Node" }],
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
  {
    id: "authors",
    label: "Autorzy",
    children: [{ id: "author-1", label: "Author 1" }],
  },
];

const allDefaults: GroupedIds = {
  categories: { frontend: ["react", "vue"], backend: ["node"] },
  tags: ["tag-a", "tag-b"],
  authors: ["author-1"],
  dates: [],
  types: [],
};

describe("isSectionModified", () => {
  beforeEach(() => {
    useBlogFilterStore.setState({ selectedIds: null });
    sessionStorage.clear();
  });

  it("returns false when storedIds is null (first visit, defaults applied)", () => {
    const { result } = renderHook(() => useFilterNavigation(tree, "Filtry"));

    expect(result.current.isSectionModified("tags")).toBe(false);
  });

  it("returns false when storedIds exactly matches all leaf IDs for that section", () => {
    const { result } = renderHook(() => useFilterNavigation(tree, "Filtry"));

    act(() => {
      useBlogFilterStore.getState().setSelectedIds({ ...allDefaults });
    });

    expect(result.current.isSectionModified("tags")).toBe(false);
  });

  it("returns true when a flat section has fewer IDs than default", () => {
    const { result } = renderHook(() => useFilterNavigation(tree, "Filtry"));

    act(() => {
      useBlogFilterStore.getState().setSelectedIds({
        ...allDefaults,
        tags: ["tag-a"],
      });
    });

    expect(result.current.isSectionModified("tags")).toBe(true);
  });

  it("returns true when a flat section has different IDs than default", () => {
    const { result } = renderHook(() => useFilterNavigation(tree, "Filtry"));

    act(() => {
      useBlogFilterStore.getState().setSelectedIds({
        ...allDefaults,
        tags: ["tag-a", "tag-unknown"],
      });
    });

    expect(result.current.isSectionModified("tags")).toBe(true);
  });

  it("returns true when a category group has fewer IDs than default", () => {
    const { result } = renderHook(() => useFilterNavigation(tree, "Filtry"));

    act(() => {
      useBlogFilterStore.getState().setSelectedIds({
        ...allDefaults,
        categories: { frontend: ["react"], backend: ["node"] },
      });
    });

    expect(result.current.isSectionModified("categories")).toBe(true);
  });

  it("returns false for a section with all IDs even when another section is modified", () => {
    const { result } = renderHook(() => useFilterNavigation(tree, "Filtry"));

    act(() => {
      useBlogFilterStore.getState().setSelectedIds({
        ...allDefaults,
        tags: ["tag-a"],
      });
    });

    expect(result.current.isSectionModified("authors")).toBe(false);
  });
});
