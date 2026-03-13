import {
  ColumnSection,
  InnerColumnSection,
  SectionContainer,
  Thumbnail,
} from "@packages/components";
import styles from "./LatestArticle.module.css";
import type { ArticleCard } from "@constans/articlesCardMock";

interface LatestArticleProps {
  article: ArticleCard;
}

const LatestArticle = ({ article }: LatestArticleProps) => {
  return (
    <SectionContainer
      selector="article"
      noBottomPadding
      paddingLeft={0}
      paddingRight={0}
    >
      <div className={styles.wrapper}>
        <span className={styles.label}>Najnowszy wpis</span>
        <ColumnSection
          ratio="2:1"
          stackAt="tablet"
          gapX="gx-16"
          className={styles.columns}
        >
          <InnerColumnSection>
            <Thumbnail size="lg" />
          </InnerColumnSection>
          <InnerColumnSection direction="column" gap={16}>
            <div className={styles.meta}>
              <time dateTime={article.date}>{article.date}</time>
              <span>{article.author}</span>
            </div>
            <h2 className={styles.title}>{article.title}</h2>
            <p className={styles.excerpt}>{article.excerpt}</p>
            <div className={styles.tags}>
              {article.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </InnerColumnSection>
        </ColumnSection>
      </div>
    </SectionContainer>
  );
};

export default LatestArticle;
