import { Outlet } from "react-router";
import { PageContainer } from "@packages/components/basePageContainers/PageContainer/PageContainer";
import Footer from "@features/Footer/Footer";
import {
  ColumnSection,
  InnerColumnSection,
  PageBody,
} from "@packages/components";
import Logo from "@components/Logo/Logo";
import BlogSidebar from "@components/BlogSidebar/BlogSidebar";
import styles from "./BlogLayout.module.css";

const BlogLayout = () => {
  return (
    <PageContainer>
      <PageBody
        paddingTop={0}
        paddingRight={16}
        paddingBottom={0}
        paddingLeft={16}
      >
        <ColumnSection
          ratio="12rem:1"
          gapX="gx-16"
          className={styles.outerGrid}
        >
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
          <InnerColumnSection selector="section" direction="column">
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
      </PageBody>
    </PageContainer>
  );
};

export default BlogLayout;
