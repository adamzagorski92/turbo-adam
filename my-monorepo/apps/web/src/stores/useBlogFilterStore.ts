import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type FilterSection =
  | "categories"
  | "tags"
  | "authors"
  | "dates"
  | "types";

export type GroupedIds = {
  categories: Record<string, string[]>;
  tags: string[];
  authors: string[];
  dates: string[];
  types: string[];
};

interface BlogFilterState {
  selectedIds: GroupedIds | null;
  setSelectedIds: (ids: GroupedIds) => void;
  setSectionIds: (
    section: Exclude<FilterSection, "categories">,
    ids: string[],
  ) => void;
  setCategoryGroupIds: (group: string, ids: string[]) => void;
}

const emptySections: GroupedIds = {
  categories: {},
  tags: [],
  authors: [],
  dates: [],
  types: [],
};

export const useBlogFilterStore = create<BlogFilterState>()(
  persist(
    (set, get) => ({
      selectedIds: null,
      setSelectedIds: (ids) => set({ selectedIds: ids }),
      setSectionIds: (section, ids) =>
        set({
          selectedIds: {
            ...(get().selectedIds ?? emptySections),
            [section]: ids,
          },
        }),
      setCategoryGroupIds: (group, ids) =>
        set({
          selectedIds: {
            ...(get().selectedIds ?? emptySections),
            categories: {
              ...(get().selectedIds ?? emptySections).categories,
              [group]: ids,
            },
          },
        }),
    }),
    { name: "blog-filters", storage: createJSONStorage(() => sessionStorage) },
  ),
);
