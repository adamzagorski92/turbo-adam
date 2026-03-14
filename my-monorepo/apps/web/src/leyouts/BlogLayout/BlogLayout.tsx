import { useCallback, useMemo, useState } from "react";
import { Outlet } from "react-router";
import { PageContainer } from "@packages/components/basePageContainers/PageContainer/PageContainer";
import Footer from "@features/Footer/Footer";
import {
  ColumnSection,
  Drawer,
  InnerColumnSection,
} from "@packages/components";
import AsideData from "@components/AsideData/AsideData";
import styles from "./BlogLayout.module.css";
import SidebarMenuLayout from "@leyouts/SidebarMenuLayout/SidebarMenuLayout";
import SideTreeNavigation from "@features/SideTreeNavigation/SideTreeNavigation";
import { blogFilterTree } from "@constans/blogMenuItems";
import Breadcrumbs from "@components/Breadcrumbs/Breadcrumbs";
import BlogNavbar from "@features/BlogNavbar/BlogNavbar";
import Logo from "@components/Logo/Logo";

type ActiveDrawer = "menu" | "settings" | null;

const BlogLayout = () => {
  const [activeDrawer, setActiveDrawer] = useState<ActiveDrawer>(null);

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
              <h1 id="blog-heading">Wpisy blogowe</h1>
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
          <Footer />
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
