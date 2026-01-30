import type { CSSProperties } from "react";

export type BackgroundColor = "black" | "ink900" | "grey100" | "blue100";

export const BG_CLASS = {
  ink900: "bg-ink-900",
  grey100: "bg-grey-100",
  blue100: "bg-blue-100",
} as const;

export const HEX_MAP: Record<BackgroundColor, string> = {
  black: "#000000",
  ink900: "#081A34",
  grey100: "#f9f9f9",
  blue100: "#ecf3ff",
};

export function normalizeAlpha(value: number | undefined): number | undefined {
  if (value === undefined) return undefined;
  if (value > 1) return Math.min(value / 100, 1);
  return Math.min(Math.max(value, 0), 1);
}

export function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function resolveBackground(
  backgroundColor?: BackgroundColor,
  backgroundOpacity?: number,
): { className?: string; style?: CSSProperties } {
  if (!backgroundColor) return {};
  const alpha = normalizeAlpha(backgroundOpacity);
  if (backgroundColor === "black") {
    return {
      style: {
        backgroundColor: HEX_MAP.black,
        borderRadius: "var(--border-radius)",
      },
    };
  }
  if (alpha !== undefined) {
    return {
      style: { backgroundColor: hexToRgba(HEX_MAP[backgroundColor], alpha) },
    };
  }
  const className = (BG_CLASS as Record<string, string>)[backgroundColor];
  return className
    ? { className }
    : { style: { backgroundColor: HEX_MAP[backgroundColor] } };
}

export type PaddingProps = {
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
};

export function buildPaddingStyle({
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
}: PaddingProps): CSSProperties {
  const style: CSSProperties = {};
  if (paddingTop !== undefined)
    style.paddingTop =
      typeof paddingTop === "number" ? `${paddingTop}px` : paddingTop;
  if (paddingRight !== undefined)
    style.paddingRight =
      typeof paddingRight === "number" ? `${paddingRight}px` : paddingRight;
  if (paddingBottom !== undefined)
    style.paddingBottom =
      typeof paddingBottom === "number" ? `${paddingBottom}px` : paddingBottom;
  if (paddingLeft !== undefined)
    style.paddingLeft =
      typeof paddingLeft === "number" ? `${paddingLeft}px` : paddingLeft;
  return style;
}
