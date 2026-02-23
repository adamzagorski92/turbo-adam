import { PageContainer } from "@my-monorepo/components";

import HomePage from "../HomePage/HomePage";
import TopNavigation from "../TopNavigation/TopNavigation";
import Footer from "../Footer/Footer";

function App() {
  return (
    <PageContainer>
      <TopNavigation />
      <HomePage />
      <Footer />
    </PageContainer>
  );
}

export default App;
