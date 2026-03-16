import { useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useParams } from "react-router";
import { PageContainer } from "@packages/components/basePageContainers/PageContainer/PageContainer";
import Footer from "@features/Footer/Footer";
import {
  ColumnSection,
  Drawer,
  InnerColumnSection,
} from "@packages/components";
import AsideData from "@features/blog/AsideData/AsideData";
import styles from "./BlogLayout.module.css";
import SidebarMenuLayout from "@features/blog/SidebarMenuLayout/SidebarMenuLayout";
import SideTreeNavigation from "@features/blog/SideTreeNavigation/SideTreeNavigation";
import { blogFilterTree } from "@constans/blogMenuItems";
import Breadcrumbs from "@features/blog/Breadcrumbs/Breadcrumbs";
import BlogNavbar from "@features/blog/BlogNavbar/BlogNavbar";
import Logo from "@components/Logo/Logo";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";

type ActiveDrawer = "menu" | "settings" | null;

const BlogLayout = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeDrawer, setActiveDrawer] = useState<ActiveDrawer>(null);

  const article = slug
    ? ARTICLES_CARD_MOCK.find((a) => a.slug === slug)
    : undefined;
  const heading = article ? article.title : "Wpisy blogowe";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

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
            ratio="1:15rem"
            gapX="gx-16"
            className={styles.contentGrid}
          >
            <InnerColumnSection selector="main" direction="column">
              <h1 className={styles.blogHeading} id="blog-heading">
                {heading}
              </h1>
              <Breadcrumbs />
              <Outlet />
            </InnerColumnSection>
            <SidebarMenuLayout
              selector="aside"
              direction="column"
              sidebarPosition="right"
            >
              <AsideData />
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
