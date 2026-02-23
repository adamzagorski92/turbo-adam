import { PageBody } from "@my-monorepo/components";
import HomePageAboveTheFold from "./sections/HomePageAboveTheFold/HomePageAboveTheFold";
import HomePageProjects from "./sections/HomePageProjects/HomePageProjects";
import HomePageAdvertisment from "./sections/HomePageAdvertisment/HomePageAdvertisment";

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
