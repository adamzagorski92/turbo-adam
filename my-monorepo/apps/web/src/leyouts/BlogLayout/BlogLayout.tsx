import { useCallback } from "react";
import { Outlet } from "react-router";
import { PageContainer } from "@packages/components/basePageContainers/PageContainer/PageContainer";
import Footer from "@features/Footer/Footer";
import { ColumnSection, InnerColumnSection } from "@packages/components";
import AsideData from "@components/AsideData/AsideData";
import styles from "./BlogLayout.module.css";
import SidebarMenuLayout from "@leyouts/SidebarMenuLayout/SidebarMenuLayout";
import SideTreeNavigation from "@features/SideTreeNavigation/SideTreeNavigation";
import { blogFilterTree } from "@constans/blogMenuItems";
import Breadcrumbs from "@components/Breadcrumbs/Breadcrumbs";
import BlogNavbar from "@features/BlogNavbar/BlogNavbar";

const BlogLayout = () => {
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
          <BlogNavbar />
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
    </PageContainer>
  );
};

export default BlogLayout;
