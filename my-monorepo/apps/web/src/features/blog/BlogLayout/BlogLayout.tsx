import { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { ChevronDown, LoaderCircle } from "lucide-react";
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
import BlogNavbar from "@features/blog/BlogNavbar/BlogNavbar";
import Logo from "@components/Logo/Logo";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import { getArchiveConfig, getArchiveDates } from "@utils/archiveConfig";
import { getBlogFilterTree } from "@utils/blogMenuItems";
import FilterNotice from "@features/blog/FilterNotice/FilterNotice";
import { useFilterStatus } from "@features/blog/hooks/useFilterStatus";
import { useBlogFilterStore } from "@stores/useBlogFilterStore";
import { SidebarAds } from "@features/blog/SidebarAds/SidebarAds";
import { TableOfContent } from "@features/blog/TableOfContent/TableOfContent";
import TopWidgets from "./sections/TopWidgets/TopWidgets";

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
  const isFiltering = useBlogFilterStore((s) => s.isFiltering);

  const isArticle = !!slug;
  const isArchive = pathname.startsWith("/blog/archive");
  const isArticleList = !isArticle && !isArchive && !archive;

  const showFilters = isArticleList;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setActiveDrawer(null);
  }, [pathname]);

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
          <div className={styles.sidebarSection}>
            <p className={styles.sidebarSectionLabel}>
              {t("blog.sidebarMain")}
            </p>
            <Link to="/" className={styles.sidebarLink}>
              {t("blog.home")}
            </Link>
            {(isArticle || isArchive) && (
              <Link to="/blog" className={styles.sidebarLink}>
                {t("blog.blogLabel")}
              </Link>
            )}
            {!isArchive && (
              <Link to="/blog/archive" className={styles.sidebarLink}>
                {t("blog.archive")}
              </Link>
            )}
          </div>
          {showFilters && (
            <div className={styles.sidebarSection}>
              <p className={styles.sidebarSectionLabel}>{t("blog.filters")}</p>
              <SideTreeNavigation tree={filterTree} />
            </div>
          )}
        </SidebarMenuLayout>
        <InnerColumnSection selector="section" direction="column">
          <BlogNavbar
            isArticleList={isArticleList}
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

              <TopWidgets slug={slug} isModified={isModified} reset={reset} />

              <details className={styles.inlineSidebar}>
                <summary className={styles.inlineSidebarSummary}>
                  {t(slug ? "blog.showSidebar" : "blog.showSidebarGeneric")}
                  <ChevronDown
                    className={styles.inlineSidebarChevron}
                    aria-hidden
                  />
                </summary>
                <div className={styles.inlineSidebarContent}>
                  {slug && <TableOfContent slug={slug} />}
                  <SidebarAds category="frontend" />
                </div>
              </details>
              <Outlet />
            </InnerColumnSection>
            <SidebarMenuLayout
              selector="section"
              direction="column"
              sidebarPosition="right"
            >
              {slug && <TableOfContent slug={slug} />}
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
        <div className={styles.sidebarSection}>
          <p className={styles.sidebarSectionLabel}>{t("blog.sidebarMain")}</p>
          <Link to="/" className={styles.sidebarLink}>
            {t("blog.home")}
          </Link>
          {(isArticle || isArchive) && (
            <Link to="/blog" className={styles.sidebarLink}>
              {t("blog.blogLabel")}
            </Link>
          )}
          {!isArchive && (
            <Link to="/blog/archive" className={styles.sidebarLink}>
              {t("blog.archive")}
            </Link>
          )}
        </div>
        {showFilters && (
          <div className={styles.sidebarSection}>
            <p className={styles.sidebarSectionLabel}>{t("blog.filters")}</p>
            {(isFiltering || isModified) && (
              <div className={styles.drawerFilterStatus}>
                {isFiltering ? (
                  <LoaderCircle
                    size={14}
                    className={styles.drawerSpinner}
                    aria-hidden
                  />
                ) : (
                  <FilterNotice isModified={isModified} onReset={reset} />
                )}
              </div>
            )}
            <SideTreeNavigation tree={filterTree} />
          </div>
        )}
      </Drawer>
    </PageContainer>
  );
};

export default BlogLayout;
