import { Outlet } from "react-router";
import { PageContainer } from "@packages/components/basePageContainers/PageContainer/PageContainer";
import Footer from "@features/Footer/Footer";
import { ColumnSection, InnerColumnSection } from "@packages/components";
import Logo from "@components/Logo/Logo";
import BlogSidebar from "@components/BlogSidebar/BlogSidebar";
import styles from "./BlogLayout.module.css";

const BlogLayout = () => {
  return (
    <PageContainer>
      <ColumnSection ratio="12rem:1" gapX="gx-16">
        <InnerColumnSection
          selector="nav"
          direction="column"
          className={`${styles.stickyPanel} ${styles.borderRight}`}
        >
          <Logo />
          <ul>
            <li>Kategorie</li>
            <li>Tagi</li>
            <li>Popularne</li>
            <li>Najnowsze</li>
            <li>Reklamy</li>
          </ul>
        </InnerColumnSection>
        <InnerColumnSection
          selector="section"
          direction="column"
          className={styles.section}
        >
          <div>Search</div>

          <ColumnSection
            ratio="1:15rem"
            gapX="gx-16"
            className={styles.contentGrid}
          >
            <InnerColumnSection selector="main" direction="column">
              <h2 id="blog-heading">Wpisy blogowe</h2>
              <Outlet />
            </InnerColumnSection>
            <InnerColumnSection
              selector="aside"
              direction="column"
              className={`${styles.stickyPanel} ${styles.borderLeft}`}
            >
              <BlogSidebar />
            </InnerColumnSection>
          </ColumnSection>
          <Footer />
        </InnerColumnSection>
      </ColumnSection>
    </PageContainer>
  );
};

export default BlogLayout;
