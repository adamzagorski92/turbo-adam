import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import { useBlogFilterStore } from "@stores/useBlogFilterStore";
import { filterArticles } from "@utils/filterArticles";
import { searchArticles } from "../SearchEngine/utils/searchArticles";
import RemainingArticles from "./sections/RemainingArticles/RemainingArticles";

import PaginationArticles from "./sections/PaginationArticles/PaginationArticles";
import { ContentSection } from "@packages/components";
import LatestArticle from "./sections/LatestArticle/LatestArticle";
import Page404 from "@components/errors/Page404/Page404";

const ARTICLES_CARD_PER_PAGE = 10;

const ArticleList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedIds = useBlogFilterStore((s) => s.selectedIds);
  const searchQuery = useBlogFilterStore((s) => s.searchQuery);
  const currentPage = Number(searchParams.get("page") || "1");

  const sortedArticles = useMemo(() => {
    const filtered = filterArticles(ARTICLES_CARD_MOCK, selectedIds);
    const searched = searchArticles(filtered, searchQuery);
    return [...searched].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [selectedIds, searchQuery]);

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

  if (sortedArticles.length === 0) {
    return <Page404 i18nKey="blog.noResults" />;
  }

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
