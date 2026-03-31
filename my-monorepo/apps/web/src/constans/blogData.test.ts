import { describe, it, expect } from "vitest";
import {
  TAGS,
  CATEGORIES,
  AUTHORS,
  ARTICLE_TYPES,
  PUBLICATION_DATES,
  BLOG_SECTIONS,
} from "@constans/blogData";
import type { BlogEntity, BlogCategory } from "@constans/blogData";

describe("BlogEntity interface", () => {
  it("has id and label string fields", () => {
    const entity: BlogEntity = { id: "test", label: "Test" };
    expect(entity).toHaveProperty("id");
    expect(entity).toHaveProperty("label");
    expect(typeof entity.id).toBe("string");
    expect(typeof entity.label).toBe("string");
  });
});

describe("BLOG_SECTIONS", () => {
  it("has 5 entries", () => {
    expect(BLOG_SECTIONS).toHaveLength(5);
  });

  it("each entry has id and label strings", () => {
    BLOG_SECTIONS.forEach((section: BlogEntity) => {
      expect(typeof section.id).toBe("string");
      expect(typeof section.label).toBe("string");
    });
  });

  it.each([
    ["categories", "Kategorie"],
    ["tags", "Tagi"],
    ["authors", "Autorzy"],
    ["dates", "Daty publikacji"],
    ["types", "Typy wpisów"],
  ])('contains section "%s" with label "%s"', (id, label) => {
    const section = BLOG_SECTIONS.find((s) => s.id === id);
    expect(section).toBeDefined();
    expect(section!.label).toBe(label);
  });
});

describe("TAGS", () => {
  it("is an array of 25 BlogEntity objects", () => {
    expect(Array.isArray(TAGS)).toBe(true);
    expect(TAGS).toHaveLength(25);
  });

  it("each tag has id and label strings", () => {
    TAGS.forEach((tag: BlogEntity) => {
      expect(typeof tag.id).toBe("string");
      expect(typeof tag.label).toBe("string");
    });
  });

  it.each(["A11y", "Cache", "CI/CD", "Design System", "ESM", "Monorepo"])(
    'contains tag with label "%s"',
    (label) => {
      const labels = TAGS.map((t) => t.label);
      expect(labels).toContain(label);
    },
  );
});

describe("CATEGORIES", () => {
  it("is an array of 6 BlogCategory objects", () => {
    expect(Array.isArray(CATEGORIES)).toBe(true);
    expect(CATEGORIES).toHaveLength(6);
  });

  it.each([
    "Frontend",
    "Backend",
    "Bazy danych",
    "DevOps",
    "Narzędzia",
    "Testowanie",
  ])('contains category with label "%s"', (label) => {
    const labels = CATEGORIES.map((c) => c.label);
    expect(labels).toContain(label);
  });

  it('"frontend" category has subcategories array', () => {
    const frontend = CATEGORIES.find((c) => c.id === "frontend");
    expect(frontend).toBeDefined();
    expect(Array.isArray(frontend!.subcategories)).toBe(true);
    expect(frontend!.subcategories!.length).toBeGreaterThan(0);
  });

  it('"backend" category has subcategories array', () => {
    const backend = CATEGORIES.find((c) => c.id === "backend");
    expect(backend).toBeDefined();
    expect(Array.isArray(backend!.subcategories)).toBe(true);
    expect(backend!.subcategories!.length).toBeGreaterThan(0);
  });

  it("categories without subcategories have no subcategories property", () => {
    const noSubcats = CATEGORIES.filter(
      (c) => c.id !== "frontend" && c.id !== "backend",
    );
    noSubcats.forEach((cat: BlogCategory) => {
      expect(cat.subcategories).toBeUndefined();
    });
  });

  it("frontend subcategories include React and TypeScript", () => {
    const frontend = CATEGORIES.find((c) => c.id === "frontend");
    const subLabels = frontend!.subcategories!.map((s) => s.label);
    expect(subLabels).toContain("React");
    expect(subLabels).toContain("TypeScript");
  });

  it("backend subcategories include Node.js and Python", () => {
    const backend = CATEGORIES.find((c) => c.id === "backend");
    const subLabels = backend!.subcategories!.map((s) => s.label);
    expect(subLabels).toContain("Node.js");
    expect(subLabels).toContain("Python");
  });
});

describe("AUTHORS", () => {
  it("is a non-empty array of BlogEntity", () => {
    expect(Array.isArray(AUTHORS)).toBe(true);
    expect(AUTHORS.length).toBeGreaterThan(0);
  });

  it('contains author "Adam"', () => {
    const labels = AUTHORS.map((a) => a.label);
    expect(labels).toContain("Adam");
  });
});

describe("ARTICLE_TYPES", () => {
  it("has 2 entries", () => {
    expect(ARTICLE_TYPES).toHaveLength(2);
  });

  it('contains "sponsored" and "unsponsored"', () => {
    const labels = ARTICLE_TYPES.map((t) => t.label);
    expect(labels).toContain("sponsored");
    expect(labels).toContain("unsponsored");
  });
});

describe("PUBLICATION_DATES", () => {
  it("has 15 entries", () => {
    expect(PUBLICATION_DATES).toHaveLength(15);
  });

  it("slugs match YYYY/mmm format", () => {
    PUBLICATION_DATES.forEach((date: BlogEntity) => {
      expect(date.id).toMatch(/^\d{4}\/[a-ząćęłńóśźż]{3}$/);
    });
  });

  it("labels are Polish month + year format", () => {
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

    PUBLICATION_DATES.forEach((date: BlogEntity) => {
      const [month, year] = date.label.split(" ");
      expect(polishMonths).toContain(month);
      expect(year).toMatch(/^\d{4}$/);
    });
  });

  it('contains "Styczeń 2026" and "Marzec 2026"', () => {
    const labels = PUBLICATION_DATES.map((d) => d.label);
    expect(labels).toContain("Styczeń 2026");
    expect(labels).toContain("Marzec 2026");
  });
});
