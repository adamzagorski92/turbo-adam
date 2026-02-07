import type { CSSProperties } from "react";

export type BackgroundColor = "scrim" | "strong" | "surface" | "brandSubtle";

export const BG_CLASS = {
  strong: "bg-strong",
  surface: "bg-surface",
  brandSubtle: "bg-brand-subtle",
} as const;

const COLOR_TOKEN: Record<BackgroundColor, string> = {
  scrim: "var(--color-bg-scrim)",
  strong: "var(--color-bg-strong)",
  surface: "var(--color-bg-surface)",
  brandSubtle: "var(--color-bg-brand-subtle)",
} as const;

export function normalizeAlpha(value: number | undefined): number | undefined {
  if (value === undefined) return undefined;
  if (value > 1) return Math.min(value / 100, 1);
  return Math.min(Math.max(value, 0), 1);
}

function withAlpha(color: string, alpha: number): string {
  const percent = `${Math.round(alpha * 10000) / 100}%`;
  return `color-mix(in srgb, ${color} ${percent}, transparent)`;
}

export function resolveBackground(
  backgroundColor?: BackgroundColor,
  backgroundOpacity?: number,
): { className?: string; style?: CSSProperties } {
  if (!backgroundColor) return {};
  const alpha = normalizeAlpha(backgroundOpacity);
  if (backgroundColor === "scrim") {
    return {
      style: {
        backgroundColor:
          alpha === undefined
            ? COLOR_TOKEN.scrim
            : withAlpha(COLOR_TOKEN.scrim, alpha),
        borderRadius: "var(--border-radius)",
      },
    };
  }
  if (alpha !== undefined) {
    return {
      style: {
        backgroundColor: withAlpha(COLOR_TOKEN[backgroundColor], alpha),
      },
    };
  }
  const className = (BG_CLASS as Record<string, string>)[backgroundColor];
  return className
    ? { className }
    : { style: { backgroundColor: COLOR_TOKEN[backgroundColor] } };
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
