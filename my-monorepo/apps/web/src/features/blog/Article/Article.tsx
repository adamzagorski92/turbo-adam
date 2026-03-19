import { useParams } from "react-router";
import Markdown from "react-markdown";
import {
  ColumnSection,
  InnerColumnSection,
  Thumbnail,
} from "@packages/components";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import { ARTICLES_CONTENT_MOCK } from "@constans/articlesContentMock";
import { ARTICLES_FAQ_MOCK } from "@constans/articlesFaqMock";
import ArticleHeadingContent from "../ArticleList/sections/ArticleContent/ArticleHeadingContent";
import ArticleFaq from "../ArticleFaq/ArticleFaq";
import styles from "./Article.module.css";

const Article = () => {
  const { slug } = useParams<{ slug: string }>();

  const card = ARTICLES_CARD_MOCK.find((a) => a.slug === slug);
  const content = card
    ? ARTICLES_CONTENT_MOCK.find((c) => c.id === card.id)
    : undefined;
  const faqData = card
    ? ARTICLES_FAQ_MOCK.find((f) => f.id === card.id)
    : undefined;

  if (!card || !content) {
    return <p>Nie znaleziono artykułu.</p>;
  }

  return (
    <>
      <ColumnSection
        selector="header"
        ratio="3:2"
        stackAt="tablet"
        gapX="gx-16"
        className={styles.columns}
      >
        <InnerColumnSection>
          <Thumbnail size="lg" aria-hidden />
        </InnerColumnSection>
        <InnerColumnSection direction="column" gap={16}>
          <ArticleHeadingContent article={card} variant="latest" />
        </InnerColumnSection>
      </ColumnSection>

      <section className={styles.content}>
        <Markdown>{content.content}</Markdown>
      </section>

      {faqData && <ArticleFaq faq={faqData.faq} />}
    </>
  );
};

export default Article;
