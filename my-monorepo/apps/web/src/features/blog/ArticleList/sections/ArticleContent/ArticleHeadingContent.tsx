import type { ArticleCard } from "@constans/articlesCardMock";
import styles from "./ArticleHeadingContent.module.css";

interface ArticleHeadingContentProps {
  article: ArticleCard;
  variant: "latest" | "card";
}

const ArticleHeadingContent = ({
  article,
  variant,
}: ArticleHeadingContentProps) => {
  return (
    <>
      <div
        className={`${styles.meta} ${variant === "card" ? styles.metaCard : ""}`}
        aria-label={`${article.date}, autor: ${article.author}`}
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
      <ul className={styles.tags} aria-label="Tagi">
        {article.tags.map((tag) => (
          <li key={tag} className={styles.tag}>
            {tag}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ArticleHeadingContent;
