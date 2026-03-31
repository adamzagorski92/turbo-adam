/**
 * Custom hook for managing series slider state and logic
 */

import { useMemo, useState } from "react";
import type { ArticleSeriesContext } from "@features/blog/utils/getArticleSeriesContext";
import {
  VISIBLE_STEPS,
  getInitialWindowStart,
  calculateSlideState,
} from "@features/blog/utils/sliderUtils";

export function useSeriesSlider(seriesContext: ArticleSeriesContext | null) {
  const [windowStart, setWindowStart] = useState(0);

  const [prevContext, setPrevContext] = useState(seriesContext);
  if (prevContext !== seriesContext) {
    setPrevContext(seriesContext);
    if (!seriesContext) {
      setWindowStart(0);
    } else {
      setWindowStart(
        getInitialWindowStart(
          seriesContext.currentIndex,
          seriesContext.steps.length,
        ),
      );
    }
  }

  // Compute derived state
  const totalSteps = seriesContext?.steps.length ?? 0;
  const currentIndex = seriesContext?.currentIndex ?? 0;

  const slideState = useMemo(
    () => calculateSlideState(windowStart, totalSteps),
    [windowStart, totalSteps],
  );

  const visibleSteps = useMemo(
    () =>
      seriesContext
        ? seriesContext.steps.slice(windowStart, windowStart + VISIBLE_STEPS)
        : [],
    [seriesContext, windowStart],
  );

  // Navigation handlers
  const slidePrev = () => {
    setWindowStart((prev) => Math.max(0, prev - 1));
  };

  const slideNext = () => {
    setWindowStart((prev) => Math.min(slideState.maxWindowStart, prev + 1));
  };

  return {
    windowStart,
    totalSteps,
    currentIndex,
    visibleSteps,
    canSlidePrev: slideState.canSlidePrev,
    canSlideNext: slideState.canSlideNext,
    slidePrev,
    slideNext,
  };
}
