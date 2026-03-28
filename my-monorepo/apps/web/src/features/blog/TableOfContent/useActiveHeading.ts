import { useEffect, useRef, useState } from "react";

export interface Heading {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function useActiveHeading(
  containerSelector: string,
  contentKey: string,
) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");
  const headingIdsRef = useRef<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    const container = document.querySelector(containerSelector);
    if (!container) {
      setHeadings([]);
      setActiveId("");
      return;
    }

    const elements = container.querySelectorAll<HTMLHeadingElement>("h2, h3");
    const slugCount = new Map<string, number>();
    const collected: Heading[] = [];
    const ids: string[] = [];

    elements.forEach((el) => {
      const text = el.textContent?.trim() ?? "";
      if (!text) return;

      let slug = slugify(text);
      const count = slugCount.get(slug) ?? 0;
      slugCount.set(slug, count + 1);
      if (count > 0) slug += `-${count}`;

      if (!el.id) el.id = slug;

      collected.push({
        id: el.id,
        text,
        level: el.tagName === "H2" ? 2 : 3,
      });
      ids.push(el.id);
    });

    headingIdsRef.current = ids;
    setHeadings(collected);
    setActiveId(ids[0] ?? "");

    if (ids.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (cancelled) return;

        const visible = entries.filter((e) => e.isIntersecting);

        if (visible.length > 0) {
          const topmost = visible.reduce((a, b) =>
            a.boundingClientRect.top <= b.boundingClientRect.top ? a : b,
          );
          setActiveId(topmost.target.id);
          return;
        }

        const exitedDown = entries
          .filter((e) => e.boundingClientRect.top > 0)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (exitedDown.length > 0) {
          const closest = exitedDown[0];
          const index = headingIdsRef.current.indexOf(closest.target.id);
          if (index > 0) {
            setActiveId(headingIdsRef.current[index - 1]);
          }
        }
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [containerSelector, contentKey]);

  return { headings, activeId };
}
