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
  isFiltering: boolean;
  setSelectedIds: (ids: GroupedIds) => void;
  setSearchQuery: (query: string) => void;
  setSectionIds: (
    section: Exclude<FilterSection, "categories">,
    ids: string[],
  ) => void;
  setCategoryGroupIds: (group: string, ids: string[]) => void;
}

const FILTER_DEBOUNCE_MS = 300;
let filterTimer: ReturnType<typeof setTimeout> | undefined;

export const emptySections = Object.fromEntries(
  SECTION_DEFS.map((def) => [def.id, "nested" in def && def.nested ? {} : []]),
) as GroupedIds;

export const useBlogFilterStore = create<BlogFilterState>()(
  persist(
    (set, get) => {
      const markFiltering = () => {
        clearTimeout(filterTimer);
        set({ isFiltering: true });
        filterTimer = setTimeout(
          () => set({ isFiltering: false }),
          FILTER_DEBOUNCE_MS,
        );
      };

      return {
        selectedIds: null,
        searchQuery: "",
        isFiltering: false,
        setSelectedIds: (ids) => {
          set({ selectedIds: ids });
          markFiltering();
        },
        setSearchQuery: (query) => {
          set({ searchQuery: query });
          markFiltering();
        },
        setSectionIds: (section, ids) => {
          set({
            selectedIds: {
              ...(get().selectedIds ?? emptySections),
              [section]: ids,
            },
          });
          markFiltering();
        },
        setCategoryGroupIds: (group, ids) => {
          set({
            selectedIds: {
              ...(get().selectedIds ?? emptySections),
              categories: {
                ...(get().selectedIds ?? emptySections).categories,
                [group]: ids,
              },
            },
          });
          markFiltering();
        },
      };
    },
    {
      name: "blog-filters",
      storage: createJSONStorage(() => sessionStorage),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      partialize: ({ searchQuery, isFiltering, ...rest }) => rest,
    },
  ),
);
