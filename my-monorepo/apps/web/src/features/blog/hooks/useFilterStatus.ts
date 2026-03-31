import { useMemo, useCallback } from "react";
import type { FilterNode } from "@features/blog/SideTreeNavigation/types/menu.types";
import type { GroupedIds } from "@stores/useBlogFilterStore";
import { useBlogFilterStore } from "@stores/useBlogFilterStore";
import {
  buildLeafIdsGrouped,
  groupedIdsEqual,
} from "@features/blog/SideTreeNavigation/hooks/useMenuStack";

export function useFilterStatus(tree: FilterNode[]) {
  const allLeafIdsGrouped = useMemo<GroupedIds>(
    () => buildLeafIdsGrouped(tree),
    [tree],
  );

  const storedIds = useBlogFilterStore((s) => s.selectedIds);
  const setSelectedIds = useBlogFilterStore((s) => s.setSelectedIds);

  const isModified = useMemo(
    () => storedIds !== null && !groupedIdsEqual(storedIds, allLeafIdsGrouped),
    [storedIds, allLeafIdsGrouped],
  );

  const reset = useCallback(() => {
    setSelectedIds(allLeafIdsGrouped);
  }, [setSelectedIds, allLeafIdsGrouped]);

  return { isModified, reset };
}
