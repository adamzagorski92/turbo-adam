import { type HTMLAttributes } from "react";
import {
  buildAlignMaps,
  type Direction,
  type HorizontalAlign,
  type VerticalAlign,
} from "../utils/align";

import styles from "./ContentSection.module.css";

export function ContentSection({
  children,
  horizontalAlign = "left",
  verticalAlign = "top",
  direction = "row",
  stretchChildren = false,
  gap,
  boxed = false,
  highlighted = false,
  unlighted = false,
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  horizontalAlign?: HorizontalAlign;
  verticalAlign?: VerticalAlign;
  direction?: Direction;
  stretchChildren?: boolean;
  boxed?: boolean;
  gap?: 16 | 24 | 32;
  highlighted?: boolean;
  unlighted?: boolean;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) {
  const {
    directionClasses,
    justifyHorizontal,
    alignItemsHorizontal,
    justifyVertical,
    alignItemsVertical,
  } = buildAlignMaps(styles);
  const GAP = { 16: styles.gap16, 24: styles.gap24, 32: styles.gap32 } as const;

  const dirClass = directionClasses[direction];
  const hClass =
    direction === "column"
      ? alignItemsHorizontal[horizontalAlign]
      : justifyHorizontal[horizontalAlign];
  const vClass =
    direction === "column"
      ? justifyVertical[verticalAlign]
      : alignItemsVertical[verticalAlign];

  const stretchClass = stretchChildren ? styles.stretchChildren : "";
  const boxedClass = boxed ? styles.boxed : "";
  const gapClass = gap ? (GAP[gap] ?? "") : "";
  const highlightedClass = highlighted ? styles.highlighted : "";
  const unlightedClass = unlighted ? styles.unlighted : "";

  return (
    <div
      className={`${styles.wrapper} ${dirClass} ${hClass} ${vClass} ${stretchClass} ${boxedClass} ${gapClass} ${highlightedClass} ${unlightedClass} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
