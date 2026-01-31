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
}: {
  children: React.ReactNode;
  horizontalAlign?: HorizontalAlign;
  verticalAlign?: VerticalAlign;
  direction?: Direction;
  gap?: 16 | 24 | 32;
  boxed?: boolean;
  backgroundColor?: "grey100" | "blue100";
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
  const BG = { grey100: styles.bgGrey100, blue100: styles.bgBlue100 } as const;

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

  return (
    <div
      className={`${styles.wrapper} ${dirClass} ${hClass} ${vClass} ${gapClass} ${boxedClass} ${bgClass} ${className}`}
    >
      {children}
    </div>
  );
}
