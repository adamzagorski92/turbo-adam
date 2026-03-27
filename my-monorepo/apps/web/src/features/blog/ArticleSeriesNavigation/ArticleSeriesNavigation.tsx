import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, BookMarked } from "lucide-react";
import { Link } from "react-router";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import { ARTICLE_SERIES_MOCK } from "@constans/articleSeriesMock";
import { ROUTES } from "@constans/routes";
import { getArticleSeriesContext } from "@features/blog/utils/getArticleSeriesContext";
import { useSeriesSlider } from "@features/blog/hooks/useSeriesSlider";
import styles from "./ArticleSeriesNavigation.module.css";

type ArticleSeriesNavigationProps = {
  slug?: string;
};

const ArticleSeriesNavigation = ({ slug }: ArticleSeriesNavigationProps) => {
  const { t } = useTranslation("UI");

  // Get series context for current article
  const seriesContext = useMemo(
    () =>
      slug
        ? getArticleSeriesContext(slug, ARTICLES_CARD_MOCK, ARTICLE_SERIES_MOCK)
        : null,
    [slug],
  );

  // Manage slider state
  const {
    totalSteps,
    currentIndex,
    visibleSteps,
    canSlidePrev,
    canSlideNext,
    slidePrev,
    slideNext,
  } = useSeriesSlider(seriesContext);

  // Single article series don't need navigation
  const isSingleArticleSeries = totalSteps === 1;

  if (!seriesContext) {
    return null;
  }

  return (
    <nav
      className={styles.seriesNav}
      aria-label={t("blog.seriesNavLabel", {
        title: seriesContext.series.title,
      })}
    >
      {/* Header with title and position counter */}
      <div className={styles.header}>
        <p className={styles.widgetTitle}>
          {t("blog.seriesWidgetTitle")}
          <span className={styles.widgetCount}>
            {currentIndex + 1}/{totalSteps}
          </span>
        </p>
        <p className={styles.seriesSubtitle}>
          {t("blog.seriesTitleInline", { title: seriesContext.series.title })}
        </p>
      </div>

      {/* Slider or single article message */}
      {isSingleArticleSeries ? (
        <p className={styles.singleArticleMessage}>
          {t("blog.singleArticleInSeries")}
        </p>
      ) : (
        <div className={styles.slider}>
          <button
            type="button"
            className={`${styles.slideButton} ${canSlidePrev ? styles.slideButtonActive : ""}`}
            disabled={!canSlidePrev}
            aria-label={t("blog.seriesPreviousSteps")}
            onClick={slidePrev}
          >
            <ChevronLeft size={32} aria-hidden="true" />
          </button>

          <ol className={styles.steps}>
            {visibleSteps.map((step) => {
              const globalIndex = seriesContext.steps.indexOf(step);
              const isCurrent = globalIndex === currentIndex;
              const stepLabel = t("blog.seriesStep", {
                index: globalIndex + 1,
              });
              const markerClass = `${styles.stepVisual} ${isCurrent ? styles.stepVisualActive : ""}`;
              const badge = (
                <span className={styles.stepBadge}>{globalIndex + 1}</span>
              );
              const icon = (
                <>
                  <BookMarked size={20} className={styles.stepIcon} />
                  {badge}
                </>
              );

              if (!step.article) {
                return (
                  <li key={step.slug} className={styles.stepItem}>
                    <span className={styles.stepPending} aria-label={stepLabel}>
                      <span
                        className={`${styles.stepVisual} ${styles.stepVisualPending}`}
                        aria-hidden="true"
                      >
                        {icon}
                      </span>
                    </span>
                  </li>
                );
              }

              return (
                <li key={step.slug} className={styles.stepItem}>
                  <Link
                    to={ROUTES.blogArticle(step.slug)}
                    aria-current={isCurrent ? "page" : undefined}
                    aria-label={`${stepLabel}: ${step.article.title}`}
                    className={styles.stepLink}
                  >
                    <span className={markerClass} aria-hidden="true">
                      {icon}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>

          <button
            type="button"
            className={`${styles.slideButton} ${canSlideNext ? styles.slideButtonActive : ""}`}
            disabled={!canSlideNext}
            aria-label={t("blog.seriesNextSteps")}
            onClick={slideNext}
          >
            <ChevronRight size={32} aria-hidden="true" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default ArticleSeriesNavigation;
