import { useCallback, useEffect, useMemo, useState } from "react";
import type { FilterNode, NavLevel } from "../types/menu.types";
import {
  useBlogFilterStore,
  type GroupedIds,
  type FilterSection,
} from "@stores/useBlogFilterStore";

function collectLeafIds(nodes: FilterNode[]): string[] {
  const ids: string[] = [];
  for (const node of nodes) {
    if (node.children) {
      ids.push(...collectLeafIds(node.children));
    } else {
      ids.push(node.id);
    }
  }
  return ids;
}

function getNodeLeafIds(node: FilterNode): string[] {
  return node.children ? collectLeafIds(node.children) : [node.id];
}

function toggleIds(current: Set<string>, idsToToggle: string[]): string[] {
  const allSelected = idsToToggle.every((id) => current.has(id));
  for (const id of idsToToggle) {
    if (allSelected) current.delete(id);
    else current.add(id);
  }
  return [...current];
}

export function useFilterNavigation(tree: FilterNode[], rootLabel: string) {
  const [stack, setStack] = useState<NavLevel[]>([
    { label: rootLabel, items: tree },
  ]);

  useEffect(() => {
    setStack([{ label: rootLabel, items: tree }]);
  }, [tree, rootLabel]);

  const allLeafIdsGrouped = useMemo<GroupedIds>(() => {
    const result: GroupedIds = {
      categories: {},
      tags: [],
      authors: [],
      dates: [],
      types: [],
    };
    for (const section of tree) {
      const sectionId = section.id as FilterSection;
      if (sectionId === "categories") {
        const catRecord: Record<string, string[]> = {};
        for (const child of section.children ?? []) {
          catRecord[child.id] = child.children
            ? collectLeafIds(child.children)
            : [child.id];
        }
        result.categories = catRecord;
      } else {
        const key = sectionId as Exclude<FilterSection, "categories">;
        result[key] = collectLeafIds(section.children ?? []);
      }
    }
    return result;
  }, [tree]);

  const storedIds = useBlogFilterStore((s) => s.selectedIds);
  const setStoredIds = useBlogFilterStore((s) => s.setSelectedIds);

  // null = first visit (never persisted) → default to all selected
  useEffect(() => {
    if (storedIds === null) {
      setStoredIds(allLeafIdsGrouped);
    }
  }, [storedIds, allLeafIdsGrouped, setStoredIds]);

  const selected = useMemo(() => {
    const ids = storedIds ?? allLeafIdsGrouped;
    const { categories, ...rest } = ids;
    return new Set([
      ...Object.values(categories).flat(),
      ...Object.values(rest).flat(),
    ]);
  }, [storedIds, allLeafIdsGrouped]);

  const current = stack[stack.length - 1];
  const breadcrumbs = stack.map((lvl) => lvl.label);
  const isRoot = stack.length <= 1;

  const goDeeper = useCallback((node: FilterNode) => {
    if (!node.children) return;
    setStack((prev) => [
      ...prev,
      { id: node.id, label: node.label, items: node.children! },
    ]);
  }, []);

  const goBack = useCallback(() => {
    setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const currentLeafIds = useMemo(
    () => collectLeafIds(current.items),
    [current],
  );

  const isAllCurrentSelected = useMemo(
    () => currentLeafIds.every((id) => selected.has(id)),
    [currentLeafIds, selected],
  );

  const toggleAllCurrent = useCallback(() => {
    const sectionId = stack[1]?.id as FilterSection | undefined;
    if (!sectionId) return;

    if (sectionId === "categories") {
      const groupId = stack[2]?.id;
      if (groupId) {
        const { selectedIds, setCategoryGroupIds } =
          useBlogFilterStore.getState();
        const groupIds =
          selectedIds?.categories[groupId] ??
          allLeafIdsGrouped.categories[groupId] ??
          [];
        setCategoryGroupIds(
          groupId,
          toggleIds(new Set(groupIds), currentLeafIds),
        );
      } else {
        const { selectedIds, setSelectedIds } = useBlogFilterStore.getState();
        const defaults = allLeafIdsGrouped.categories;
        const currentCats = selectedIds?.categories ?? defaults;
        const allCatIds = new Set(Object.values(currentCats).flat());
        const allChecked = currentLeafIds.every((id) => allCatIds.has(id));
        const newCats = Object.fromEntries(
          Object.entries(defaults).map(([key, defaultIds]) => [
            key,
            allChecked ? [] : [...defaultIds],
          ]),
        );
        setSelectedIds({
          ...(selectedIds ?? allLeafIdsGrouped),
          categories: newCats,
        });
      }
    } else {
      const { selectedIds, setSectionIds } = useBlogFilterStore.getState();
      const sectionIds =
        selectedIds?.[sectionId] ?? (allLeafIdsGrouped[sectionId] as string[]);
      setSectionIds(
        sectionId as Exclude<FilterSection, "categories">,
        toggleIds(new Set(sectionIds), currentLeafIds),
      );
    }
  }, [currentLeafIds, allLeafIdsGrouped, stack]);

  const isNodeSelected = useCallback(
    (node: FilterNode) => {
      const ids = getNodeLeafIds(node);
      return ids.every((id) => selected.has(id));
    },
    [selected],
  );

  const toggleNode = useCallback(
    (node: FilterNode) => {
      const ids = getNodeLeafIds(node);
      const sectionId = stack[1]?.id as FilterSection | undefined;
      if (!sectionId) return;

      if (sectionId === "categories") {
        const groupId = stack[2]?.id ?? node.id;
        const { selectedIds, setCategoryGroupIds } =
          useBlogFilterStore.getState();
        const groupIds =
          selectedIds?.categories[groupId] ??
          allLeafIdsGrouped.categories[groupId] ??
          [];
        setCategoryGroupIds(groupId, toggleIds(new Set(groupIds), ids));
      } else {
        const { selectedIds, setSectionIds } = useBlogFilterStore.getState();
        const sectionIds =
          selectedIds?.[sectionId] ??
          (allLeafIdsGrouped[sectionId] as string[]);
        setSectionIds(
          sectionId as Exclude<FilterSection, "categories">,
          toggleIds(new Set(sectionIds), ids),
        );
      }
    },
    [allLeafIdsGrouped, stack],
  );

  return {
    current,
    breadcrumbs,
    isRoot,
    goDeeper,
    goBack,
    isAllCurrentSelected,
    toggleAllCurrent,
    isNodeSelected,
    toggleNode,
  };
}
