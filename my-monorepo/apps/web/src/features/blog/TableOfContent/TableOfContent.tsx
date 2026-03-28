import { useTranslation } from "react-i18next";
import { useActiveHeading } from "./useActiveHeading";
import styles from "./TableOfContent.module.css";

interface TableOfContentProps {
  slug: string;
}

export function TableOfContent({ slug }: TableOfContentProps) {
  const { t } = useTranslation("UI");
  const { headings, activeId } = useActiveHeading("article", slug);

  if (headings.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav aria-label={t("blog.tableOfContent")} className={styles.wrapper}>
      <h2 className={styles.title}>{t("blog.tableOfContent")}</h2>
      <ul className={styles.list}>
        {headings.map((heading) => (
          <li key={heading.id} className={styles.item}>
            <a
              href={`#${heading.id}`}
              className={`${styles.link} ${heading.level === 3 ? styles.nested : ""} ${activeId === heading.id ? styles.active : ""}`}
              onClick={(e) => handleClick(e, heading.id)}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
