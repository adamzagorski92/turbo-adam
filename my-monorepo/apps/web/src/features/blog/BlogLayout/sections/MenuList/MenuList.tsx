import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { LoaderCircle } from "lucide-react";
import SideTreeNavigation from "@features/blog/SideTreeNavigation/SideTreeNavigation";
import FilterNotice from "@features/blog/FilterNotice/FilterNotice";
import { useBlogFilterStore } from "@stores/useBlogFilterStore";
import styles from "./MenuList.module.css";
import type { getBlogFilterTree } from "@utils/blogMenuItems";

interface MenuListProps {
  isArticle: boolean;
  isArchive: boolean;
  showFilters: boolean;
  filterTree: ReturnType<typeof getBlogFilterTree>;
  filterStatus?: { isModified: boolean; reset: () => void };
}

const MenuList = ({
  isArticle,
  isArchive,
  showFilters,
  filterTree,
  filterStatus,
}: MenuListProps) => {
  const { t } = useTranslation("UI");
  const isFiltering = useBlogFilterStore((s) =>
    filterStatus ? s.isFiltering : false,
  );

  return (
    <>
      <div className={styles.sidebarSection}>
        <p className={styles.sidebarSectionLabel}>{t("blog.sidebarMain")}</p>
        <Link to="/" className={styles.sidebarLink}>
          {t("blog.home")}
        </Link>
        {(isArticle || isArchive) && (
          <Link to="/blog" className={styles.sidebarLink}>
            {t("blog.blogLabel")}
          </Link>
        )}
        {!isArchive && (
          <Link to="/blog/archive" className={styles.sidebarLink}>
            {t("blog.archive")}
          </Link>
        )}
      </div>
      {showFilters && (
        <div className={styles.sidebarSection}>
          <p className={styles.sidebarSectionLabel}>{t("blog.filters")}</p>
          {filterStatus && (isFiltering || filterStatus.isModified) && (
            <div className={styles.drawerFilterStatus}>
              {isFiltering ? (
                <LoaderCircle
                  size={14}
                  className={styles.drawerSpinner}
                  aria-hidden
                />
              ) : (
                <FilterNotice
                  isModified={filterStatus.isModified}
                  onReset={filterStatus.reset}
                />
              )}
            </div>
          )}
          <SideTreeNavigation tree={filterTree} />
        </div>
      )}
    </>
  );
};

export default MenuList;
