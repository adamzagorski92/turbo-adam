import {
  ColumnSection,
  InnerColumnSection,
  SectionContainer,
  Thumbnail,
} from "@packages/components";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import styles from "./LatestArticle.module.css";
import type { ArticleCard } from "@constans/articlesCardMock";
import ArticleHeadingContent from "../ArticleContent/ArticleHeadingContent";

interface LatestArticleProps {
  article: ArticleCard;
}

const LatestArticle = ({ article }: LatestArticleProps) => {
  const { t } = useTranslation("UI");

  return (
    <SectionContainer selector="article" noPadding>
      <Link to={`/blog/${article.slug}`} className={styles.link}>
        <div className={styles.wrapper}>
          <span className={styles.label}>{t("blog.latestArticle")}</span>
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
              <ArticleHeadingContent article={article} variant="latest" />
            </InnerColumnSection>
          </ColumnSection>
        </div>
      </Link>
    </SectionContainer>
  );
};

export default LatestArticle;
