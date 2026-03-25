import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SECTION_DEFS } from "@constans/blogData";

export type { FilterSection } from "@constans/blogData";
import type { FilterSection } from "@constans/blogData";

export type GroupedIds = {
  categories: Record<string, string[]>;
  tags: string[];
  authors: string[];
  dates: string[];
  types: string[];
};

interface BlogFilterState {
  selectedIds: GroupedIds | null;
  searchQuery: string;
  setSelectedIds: (ids: GroupedIds) => void;
  setSearchQuery: (query: string) => void;
  setSectionIds: (
    section: Exclude<FilterSection, "categories">,
    ids: string[],
  ) => void;
  setCategoryGroupIds: (group: string, ids: string[]) => void;
}

export const emptySections = Object.fromEntries(
  SECTION_DEFS.map((def) => [def.id, "nested" in def && def.nested ? {} : []]),
) as GroupedIds;

export const useBlogFilterStore = create<BlogFilterState>()(
  persist(
    (set, get) => ({
      selectedIds: null,
      searchQuery: "",
      setSelectedIds: (ids) => set({ selectedIds: ids }),
      setSearchQuery: (query) => set({ searchQuery: query }),
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
    {
      name: "blog-filters",
      storage: createJSONStorage(() => sessionStorage),
      partialize: ({ searchQuery, ...rest }) => rest,
    },
  ),
);
