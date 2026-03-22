import type { FilterNode } from "@features/blog/SideTreeNavigation/types/menu.types";
import {
  TAGS,
  CATEGORIES,
  AUTHORS,
  ARTICLE_TYPES,
  PUBLICATION_DATES,
  BLOG_SECTIONS,
} from "../constans/blogData";
import type { BlogEntity, BlogCategory } from "../constans/blogData";

const toFilterNodes = (entities: BlogEntity[]): FilterNode[] =>
  entities.map((entity) => ({ id: entity.id, label: entity.label }));

const categoryToFilterNode = (cat: BlogCategory): FilterNode => ({
  id: cat.id,
  label: cat.label,
  children: cat.subcategories ? toFilterNodes(cat.subcategories) : undefined,
});

const findSection = (id: string) =>
  BLOG_SECTIONS.find((section) => section.id === id)!;

export const blogFilterTree: FilterNode[] = [
  {
    id: "categories",
    label: findSection("categories").label,
    children: CATEGORIES.map(categoryToFilterNode),
  },
  {
    id: "tags",
    label: findSection("tags").label,
    children: toFilterNodes(TAGS),
  },
  {
    id: "authors",
    label: findSection("authors").label,
    children: toFilterNodes(AUTHORS),
  },
  {
    id: "dates",
    label: findSection("dates").label,
    children: toFilterNodes(PUBLICATION_DATES),
  },
  {
    id: "types",
    label: findSection("types").label,
    children: toFilterNodes(ARTICLE_TYPES),
  },
];
