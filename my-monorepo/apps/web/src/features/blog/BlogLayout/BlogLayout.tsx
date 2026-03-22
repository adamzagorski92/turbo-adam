import { useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router";
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
import { ARCHIVE_CONFIG, ARCHIVE_DATES } from "@constans/archiveMock";
import { blogFilterTree } from "@utils/blogMenuItems";
import { ArchiveIndex } from "../Archive/ArchiveIndex/ArchiveIndex";

type ActiveDrawer = "menu" | "settings" | null;

function resolveHeading(
  slug?: string,
  archive?: string,
  sub?: string,
  pathname?: string,
): string {
  if (slug) {
    const article = ARTICLES_CARD_MOCK.find((a) => a.slug === slug);
    return article?.title ?? "Wpisy blogowe";
  }

  if (archive && sub) {
    const config = ARCHIVE_CONFIG[archive];
    if (config) {
      const item = config.items.find((i) => i.slug === sub);
      return item?.label ?? "Archiwum";
    }
    const dateEntry = ARCHIVE_DATES.find((d) => d.slug === `${archive}/${sub}`);
    return dateEntry?.label ?? "Archiwum";
  }

  if (archive) {
    const config = ARCHIVE_CONFIG[archive];
    if (config) return config.heading;
    if (/^\d{4}$/.test(archive)) return `Archiwum: ${archive}`;
    return "Archiwum";
  }

  if (pathname?.startsWith("/blog/archive")) return "Archiwum";

  return "Wpisy blogowe";
}

const BlogLayout = () => {
  const { slug, archive, sub } = useParams<{
    slug?: string;
    archive?: string;
    sub?: string;
  }>();
  const { pathname } = useLocation();
  const [activeDrawer, setActiveDrawer] = useState<ActiveDrawer>(null);

  const heading = resolveHeading(slug, archive, sub, pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug, archive, sub]);

  const drawerActions = useMemo(
    () => ({
      openMenu: () => setActiveDrawer("menu"),
      openSettings: () => setActiveDrawer("settings"),
      close: () => setActiveDrawer(null),
    }),
    [],
  );

  // TODO: replace with Zustand action / API call
  const handleSearch = useCallback((selectedIds: string[]) => {
    console.log("Blog filters:", selectedIds);
  }, []);

  return (
    <PageContainer>
      <ColumnSection ratio="12rem:1" gapX="gx-16" className={styles.outerGrid}>
        <SidebarMenuLayout
          selector="nav"
          direction="column"
          sidebarPosition="left"
        >
          <SideTreeNavigation tree={blogFilterTree} onSearch={handleSearch} />
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
            <InnerColumnSection gap={16} direction="column">
              <h1 className={styles.blogHeading} id="blog-heading">
                {heading}
              </h1>
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
              <ArchiveIndex sidebar />
            </SidebarMenuLayout>
          </ColumnSection>
          <Footer borderTop />
        </InnerColumnSection>
      </ColumnSection>

      <Drawer
        open={activeDrawer === "menu"}
        onClose={drawerActions.close}
        side="left"
        ariaLabel="Menu nawigacyjne"
      >
        <Logo />
        <SideTreeNavigation tree={blogFilterTree} onSearch={handleSearch} />
      </Drawer>
    </PageContainer>
  );
};

export default BlogLayout;
