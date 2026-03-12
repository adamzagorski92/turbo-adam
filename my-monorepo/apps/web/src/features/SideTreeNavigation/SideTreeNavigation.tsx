import { useFilterNavigation } from "./hooks/useMenuStack";
import type { FilterNode } from "./types/menu.types";
import { Button } from "@packages/components";
import styles from "./SideTreeNavigation.module.css";

type Props = {
  tree: FilterNode[];
  onSearch: (selectedIds: string[]) => void;
};

const SideTreeNavigation = ({ tree, onSearch }: Props) => {
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
    snapshot,
  } = useFilterNavigation(tree);

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
          ← Cofnij
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
          <span className={styles.checkboxLabel}>Wszystkie</span>
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
                    aria-label={`Rozwiń ${item.label}`}
                  >
                    ›
                  </button>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>

      {!isRoot && (
        <Button
          id="filter-search-btn"
          className="btn-action btn-action-block"
          onClick={() => onSearch(snapshot)}
        >
          Szukaj
        </Button>
      )}
    </nav>
  );
};

export default SideTreeNavigation;
