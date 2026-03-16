import type { ArticleCard } from "@constans/articlesCardMock";
import { Link } from "react-router";
import { Thumbnail } from "@packages/components";
import styles from "./RemainingArticles.module.css";
import ArticleContent from "../ArticleContent/ArticleContent";

interface RemainingArticlesProps {
  paginatedArticles: ArticleCard[];
}

const RemainingArticles = ({ paginatedArticles }: RemainingArticlesProps) => {
  return (
    <>
      {paginatedArticles.map((article: ArticleCard) => (
        <Link
          key={article.id}
          to={`/blog/${article.slug}`}
          className={styles.link}
        >
          <article className={styles.card}>
            <Thumbnail size="sm" />
            <div className={styles.cardBody}>
              <ArticleContent article={article} variant="card" />
            </div>
          </article>
        </Link>
      ))}
    </>
  );
};

export default RemainingArticles;
