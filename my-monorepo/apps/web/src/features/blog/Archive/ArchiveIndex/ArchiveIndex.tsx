import {
  ARCHIVE_YEARS,
  getArchiveConfig,
  getArchiveDates,
} from "@utils/archiveConfig";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@constans/routes";
import styles from "./ArchiveIndex.module.css";
import ArchiveLinks from "../ArchiveLinks/ArchiveLinks";
import type { ArchiveLinkItem } from "../ArchiveLinks/ArchiveLinks";

export const ArchiveIndex = () => {
  const { t } = useTranslation("UI");
  const archiveConfig = getArchiveConfig(t);
  const archiveDates = getArchiveDates(t);

  const configItems: ArchiveLinkItem[] = Object.entries(archiveConfig).map(
    ([key, config]) => ({
      key,
      label: config.heading,
      to: ROUTES.blogArchiveType(key),
    }),
  );

  const dateItems: ArchiveLinkItem[] = [...archiveDates]
    .reverse()
    .map((date) => ({
      key: date.id,
      label: date.label,
      to: `${ROUTES.blogArchive}/${date.id}`,
    }));

  const yearItems: ArchiveLinkItem[] = [...ARCHIVE_YEARS]
    .reverse()
    .map((year) => ({
      key: year,
      label: year,
      to: ROUTES.blogArchiveType(year),
    }));

  const sections = [
    { heading: t("blog.types"), items: configItems },
    { heading: t("blog.dates"), items: dateItems },
    { heading: t("blog.years"), items: yearItems },
  ];

  return (
    <div className={styles.grid}>
      {sections.map(({ heading, items }) => (
        <ArchiveLinks
          key={heading}
          ariaLabel={heading}
          heading={heading}
          items={items}
        />
      ))}
    </div>
  );
};
