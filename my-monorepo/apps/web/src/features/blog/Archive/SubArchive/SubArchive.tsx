import { Link } from "react-router";
import ArchiveList from "../ArchiveList/ArchiveList";
import { ROUTES } from "@constans/routes";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import { ARCHIVE_CONFIG } from "@constans/archiveMock";
import { FIELD_MAP } from "../Archive";

import styles from "./SubArchive.module.css";

const SubArchive = ({ archive, sub }: { archive: string; sub: string }) => {
  const NOT_FOUND = <p>Nie znaleziono archiwum</p>;
  const config = ARCHIVE_CONFIG[archive];
  const field = FIELD_MAP[archive];

  if (!config || !field) {
    return NOT_FOUND;
  }

  const item = config.items.find((i) => i.slug === sub);

  if (!item) {
    return NOT_FOUND;
  }

  const articles = ARTICLES_CARD_MOCK.filter((a) =>
    a[field].includes(item.label),
  );

  return (
    <ArchiveList heading={item.label}>
      {articles.map((article) => (
        <li key={article.id} className={styles.listItem}>
          <Link to={ROUTES.blogArticle(article.slug)}>{article.title}</Link>
        </li>
      ))}
    </ArchiveList>
  );
};

export default SubArchive;
