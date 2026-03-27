/**
 * Helper functions for article series context
 */

import type { ArticleCard } from "@constans/articlesCardMock";
import type { ArticleSeries } from "@constans/articleSeriesMock";
import type { SeriesStep } from "./getArticleSeriesContext";

/**
 * Finds an article by slug in the collection
 */
export function findArticleBySlug(
  slug: string,
  articles: ArticleCard[],
): ArticleCard | undefined {
  return articles.find((article) => article.slug === slug);
}

/**
 * Finds a series by ID in the collection
 */
export function findSeriesById(
  seriesId: string,
  allSeries: ArticleSeries[],
): ArticleSeries | undefined {
  return allSeries.find((series) => series.id === seriesId);
}

/**
 * Builds series steps with article data
 */
export function buildSeriesSteps(
  articleSlugs: string[],
  allArticles: ArticleCard[],
): SeriesStep[] {
  return articleSlugs.map((slug) => ({
    slug,
    article: findArticleBySlug(slug, allArticles) ?? null,
  }));
}
