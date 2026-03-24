import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { getArchiveConfig, getArchiveDates } from "@utils/archiveConfig";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import type { DateId } from "@constans/blogData";

import ArticleArchive from "./ArticleArchive/ArticleArchive";
import StandardArchive from "./StandardArchive/StandardArchive";
import Page404 from "@components/errors/Page404/Page404";

export const Archive = () => {
  const { t } = useTranslation("UI");
  const { archive, sub } = useParams<{ archive: string; sub?: string }>();

  const archiveConfig = getArchiveConfig(t);
  const archiveDates = getArchiveDates(t);

  if (!archive) {
    return <Page404 i18nKey="blog.archiveNotFound" />;
  }

  const config = archiveConfig[archive];

  if (sub && config) {
    const item = config.items.find((item) => item.id === sub);
    if (!item) return <Page404 i18nKey="blog.archiveNotFound" />;

    const articles = ARTICLES_CARD_MOCK.filter((article) =>
      (article[config.field] as string[]).includes(item.id),
    );
    return <ArticleArchive heading={item.label} articles={articles} />;
  }

  if (sub) {
    const dateEntry = archiveDates.find(
      (date) => date.id === `${archive}/${sub}`,
    );
    if (!dateEntry) return <Page404 i18nKey="blog.archiveNotFound" />;

    const dateId = `${archive}/${sub}` as DateId;
    const articles = ARTICLES_CARD_MOCK.filter((article) =>
      article.dates.includes(dateId),
    );
    return <ArticleArchive heading={dateEntry.label} articles={articles} />;
  }

  if (config) {
    return <StandardArchive archive={archive} />;
  }

  if (/^\d{4}$/.test(archive)) {
    const articles = ARTICLES_CARD_MOCK.filter((article) =>
      article.dates.some((date) => date.startsWith(`${archive}/`)),
    );
    if (articles.length === 0)
      return <Page404 i18nKey="blog.archiveNotFound" />;
    return <ArticleArchive heading={archive} articles={articles} />;
  }

  return <Page404 i18nKey="blog.archiveNotFound" />;
};
