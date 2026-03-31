import ArticleSeriesNavigation from "@features/blog/ArticleSeriesNavigation/ArticleSeriesNavigation";
import Breadcrumbs from "@features/blog/Breadcrumbs/Breadcrumbs";
import FilterNotice from "@features/blog/FilterNotice/FilterNotice";
import { CircleHelp } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "./TopWidgets.module.css";

interface TopWidgetsProps {
  slug?: string;
  isModified: boolean;
  reset: () => void;
}

const TopWidgets = ({ slug, isModified, reset }: TopWidgetsProps) => {
  const { t } = useTranslation("UI");

  return (
    <section className={styles.noticeRow}>
      <div
        className={`${styles.noticeColumn} ${styles.messagesColumn}`}
        aria-label={t("blog.messagesTitle")}
      >
        <p className={styles.noticeColumnTitle}>{t("blog.messagesTitle")}</p>
        {isModified ? (
          <FilterNotice isModified={isModified} onReset={reset} />
        ) : (
          <p className={styles.noticePlaceholder}>{t("blog.noMessages")}</p>
        )}
      </div>
      <div className={`${styles.noticeColumn} ${styles.seriesColumn}`}>
        <ArticleSeriesNavigation slug={slug} />
      </div>

      <div className={styles.breadcrumbRow}>
        <Breadcrumbs />
        {slug && (
          <a href="#faq-heading" className={styles.faqLink}>
            <CircleHelp size={14} aria-hidden />
            FAQ
          </a>
        )}
      </div>
    </section>
  );
};

export default TopWidgets;
