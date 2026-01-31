import styles from "./App.module.css";
import type { ReactNode } from "react";
import {
  ColumnSection,
  ContentSection,
  PageBody,
  PageContainer,
  SectionContainer,
  ThemeSwitcher,
} from "@my-monorepo/components";
import {
  Bot,
  BriefcaseBusiness,
  Code2,
  GitBranch,
  Globe,
  Home,
  LayoutTemplate,
  Mail,
  Mic,
  Puzzle,
  Shirt,
  Users,
  UserRound,
  type LucideIcon,
} from "lucide-react";

type LinkItem = {
  title: string;
  href: string;
  Icon: LucideIcon;
};

type LinkGroup = {
  title: string;
  description: ReactNode;
  Icon: LucideIcon;
  links: LinkItem[];
};

function ProjectLink({ href, title, Icon }: LinkItem) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.link}
    >
      <span className={styles.linkInner}>
        <Icon className={styles.linkIcon} aria-hidden="true" />
        <span className={styles.linkLabel}>{title}</span>
      </span>
    </a>
  );
}

function App() {
  const quickLinks: LinkItem[] = [
    {
      title: "Kod źródłowy tej strony",
      href: "https://github.com/adamzagorski92/turbo-adam",
      Icon: GitBranch,
    },
    {
      title: "Mój LinkedIn",
      href: "https://www.linkedin.com/in/adazag/",
      Icon: BriefcaseBusiness,
    },
    {
      title: "Strona wizytówka (więcej o mnie)",
      href: "https://www.adamzagorski.pl/",
      Icon: UserRound,
    },
  ];

  const projectGroups: LinkGroup[] = [
    {
      title: "Strony low-code",
      description:
        "WordPress + Elementor — realizacje dla firm i osób prywatnych.",
      Icon: LayoutTemplate,
      links: [
        {
          title: "Willa Saga — pensjonat nad morzem",
          href: "https://www.willasaga.pl/",
          Icon: Home,
        },
        {
          title: "Hanya — strona wokalistki",
          href: "https://hanya.pl/",
          Icon: Mic,
        },
        {
          title: "NinjaKids — usługi i zajęcia dla dzieci",
          href: "https://www.ninjakids.pl/",
          Icon: Users,
        },
        {
          title: "SportPlay — sklep odzieżowy",
          href: "https://www.sportplay.pl/",
          Icon: Shirt,
        },
        {
          title: "Adam Zagórski — strona wizytówka",
          href: "https://www.adamzagorski.pl/",
          Icon: Globe,
        },
      ],
    },
    {
      title: "Aplikacje w React",
      description: "Zbiór aplikacji w React + TypeScript.",
      Icon: Code2,
      links: [
        {
          title: "Portfolio projektów (Netlify)",
          href: "https://adam-zag-portfolio-projects.netlify.app/",
          Icon: Globe,
        },
      ],
    },
    {
      title: "AI agenty",
      description: "Repozytoria z agentami AI i automatyzacjami.",
      Icon: Bot,
      links: [
        {
          title: "AI CV Agent — symulacja rozmowy z rekruterem",
          href: "https://github.com/adamzagorski92/ai-cvAgent",
          Icon: GitBranch,
        },
        {
          title: "Hawai Pizza Agent — żartobliwy agent kuchenny",
          href: "https://github.com/adamzagorski92/hawai-pizza-agentAI",
          Icon: GitBranch,
        },
      ],
    },
    {
      title: "Wtyczka Thunderbird",
      description: "Ekstraktor i segregator unikatowych adresów e-mail.",
      Icon: Mail,
      links: [
        {
          title: "Thunderbird Email Extractor (GitHub)",
          href: "https://github.com/adamzagorski92/thunderbird-email-extractor",
          Icon: Puzzle,
        },
      ],
    },
  ];

  return (
    <PageContainer>
      <PageBody>
        <SectionContainer backgroundColor="blue100" noPadding>
          <div className="container">
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
                    <strong>6 miesięcy komercyjnego doświadczenia</strong> na
                    AGH.
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
          </div>
        </SectionContainer>

        <SectionContainer backgroundColor="grey100">
          <div className="container">
            <header className={styles.projectsHeader}>
              <h2 className={styles.projectsTitle}>Projekty</h2>
              <p className={styles.projectsSubtitle}>
                Wybrane realizacje: strony low-code, aplikacje w React, agenty
                AI i narzędzia.
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
