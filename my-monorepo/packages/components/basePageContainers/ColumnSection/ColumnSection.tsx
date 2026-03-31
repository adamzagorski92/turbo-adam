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

type RatioSegment =
  | { type: "flex"; grow: number }
  | { type: "fixed"; basis: string };

const CSS_LENGTH_RE =
  /^[\d.]+\s*(rem|em|px|%|vw|vh|ch|ex|cap|ic|lh|vi|vb|vmin|vmax|svw|svh|lvw|lvh|dvw|dvh)$/;

function parseRatio(ratio?: string): RatioSegment[] {
  if (!ratio) return [];
  const parts = ratio.split(":");
  const segments: RatioSegment[] = [];

  for (const part of parts) {
    const trimmed = part.trim();
    if (CSS_LENGTH_RE.test(trimmed)) {
      segments.push({ type: "fixed", basis: trimmed });
    } else {
      const n = Number(trimmed);
      if (!Number.isFinite(n) || n <= 0) return [];
      segments.push({ type: "flex", grow: n });
    }
  }

  return segments;
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
  const segments = parseRatio(ratio);
  const hasRatio = segments.length > 0;

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
    const segment = segments[idx] ?? { type: "flex" as const, grow: 1 };
    const Tag = selectors?.[idx] || "div";
    const key = idx;

    const isFixed = segment.type === "fixed";
    const itemStyle: CSSProperties & Record<string, string> = isFixed
      ? { "--col-basis": segment.basis }
      : { "--col-grow": String(segment.grow) };

    return (
      <Tag
        key={String(key)}
        className={isFixed ? styles.fixedItem : styles.item}
        style={itemStyle}
      >
        {child}
      </Tag>
    );
  });

  return <Wrapper className={cls}>{appliedChildren}</Wrapper>;
}
