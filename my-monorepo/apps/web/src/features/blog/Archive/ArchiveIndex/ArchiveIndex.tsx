import { Link } from "react-router";
import {
  ARCHIVE_CONFIG,
  ARCHIVE_DATES,
  ARCHIVE_YEARS,
} from "@constans/archiveMock";
import { ROUTES } from "@constans/routes";
import styles from "./ArchiveIndex.module.css";

export const ArchiveIndex = () => (
  <section className={styles.archiveIndex} aria-label="Archiwum">
    <h2 className={styles.heading}>Archiwum</h2>
    <ul className={styles.list}>
      {Object.entries(ARCHIVE_CONFIG).map(([key, config]) => (
        <li key={key} className={styles.listItem}>
          <Link to={ROUTES.blogArchiveType(key)}>{config.heading}</Link>
        </li>
      ))}
    </ul>
    <h3 className={styles.heading}>Daty</h3>
    <ul className={styles.list}>
      {ARCHIVE_DATES.map((date) => (
        <li key={date.slug} className={styles.listItem}>
          <Link to={`${ROUTES.blogArchive}/${date.slug}`}>{date.label}</Link>
        </li>
      ))}
    </ul>
    <h3 className={styles.heading}>Lata</h3>
    <ul className={styles.list}>
      {ARCHIVE_YEARS.map((year) => (
        <li key={year} className={styles.listItem}>
          <Link to={ROUTES.blogArchiveType(year)}>{year}</Link>
        </li>
      ))}
    </ul>
  </section>
);
