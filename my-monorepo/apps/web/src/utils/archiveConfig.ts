import {
  SECTION_DEFS,
  PUBLICATION_DATES,
  getPublicationDates,
  sectionKey,
} from "../constans/blogData";
import type { BlogEntity, TranslateFn } from "../constans/blogData";

interface ArchiveConfigEntry {
  heading: string;
  items: BlogEntity[];
  field: string;
}

export const ARCHIVE_YEARS: string[] = [
  ...new Set(PUBLICATION_DATES.map((date) => date.id.split("/")[0])),
];

export const getArchiveConfig = (
  t: TranslateFn,
): Record<string, ArchiveConfigEntry> =>
  Object.fromEntries(
    SECTION_DEFS.filter((def) => def.archive).map((def) => [
      def.id,
      { heading: t(sectionKey(def.id)), items: def.items, field: def.id },
    ]),
  );

export const getArchiveDates = (t: TranslateFn): BlogEntity[] =>
  getPublicationDates(t);
