import { describe, it, expect, beforeEach } from "vitest";
import { useBlogFilterStore, emptySections } from "./useBlogFilterStore";
import type { GroupedIds } from "./useBlogFilterStore";

const fullGrouped: GroupedIds = {
  categories: { frontend: ["react", "vue"], backend: ["node"] },
  tags: ["tag-a"],
  authors: ["author-1"],
  dates: ["2024-01"],
  types: ["article"],
};

describe("useBlogFilterStore", () => {
  beforeEach(() => {
    useBlogFilterStore.setState({ selectedIds: null });
    sessionStorage.clear();
    localStorage.clear();
  });

  it("has null selectedIds in initial state", () => {
    const { selectedIds } = useBlogFilterStore.getState();

    expect(selectedIds).toBeNull();
  });

  it("sets grouped selectedIds via setSelectedIds", () => {
    useBlogFilterStore.getState().setSelectedIds(fullGrouped);

    expect(useBlogFilterStore.getState().selectedIds).toEqual(fullGrouped);
  });

  it("replaces selectedIds on subsequent calls", () => {
    useBlogFilterStore.getState().setSelectedIds(fullGrouped);

    const replacement: GroupedIds = {
      categories: { devops: ["devops"] },
      tags: [],
      authors: ["author-2"],
      dates: [],
      types: ["video"],
    };
    useBlogFilterStore.getState().setSelectedIds(replacement);

    expect(useBlogFilterStore.getState().selectedIds).toEqual(replacement);
  });

  it("supports empty record (user deselected everything)", () => {
    useBlogFilterStore.getState().setSelectedIds(fullGrouped);
    useBlogFilterStore.getState().setSelectedIds(emptySections);

    expect(useBlogFilterStore.getState().selectedIds).toEqual(emptySections);
  });

  it("setSectionIds updates only one section", () => {
    useBlogFilterStore.getState().setSelectedIds(fullGrouped);
    useBlogFilterStore.getState().setSectionIds("tags", ["new-tag"]);

    const state = useBlogFilterStore.getState().selectedIds;

    expect(state).toEqual({
      ...fullGrouped,
      tags: ["new-tag"],
    });
  });

  it("persists grouped data to sessionStorage, not localStorage", () => {
    useBlogFilterStore.getState().setSelectedIds(fullGrouped);

    const session = sessionStorage.getItem("blog-filters");
    expect(session).not.toBeNull();
    expect(JSON.parse(session!).state.selectedIds).toEqual(fullGrouped);
    expect(localStorage.getItem("blog-filters")).toBeNull();
  });

  it("setCategoryGroupIds updates one category group", () => {
    useBlogFilterStore.getState().setSelectedIds(fullGrouped);
    useBlogFilterStore.getState().setCategoryGroupIds("frontend", ["angular"]);

    const state = useBlogFilterStore.getState().selectedIds;

    expect(state).toEqual({
      ...fullGrouped,
      categories: { frontend: ["angular"], backend: ["node"] },
    });
  });
});
