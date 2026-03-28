import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useActiveHeading } from "./useActiveHeading";

let observerCallback: IntersectionObserverCallback;
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

function createEntry(
  target: Element,
  isIntersecting: boolean,
  top: number,
): IntersectionObserverEntry {
  return {
    isIntersecting,
    target,
    boundingClientRect: { top } as DOMRectReadOnly,
    intersectionRatio: isIntersecting ? 1 : 0,
    intersectionRect: {} as DOMRectReadOnly,
    rootBounds: null,
    time: 0,
  };
}

beforeEach(() => {
  const MockIntersectionObserver = vi.fn(function (
    this: Record<string, unknown>,
    callback: IntersectionObserverCallback,
  ) {
    observerCallback = callback;
    this.observe = mockObserve;
    this.unobserve = vi.fn();
    this.disconnect = mockDisconnect;
    this.root = null;
    this.rootMargin = "";
    this.thresholds = [];
    this.takeRecords = vi.fn().mockReturnValue([]);
  });
  window.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;
});

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
  mockObserve.mockClear();
  mockDisconnect.mockClear();
});

function setupArticle(
  headings: Array<{ tag: string; text: string; id?: string }>,
) {
  const article = document.createElement("article");
  headings.forEach(({ tag, text, id }) => {
    const el = document.createElement(tag);
    el.textContent = text;
    if (id) el.id = id;
    article.appendChild(el);
  });
  document.body.appendChild(article);
}

describe("useActiveHeading", () => {
  it("returns empty headings when container does not exist", () => {
    const { result } = renderHook(() => useActiveHeading("article", "test"));
    expect(result.current.headings).toEqual([]);
    expect(result.current.activeId).toBe("");
  });

  it("collects h2 and h3 from container", () => {
    setupArticle([
      { tag: "h2", text: "Introduction" },
      { tag: "h3", text: "Background" },
      { tag: "h2", text: "Conclusion" },
    ]);

    const { result } = renderHook(() => useActiveHeading("article", "slug-1"));

    expect(result.current.headings).toHaveLength(3);
    expect(result.current.headings[0]).toMatchObject({
      text: "Introduction",
      level: 2,
    });
    expect(result.current.headings[1]).toMatchObject({
      text: "Background",
      level: 3,
    });
    expect(result.current.headings[2]).toMatchObject({
      text: "Conclusion",
      level: 2,
    });
  });

  it("assigns slugified IDs to headings without IDs", () => {
    setupArticle([
      { tag: "h2", text: "Getting Started" },
      { tag: "h3", text: "Step One" },
    ]);

    const { result } = renderHook(() => useActiveHeading("article", "slug-1"));

    expect(result.current.headings[0].id).toBe("getting-started");
    expect(result.current.headings[1].id).toBe("step-one");

    expect(document.getElementById("getting-started")).toBeTruthy();
    expect(document.getElementById("step-one")).toBeTruthy();
  });

  it("preserves existing IDs on headings", () => {
    setupArticle([{ tag: "h2", text: "Custom", id: "my-custom-id" }]);

    const { result } = renderHook(() => useActiveHeading("article", "slug-1"));

    expect(result.current.headings[0].id).toBe("my-custom-id");
  });

  it("handles duplicate heading text by appending index", () => {
    setupArticle([
      { tag: "h2", text: "Overview" },
      { tag: "h2", text: "Overview" },
    ]);

    const { result } = renderHook(() => useActiveHeading("article", "slug-1"));

    expect(result.current.headings[0].id).toBe("overview");
    expect(result.current.headings[1].id).toBe("overview-1");
  });

  it("sets first heading as initial activeId", () => {
    setupArticle([
      { tag: "h2", text: "First" },
      { tag: "h2", text: "Second" },
    ]);

    const { result } = renderHook(() => useActiveHeading("article", "slug-1"));

    expect(result.current.activeId).toBe("first");
  });

  it("observes all heading elements", () => {
    setupArticle([
      { tag: "h2", text: "A" },
      { tag: "h3", text: "B" },
    ]);

    renderHook(() => useActiveHeading("article", "slug-1"));

    expect(mockObserve).toHaveBeenCalledTimes(2);
  });

  it("activates heading when IntersectionObserver fires isIntersecting", () => {
    setupArticle([
      { tag: "h2", text: "First" },
      { tag: "h2", text: "Second" },
    ]);

    const { result } = renderHook(() => useActiveHeading("article", "slug-1"));

    const secondEl = document.getElementById("second")!;

    act(() => {
      observerCallback(
        [createEntry(secondEl, true, 50)],
        {} as IntersectionObserver,
      );
    });

    expect(result.current.activeId).toBe("second");
  });

  it("activates previous heading when current exits downward (scroll up)", () => {
    setupArticle([
      { tag: "h2", text: "First" },
      { tag: "h2", text: "Second" },
    ]);

    const { result } = renderHook(() => useActiveHeading("article", "slug-1"));

    const secondEl = document.getElementById("second")!;

    act(() => {
      observerCallback(
        [createEntry(secondEl, true, 50)],
        {} as IntersectionObserver,
      );
    });
    expect(result.current.activeId).toBe("second");

    act(() => {
      observerCallback(
        [createEntry(secondEl, false, 400)],
        {} as IntersectionObserver,
      );
    });

    expect(result.current.activeId).toBe("first");
  });

  it("does not change activeId when first heading exits downward", () => {
    setupArticle([{ tag: "h2", text: "Only" }]);

    const { result } = renderHook(() => useActiveHeading("article", "slug-1"));

    const onlyEl = document.getElementById("only")!;

    act(() => {
      observerCallback(
        [createEntry(onlyEl, false, 400)],
        {} as IntersectionObserver,
      );
    });

    expect(result.current.activeId).toBe("only");
  });

  it("picks topmost heading when multiple are intersecting at once", () => {
    setupArticle([
      { tag: "h2", text: "First" },
      { tag: "h2", text: "Second" },
      { tag: "h2", text: "Third" },
    ]);

    const { result } = renderHook(() => useActiveHeading("article", "slug-1"));

    const firstEl = document.getElementById("first")!;
    const secondEl = document.getElementById("second")!;
    const thirdEl = document.getElementById("third")!;

    act(() => {
      observerCallback(
        [
          createEntry(firstEl, true, 10),
          createEntry(secondEl, true, 200),
          createEntry(thirdEl, true, 500),
        ],
        {} as IntersectionObserver,
      );
    });

    expect(result.current.activeId).toBe("first");
  });

  it("keeps first heading active on initial load when all headings are below observation zone", () => {
    setupArticle([
      { tag: "h2", text: "First" },
      { tag: "h2", text: "Second" },
      { tag: "h2", text: "Third" },
    ]);

    const { result } = renderHook(() => useActiveHeading("article", "slug-1"));

    const firstEl = document.getElementById("first")!;
    const secondEl = document.getElementById("second")!;
    const thirdEl = document.getElementById("third")!;

    // Simulate initial observer callback: all headings below 30% zone
    act(() => {
      observerCallback(
        [
          createEntry(firstEl, false, 300),
          createEntry(secondEl, false, 600),
          createEntry(thirdEl, false, 900),
        ],
        {} as IntersectionObserver,
      );
    });

    expect(result.current.activeId).toBe("first");
  });

  it("disconnects observer on unmount", () => {
    setupArticle([{ tag: "h2", text: "Heading" }]);

    const { unmount } = renderHook(() => useActiveHeading("article", "slug-1"));

    const callsBefore = mockDisconnect.mock.calls.length;
    unmount();

    expect(mockDisconnect.mock.calls.length).toBeGreaterThan(callsBefore);
  });

  it("rescans headings when contentKey changes", () => {
    setupArticle([{ tag: "h2", text: "Old" }]);

    const { result, rerender } = renderHook(
      ({ key }) => useActiveHeading("article", key),
      { initialProps: { key: "slug-1" } },
    );

    expect(result.current.headings[0].text).toBe("Old");

    document.body.innerHTML = "";
    setupArticle([{ tag: "h2", text: "New" }]);

    rerender({ key: "slug-2" });

    expect(result.current.headings[0].text).toBe("New");
  });

  it("ignores headings with empty text", () => {
    setupArticle([
      { tag: "h2", text: "Valid" },
      { tag: "h3", text: "" },
    ]);

    const { result } = renderHook(() => useActiveHeading("article", "slug-1"));

    expect(result.current.headings).toHaveLength(1);
  });
});
