import type { FilterNode } from "@features/blog/SideTreeNavigation/types/menu.types";
import { SECTION_DEFS, sectionKey } from "../constans/blogData";
import type {
  BlogEntity,
  BlogCategory,
  SectionDef,
  TranslateFn,
} from "../constans/blogData";

const toFilterNodes = (entities: readonly BlogEntity[]): FilterNode[] =>
  entities.map((entity) => ({ id: entity.id, label: entity.label }));

const categoryToFilterNode = (cat: BlogCategory): FilterNode => ({
  id: cat.id,
  label: cat.label,
  children: cat.subcategories ? toFilterNodes(cat.subcategories) : undefined,
});

export const getBlogFilterTree = (t: TranslateFn): FilterNode[] =>
  SECTION_DEFS.map((raw) => {
    const def = raw as SectionDef;
    return {
      id: def.id,
      label: t(sectionKey(def.id)),
      children: def.nested
        ? (def.items as readonly BlogCategory[]).map(categoryToFilterNode)
        : toFilterNodes(def.getItems ? def.getItems(t) : def.items),
    };
  });
