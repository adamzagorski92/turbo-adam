import { ColumnSection, SectionContainer } from "@my-monorepo/components";
import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

import styles from "./AboveTheFold.module.css";

type AboveTheFoldHeading = {
  kicker?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
};

const AboveTheFold = ({
  children,
  heading,
  className,
}: {
  children: ReactNode;
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

  const childArray = Children.toArray(children);
  const headerChild = childArray[0];
  const asideChild = childArray[1];

  let headerContent = headerChild ?? headingMarkup;

  if (headingMarkup) {
    if (isValidElement(headerChild)) {
      const headerElement = headerChild as ReactElement<{
        children?: ReactNode;
      }>;
      const existingChildren = headerElement.props.children;
      headerContent = cloneElement(headerElement, {
        children: (
          <>
            {headingMarkup}
            {existingChildren}
          </>
        ),
      });
    } else {
      headerContent = (
        <>
          {headingMarkup}
          {headerChild}
        </>
      );
    }
  }

  return (
    <SectionContainer selector="section" className={wrapperClassName}>
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
        {headerContent}
        {asideChild}
      </ColumnSection>
    </SectionContainer>
  );
};

export default AboveTheFold;
