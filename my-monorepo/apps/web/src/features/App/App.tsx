import { Coffee } from "lucide-react";
import Card from "../../components/Card/Card";
import ProjectLink from "../../components/ProjectLink/ProjectLink";
import { projectGroups, quickLinks } from "../../constans/links";
import styles from "./App.module.css";

import {
  ColumnSection,
  ContentSection,
  InnerColumnSection,
  PageBody,
  PageContainer,
  SectionContainer,
  ThemeSwitcher,
} from "@my-monorepo/components";

function App() {
  return (
    <PageContainer>
      <PageBody>
        <SectionContainer backgroundColor="brandSubtle" noTopPadding>
          <ContentSection
            direction="row"
            horizontalAlign="right"
            verticalAlign="top"
            className={styles.topBar}
          >
            <a
              href="https://buycoffee.to/zagorski"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.coffeeLink}
            >
              <Coffee className={styles.coffeeLinkIcon} aria-hidden="true" />
              <span>Postaw Kawę</span>
            </a>
            <ThemeSwitcher />
          </ContentSection>

          <ColumnSection
            ratio="2:1"
            gapX="gx-32"
            gapY="gy-32"
            align="start"
            justify="between"
            stackAt="tablet"
          >
            <div>
              <header className={styles.header}>
                <p className={styles.kicker}>Cześć, tu Adam</p>
                <h1 className={styles.title}>Frontend Developer</h1>
                <p className={styles.subtitle}>
                  Buduję nowoczesne aplikacje w React + TypeScript.
                </p>
              </header>

              <section className={styles.content}>
                <p className={styles.paragraph}>
                  W tym miejscu planuję zebrać moje projekty i pomysły, aby
                  prezentować umiejętności i kompetencje.
                </p>
                <p className={styles.paragraph}>
                  Do tej pory zebrałem{" "}
                  <strong>6 miesięcy komercyjnego doświadczenia</strong> na AGH.
                </p>
              </section>
            </div>

            <Card title="Szybkie linki">
              <nav className={styles.links}>
                {quickLinks.map((l) => (
                  <ProjectLink
                    key={l.href}
                    href={l.href}
                    title={l.title}
                    Icon={l.Icon}
                  />
                ))}
              </nav>
            </Card>
          </ColumnSection>
        </SectionContainer>

        <SectionContainer backgroundColor="surface">
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

                  <nav className={styles.links}>
                    {group.links.map((l) => (
                      <ProjectLink
                        key={l.href}
                        href={l.href}
                        title={l.title}
                        Icon={l.Icon}
                      />
                    ))}
                  </nav>
                </Card>
              </div>
            ))}
          </div>
        </SectionContainer>

        <SectionContainer backgroundColor="brandSubtle">
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
                    src="/QR_buycoffee.png"
                    alt="QR kod do buycoffee.to/zagorski"
                    className={styles.coffeeQr}
                  />
                </a>
              </div>
            </ColumnSection>
          </div>
        </SectionContainer>

        <SectionContainer backgroundColor="surface">
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
      </PageBody>
    </PageContainer>
  );
}

export default App;
