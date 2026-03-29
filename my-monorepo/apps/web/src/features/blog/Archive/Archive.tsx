import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import { getArchiveConfig, getArchiveDates } from "@utils/archiveConfig";

import ArchiveLinks from "./ArchiveLinks/ArchiveLinks";
import Page404 from "@components/errors/Page404/Page404";
import { resolveArchive } from "./utils/resolveArchive";

export const Archive = () => {
  const { t } = useTranslation("UI");
  const { archive, sub } = useParams<{ archive: string; sub?: string }>();

  const result = resolveArchive(
    ARTICLES_CARD_MOCK,
    getArchiveConfig(t),
    getArchiveDates(t),
    archive,
    sub,
  );

  if (result.kind === "not-found") {
    return <Page404 i18nKey="blog.archiveNotFound" />;
  }

  return <ArchiveLinks ariaLabel={result.ariaLabel} items={result.items} />;
};
