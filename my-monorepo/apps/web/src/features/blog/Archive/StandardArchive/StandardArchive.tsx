import { ARCHIVE_CONFIG } from "@constans/archiveMock";
import ArchiveList from "../ArchiveList/ArchiveList";
import { FIELD_MAP } from "../Archive";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import { ROUTES } from "@constans/routes";
import { Link } from "react-router";

import styles from "./StandardArchive.module.css";

const StandardArchive = ({ archive }: { archive: string }) => {
  const NOT_FOUND = <p>Nie znaleziono archiwum</p>;
  const config = ARCHIVE_CONFIG[archive];
  const field = FIELD_MAP[archive];

  if (!config || !field) {
    return NOT_FOUND;
  }

  const { heading, items } = config;

  return (
    <ArchiveList heading={heading}>
      {items.map((item) => {
        const count = ARTICLES_CARD_MOCK.filter((article) =>
          article[field].includes(item.label),
        ).length;
        return (
          <li key={item.slug} className={styles.listItem}>
            <Link to={ROUTES.blogArchiveSub(archive, item.slug)}>
              {item.label} ({count})
            </Link>
          </li>
        );
      })}
    </ArchiveList>
  );
};

export default StandardArchive;
