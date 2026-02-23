import { Children, type CSSProperties, type ReactNode } from "react";
import clsx from "clsx";

import type { SelectorElement } from "../types/selectorElement";
import styles from "./ColumnSection.module.css";

export type ContentSectionJustify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";
export type ContentSectionAlign =
  | "stretch"
  | "start"
  | "center"
  | "end"
  | "baseline";
export type ContentSectionGapX = "gx-16" | "gx-32";
export type ContentSectionGapY = "gy-16" | "gy-32";
export type ContentSectionRatio = string;
type StackAt = "mobile" | "tablet";

type Props = {
  children: ReactNode;
  className?: string;
  justify?: ContentSectionJustify;
  align?: ContentSectionAlign;
  gapX?: ContentSectionGapX;
  gapY?: ContentSectionGapY;
  ratio?: ContentSectionRatio;
  stackAt?: StackAt;
  reverseOnStack?: boolean;
  selector?: SelectorElement;
  selectors?: SelectorElement[];
};

function parseRatio(ratio?: string): number[] {
  if (!ratio) return [];
  const nums = ratio.split(":").map(Number);
  return nums.every((n) => Number.isFinite(n) && n > 0) ? nums : [];
}
export function ColumnSection({
  children,
  justify,
  align,
  gapX,
  gapY,
  ratio,
  stackAt,
  reverseOnStack,
  selector = "div",
  selectors,
  className,
}: Props) {
  const weights = parseRatio(ratio);
  const hasRatio = weights.length > 0;

  const cls = clsx(
    styles.contentSection,
    justify && `jx-${justify}`,
    align && `jy-${align}`,
    gapX,
    gapY,
    hasRatio && "has-ratio",
    stackAt && `stack-${stackAt}`,
    reverseOnStack && "stack-reverse",
    className,
  );

  const Wrapper = selector;

  if (!hasRatio) {
    return <Wrapper className={cls}>{children}</Wrapper>;
  }

  const childArray = Children.toArray(children);
  const appliedChildren = childArray.map((child, idx) => {
    const weight = weights[idx] ?? 1;
    const Tag = selectors?.[idx] || "div";
    const key = idx;
    return (
      <Tag
        key={String(key)}
        className={styles.item}
        style={
          { "--col-grow": String(weight) } as CSSProperties &
            Record<string, string>
        }
      >
        {child}
      </Tag>
    );
  });

  return <Wrapper className={cls}>{appliedChildren}</Wrapper>;
}
