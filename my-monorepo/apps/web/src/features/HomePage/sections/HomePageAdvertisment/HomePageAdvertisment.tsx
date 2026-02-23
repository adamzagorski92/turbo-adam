import buyCoffeeQrUrl from "../../../../assets/QR_buycoffee@2x.webp";
import {
  ColumnSection,
  InnerColumnSection,
  SectionContainer,
} from "@my-monorepo/components";

import styles from "./HomePageAdvertisment.module.css";

const HomePageAdvertisment = () => {
  return (
    <SectionContainer backgroundColor="brandSubtle" fullBleed>
      <div className={styles.coffeeSection}>
        <span className={styles.coffeeLabel}>Autoreklama</span>
        <ColumnSection
          ratio="1:1"
          gapX="gx-32"
          gapY="gy-16"
          align="center"
          justify="between"
          stackAt="tablet"
        >
          <div className={styles.coffeeContent}>
            <h2>Postaw mi kawę</h2>
            <p>
              Jeśli podoba Ci się to, co robię, możesz wesprzeć mnie kawą. Każda
              kawa to motywacja do dalszego rozwoju i tworzenia nowych
              projektów.
            </p>

            <InnerColumnSection
              direction="column"
              boxed
              backgroundColor="brandSubtle"
            >
              <h3>Aplikacja: "Aplikuj Się"</h3>
              <p className={styles.paragraph}>
                <span>
                  <a
                    href="https://docs.google.com/spreadsheets/d/1Z28TDWUQ4-QV6ro51syTBrBJ3l5cVZPzCwMEkdtSap4/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Aplikuj Się
                  </a>
                </span>{" "}
                to prototyp aplikacji do ułatwienia poszukiwania wymarzonej
                pracy. Co prawda portali pracy jest bardzo dużo, ale sam proces
                poszukiwania wymaga stworzenia jednego silosu danych.{" "}
                <strong>
                  W pierwszej fazie stworzyłem prototyp w Google Sheets
                </strong>
                , aby oddać do testów znajomym i otrzymać informacje zwrotne co
                do funkcjonalności.
              </p>
              <a
                href="https://buycoffee.to/zagorski"
                target="_blank"
                rel="noopener noreferrer"
              >
                Postaw kawę
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
                alt="QR kod do buycoffee.to/zagorski"
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
