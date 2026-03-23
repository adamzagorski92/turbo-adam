import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import { useBlogFilterStore } from "@stores/useBlogFilterStore";
import { getBlogFilterTree } from "@utils/blogMenuItems";
import { filterArticles } from "@utils/filterArticles";
import RemainingArticles from "./sections/RemainingArticles/RemainingArticles";

import PaginationArticles from "./sections/PaginationArticles/PaginationArticles";
import { ContentSection } from "@packages/components";
import LatestArticle from "./sections/LatestArticle/LatestArticle";

const ARTICLES_CARD_PER_PAGE = 10;

const ArticleList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, i18n } = useTranslation("UI");
  const selectedIds = useBlogFilterStore((s) => s.selectedIds);
  const currentPage = Number(searchParams.get("page") || "1");

  const filterTree = useMemo(() => getBlogFilterTree(t), [t, i18n.language]);

  const sortedArticles = useMemo(() => {
    const filtered = filterArticles(
      ARTICLES_CARD_MOCK,
      filterTree,
      selectedIds,
    );
    return [...filtered].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [filterTree, selectedIds]);

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
    return (
      <ContentSection selector="section" direction="column" gap={16}>
        <p>{t("blog.noResults")}</p>
      </ContentSection>
    );
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
