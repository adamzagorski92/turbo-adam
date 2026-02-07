import type { ReactNode } from "react";

import { ContentSection } from "@my-monorepo/components";

import styles from "./Card.module.css";

type Variant = "default" | "project";

type Props = {
  children: ReactNode;
  title?: string;
  className?: string;
  variant?: Variant;
};

function Card({ children, title, className = "", variant = "default" }: Props) {
  const variantClass = variant === "project" ? styles.project : "";

  return (
    <ContentSection
      direction="column"
      gap={16}
      boxed
      className={`${styles.card} ${variantClass} ${className}`.trim()}
    >
      {title ? <h3 className={styles.title}>{title}</h3> : null}
      {children}
    </ContentSection>
  );
}

export default Card;
