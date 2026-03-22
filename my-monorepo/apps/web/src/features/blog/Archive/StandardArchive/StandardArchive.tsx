import { ARCHIVE_CONFIG } from "@constans/archiveMock";
import ArchiveList from "../ArchiveList/ArchiveList";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import { ROUTES } from "@constans/routes";
import { Link } from "react-router";
import styles from "./StandardArchive.module.css";

const StandardArchive = ({ archive }: { archive: string }) => {
  const config = ARCHIVE_CONFIG[archive];

  if (!config) {
    return <p>Nie znaleziono archiwum</p>;
  }

  const { heading, items, field } = config;

  return (
    <ArchiveList ariaLabel={heading}>
      {items.map((item) => {
        const count = ARTICLES_CARD_MOCK.filter((article) =>
          article[field].includes(item.label),
        ).length;
        return (
          <li key={item.slug} className={styles.listItem}>
            <Link
              to={ROUTES.blogArchiveSub(archive, item.slug)}
              className={styles.link}
            >
              {item.label} ({count})
            </Link>
          </li>
        );
      })}
    </ArchiveList>
  );
};

export default StandardArchive;
