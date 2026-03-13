import type { ArticleCard } from "@constans/articlesCardMock";
import { Thumbnail } from "@packages/components";
import styles from "./RemainingArticles.module.css";

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
                        <div className={styles.meta}>
                            <time dateTime={article.date}>{article.date}</time>
                            <span>{article.author}</span>
                        </div>
                        <h3 className={styles.title}>{article.title}</h3>
                        <p className={styles.excerpt}>{article.excerpt}</p>
                        <div className={styles.tags}>
                            {article.tags.map((tag) => (
                                <span key={tag} className={styles.tag}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </article>
            ))}
        </>
    );
};

export default RemainingArticles;