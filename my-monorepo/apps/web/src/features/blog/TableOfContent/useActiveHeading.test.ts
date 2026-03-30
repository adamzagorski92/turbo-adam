import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useActiveHeading } from "./useActiveHeading";

const scrollListeners: Array<EventListener> = [];

beforeEach(() => {
  vi.spyOn(window, "addEventListener").mockImplementation(
    (event: string, handler: EventListenerOrEventListenerObject) => {
      if (event === "scroll" && typeof handler === "function") {
        scrollListeners.push(handler);
      }
    },
  );
  vi.spyOn(window, "removeEventListener").mockImplementation(() => {});

  Object.defineProperty(window, "innerHeight", {
    writable: true,
    value: 1000,
  });
  Object.defineProperty(window, "scrollY", { writable: true, value: 0 });
  Object.defineProperty(document.documentElement, "scrollHeight", {
    writable: true,
    value: 3000,
  });
});

afterEach(() => {
  document.body.innerHTML = "";
  scrollListeners.length = 0;
  vi.restoreAllMocks();
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

function mockHeadingPositions(positions: Record<string, number>) {
  for (const [id, top] of Object.entries(positions)) {
    const el = document.getElementById(id);
    if (el) {
      vi.spyOn(el, "getBoundingClientRect").mockReturnValue({
        top,
        bottom: top + 30,
        left: 0,
        right: 100,
        width: 100,
        height: 30,
        x: 0,
        y: top,
        toJSON: () => {},
      });
    }
  }
}

function fireScroll() {
  act(() => {
    scrollListeners.forEach((fn) => fn(new Event("scroll")));
  });
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

    // Both headings are below threshold on initial load
    const firstEl = document.querySelector("h2:first-of-type")!;
    const secondEl = document.querySelector("h2:last-of-type")!;
    vi.spyOn(firstEl, "getBoundingClientRect").mockReturnValue({
      top: 400,
      bottom: 430,
      left: 0,
      right: 100,
      width: 100,
      height: 30,
      x: 0,
      y: 400,
      toJSON: () => {},
    });
    vi.spyOn(secondEl, "getBoundingClientRect").mockReturnValue({
      top: 800,
      bottom: 830,
      left: 0,
      right: 100,
      width: 100,
      height: 30,
      x: 0,
      y: 800,
      toJSON: () => {},
    });

    const { result } = renderHook(() => useActiveHeading("article", "slug-1"));

    expect(result.current.activeId).toBe("first");
  });

  it("registers a scroll listener", () => {
    setupArticle([
      { tag: "h2", text: "A" },
      { tag: "h3", text: "B" },
    ]);

    renderHook(() => useActiveHeading("article", "slug-1"));

    expect(scrollListeners.length).toBeGreaterThan(0);
  });

  it("activates heading that scrolled past the 30% threshold", () => {
    setupArticle([
      { tag: "h2", text: "First" },
      { tag: "h2", text: "Second" },
    ]);

    const { result } = renderHook(() => useActiveHeading("article", "slug-1"));

    // Second heading scrolled above threshold (30% of 1000 = 300)
    mockHeadingPositions({ first: -200, second: 100 });
    fireScroll();

    expect(result.current.activeId).toBe("second");
  });

  it("activates previous heading when scrolling back up", () => {
    setupArticle([
      { tag: "h2", text: "First" },
      { tag: "h2", text: "Second" },
    ]);

    const { result } = renderHook(() => useActiveHeading("article", "slug-1"));

    mockHeadingPositions({ first: -200, second: 100 });
    fireScroll();
    expect(result.current.activeId).toBe("second");

    // Scroll back up — second is now below threshold
    mockHeadingPositions({ first: 100, second: 500 });
    fireScroll();

    expect(result.current.activeId).toBe("first");
  });

  it("keeps first heading active when all headings are below threshold", () => {
    setupArticle([
      { tag: "h2", text: "First" },
      { tag: "h2", text: "Second" },
      { tag: "h2", text: "Third" },
    ]);

    const { result } = renderHook(() => useActiveHeading("article", "slug-1"));

    mockHeadingPositions({ first: 400, second: 700, third: 1000 });
    fireScroll();

    expect(result.current.activeId).toBe("first");
  });

  it("picks the last heading that passed threshold when multiple are above", () => {
    setupArticle([
      { tag: "h2", text: "First" },
      { tag: "h2", text: "Second" },
      { tag: "h2", text: "Third" },
    ]);

    const { result } = renderHook(() => useActiveHeading("article", "slug-1"));

    mockHeadingPositions({ first: -300, second: -50, third: 200 });
    fireScroll();

    expect(result.current.activeId).toBe("third");
  });

  it("activates last heading when scrolled to page bottom", () => {
    setupArticle([
      { tag: "h2", text: "First" },
      { tag: "h2", text: "Second" },
      { tag: "h2", text: "Third" },
    ]);

    const { result } = renderHook(() => useActiveHeading("article", "slug-1"));

    // Simulate at-bottom: innerHeight(1000) + scrollY(2000) >= scrollHeight(3000) - 30
    Object.defineProperty(window, "scrollY", { writable: true, value: 2000 });
    mockHeadingPositions({ first: -1000, second: -500, third: 400 });
    fireScroll();

    expect(result.current.activeId).toBe("third");
  });

  it("removes scroll listener on unmount", () => {
    setupArticle([{ tag: "h2", text: "Heading" }]);

    const listenersBefore = scrollListeners.length;
    renderHook(() => useActiveHeading("article", "slug-1"));

    expect(scrollListeners.length).toBeGreaterThan(listenersBefore);
    expect(window.removeEventListener).not.toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    );
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
