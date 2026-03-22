import {
  ARCHIVE_CONFIG,
  ARCHIVE_DATES,
  ARCHIVE_YEARS,
} from "@constans/archiveMock";
import { ROUTES } from "@constans/routes";
import styles from "./ArchiveIndex.module.css";
import ArchiveSection from "../ArchiveSection/ArchiveSection";
import type { SectionItem } from "../ArchiveSection/ArchiveSection";
import ArchiveList from "../ArchiveList/ArchiveList";
import { Link } from "react-router";

export const ArchiveIndex = ({ sidebar = false }: { sidebar?: boolean }) => {
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

  if (sidebar) {
    return (
      <section aria-label="Archiwum">
        <h2 className={styles.title}>Archiwum</h2>
        <ArchiveSection items={configItems} />
        <ArchiveSection heading="Daty" items={dateItems} />
        <ArchiveSection heading="Lata" items={yearItems} />
      </section>
    );
  }

  const sections: { heading: string; items: SectionItem[] }[] = [
    { heading: "Archiwum", items: configItems },
    { heading: "Daty", items: dateItems },
    { heading: "Lata", items: yearItems },
  ];

  return (
    <div className={styles.outlet}>
      {sections.map(({ heading, items }) => (
        <ArchiveList key={heading} heading={heading}>
          {items.map((item) => (
            <li key={item.key} className={styles.listItem}>
              <Link to={item.to} className={styles.link}>
                {item.label}
              </Link>
            </li>
          ))}
        </ArchiveList>
      ))}
    </div>
  );
};
