import { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import styles from "./ArchiveLinks.module.css";

export type ArchiveLinkItem = {
  key: string;
  label: string;
  to: string;
};

const MAX_VISIBLE = 12;

const ArchiveLinks = ({
  ariaLabel,
  heading,
  items,
}: {
  ariaLabel: string;
  heading?: string;
  items: ArchiveLinkItem[];
}) => {
  const { t } = useTranslation("UI");
  const [expanded, setExpanded] = useState(false);
  const hasMore = items.length > MAX_VISIBLE;
  const visible = hasMore && !expanded ? items.slice(0, MAX_VISIBLE) : items;

  return (
    <section aria-label={ariaLabel} className={styles.section}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      <ul className={styles.list}>
        {visible.map((item) => (
          <li key={item.key} className={styles.listItem}>
            <Link to={item.to}>{item.label}</Link>
          </li>
        ))}
        {hasMore && (
          <li className={styles.listItem}>
            <button
              type="button"
              className={styles.toggle}
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? t("blog.collapse") : t("blog.showAll")}
              {" >>"}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
};

export default ArchiveLinks;
