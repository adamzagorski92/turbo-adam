import { Outlet } from "react-router";
import { PageContainer } from "@packages/components/basePageContainers/PageContainer/PageContainer";
import Footer from "@features/Footer/Footer";
import { ColumnSection, InnerColumnSection } from "@packages/components";

const BlogLayout = () => {
  return (
    <PageContainer>
      <ColumnSection>
        <InnerColumnSection selector="nav">Blog Navigation</InnerColumnSection>
        <InnerColumnSection selector="section">
          <search>Search</search>
          <h2 id="blog-heading">Wpisy blogowe</h2>
          <Outlet />
          <Footer />
        </InnerColumnSection>
      </ColumnSection>
    </PageContainer>
  );
};

export default BlogLayout;
