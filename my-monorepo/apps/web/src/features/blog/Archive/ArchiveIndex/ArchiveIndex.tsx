import {
  ARCHIVE_YEARS,
  getArchiveConfig,
  getArchiveDates,
} from "@constans/archiveMock";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@constans/routes";
import styles from "./ArchiveIndex.module.css";
import ArchiveSection from "../ArchiveSection/ArchiveSection";
import type { SectionItem } from "../ArchiveSection/ArchiveSection";
import ArchiveList from "../ArchiveList/ArchiveList";
import { Link } from "react-router";

export const ArchiveIndex = ({ sidebar = false }: { sidebar?: boolean }) => {
  const { t } = useTranslation("UI");
  const archiveConfig = getArchiveConfig(t);
  const archiveDates = getArchiveDates(t);

  const configItems: SectionItem[] = Object.entries(archiveConfig).map(
    ([key, config]) => ({
      key,
      label: config.heading,
      to: ROUTES.blogArchiveType(key),
    }),
  );

  const dateItems: SectionItem[] = [...archiveDates].reverse().map((date) => ({
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
      <section aria-label={t("blog.archive")}>
        <h2 className={styles.title}>{t("blog.archive")}</h2>
        <ArchiveSection items={configItems} />
        <ArchiveSection heading={t("blog.dates")} items={dateItems} />
        <ArchiveSection heading={t("blog.years")} items={yearItems} />
      </section>
    );
  }

  const sections: { heading: string; items: SectionItem[] }[] = [
    { heading: t("blog.types"), items: configItems },
    { heading: t("blog.dates"), items: dateItems },
    { heading: t("blog.years"), items: yearItems },
  ];

  return (
    <div className={styles.outlet}>
      {sections.map(({ heading, items }) => (
        <ArchiveList key={heading} heading={heading} ariaLabel={heading}>
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
