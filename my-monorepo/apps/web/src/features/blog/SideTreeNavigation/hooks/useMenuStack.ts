import { useCallback, useEffect, useMemo, useState } from "react";
import type { FilterNode, NavLevel } from "../types/menu.types";

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

export function useFilterNavigation(tree: FilterNode[], rootLabel: string) {
  const [stack, setStack] = useState<NavLevel[]>([
    { label: rootLabel, items: tree },
  ]);

  useEffect(() => {
    setStack([{ label: rootLabel, items: tree }]);
  }, [tree, rootLabel]);

  const allLeafIds = useMemo(() => collectLeafIds(tree), [tree]);

  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(allLeafIds),
  );

  const current = stack[stack.length - 1];
  const breadcrumbs = stack.map((lvl) => lvl.label);
  const isRoot = stack.length <= 1;

  const goDeeper = useCallback((node: FilterNode) => {
    if (!node.children) return;
    setStack((prev) => [...prev, { label: node.label, items: node.children! }]);
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
    setSelected((prev) => {
      const next = new Set(prev);
      const allChecked = currentLeafIds.every((id) => next.has(id));
      for (const id of currentLeafIds) {
        if (allChecked) next.delete(id);
        else next.add(id);
      }
      return next;
    });
  }, [currentLeafIds]);

  const getNodeLeafIds = useCallback((node: FilterNode): string[] => {
    return node.children ? collectLeafIds(node.children) : [node.id];
  }, []);

  const isNodeSelected = useCallback(
    (node: FilterNode) => {
      const ids = getNodeLeafIds(node);
      return ids.every((id) => selected.has(id));
    },
    [selected, getNodeLeafIds],
  );

  const toggleNode = useCallback(
    (node: FilterNode) => {
      const ids = getNodeLeafIds(node);
      setSelected((prev) => {
        const next = new Set(prev);
        const allChecked = ids.every((id) => next.has(id));
        for (const id of ids) {
          if (allChecked) next.delete(id);
          else next.add(id);
        }
        return next;
      });
    },
    [getNodeLeafIds],
  );

  const snapshot = useMemo(() => [...selected], [selected]);

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
    snapshot,
  };
}
