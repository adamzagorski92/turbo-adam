import { type ReactNode } from "react";
import { BG_CLASS, buildPaddingStyle } from "../utils/styles";

type PageBg = keyof typeof BG_CLASS;

export function PageBody({
  backgroundColor,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  resetHorizontalPaddingOnMobile,
  children,
}: {
  children: ReactNode;
  backgroundColor?: PageBg;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  resetHorizontalPaddingOnMobile?: boolean;
}) {
  const bgClass = backgroundColor ? BG_CLASS[backgroundColor] : "";
  const style = buildPaddingStyle({
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
  });
  const resetClass = resetHorizontalPaddingOnMobile
    ? "reset-horizontal-padding-mobile"
    : "";
  return (
    <div className={`page-body ${bgClass} ${resetClass}`} style={style}>
      {children}
    </div>
  );
}
