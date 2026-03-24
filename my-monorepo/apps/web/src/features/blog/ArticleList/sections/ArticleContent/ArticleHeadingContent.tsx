import type { ArticleCard } from "@constans/articlesCardMock";
import { TAGS } from "@constans/blogData";
import { useTranslation } from "react-i18next";
import styles from "./ArticleHeadingContent.module.css";

const TAG_LABELS: Record<string, string> = Object.fromEntries(
  TAGS.map((t) => [t.id, t.label]),
);

interface ArticleHeadingContentProps {
  article: ArticleCard;
  variant: "latest" | "card";
}

const ArticleHeadingContent = ({
  article,
  variant,
}: ArticleHeadingContentProps) => {
  const { t } = useTranslation("UI");

  return (
    <>
      <div
        className={`${styles.meta} ${variant === "card" ? styles.metaCard : ""}`}
        aria-label={t("blog.authorMeta", {
          date: article.date,
          author: article.author,
        })}
      >
        <time dateTime={article.date}>{article.date}</time>
        <span>{article.author}</span>
      </div>
      <h2
        className={`${styles.title} ${variant === "latest" ? styles.titleLatest : styles.titleCard}`}
      >
        {article.subtitle}
      </h2>
      <p
        className={`${styles.excerpt} ${variant === "card" ? styles.excerptCard : ""}`}
      >
        {article.excerpt}
      </p>
      <ul className={styles.tags} aria-label={t("blog.tags")}>
        {article.tags.map((tagId) => (
          <li key={tagId} className={styles.tag}>
            {TAG_LABELS[tagId] ?? tagId}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ArticleHeadingContent;
