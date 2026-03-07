import buyCoffeeQrPlUrl from "@assets/QR_buycoffee@2x.webp";
import buyCoffeeQrEnUrl from "@assets/QR_buycoffee_en.webp";
import {
  ColumnSection,
  InnerColumnSection,
  SectionContainer,
} from "@my-monorepo/components";
import { useTranslation } from "react-i18next";

import styles from "./HomePageAdvertisment.module.css";

const HomePageAdvertisment = () => {
  const { t, i18n } = useTranslation("HomePage");
  const language = i18n.resolvedLanguage ?? i18n.language;
  const buyCoffeeQrUrl = language.startsWith("en")
    ? buyCoffeeQrEnUrl
    : buyCoffeeQrPlUrl;

  return (
    <SectionContainer backgroundColor="brandSubtle" fullBleed>
      <div className={styles.coffeeSection}>
        <span className={styles.coffeeLabel}>
          {t("content.advertisement.label")}
        </span>
        <ColumnSection
          ratio="1:1"
          gapX="gx-32"
          gapY="gy-16"
          align="center"
          justify="between"
          stackAt="tablet"
        >
          <div className={styles.coffeeContent}>
            <h2>{t("content.advertisement.title")}</h2>
            <p>{t("content.advertisement.intro")}</p>

            <InnerColumnSection
              direction="column"
              boxed
              backgroundColor="brandSubtle"
            >
              <h3>{t("content.advertisement.appTitle")}</h3>
              <p className={styles.paragraph}>
                <a
                  href="https://docs.google.com/spreadsheets/d/1Z28TDWUQ4-QV6ro51syTBrBJ3l5cVZPzCwMEkdtSap4/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("content.advertisement.appDescriptionLinkText")}
                </a>
                {t("content.advertisement.appDescriptionMiddle")}
                <strong>
                  {t("content.advertisement.appDescriptionStrong")}
                </strong>
                {t("content.advertisement.appDescriptionSuffix")}
              </p>
              <a
                href="https://buycoffee.to/zagorski"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("content.advertisement.buyCoffeeCta")}
              </a>
            </InnerColumnSection>
          </div>
          <div className={styles.coffeeQrWrap}>
            <a
              href="https://buycoffee.to/zagorski"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={buyCoffeeQrUrl}
                alt={t("content.advertisement.qrAlt")}
                className={styles.coffeeQr}
                width={430}
                height={548}
                loading="lazy"
              />
            </a>
          </div>
        </ColumnSection>
      </div>
    </SectionContainer>
  );
};

export default HomePageAdvertisment;
