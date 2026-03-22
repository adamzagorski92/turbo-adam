import { describe, it, expect } from "vitest";
import {
  ARCHIVE_TAGS,
  ARCHIVE_CATEGORIES,
  ARCHIVE_AUTHORS,
  ARCHIVE_TYPES,
  ARCHIVE_DATES,
} from "@constans/archiveMock";
import type { ArchiveItem, ArchiveType } from "@constans/archiveMock";
import {
  TAGS,
  CATEGORIES,
  AUTHORS,
  ARTICLE_TYPES,
  PUBLICATION_DATES,
} from "@constans/blogData";

describe("ArchiveItem interface", () => {
  it("has slug and label string fields", () => {
    const item: ArchiveItem = { slug: "test", label: "Test" };
    expect(item).toHaveProperty("slug");
    expect(item).toHaveProperty("label");
    expect(typeof item.slug).toBe("string");
    expect(typeof item.label).toBe("string");
  });
});

describe("ArchiveType type", () => {
  it("accepts valid archive type values", () => {
    const values: ArchiveType[] = [
      "tags",
      "categories",
      "authors",
      "types",
      "dates",
    ];
    expect(values).toHaveLength(5);
  });
});

describe("ARCHIVE_TAGS", () => {
  it("is an array of ArchiveItem objects", () => {
    expect(Array.isArray(ARCHIVE_TAGS)).toBe(true);
    ARCHIVE_TAGS.forEach((tag: ArchiveItem) => {
      expect(tag).toHaveProperty("slug");
      expect(tag).toHaveProperty("label");
    });
  });

  it.each([
    "Turborepo",
    "pnpm",
    "TypeScript",
    "CSS",
    "Design System",
    "Tokeny",
    "NestJS",
    "Prisma",
    "PostgreSQL",
    "Docker",
    "DevOps",
    "nginx",
    "React",
    "Vitest",
    "Testing Library",
    "Node.js",
    "ESM",
    "CI/CD",
    "GitHub Actions",
    "Security",
    "Cache",
    "A11y",
    "UX",
    "Vite",
    "Frontend",
    "Tooling",
    "Performance",
    "Bazy danych",
    "SSR",
  ])('contains tag with label "%s"', (label) => {
    const labels = ARCHIVE_TAGS.map((t: ArchiveItem) => t.label);
    expect(labels).toContain(label);
  });
});

describe("ARCHIVE_CATEGORIES", () => {
  it("is an array of ArchiveItem objects", () => {
    expect(Array.isArray(ARCHIVE_CATEGORIES)).toBe(true);
    ARCHIVE_CATEGORIES.forEach((cat: ArchiveItem) => {
      expect(cat).toHaveProperty("slug");
      expect(cat).toHaveProperty("label");
    });
  });

  it.each([
    "Frontend",
    "Backend",
    "DevOps",
    "Bazy danych",
    "Testowanie",
    "Narzędzia",
  ])('contains category with label "%s"', (label) => {
    const labels = ARCHIVE_CATEGORIES.map((c: ArchiveItem) => c.label);
    expect(labels).toContain(label);
  });
});

describe("ARCHIVE_AUTHORS", () => {
  it("is an array of ArchiveItem objects", () => {
    expect(Array.isArray(ARCHIVE_AUTHORS)).toBe(true);
    ARCHIVE_AUTHORS.forEach((author: ArchiveItem) => {
      expect(author).toHaveProperty("slug");
      expect(author).toHaveProperty("label");
    });
  });

  it('contains author "Adam"', () => {
    const labels = ARCHIVE_AUTHORS.map((a: ArchiveItem) => a.label);
    expect(labels).toContain("Adam");
  });
});

describe("ARCHIVE_TYPES", () => {
  it("is an array of ArchiveItem objects", () => {
    expect(Array.isArray(ARCHIVE_TYPES)).toBe(true);
    ARCHIVE_TYPES.forEach((type: ArchiveItem) => {
      expect(type).toHaveProperty("slug");
      expect(type).toHaveProperty("label");
    });
  });

  it('contains "sponsored" type', () => {
    const labels = ARCHIVE_TYPES.map((t: ArchiveItem) => t.label);
    expect(labels).toContain("sponsored");
  });

  it('contains "unsponsored" type', () => {
    const labels = ARCHIVE_TYPES.map((t: ArchiveItem) => t.label);
    expect(labels).toContain("unsponsored");
  });
});

describe("ARCHIVE_DATES", () => {
  it("is an array of ArchiveItem objects", () => {
    expect(Array.isArray(ARCHIVE_DATES)).toBe(true);
    ARCHIVE_DATES.forEach((date: ArchiveItem) => {
      expect(date).toHaveProperty("slug");
      expect(date).toHaveProperty("label");
    });
  });

  it("has slugs in YYYY/MMM format", () => {
    ARCHIVE_DATES.forEach((date: ArchiveItem) => {
      expect(date.slug).toMatch(/^\d{4}\/[a-ząćęłńóśźż]{3}$/);
    });
  });

  it('has Polish month labels like "Styczeń 2026"', () => {
    const polishMonths = [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień",
    ];

    ARCHIVE_DATES.forEach((date: ArchiveItem) => {
      const [month, year] = date.label.split(" ");
      expect(polishMonths).toContain(month);
      expect(year).toMatch(/^\d{4}$/);
    });
  });

  it('contains date "2026/sty" with label "Styczeń 2026"', () => {
    const entry = ARCHIVE_DATES.find((d: ArchiveItem) => d.slug === "2026/sty");
    expect(entry).toBeDefined();
    expect(entry!.label).toBe("Styczeń 2026");
  });

  it('contains date "2026/lut" with label "Luty 2026"', () => {
    const entry = ARCHIVE_DATES.find((d: ArchiveItem) => d.slug === "2026/lut");
    expect(entry).toBeDefined();
    expect(entry!.label).toBe("Luty 2026");
  });

  it('contains date "2026/mar" with label "Marzec 2026"', () => {
    const entry = ARCHIVE_DATES.find((d: ArchiveItem) => d.slug === "2026/mar");
    expect(entry).toBeDefined();
    expect(entry!.label).toBe("Marzec 2026");
  });
});

describe("Consistency with blogData (single source of truth)", () => {
  it("ARCHIVE_TAGS slugs and labels match TAGS from blogData", () => {
    expect(ARCHIVE_TAGS).toHaveLength(TAGS.length);
    ARCHIVE_TAGS.forEach((item: ArchiveItem, i: number) => {
      expect(item.slug).toBe(TAGS[i].id);
      expect(item.label).toBe(TAGS[i].label);
    });
  });

  it("ARCHIVE_CATEGORIES slugs and labels match CATEGORIES from blogData", () => {
    expect(ARCHIVE_CATEGORIES).toHaveLength(CATEGORIES.length);
    ARCHIVE_CATEGORIES.forEach((item: ArchiveItem) => {
      const match = CATEGORIES.find((c) => c.id === item.slug);
      expect(match).toBeDefined();
      expect(match!.label).toBe(item.label);
    });
  });

  it("ARCHIVE_AUTHORS slugs and labels match AUTHORS from blogData", () => {
    expect(ARCHIVE_AUTHORS).toHaveLength(AUTHORS.length);
    ARCHIVE_AUTHORS.forEach((item: ArchiveItem, i: number) => {
      expect(item.slug).toBe(AUTHORS[i].id);
      expect(item.label).toBe(AUTHORS[i].label);
    });
  });

  it("ARCHIVE_TYPES slugs and labels match ARTICLE_TYPES from blogData", () => {
    expect(ARCHIVE_TYPES).toHaveLength(ARTICLE_TYPES.length);
    ARCHIVE_TYPES.forEach((item: ArchiveItem, i: number) => {
      expect(item.slug).toBe(ARTICLE_TYPES[i].id);
      expect(item.label).toBe(ARTICLE_TYPES[i].label);
    });
  });

  it("ARCHIVE_DATES slugs and labels match PUBLICATION_DATES from blogData", () => {
    expect(ARCHIVE_DATES).toHaveLength(PUBLICATION_DATES.length);
    ARCHIVE_DATES.forEach((item: ArchiveItem, i: number) => {
      expect(item.slug).toBe(PUBLICATION_DATES[i].id);
      expect(item.label).toBe(PUBLICATION_DATES[i].label);
    });
  });
});
