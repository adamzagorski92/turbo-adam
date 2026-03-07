import { SectionContainer } from "@my-monorepo/components";
import { projectGroups } from "@constans/links";
import Card from "@components/Card/Card";
import ProjectLink from "@components/ProjectLink/ProjectLink";
import styles from "./HomePageProjects.module.css";

const HomePageProjects = () => {
  return (
    <SectionContainer>
      <header className={styles.projectsHeader}>
        <h2 className={styles.projectsTitle}>Projekty</h2>
        <p className={styles.projectsSubtitle}>
          Wybrane realizacje: strony low-code, aplikacje w React, agenty AI i
          narzędzia.
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
                  <p className={styles.projectCardDesc}>{group.description}</p>
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
  );
};

export default HomePageProjects;
