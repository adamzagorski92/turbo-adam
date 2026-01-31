export type HorizontalAlign = "left" | "center" | "right";
export type VerticalAlign = "top" | "middle" | "bottom";
export type Direction = "row" | "column";

export type AlignStyles = Record<
  | "row"
  | "column"
  | "justifyStart"
  | "justifyCenter"
  | "justifyEnd"
  | "alignStart"
  | "alignCenter"
  | "alignEnd",
  string
>;

export type AlignMaps = {
  directionClasses: { row: string; column: string };
  justifyHorizontal: Record<HorizontalAlign, string>;
  alignItemsHorizontal: Record<HorizontalAlign, string>;
  justifyVertical: Record<VerticalAlign, string>;
  alignItemsVertical: Record<VerticalAlign, string>;
};

export function buildAlignMaps(styles: Record<string, string>): AlignMaps {
  const s = styles as AlignStyles;
  return {
    directionClasses: { row: s.row, column: s.column },
    justifyHorizontal: {
      left: s.justifyStart,
      center: s.justifyCenter,
      right: s.justifyEnd,
    },
    alignItemsHorizontal: {
      left: s.alignStart,
      center: s.alignCenter,
      right: s.alignEnd,
    },
    justifyVertical: {
      top: s.justifyStart,
      middle: s.justifyCenter,
      bottom: s.justifyEnd,
    },
    alignItemsVertical: {
      top: s.alignStart,
      middle: s.alignCenter,
      bottom: s.alignEnd,
    },
  };
}
