import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { getArchiveConfig, getArchiveDates } from "@constans/archiveMock";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";

import ArticleArchive from "./ArticleArchive/ArticleArchive";
import StandardArchive from "./StandardArchive/StandardArchive";

export const Archive = () => {
  const { t } = useTranslation("UI");
  const { archive, sub } = useParams<{ archive: string; sub?: string }>();

  const archiveConfig = getArchiveConfig(t);
  const archiveDates = getArchiveDates(t);
  const notFound = <p>{t("blog.archiveNotFound")}</p>;

  if (!archive) {
    return notFound;
  }

  const config = archiveConfig[archive];

  if (sub && config) {
    const item = config.items.find((item) => item.slug === sub);
    if (!item) return notFound;

    const articles = ARTICLES_CARD_MOCK.filter((article) =>
      article[config.field].includes(item.label),
    );
    return <ArticleArchive heading={item.label} articles={articles} />;
  }

  if (sub) {
    const dateEntry = archiveDates.find(
      (date) => date.slug === `${archive}/${sub}`,
    );
    if (!dateEntry) return notFound;

    const articles = ARTICLES_CARD_MOCK.filter((article) =>
      article.dates.includes(`${sub}-${archive}`),
    );
    return <ArticleArchive heading={dateEntry.label} articles={articles} />;
  }

  if (config) {
    return <StandardArchive archive={archive} />;
  }

  if (/^\d{4}$/.test(archive)) {
    const articles = ARTICLES_CARD_MOCK.filter((article) =>
      article.dates.some((date) => date.endsWith(`-${archive}`)),
    );
    if (articles.length === 0) return notFound;
    return <ArticleArchive heading={archive} articles={articles} />;
  }

  return notFound;
};
