import { useParams } from "react-router";
import {
  ColumnSection,
  InnerColumnSection,
  SectionContainer,
  Thumbnail,
} from "@packages/components";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import { ARTICLES_CONTENT_MOCK } from "@constans/articlesContentMock";
import ArticleContent from "../ArticleList/sections/ArticleContent/ArticleContent";
import styles from "./Article.module.css";

const Article = () => {
  const { slug } = useParams<{ slug: string }>();

  const card = ARTICLES_CARD_MOCK.find((a) => a.slug === slug);
  const content = card
    ? ARTICLES_CONTENT_MOCK.find((c) => c.id === card.id)
    : undefined;

  if (!card || !content) {
    return <p>Nie znaleziono artykułu.</p>;
  }

  return (
    <SectionContainer selector="article" noBottomPadding>
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
          <ArticleContent article={card} variant="latest" />
        </InnerColumnSection>
      </ColumnSection>

      <div className={styles.content}>
        <p>{content.content}</p>
      </div>
    </SectionContainer>
  );
};

export default Article;
