import type { ArticleCard } from "@constans/articlesCardMock";
import type { ArticleSeries } from "@constans/articleSeriesMock";
import {
  findArticleBySlug,
  findSeriesById,
  buildSeriesSteps,
} from "./seriesContextHelpers";

export type SeriesStep = {
  slug: string;
  article: ArticleCard | null;
};

export type ArticleSeriesContext = {
  series: ArticleSeries;
  currentArticle: ArticleCard;
  currentIndex: number;
  steps: SeriesStep[];
};

export function getArticleSeriesContext(
  currentSlug: string,
  allArticles: ArticleCard[],
  allSeries: ArticleSeries[],
): ArticleSeriesContext | null {
  const currentArticle = findArticleBySlug(currentSlug, allArticles);
  if (!currentArticle?.seriesId) {
    return null;
  }

  const series = findSeriesById(currentArticle.seriesId, allSeries);
  if (!series) {
    return null;
  }

  const currentIndex = series.articles.indexOf(currentSlug);
  if (currentIndex === -1) {
    return null;
  }

  const steps = buildSeriesSteps(series.articles, allArticles);

  return {
    series,
    currentArticle,
    currentIndex,
    steps,
  };
}
