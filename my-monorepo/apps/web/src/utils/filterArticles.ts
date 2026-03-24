import type { ArticleCard } from "@constans/articlesCardMock";
import type { GroupedIds } from "@stores/useBlogFilterStore";

const FLAT_KEYS = ["tags", "authors", "dates", "types"] as const;

export function filterArticles(
  articles: ArticleCard[],
  selectedIds: GroupedIds | null,
): ArticleCard[] {
  if (selectedIds === null) return articles;

  const activeCats = new Set(
    Object.entries(selectedIds.categories)
      .filter(([, ids]) => ids.length > 0)
      .map(([groupId]) => groupId),
  );

  const allowed: Record<string, Set<string>> = { categories: activeCats };
  for (const k of FLAT_KEYS) allowed[k] = new Set(selectedIds[k]);

  if (Object.values(allowed).every((s) => s.size === 0)) return [];

  const allKeys = ["categories", ...FLAT_KEYS] as const;
  return articles.filter((article) =>
    allKeys.every((key) => {
      const values = article[key];
      return values.length === 0 || values.every((v) => allowed[key].has(v));
    }),
  );
}
