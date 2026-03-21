import { useSearchParams } from "react-router";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import RemainingArticles from "./sections/RemainingArticles/RemainingArticles";

import PaginationArticles from "./sections/PaginationArticles/PaginationArticles";
import { ContentSection } from "@packages/components";
import LatestArticle from "./sections/LatestArticle/LatestArticle";

const ARTICLES_CARD_PER_PAGE = 10;

const ArticleList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");

  const sortedArticles = [...ARTICLES_CARD_MOCK].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const latestArticle = sortedArticles[0];
  const remainingArticles = sortedArticles.slice(1);

  const totalPages = Math.ceil(
    remainingArticles.length / ARTICLES_CARD_PER_PAGE,
  );
  const startIndex = (currentPage - 1) * ARTICLES_CARD_PER_PAGE;
  const paginatedArticles = remainingArticles.slice(
    startIndex,
    startIndex + ARTICLES_CARD_PER_PAGE,
  );

  return (
    <ContentSection selector="section" direction="column" gap={16}>
      <LatestArticle article={latestArticle} />
      <RemainingArticles paginatedArticles={paginatedArticles} />
      <PaginationArticles
        totalPages={totalPages}
        currentPage={currentPage}
        setSearchParams={setSearchParams}
      />
    </ContentSection>
  );
};

export default ArticleList;
