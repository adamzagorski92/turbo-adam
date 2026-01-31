import {
  type BackgroundColor,
  buildPaddingStyle,
  type PaddingProps,
  resolveBackground,
} from "../utils/styles";

type SectionContainerProps = {
  children: React.ReactNode;
  fullBleed?: boolean;
  noPadding?: boolean;
  noTopPadding?: boolean;
  noBottomPadding?: boolean;
  backgroundColor?: BackgroundColor;
  backgroundOpacity?: number;
  paddingTop?: PaddingProps["paddingTop"];
  paddingRight?: PaddingProps["paddingRight"];
  paddingBottom?: PaddingProps["paddingBottom"];
  paddingLeft?: PaddingProps["paddingLeft"];
  resetHorizontalPaddingOnMobile?: boolean;
  className?: string;
};

export function SectionContainer({
  children,
  fullBleed = false,
  noPadding = false,
  noTopPadding = false,
  noBottomPadding = false,
  className = "",
  backgroundColor,
  backgroundOpacity,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  resetHorizontalPaddingOnMobile,
}: SectionContainerProps) {
  const { className: bgClass, style: bgStyle } = resolveBackground(
    backgroundColor,
    backgroundOpacity,
  );
  const padStyle = buildPaddingStyle({
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
  });

  const classes = [
    "page-section-container",
    fullBleed && "full-bleed",
    noPadding && "no-padding",
    !noPadding && noTopPadding && "no-top-padding",
    !noPadding && noBottomPadding && "no-bottom-padding",
    bgClass,
    resetHorizontalPaddingOnMobile && "reset-horizontal-padding-mobile",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes} style={{ ...(bgStyle || {}), ...padStyle }}>
      {children}
    </section>
  );
}
