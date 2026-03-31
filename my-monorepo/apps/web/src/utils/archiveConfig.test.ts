import { describe, it, expect } from "vitest";
import {
  ARCHIVE_YEARS,
  getArchiveConfig,
  getArchiveDates,
} from "@utils/archiveConfig";
import {
  TAGS,
  CATEGORIES,
  AUTHORS,
  ARTICLE_TYPES,
  PUBLICATION_DATES,
} from "@constans/blogData";

describe("ARCHIVE_YEARS", () => {
  it("contains unique years from PUBLICATION_DATES", () => {
    const expected = [
      ...new Set(PUBLICATION_DATES.map((d) => d.id.split("/")[0])),
    ];
    expect(ARCHIVE_YEARS).toEqual(expected);
  });

  it("contains 2025 and 2026", () => {
    expect(ARCHIVE_YEARS).toContain("2025");
    expect(ARCHIVE_YEARS).toContain("2026");
  });
});

describe("getArchiveConfig", () => {
  const t = (key: string) => key;

  it("has categories, tags, authors, types keys", () => {
    expect(Object.keys(getArchiveConfig(t))).toEqual([
      "categories",
      "tags",
      "authors",
      "types",
    ]);
  });

  it("returns translated headings using section keys", () => {
    const config = getArchiveConfig(t);
    expect(config.tags.heading).toBe("blog.sections.tags");
    expect(config.categories.heading).toBe("blog.sections.categories");
    expect(config.authors.heading).toBe("blog.sections.authors");
    expect(config.types.heading).toBe("blog.sections.types");
  });

  it("references source data arrays directly", () => {
    const config = getArchiveConfig(t);
    expect(config.tags.items).toBe(TAGS);
    expect(config.categories.items).toBe(CATEGORIES);
    expect(config.authors.items).toBe(AUTHORS);
    expect(config.types.items).toBe(ARTICLE_TYPES);
  });
});

describe("getArchiveDates", () => {
  const t = (key: string) => key;

  it("returns same number of entries as PUBLICATION_DATES", () => {
    expect(getArchiveDates(t)).toHaveLength(PUBLICATION_DATES.length);
  });

  it("preserves IDs from PUBLICATION_DATES", () => {
    const dates = getArchiveDates(t);
    dates.forEach((date, i) => {
      expect(date.id).toBe(PUBLICATION_DATES[i].id);
    });
  });
});
