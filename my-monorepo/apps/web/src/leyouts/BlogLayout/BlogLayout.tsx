import { Outlet } from "react-router";
import { PageContainer } from "@packages/components/basePageContainers/PageContainer/PageContainer";
import Footer from "@features/Footer/Footer";
import {
  ColumnSection,
  InnerColumnSection,
  PageBody,
} from "@packages/components";
import AsideData from "@components/AsideData/AsideData";
import styles from "./BlogLayout.module.css";
import SidebarMenuLayout from "@leyouts/SidebarMenuLayout/SidebarMenuLayout";

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
          <SidebarMenuLayout
            selector="nav"
            direction="column"
            sidebarPosition="left"
          >
            <ul>
              <li>Kategorie</li>
              <li>Tagi</li>
              <li>Popularne</li>
              <li>Najnowsze</li>
              <li>Reklamy</li>
            </ul>
          </SidebarMenuLayout>
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
      </PageBody>
    </PageContainer>
  );
};

export default BlogLayout;
