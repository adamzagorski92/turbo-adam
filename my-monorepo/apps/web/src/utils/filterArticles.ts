import type { FilterNode } from "@features/blog/SideTreeNavigation/types/menu.types";
import type { ArticleCard } from "@constans/articlesCardMock";
import type { GroupedIds, FilterSection } from "@stores/useBlogFilterStore";

/** Build a label→boolean lookup for a section based on selected IDs. */
function buildLabelSet(
  section: FilterNode,
  sectionIds: Set<string>,
): Set<string> {
  const labels = new Set<string>();
  const sectionId = section.id as FilterSection;

  for (const child of section.children ?? []) {
    if (sectionId === "categories") {
      if (child.children && child.children.length > 0) {
        if (child.children.some((sub) => sectionIds.has(sub.id))) {
          labels.add(child.label);
        }
      } else {
        if (sectionIds.has(child.id)) {
          labels.add(child.label);
        }
      }
    } else if (sectionId === "dates") {
      if (sectionIds.has(child.id)) {
        const [year, month] = child.id.split("/");
        labels.add(`${month}-${year}`);
      }
    } else {
      if (sectionIds.has(child.id)) {
        labels.add(child.label);
      }
    }
  }

  return labels;
}

function isAllEmpty(ids: GroupedIds): boolean {
  const { categories, ...rest } = ids;
  return (
    Object.values(categories).flat().length === 0 &&
    Object.values(rest).every((arr) => arr.length === 0)
  );
}

export function filterArticles(
  articles: ArticleCard[],
  tree: FilterNode[],
  selectedIds: GroupedIds | null,
): ArticleCard[] {
  if (selectedIds === null) return articles;
  if (isAllEmpty(selectedIds)) return [];

  const sectionChecks = tree.map((node) => {
    const sectionId = node.id as FilterSection;
    const ids =
      sectionId === "categories"
        ? Object.values(selectedIds.categories).flat()
        : selectedIds[sectionId];
    return { section: sectionId, allowed: buildLabelSet(node, new Set(ids)) };
  });

  return articles.filter((article) =>
    sectionChecks.every(({ section, allowed }) => {
      const values = article[section];
      if (values.length === 0) return true;
      return values.every((v) => allowed.has(v));
    }),
  );
}
