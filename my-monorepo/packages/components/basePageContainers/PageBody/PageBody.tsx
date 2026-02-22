import { type ReactNode } from "react";
import { BG_CLASS, buildPaddingStyle } from "../utils/styles";
import type { SelectorPageBody } from "../types/selectorElement";

type PageBg = keyof typeof BG_CLASS;

export function PageBody({
  selector = "div",
  backgroundColor,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  resetHorizontalPaddingOnMobile,
  children,
}: {
  children: ReactNode;
  selector?: SelectorPageBody;
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

  const Tag = selector;
  return (
    <Tag className={`page-body ${bgClass} ${resetClass}`} style={style}>
      {children}
    </Tag>
  );
}
