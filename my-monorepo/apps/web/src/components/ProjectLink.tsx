import styles from "./ProjectLink.module.css";
import type { LinkItem } from "../types/linkType";

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

export default ProjectLink;
