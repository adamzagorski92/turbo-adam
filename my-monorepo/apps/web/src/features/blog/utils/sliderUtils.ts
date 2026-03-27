/**
 * Utility functions for slider navigation
 */

export const VISIBLE_STEPS = 3;

/**
 * Clamps a value between min and max bounds (inclusive)
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Calculates the initial window position to center the current item
 */
export function getInitialWindowStart(
  currentIndex: number,
  totalSteps: number,
): number {
  if (totalSteps <= VISIBLE_STEPS) {
    return 0;
  }

  const maxWindowStart = totalSteps - VISIBLE_STEPS;
  return clamp(currentIndex - 1, 0, maxWindowStart);
}

/**
 * Calculates slide navigation state
 */
export function calculateSlideState(windowStart: number, totalSteps: number) {
  const maxWindowStart = Math.max(0, totalSteps - VISIBLE_STEPS);
  return {
    maxWindowStart,
    canSlidePrev: windowStart > 0,
    canSlideNext: windowStart < maxWindowStart,
  };
}
