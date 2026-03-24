import { getArchiveConfig } from "@utils/archiveConfig";
import { useTranslation } from "react-i18next";
import ArchiveList from "../ArchiveList/ArchiveList";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import type { ArticleCard } from "@constans/articlesCardMock";
import { ROUTES } from "@constans/routes";
import { Link } from "react-router";
import styles from "./StandardArchive.module.css";
import Page404 from "@components/errors/Page404/Page404";

const StandardArchive = ({ archive }: { archive: string }) => {
  const { t } = useTranslation("UI");
  const config = getArchiveConfig(t)[archive];

  if (!config) {
    return <Page404 i18nKey="blog.archiveNotFound" />;
  }

  const { heading, items, field } = config;

  return (
    <ArchiveList ariaLabel={heading}>
      {items.map((item) => {
        const count = ARTICLES_CARD_MOCK.filter((article) =>
          (article[field as keyof ArticleCard] as string[]).includes(item.id),
        ).length;
        return (
          <li key={item.id} className={styles.listItem}>
            <Link
              to={ROUTES.blogArchiveSub(archive, item.id)}
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
