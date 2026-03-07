import { SectionContainer } from "@my-monorepo/components";
import Navbar from "@components/Navbar/Navbar";

const TopNavigation = () => {
  return (
    <SectionContainer
      backgroundColor="brandSubtle"
      noTopPadding
      noBottomPadding
      selector="nav"
    >
      <Navbar />
    </SectionContainer>
  );
};

export default TopNavigation;
