import { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import styles from "./ArchiveSection.module.css";

const MAX_VISIBLE = 3;

export type SectionItem = {
  key: string;
  label: string;
  to: string;
};

const ArchiveSection = ({
  heading,
  items,
}: {
  heading?: string;
  items: SectionItem[];
}) => {
  const { t } = useTranslation("UI");
  const [expanded, setExpanded] = useState(false);
  const hasMore = items.length > MAX_VISIBLE;
  const visible = hasMore && !expanded ? items.slice(0, MAX_VISIBLE) : items;

  return (
    <div className={styles.section}>
      {heading && <h3 className={styles.sectionHeading}>{heading}</h3>}
      <ul className={styles.list}>
        {visible.map((item) => (
          <li key={item.key} className={styles.listItem}>
            <Link to={item.to} className={styles.link}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          type="button"
          className={`btn-action btn-action-sm btn-action-block ${styles.showAllButton}`}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? t("blog.collapse") : t("blog.showAll")}
        </button>
      )}
    </div>
  );
};

export default ArchiveSection;
