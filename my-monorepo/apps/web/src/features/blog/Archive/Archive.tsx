import { useParams } from "react-router";
import { ARCHIVE_CONFIG } from "@constans/archiveMock";

import type { ArchiveField } from "../types/archive.types";

import DateArchive from "./DateArchive/DateArchive";
import SubArchive from "./SubArchive/SubArchive";
import StandardArchive from "./StandardArchive/StandardArchive";

export const FIELD_MAP: Record<string, ArchiveField> = {
  tags: "tags",
  categories: "categories",
  authors: "authors",
  types: "types",
};

const NOT_FOUND = <p>Nie znaleziono archiwum</p>;

export const Archive = () => {
  const { archive, sub } = useParams<{ archive: string; sub?: string }>();

  if (!archive) {
    return NOT_FOUND;
  }

  if (sub && ARCHIVE_CONFIG[archive]) {
    return <SubArchive archive={archive} sub={sub} />;
  }

  if (sub) {
    return <DateArchive year={archive} month={sub} />;
  }

  if (ARCHIVE_CONFIG[archive]) {
    return <StandardArchive archive={archive} />;
  }

  if (/^\d{4}$/.test(archive)) {
    return <DateArchive year={archive} />;
  }

  return NOT_FOUND;
};
