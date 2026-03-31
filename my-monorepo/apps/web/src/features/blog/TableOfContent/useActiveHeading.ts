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

  const [prevKey, setPrevKey] = useState(contentKey);
  if (prevKey !== contentKey) {
    setPrevKey(contentKey);
    setHeadings([]);
    setActiveId("");
  }

  useEffect(() => {
    let cancelled = false;

    const container = document.querySelector(containerSelector);
    if (!container) return;

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
    // DOM scan → sync state (external system read, not a cascading render)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadings(collected);
    setActiveId(ids[0] ?? "");

    if (ids.length === 0) return;

    const handleScroll = () => {
      if (cancelled) return;
      const currentIds = headingIdsRef.current;

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 30;

      if (atBottom) {
        setActiveId(currentIds[currentIds.length - 1]);
        return;
      }

      const threshold = window.innerHeight * 0.3;
      let active = currentIds[0];

      for (const id of currentIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= threshold) {
          active = id;
        }
      }

      setActiveId(active);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", handleScroll);
    };
  }, [containerSelector, contentKey]);

  return { headings, activeId };
}
