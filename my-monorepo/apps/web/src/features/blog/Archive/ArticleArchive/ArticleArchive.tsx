import { Link } from "react-router";
import ArchiveList from "../ArchiveList/ArchiveList";
import { ROUTES } from "@constans/routes";
import type { ArticleCard } from "@constans/articlesCardMock";
import styles from "./ArticleArchive.module.css";

const ArticleArchive = ({
  heading,
  articles,
}: {
  heading: string;
  articles: ArticleCard[];
}) => (
  <ArchiveList heading={heading}>
    {articles.map((article) => (
      <li key={article.id} className={styles.listItem}>
        <Link to={ROUTES.blogArticle(article.slug)} className={styles.link}>
          {article.title}
        </Link>
      </li>
    ))}
  </ArchiveList>
);

export default ArticleArchive;
