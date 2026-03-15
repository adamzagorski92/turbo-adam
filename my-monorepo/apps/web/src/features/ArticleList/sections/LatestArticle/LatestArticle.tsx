import {
  ColumnSection,
  InnerColumnSection,
  SectionContainer,
  Thumbnail,
} from "@packages/components";
import { Link } from "react-router";
import styles from "./LatestArticle.module.css";
import type { ArticleCard } from "@constans/articlesCardMock";
import ArticleContent from "../ArticleContent/ArticleContent";

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
      <Link to={`/blog/${article.slug}`} className={styles.link}>
        <div className={styles.wrapper}>
          <span className={styles.label}>Najnowszy wpis</span>
          <ColumnSection
            ratio="3:2"
            stackAt="tablet"
            gapX="gx-16"
            className={styles.columns}
          >
            <InnerColumnSection>
              <Thumbnail size="lg" />
            </InnerColumnSection>
            <InnerColumnSection direction="column" gap={16}>
              <ArticleContent article={article} variant="latest" />
            </InnerColumnSection>
          </ColumnSection>
        </div>
      </Link>
    </SectionContainer>
  );
};

export default LatestArticle;
