import { useFilterNavigation } from "./hooks/useMenuStack";
import { useTranslation } from "react-i18next";
import type { FilterNode } from "./types/menu.types";
import styles from "./SideTreeNavigation.module.css";

type Props = {
  tree: FilterNode[];
};

const SideTreeNavigation = ({ tree }: Props) => {
  const { t } = useTranslation("UI");
  const {
    current,
    breadcrumbs,
    isRoot,
    goDeeper,
    goBack,
    isAllCurrentSelected,
    toggleAllCurrent,
    isNodeSelected,
    toggleNode,
  } = useFilterNavigation(tree, t("blog.filters"));

  return (
    <nav className={styles.nav}>
      {!isRoot && (
        <div className={styles.breadcrumbs}>
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className={styles.breadcrumbItem}>
              {i > 0 && <span className={styles.breadcrumbSeparator}>›</span>}
              <span className={styles.breadcrumbLabel}>{crumb}</span>
            </span>
          ))}
        </div>
      )}

      {!isRoot && (
        <button type="button" className={styles.backButton} onClick={goBack}>
          {t("blog.back")}
        </button>
      )}

      {!isRoot && (
        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={isAllCurrentSelected}
            onChange={toggleAllCurrent}
          />
          <span className={styles.checkboxLabel}>{t("blog.all")}</span>
        </label>
      )}

      <ul className={styles.menuList}>
        {current.items.map((item) => (
          <li key={item.id} className={styles.menuItem}>
            {isRoot ? (
              <button
                type="button"
                className={styles.menuBranch}
                onClick={() => goDeeper(item)}
              >
                <span className={styles.menuLinkLabel}>{item.label}</span>
                <span className={styles.menuChevron}>›</span>
              </button>
            ) : (
              <div className={styles.itemRow}>
                <label className={styles.checkboxRow}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={isNodeSelected(item)}
                    onChange={() => toggleNode(item)}
                  />
                  <span className={styles.checkboxLabel}>{item.label}</span>
                </label>
                {item.children && (
                  <button
                    type="button"
                    className={styles.drillButton}
                    onClick={() => goDeeper(item)}
                    aria-label={t("blog.expand", { label: item.label })}
                  >
                    ›
                  </button>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideTreeNavigation;
