import type { ReactNode } from "react";
import styles from "./ArchiveList.module.css";

const ArchiveList = ({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) => (
  <section className={styles.archive} aria-label={heading}>
    <h2 className={styles.heading}>{heading}</h2>
    <ul className={styles.list}>{children}</ul>
  </section>
);

export default ArchiveList;
