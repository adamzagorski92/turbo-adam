import { startTransition } from "react";
import { useTranslation } from "react-i18next";
import styles from "./PaginationArticles.module.css";

interface PaginationArticlesProps {
  totalPages: number;
  currentPage: number;
  setSearchParams: (params: { page: string }) => void;
}

const PaginationArticles = ({
  totalPages,
  currentPage,
  setSearchParams,
}: PaginationArticlesProps) => {
  const { t } = useTranslation("UI");
  const goToPage = (page: number) => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    startTransition(() => {
      setSearchParams({ page: String(page) });
    });
  };
  return (
    <>
      {totalPages > 1 && (
        <nav
          className={styles.pagination}
          aria-label={t("blog.paginationAriaLabel")}
        >
          <button
            className={styles.pageButton}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            {t("blog.previousPage")}
          </button>
          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`${styles.pageNumber} ${page === currentPage ? styles.pageNumberActive : ""}`}
                onClick={() => goToPage(page)}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className={styles.pageButton}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            {t("blog.nextPage")}
          </button>
        </nav>
      )}
    </>
  );
};

export default PaginationArticles;
