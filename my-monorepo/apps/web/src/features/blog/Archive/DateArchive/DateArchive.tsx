import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import ArchiveList from "../ArchiveList/ArchiveList";
import { ARCHIVE_DATES } from "@constans/archiveMock";
import { ROUTES } from "@constans/routes";
import { Link } from "react-router";
import styles from "./DateArchive.module.css";

const DateArchive = ({ year, month }: { year: string; month?: string }) => {
  const NOT_FOUND = <p>Nie znaleziono archiwum</p>;

  if (month) {
    const dateEntry = ARCHIVE_DATES.find(
      (date) => date.slug === `${year}/${month}`,
    );

    if (!dateEntry) {
      return NOT_FOUND;
    }

    const articles = ARTICLES_CARD_MOCK.filter((article) =>
      article.dates.includes(`${month}-${year}`),
    );

    return (
      <ArchiveList heading={dateEntry.label}>
        {articles.map((article) => (
          <li key={article.id} className={styles.listItem}>
            <Link to={ROUTES.blogArticle(article.slug)}>{article.title}</Link>
          </li>
        ))}
      </ArchiveList>
    );
  }

  const articles = ARTICLES_CARD_MOCK.filter((article) =>
    article.dates.some((d) => d.endsWith(`-${year}`)),
  );

  if (articles.length === 0) {
    return NOT_FOUND;
  }

  return (
    <ArchiveList heading={year}>
      {articles.map((article) => (
        <li key={article.id} className={styles.listItem}>
          <Link to={ROUTES.blogArticle(article.slug)}>{article.title}</Link>
        </li>
      ))}
    </ArchiveList>
  );
};

export default DateArchive;
