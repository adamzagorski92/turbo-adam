import { SectionContainer } from "@my-monorepo/components";
import { projectGroups } from "@constans/links";
import Card from "@components/Card/Card";
import ProjectLink from "@components/ProjectLink/ProjectLink";
import styles from "./HomePageProjects.module.css";
import { useTranslation } from "react-i18next";

const HomePageProjects = () => {
  const { t } = useTranslation("HomePage");

  return (
    <SectionContainer paddingRight={0} paddingLeft={0}>
      <header className={styles.projectsHeader}>
        <h2 className={styles.projectsTitle}>{t("content.projects.title")}</h2>
        <p className={styles.projectsSubtitle}>
          {t("content.projects.subtitle")}
        </p>
      </header>

      <div className={styles.projectGrid}>
        {projectGroups.map((group) => (
          <div key={group.titleKey} className={styles.projectGridItem}>
            <Card variant="project">
              <div className={styles.projectCardHeader}>
                <span className={styles.projectCardIconWrap}>
                  <group.Icon
                    className={styles.projectCardIcon}
                    aria-hidden="true"
                  />
                </span>
                <div className={styles.projectCardHeaderText}>
                  <h3 className={styles.projectCardTitle}>
                    {t(group.titleKey)}
                  </h3>
                  <p className={styles.projectCardDesc}>
                    {t(group.descriptionKey)}
                  </p>
                </div>
              </div>

              {group.links.map((l) => (
                <ProjectLink
                  key={l.href}
                  href={l.href}
                  title={t(l.titleKey)}
                  Icon={l.Icon}
                />
              ))}
            </Card>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default HomePageProjects;
