import type { ArticleCard } from "@constans/articlesCardMock";
import type { BlogEntity, DateId } from "@constans/blogData";
import { ROUTES } from "@constans/routes";
import type { ArchiveLinkItem } from "../ArchiveLinks/ArchiveLinks";

interface ArchiveConfigEntry {
  heading: string;
  items: readonly BlogEntity[];
  field: keyof ArticleCard;
}

type ArchiveResult =
  | { kind: "items"; ariaLabel: string; items: ArchiveLinkItem[] }
  | { kind: "not-found" };

export const toArticleItems = (articles: ArticleCard[]): ArchiveLinkItem[] =>
  articles.map((a) => ({
    key: String(a.id),
    label: a.title,
    to: ROUTES.blogArticle(a.slug),
  }));

export const resolveArchive = (
  articles: ArticleCard[],
  archiveConfig: Record<string, ArchiveConfigEntry>,
  archiveDates: BlogEntity[],
  archive?: string,
  sub?: string,
): ArchiveResult => {
  if (!archive) return { kind: "not-found" };

  const config = archiveConfig[archive];

  if (sub && config) {
    const item = config.items.find((i) => i.id === sub);
    if (!item) return { kind: "not-found" };

    const filtered = articles.filter((a) =>
      (a[config.field] as string[]).includes(item.id),
    );
    return {
      kind: "items",
      ariaLabel: item.label,
      items: toArticleItems(filtered),
    };
  }

  if (sub) {
    const dateEntry = archiveDates.find((d) => d.id === `${archive}/${sub}`);
    if (!dateEntry) return { kind: "not-found" };

    const dateId = `${archive}/${sub}` as DateId;
    const filtered = articles.filter((a) => a.dates.includes(dateId));
    return {
      kind: "items",
      ariaLabel: dateEntry.label,
      items: toArticleItems(filtered),
    };
  }

  if (config) {
    const { heading, items, field } = config;
    const linkItems: ArchiveLinkItem[] = items.map((item) => {
      const count = articles.filter((a) =>
        (a[field] as string[]).includes(item.id),
      ).length;
      return {
        key: item.id,
        label: `${item.label} (${count})`,
        to: ROUTES.blogArchiveSub(archive, item.id),
      };
    });
    return { kind: "items", ariaLabel: heading, items: linkItems };
  }

  if (/^\d{4}$/.test(archive)) {
    const filtered = articles.filter((a) =>
      a.dates.some((d) => d.startsWith(`${archive}/`)),
    );
    if (filtered.length === 0) return { kind: "not-found" };
    return {
      kind: "items",
      ariaLabel: archive,
      items: toArticleItems(filtered),
    };
  }

  return { kind: "not-found" };
};
