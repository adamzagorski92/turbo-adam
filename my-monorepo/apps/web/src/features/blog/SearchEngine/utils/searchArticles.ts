import Fuse, { type IFuseOptions } from "fuse.js";
import type { ArticleCard } from "@constans/articlesCardMock";

const FUSE_OPTIONS: IFuseOptions<ArticleCard> = {
  keys: ["title"],
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 2,
};

export function searchArticles(
  articles: ArticleCard[],
  query: string,
): ArticleCard[] {
  const trimmed = query.trim();
  if (trimmed.length < 2) return articles;

  const fuse = new Fuse(articles, FUSE_OPTIONS);
  return fuse.search(trimmed).map((result) => result.item);
}
