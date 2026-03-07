import { PageBody } from "@my-monorepo/components";
import SeoHelmet from "@components/SeoHelmet/SeoHelmet";
import HomePageAboveTheFold from "@features/HomePage/sections/HomePageAboveTheFold/HomePageAboveTheFold";
import HomePageProjects from "@features/HomePage/sections/HomePageProjects/HomePageProjects";
import HomePageAdvertisment from "@features/HomePage/sections/HomePageAdvertisment/HomePageAdvertisment";
import { useTranslation } from "react-i18next";

type HomePageMeta = {
  siteName: string;
  title: string;
  description: string;
  keywords?: string;
  robots?: string;
  ogType?: "website" | "article" | "profile";
  twitterCard?: "summary" | "summary_large_image";
  ogImagePath?: string;
  personJsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
};

const HomePage = () => {
  const { t } = useTranslation("HomePage");
  const meta = t("meta", {
    returnObjects: true,
  }) as unknown as HomePageMeta;

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
  } = meta;

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
