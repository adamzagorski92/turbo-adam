import ProjectLink from "../../components/ProjectLink";
import { projectGroups, quickLinks } from "../../constans/links";
import styles from "./App.module.css";

import {
  ColumnSection,
  ContentSection,
  PageBody,
  PageContainer,
  SectionContainer,
  ThemeSwitcher,
} from "@my-monorepo/components";

function App() {
  return (
    <PageContainer>
      <PageBody>
        <SectionContainer backgroundColor="blue100" noTopPadding>
          <ContentSection
            direction="row"
            horizontalAlign="right"
            verticalAlign="top"
            className={styles.topBar}
          >
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

            <ContentSection
              direction="column"
              gap={16}
              boxed
              className={styles.card}
            >
              <h3 className={styles.cardTitle}>Szybkie linki</h3>

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
            </ContentSection>
          </ColumnSection>
        </SectionContainer>

        <SectionContainer backgroundColor="grey100">
          <header className={styles.projectsHeader}>
            <h2 className={styles.projectsTitle}>Projekty</h2>
            <p className={styles.projectsSubtitle}>
              Wybrane realizacje: strony low-code, aplikacje w React, agenty AI
              i narzędzia.
            </p>
          </header>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${styles.projectGrid}`}
          >
            {projectGroups.map((group) => (
              <ContentSection
                key={group.title}
                direction="column"
                gap={16}
                boxed
                className={styles.projectCard}
              >
                <div className={styles.projectCardHeader}>
                  <span className={styles.projectCardIconWrap}>
                    <group.Icon
                      className={styles.projectCardIcon}
                      aria-hidden="true"
                    />
                  </span>
                  <div>
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
              </ContentSection>
            ))}
          </div>
        </SectionContainer>

        <SectionContainer backgroundColor="grey100" noTopPadding>
          <div className="container">
            <hr className={styles.divider} />

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
          </div>
        </SectionContainer>
      </PageBody>
    </PageContainer>
  );
}

export default App;
