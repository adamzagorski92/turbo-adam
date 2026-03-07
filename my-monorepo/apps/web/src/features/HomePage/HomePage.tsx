import { PageBody } from "@my-monorepo/components";
import SeoHelmet from "@components/SeoHelmet/SeoHelmet";
import HomePageAboveTheFold from "@features/HomePage/sections/HomePageAboveTheFold/HomePageAboveTheFold";
import HomePageProjects from "@features/HomePage/sections/HomePageProjects/HomePageProjects";
import HomePageAdvertisment from "@features/HomePage/sections/HomePageAdvertisment/HomePageAdvertisment";
import { HOME_PAGE_META } from "./HomePageMeta";

const HomePage = () => {
  const {
    siteName,
    title,
    description,
    keywords,
    robots,
    ogType,
    twitterCard,
    ogImagePath,
    personJsonLd,
  } = HOME_PAGE_META;
  return (
    <>
      <SeoHelmet
        siteName={siteName}
        title={title}
        description={description}
        keywords={keywords}
        robots={robots}
        ogType={ogType}
        twitterCard={twitterCard}
        ogImagePath={ogImagePath}
        jsonLd={personJsonLd}
      />

      <PageBody selector="main">
        <HomePageAboveTheFold />
        <HomePageProjects />
        <HomePageAdvertisment />
      </PageBody>
    </>
  );
};

export default HomePage;
