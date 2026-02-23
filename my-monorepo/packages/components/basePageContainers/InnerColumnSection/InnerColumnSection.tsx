import type { SelectorElement } from "../types/selectorElement";
import {
  buildAlignMaps,
  type Direction,
  type HorizontalAlign,
  type VerticalAlign,
} from "../utils/align";

import styles from "./InnerColumnSection.module.css";

export function InnerColumnSection({
  children,
  horizontalAlign = "left",
  verticalAlign = "top",
  direction = "row",
  gap,
  boxed = false,
  backgroundColor,
  className = "",
  selector = "div",
}: {
  children: React.ReactNode;
  selector?: SelectorElement;
  horizontalAlign?: HorizontalAlign;
  verticalAlign?: VerticalAlign;
  direction?: Direction;
  gap?: 16 | 24 | 32;
  boxed?: boolean;
  backgroundColor?: "surface" | "brandSubtle";
  className?: string;
}) {
  const {
    directionClasses,
    justifyHorizontal,
    alignItemsHorizontal,
    justifyVertical,
    alignItemsVertical,
  } = buildAlignMaps(styles);
  const GAP = { 16: styles.gap16, 24: styles.gap24, 32: styles.gap32 } as const;
  const BG = {
    surface: styles.bgSurface,
    brandSubtle: styles.bgBrandSubtle,
  } as const;

  const dirClass = directionClasses[direction];
  const hClass =
    direction === "column"
      ? alignItemsHorizontal[horizontalAlign]
      : justifyHorizontal[horizontalAlign];
  const vClass =
    direction === "column"
      ? justifyVertical[verticalAlign]
      : alignItemsVertical[verticalAlign];

  const gapClass = gap ? (GAP[gap] ?? "") : "";
  const boxedClass = boxed ? styles.boxed : "";
  const bgClass = backgroundColor ? BG[backgroundColor] : "";

  const Tag = selector;

  return (
    <Tag
      className={`${styles.wrapper} ${dirClass} ${hClass} ${vClass} ${gapClass} ${boxedClass} ${bgClass} ${className}`}
    >
      {children}
    </Tag>
  );
}
