import type { ArticleCard } from "@constans/articlesCardMock";
import styles from "./ArticleContent.module.css";

interface ArticleContentProps {
  article: ArticleCard;
  variant: "latest" | "card";
}

const ArticleContent = ({ article, variant }: ArticleContentProps) => {
  return (
    <>
      <div
        className={`${styles.meta} ${variant === "card" ? styles.metaCard : ""}`}
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
      <div className={styles.tags}>
        {article.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </>
  );
};

export default ArticleContent;
