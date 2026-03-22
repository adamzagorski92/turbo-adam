import {
  ARCHIVE_CONFIG,
  ARCHIVE_DATES,
  ARCHIVE_YEARS,
} from "@constans/archiveMock";
import { ROUTES } from "@constans/routes";
import styles from "./ArchiveIndex.module.css";
import ArchiveSection from "../ArchiveSection/ArchiveSection";
import type { SectionItem } from "../ArchiveSection/ArchiveSection";

export const ArchiveIndex = () => {
  const configItems: SectionItem[] = Object.entries(ARCHIVE_CONFIG).map(
    ([key, config]) => ({
      key,
      label: config.heading,
      to: ROUTES.blogArchiveType(key),
    }),
  );

  const dateItems: SectionItem[] = [...ARCHIVE_DATES].reverse().map((date) => ({
    key: date.slug,
    label: date.label,
    to: `${ROUTES.blogArchive}/${date.slug}`,
  }));

  const yearItems: SectionItem[] = [...ARCHIVE_YEARS].reverse().map((year) => ({
    key: year,
    label: year,
    to: ROUTES.blogArchiveType(year),
  }));

  return (
    <section aria-label="Archiwum">
      <h2 className={styles.title}>Archiwum</h2>
      <ArchiveSection items={configItems} />
      <ArchiveSection heading="Daty" items={dateItems} />
      <ArchiveSection heading="Lata" items={yearItems} />
    </section>
  );
};
