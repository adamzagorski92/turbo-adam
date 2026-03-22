import type { ArticleCard } from "@constans/articlesCardMock";
import type { ArchiveItem } from "@constans/archiveMock";

export type ArchiveField = keyof Pick<
  ArticleCard,
  "tags" | "categories" | "authors" | "types"
>;

export interface ArchiveConfig {
  heading: string;
  items: ArchiveItem[];
  field: ArchiveField;
}
