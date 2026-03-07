import { InnerColumnSection } from "@my-monorepo/components";
import AboveTheFold from "@components/AboveTheFold/AboveTheFold";
import Card from "@components/Card/Card";
import { quickLinks } from "@constans/links";
import ProjectLink from "@components/ProjectLink/ProjectLink";
import { useTranslation } from "react-i18next";

type AboveTheFoldHeading = {
  kicker: string;
  title: string;
  subtitle: string;
};

const HomePageAboveTheFold = () => {
  const { t } = useTranslation("HomePage");
  const heading = t("content.aboveTheFold.heading", {
    returnObjects: true,
  }) as unknown as AboveTheFoldHeading;

  return (
    <AboveTheFold
      heading={heading}
      header={
        <InnerColumnSection direction="column">
          <p>{t("content.aboveTheFold.intro")}</p>
          <p>
            {t("content.aboveTheFold.experiencePrefix")}
            <strong>{t("content.aboveTheFold.experienceStrong")}</strong>
            {t("content.aboveTheFold.experienceSuffix")}
          </p>
        </InnerColumnSection>
      }
      aside={
        <InnerColumnSection direction="column" selector="nav">
          <Card title={t("content.aboveTheFold.quickLinksTitle")}>
            {quickLinks.map((l) => (
              <ProjectLink
                key={l.href}
                href={l.href}
                title={t(l.titleKey)}
                Icon={l.Icon}
              />
            ))}
          </Card>
        </InnerColumnSection>
      }
    />
  );
};

export default HomePageAboveTheFold;
