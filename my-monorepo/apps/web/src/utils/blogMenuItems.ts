import type { FilterNode } from "@features/blog/SideTreeNavigation/types/menu.types";
import {
  TAGS,
  CATEGORIES,
  AUTHORS,
  ARTICLE_TYPES,
  BLOG_SECTIONS,
  sectionKey,
  getPublicationDates,
} from "../constans/blogData";
import type {
  BlogEntity,
  BlogCategory,
  TranslateFn,
} from "../constans/blogData";

const toFilterNodes = (entities: BlogEntity[]): FilterNode[] =>
  entities.map((entity) => ({ id: entity.id, label: entity.label }));

const categoryToFilterNode = (cat: BlogCategory): FilterNode => ({
  id: cat.id,
  label: cat.label,
  children: cat.subcategories ? toFilterNodes(cat.subcategories) : undefined,
});

type SectionChildrenMap = Record<string, (t: TranslateFn) => FilterNode[]>;

const SECTION_CHILDREN: SectionChildrenMap = {
  categories: () => CATEGORIES.map(categoryToFilterNode),
  tags: () => toFilterNodes(TAGS),
  authors: () => toFilterNodes(AUTHORS),
  dates: (t) => toFilterNodes(getPublicationDates(t)),
  types: () => toFilterNodes(ARTICLE_TYPES),
};

export const getBlogFilterTree = (t: TranslateFn): FilterNode[] =>
  BLOG_SECTIONS.map((section) => ({
    id: section.id,
    label: t(sectionKey(section.id)),
    children: SECTION_CHILDREN[section.id](t),
  }));
