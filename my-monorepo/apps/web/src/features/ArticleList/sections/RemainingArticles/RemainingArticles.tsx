import type { ArticleCard } from "@constans/articlesCardMock";
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
        <article key={article.id} className={styles.card}>
          <Thumbnail size="sm" />
          <div className={styles.cardBody}>
            <ArticleContent article={article} variant="card" />
          </div>
        </article>
      ))}
    </>
  );
};

export default RemainingArticles;
