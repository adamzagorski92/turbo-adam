import type { CSSProperties } from "react";
import type { ReactNode } from "react";

export interface MetaIcon {
  isIcon: boolean;
  src: string;
  alt?: string;
}

export interface CommonProps {
  id: string;
  className?: string;
  style?: CSSProperties;
  title?: string;
  lang?: string;
  tabIndex?: number;
  "data-testid"?: string;
  dir?: "ltr" | "rtl";
}

export interface CommonInteractiveProps extends CommonProps {
  disabled?: boolean;
}

export type ButtonType = "submit" | "reset" | "button";

export type OptionList = {
  id: string;
  label: ReactNode;
  disabled?: boolean;
  optionClassName?: string;
}[];
