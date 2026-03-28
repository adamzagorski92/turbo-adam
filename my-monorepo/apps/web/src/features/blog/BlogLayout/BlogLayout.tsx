import { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { CircleHelp } from "lucide-react";
import { PageContainer } from "@packages/components/basePageContainers/PageContainer/PageContainer";
import Footer from "@features/Footer/Footer";
import {
  ColumnSection,
  Drawer,
  InnerColumnSection,
} from "@packages/components";
import styles from "./BlogLayout.module.css";
import SidebarMenuLayout from "@features/blog/SidebarMenuLayout/SidebarMenuLayout";
import SideTreeNavigation from "@features/blog/SideTreeNavigation/SideTreeNavigation";
import Breadcrumbs from "@features/blog/Breadcrumbs/Breadcrumbs";
import BlogNavbar from "@features/blog/BlogNavbar/BlogNavbar";
import Logo from "@components/Logo/Logo";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import { getArchiveConfig, getArchiveDates } from "@utils/archiveConfig";
import { getBlogFilterTree } from "@utils/blogMenuItems";
import { ArchiveIndex } from "../Archive/ArchiveIndex/ArchiveIndex";
import FilterNotice from "@features/blog/FilterNotice/FilterNotice";
import ArticleSeriesNavigation from "@features/blog/ArticleSeriesNavigation/ArticleSeriesNavigation";
import { useFilterStatus } from "@features/blog/hooks/useFilterStatus";
import { SidebarAds } from "@features/blog/SidebarAds/SidebarAds";
import { TableOfContent } from "@features/blog/TableOfContent/TableOfContent";

type ActiveDrawer = "menu" | "settings" | null;

function resolveHeading(
  t: (key: string, options?: Record<string, string>) => string,
  slug?: string,
  archive?: string,
  sub?: string,
  pathname?: string,
): string {
  if (slug) {
    const article = ARTICLES_CARD_MOCK.find((a) => a.slug === slug);
    return article?.title ?? t("blog.articles");
  }

  const archiveConfig = getArchiveConfig(t);
  const archiveDates = getArchiveDates(t);

  if (archive && sub) {
    const config = archiveConfig[archive];
    if (config) {
      const item = config.items.find((i) => i.id === sub);
      return item?.label ?? t("blog.archive");
    }
    const dateEntry = archiveDates.find((d) => d.id === `${archive}/${sub}`);
    return dateEntry?.label ?? t("blog.archive");
  }

  if (archive) {
    const config = archiveConfig[archive];
    if (config) return config.heading;
    if (/^\d{4}$/.test(archive))
      return t("blog.archiveWithYear", { year: archive });
    return t("blog.archive");
  }

  if (pathname?.startsWith("/blog/archive")) return t("blog.archive");

  return t("blog.articles");
}

const BlogLayout = () => {
  const { slug, archive, sub } = useParams<{
    slug?: string;
    archive?: string;
    sub?: string;
  }>();
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation("UI");
  const [activeDrawer, setActiveDrawer] = useState<ActiveDrawer>(null);

  const heading = resolveHeading(t, slug, archive, sub, pathname);
  // i18n.language drives recomputation; t is stable but required by exhaustive-deps
  const filterTree = useMemo(() => getBlogFilterTree(t), [t, i18n.language]);
  const { isModified, reset } = useFilterStatus(filterTree);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug, archive, sub]);

  const drawerActions = useMemo(
    () => ({
      openMenu: () => setActiveDrawer("menu"),
      openSettings: () => setActiveDrawer("settings"),
      close: () => setActiveDrawer(null),
    }),
    [],
  );

  return (
    <PageContainer>
      <ColumnSection ratio="12rem:1" gapX="gx-16" className={styles.outerGrid}>
        <SidebarMenuLayout
          selector="nav"
          direction="column"
          sidebarPosition="left"
        >
          <SideTreeNavigation tree={filterTree} />
        </SidebarMenuLayout>
        <InnerColumnSection selector="section" direction="column">
          <BlogNavbar
            onMenuOpen={drawerActions.openMenu}
            settingsOpen={activeDrawer === "settings"}
            onSettingsOpen={drawerActions.openSettings}
            onSettingsClose={drawerActions.close}
          />
          <ColumnSection
            selector="section"
            selectors={slug ? ["article", "aside"] : ["main", "aside"]}
            ratio="1:15rem"
            gapX="gx-16"
            className={styles.contentGrid}
          >
            <InnerColumnSection
              gap={16}
              direction="column"
              className={styles.outletContainer}
            >
              <h1 className={styles.blogHeading} id="blog-heading">
                {heading}
              </h1>
              <div className={styles.noticeRow}>
                <section
                  className={`${styles.noticeColumn} ${styles.messagesColumn}`}
                  aria-label={t("blog.messagesTitle")}
                >
                  <p className={styles.noticeColumnTitle}>
                    {t("blog.messagesTitle")}
                  </p>
                  {isModified ? (
                    <FilterNotice isModified={isModified} onReset={reset} />
                  ) : (
                    <p className={styles.noticePlaceholder}>
                      {t("blog.noMessages")}
                    </p>
                  )}
                </section>
                <section
                  className={`${styles.noticeColumn} ${styles.seriesColumn}`}
                >
                  <ArticleSeriesNavigation slug={slug} />
                </section>
              </div>
              <div className={styles.breadcrumbRow}>
                <Breadcrumbs />
                {slug && (
                  <a href="#faq-heading" className={styles.faqLink}>
                    <CircleHelp size={14} aria-hidden />
                    FAQ
                  </a>
                )}
              </div>
              <Outlet />
            </InnerColumnSection>
            <SidebarMenuLayout
              selector="section"
              direction="column"
              sidebarPosition="right"
            >
              {slug && <TableOfContent slug={slug} />}
              <ArchiveIndex sidebar />
              <SidebarAds category="frontend" />
            </SidebarMenuLayout>
          </ColumnSection>
          <Footer borderTop />
        </InnerColumnSection>
      </ColumnSection>

      <Drawer
        open={activeDrawer === "menu"}
        onClose={drawerActions.close}
        side="left"
        ariaLabel={t("blog.menuNav")}
      >
        <Logo />
        <SideTreeNavigation tree={filterTree} />
      </Drawer>
    </PageContainer>
  );
};

export default BlogLayout;
