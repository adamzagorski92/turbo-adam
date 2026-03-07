import type { FC, ReactNode } from "react";
import TopNavigation from "../../features/TopNavigation/TopNavigation";
import { PageContainer } from "../../../../../packages/components/basePageContainers/PageContainer/PageContainer";
import Footer from "../../features/Footer/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <PageContainer>
      <TopNavigation />
      {children}
      <Footer />
    </PageContainer>
  );
};

export default MainLayout;
