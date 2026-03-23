import {
  TAGS,
  CATEGORIES,
  AUTHORS,
  ARTICLE_TYPES,
  PUBLICATION_DATES,
  getPublicationDates,
  sectionKey,
} from "./blogData";
import type { BlogEntity, TranslateFn } from "./blogData";

export interface ArchiveItem {
  slug: string;
  label: string;
}

export type ArchiveType = "tags" | "categories" | "authors" | "types" | "dates";

export interface ArchiveConfigEntry {
  heading: string;
  items: ArchiveItem[];
  field: "tags" | "categories" | "authors" | "types";
}

const toArchiveItems = (entities: BlogEntity[]): ArchiveItem[] =>
  entities.map((entity) => ({ slug: entity.id, label: entity.label }));

export const ARCHIVE_TAGS: ArchiveItem[] = toArchiveItems(TAGS);

export const ARCHIVE_CATEGORIES: ArchiveItem[] = toArchiveItems(CATEGORIES);

export const ARCHIVE_AUTHORS: ArchiveItem[] = toArchiveItems(AUTHORS);

export const ARCHIVE_TYPES: ArchiveItem[] = toArchiveItems(ARTICLE_TYPES);

export const ARCHIVE_DATES: ArchiveItem[] = toArchiveItems(PUBLICATION_DATES);

export const ARCHIVE_YEARS: string[] = [
  ...new Set(ARCHIVE_DATES.map((date) => date.slug.split("/")[0])),
];

export const ARCHIVE_CONFIG: Record<string, ArchiveConfigEntry> = {
  tags: { heading: "Tagi", items: ARCHIVE_TAGS, field: "tags" },
  categories: {
    heading: "Kategorie",
    items: ARCHIVE_CATEGORIES,
    field: "categories",
  },
  authors: { heading: "Autorzy", items: ARCHIVE_AUTHORS, field: "authors" },
  types: { heading: "Typy wpisów", items: ARCHIVE_TYPES, field: "types" },
};

export const getArchiveConfig = (
  t: TranslateFn,
): Record<string, ArchiveConfigEntry> => ({
  tags: { heading: t(sectionKey("tags")), items: ARCHIVE_TAGS, field: "tags" },
  categories: {
    heading: t(sectionKey("categories")),
    items: ARCHIVE_CATEGORIES,
    field: "categories",
  },
  authors: {
    heading: t(sectionKey("authors")),
    items: ARCHIVE_AUTHORS,
    field: "authors",
  },
  types: {
    heading: t(sectionKey("types")),
    items: ARCHIVE_TYPES,
    field: "types",
  },
});

export const getArchiveDates = (t: TranslateFn): ArchiveItem[] =>
  toArchiveItems(getPublicationDates(t));
