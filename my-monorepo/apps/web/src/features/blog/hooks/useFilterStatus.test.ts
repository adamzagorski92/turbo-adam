import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFilterStatus } from "./useFilterStatus";
import { useBlogFilterStore } from "@stores/useBlogFilterStore";
import type { FilterNode } from "@features/blog/SideTreeNavigation/types/menu.types";
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

describe("useFilterStatus", () => {
  beforeEach(() => {
    useBlogFilterStore.setState({ selectedIds: null });
    sessionStorage.clear();
  });

  it("returns isModified false when storedIds is null", () => {
    const { result } = renderHook(() => useFilterStatus(tree));

    expect(result.current.isModified).toBe(false);
  });

  it("returns isModified false when storedIds matches all defaults", () => {
    const { result } = renderHook(() => useFilterStatus(tree));

    act(() => {
      useBlogFilterStore.getState().setSelectedIds(allDefaults);
    });

    expect(result.current.isModified).toBe(false);
  });

  it("returns isModified true when a flat section has fewer IDs", () => {
    const { result } = renderHook(() => useFilterStatus(tree));

    act(() => {
      useBlogFilterStore.getState().setSelectedIds({
        ...allDefaults,
        tags: ["tag-a"],
      });
    });

    expect(result.current.isModified).toBe(true);
  });

  it("returns isModified true when categories are modified", () => {
    const { result } = renderHook(() => useFilterStatus(tree));

    act(() => {
      useBlogFilterStore.getState().setSelectedIds({
        ...allDefaults,
        categories: { frontend: ["react"], backend: ["node"] },
      });
    });

    expect(result.current.isModified).toBe(true);
  });

  it("resets storedIds to allLeafIdsGrouped when reset is called", () => {
    const { result } = renderHook(() => useFilterStatus(tree));

    act(() => {
      useBlogFilterStore.getState().setSelectedIds({
        ...allDefaults,
        tags: ["tag-a"],
      });
    });

    act(() => {
      result.current.reset();
    });

    expect(useBlogFilterStore.getState().selectedIds).toEqual(allDefaults);
  });
});
