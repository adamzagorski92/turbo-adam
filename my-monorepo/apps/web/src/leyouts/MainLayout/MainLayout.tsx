import { Outlet } from "react-router";
import TopNavigation from "../../features/TopNavigation/TopNavigation";
import { PageContainer } from "../../../../../packages/components/basePageContainers/PageContainer/PageContainer";
import Footer from "../../features/Footer/Footer";

const MainLayout = () => {
  return (
    <PageContainer>
      <TopNavigation />
      <Outlet />
      <Footer />
    </PageContainer>
  );
};

export default MainLayout;
