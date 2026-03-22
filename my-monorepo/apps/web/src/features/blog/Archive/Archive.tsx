import { useParams } from "react-router";
import { ARCHIVE_CONFIG, ARCHIVE_DATES } from "@constans/archiveMock";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";

import ArticleArchive from "./ArticleArchive/ArticleArchive";
import StandardArchive from "./StandardArchive/StandardArchive";

const NOT_FOUND = <p>Nie znaleziono archiwum</p>;

export const Archive = () => {
  const { archive, sub } = useParams<{ archive: string; sub?: string }>();

  if (!archive) {
    return NOT_FOUND;
  }

  const config = ARCHIVE_CONFIG[archive];

  if (sub && config) {
    const item = config.items.find((item) => item.slug === sub);
    if (!item) return NOT_FOUND;

    const articles = ARTICLES_CARD_MOCK.filter((article) =>
      article[config.field].includes(item.label),
    );
    return <ArticleArchive heading={item.label} articles={articles} />;
  }

  if (sub) {
    const dateEntry = ARCHIVE_DATES.find(
      (date) => date.slug === `${archive}/${sub}`,
    );
    if (!dateEntry) return NOT_FOUND;

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
    if (articles.length === 0) return NOT_FOUND;
    return <ArticleArchive heading={archive} articles={articles} />;
  }

  return NOT_FOUND;
};
