import { describe, it, expect } from "vitest";
import { blogFilterTree } from "@utils/blogMenuItems";
import {
  TAGS,
  CATEGORIES,
  AUTHORS,
  ARTICLE_TYPES,
  PUBLICATION_DATES,
  BLOG_SECTIONS,
} from "@constans/blogData";

describe("blogFilterTree structure", () => {
  it("has 5 top-level sections", () => {
    expect(blogFilterTree).toHaveLength(5);
  });

  it("top-level section ids match BLOG_SECTIONS", () => {
    const treeIds = blogFilterTree.map((node) => node.id);
    const sectionIds = BLOG_SECTIONS.map((s) => s.id);
    expect(treeIds).toEqual(expect.arrayContaining(sectionIds));
  });

  it("top-level section labels match BLOG_SECTIONS", () => {
    blogFilterTree.forEach((node) => {
      const section = BLOG_SECTIONS.find((s) => s.id === node.id);
      expect(section).toBeDefined();
      expect(node.label).toBe(section!.label);
    });
  });
});

describe("blogFilterTree — categories section", () => {
  it("has children matching CATEGORIES from blogData", () => {
    const categoriesNode = blogFilterTree.find((n) => n.id === "categories");
    expect(categoriesNode).toBeDefined();
    expect(categoriesNode!.children).toHaveLength(CATEGORIES.length);

    CATEGORIES.forEach((cat) => {
      const child = categoriesNode!.children!.find((c) => c.id === cat.id);
      expect(child).toBeDefined();
      expect(child!.label).toBe(cat.label);
    });
  });

  it("frontend category children match blogData subcategories", () => {
    const frontend = CATEGORIES.find((c) => c.id === "frontend");
    const categoriesNode = blogFilterTree.find((n) => n.id === "categories");
    const frontendNode = categoriesNode!.children!.find(
      (c) => c.id === "frontend",
    );

    expect(frontendNode!.children).toHaveLength(
      frontend!.subcategories!.length,
    );

    frontend!.subcategories!.forEach((sub) => {
      const child = frontendNode!.children!.find((c) => c.id === sub.id);
      expect(child).toBeDefined();
      expect(child!.label).toBe(sub.label);
    });
  });

  it("backend category children match blogData subcategories", () => {
    const backend = CATEGORIES.find((c) => c.id === "backend");
    const categoriesNode = blogFilterTree.find((n) => n.id === "categories");
    const backendNode = categoriesNode!.children!.find(
      (c) => c.id === "backend",
    );

    expect(backendNode!.children).toHaveLength(backend!.subcategories!.length);

    backend!.subcategories!.forEach((sub) => {
      const child = backendNode!.children!.find((c) => c.id === sub.id);
      expect(child).toBeDefined();
      expect(child!.label).toBe(sub.label);
    });
  });
});

describe("blogFilterTree — tags section", () => {
  it("has children matching TAGS from blogData", () => {
    const tagsNode = blogFilterTree.find((n) => n.id === "tags");
    expect(tagsNode).toBeDefined();
    expect(tagsNode!.children).toHaveLength(TAGS.length);

    TAGS.forEach((tag) => {
      const child = tagsNode!.children!.find((c) => c.id === tag.id);
      expect(child).toBeDefined();
      expect(child!.label).toBe(tag.label);
    });
  });
});

describe("blogFilterTree — authors section", () => {
  it("has children matching AUTHORS from blogData", () => {
    const authorsNode = blogFilterTree.find((n) => n.id === "authors");
    expect(authorsNode).toBeDefined();
    expect(authorsNode!.children).toHaveLength(AUTHORS.length);

    AUTHORS.forEach((author) => {
      const child = authorsNode!.children!.find((c) => c.id === author.id);
      expect(child).toBeDefined();
      expect(child!.label).toBe(author.label);
    });
  });
});

describe("blogFilterTree — dates section", () => {
  it("has children matching PUBLICATION_DATES from blogData", () => {
    const datesNode = blogFilterTree.find((n) => n.id === "dates");
    expect(datesNode).toBeDefined();
    expect(datesNode!.children).toHaveLength(PUBLICATION_DATES.length);

    PUBLICATION_DATES.forEach((date) => {
      const child = datesNode!.children!.find((c) => c.id === date.id);
      expect(child).toBeDefined();
      expect(child!.label).toBe(date.label);
    });
  });
});

describe("blogFilterTree — types section", () => {
  it("has children matching ARTICLE_TYPES from blogData", () => {
    const typesNode = blogFilterTree.find((n) => n.id === "types");
    expect(typesNode).toBeDefined();
    expect(typesNode!.children).toHaveLength(ARTICLE_TYPES.length);

    ARTICLE_TYPES.forEach((type) => {
      const child = typesNode!.children!.find((c) => c.id === type.id);
      expect(child).toBeDefined();
      expect(child!.label).toBe(type.label);
    });
  });
});
