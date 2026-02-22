import Card from "../../components/Card/Card";
import ProjectLink from "../../components/ProjectLink/ProjectLink";
import { projectGroups } from "../../constans/links";
import styles from "./App.module.css";
import buyCoffeeQrUrl from "../../assets/QR_buycoffee@2x.webp";

import {
  ColumnSection,
  InnerColumnSection,
  PageBody,
  PageContainer,
  SectionContainer,
} from "@my-monorepo/components";
import Navbar from "../../components/Navbar/Navbar";
import HomePageAboveTheFold from "../HomePage/sections/HomePageAboveTheFold/HomePageAboveTheFold";

function App() {
  return (
    <PageContainer>
      <SectionContainer
        backgroundColor="brandSubtle"
        noTopPadding
        noBottomPadding
        selector="nav"
      >
        <Navbar />
      </SectionContainer>
      <PageBody selector="main">
        <HomePageAboveTheFold />
        <SectionContainer>
          <header className={styles.projectsHeader}>
            <h2 className={styles.projectsTitle}>Projekty</h2>
            <p className={styles.projectsSubtitle}>
              Wybrane realizacje: strony low-code, aplikacje w React, agenty AI
              i narzędzia.
            </p>
          </header>

          <div className={styles.projectGrid}>
            {projectGroups.map((group) => (
              <div key={group.title} className={styles.projectGridItem}>
                <Card variant="project">
                  <div className={styles.projectCardHeader}>
                    <span className={styles.projectCardIconWrap}>
                      <group.Icon
                        className={styles.projectCardIcon}
                        aria-hidden="true"
                      />
                    </span>
                    <div className={styles.projectCardHeaderText}>
                      <h3 className={styles.projectCardTitle}>{group.title}</h3>
                      <p className={styles.projectCardDesc}>
                        {group.description}
                      </p>
                    </div>
                  </div>

                  {group.links.map((l) => (
                    <ProjectLink
                      key={l.href}
                      href={l.href}
                      title={l.title}
                      Icon={l.Icon}
                    />
                  ))}
                </Card>
              </div>
            ))}
          </div>
        </SectionContainer>

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
                  Jeśli podoba Ci się to, co robię, możesz wesprzeć mnie kawą.
                  Każda kawa to motywacja do dalszego rozwoju i tworzenia nowych
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
                    pracy. Co prawda portali pracy jest bardzo dużo, ale sam
                    proces poszukiwania wymaga stworzenia jednego silosu danych.{" "}
                    <strong>
                      W pierwszej fazie stworzyłem prototyp w Google Sheets
                    </strong>
                    , aby oddać do testów znajomym i otrzymać informacje zwrotne
                    co do funkcjonalności.
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
                  />
                </a>
              </div>
            </ColumnSection>
          </div>
        </SectionContainer>
      </PageBody>
      <SectionContainer>
        <footer className={styles.footer}>
          <p>
            Stronę zbudowałem przy użyciu React, TypeScript i Turborepo na
            serwerze deweloperskim{" "}
            <a
              href="https://mikr.us/?r=adamzagorski"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mikrus
            </a>
            . Więcej informacji w kodzie źródłowym.
          </p>
        </footer>
      </SectionContainer>
    </PageContainer>
  );
}

export default App;
