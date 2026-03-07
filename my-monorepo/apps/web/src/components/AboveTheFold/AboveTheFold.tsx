import { ColumnSection, SectionContainer } from "@my-monorepo/components";
import type { ReactNode } from "react";

import styles from "./AboveTheFold.module.css";

type AboveTheFoldHeading = {
  kicker?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
};

const AboveTheFold = ({
  header,
  aside,
  heading,
  className,
}: {
  header?: ReactNode;
  aside?: ReactNode;
  heading?: AboveTheFoldHeading;
  className?: string;
}) => {
  const wrapperClassName = [styles.wrapper, className]
    .filter(Boolean)
    .join(" ");

  const headingMarkup = heading ? (
    <>
      {heading.kicker && <p>{heading.kicker}</p>}
      {heading.title && <h1>{heading.title}</h1>}
      {heading.subtitle && (
        <p className={styles.subtitle}>{heading.subtitle}</p>
      )}
    </>
  ) : null;

  return (
    <SectionContainer
      paddingRight={0}
      paddingLeft={0}
      selector="section"
      className={wrapperClassName}
    >
      <ColumnSection
        ratio="2:1"
        gapX="gx-32"
        gapY="gy-32"
        align="start"
        justify="between"
        stackAt="tablet"
        selector="section"
        selectors={["header", "aside"]}
      >
        <>
          {headingMarkup}
          {header}
        </>
        {aside}
      </ColumnSection>
    </SectionContainer>
  );
};

export default AboveTheFold;
