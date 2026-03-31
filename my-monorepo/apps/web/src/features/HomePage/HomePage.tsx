import { PageBody } from "@my-monorepo/components";
import HomePageAboveTheFold from "@features/HomePage/sections/HomePageAboveTheFold/HomePageAboveTheFold";
import HomePageProjects from "@features/HomePage/sections/HomePageProjects/HomePageProjects";
import HomePageAdvertisment from "@features/HomePage/sections/HomePageAdvertisment/HomePageAdvertisment";

const HomePage = () => {
  return (
    <PageBody selector="main">
      <HomePageAboveTheFold />
      <HomePageProjects />
      <HomePageAdvertisment />
    </PageBody>
  );
};

export default HomePage;
