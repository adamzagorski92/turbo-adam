import { Moon, Sun } from "lucide-react";
import { useLayoutEffect, useState } from "react";
import styles from "./ThemeSwitcher.module.css";

type Theme = "light" | "dark";
const DEFAULT_THEME: Theme = "light";
const THEME_SWITCHING_ATTR = "data-theme-switching";

function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return DEFAULT_THEME;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const saved = window.localStorage.getItem("theme");
  return isTheme(saved) ? saved : getSystemTheme();
}

function syncThemeColorMeta() {
  const content = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-bg-canvas")
    .trim();

  if (!content) return;

  let meta = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]',
  );

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
}

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useLayoutEffect(() => {
    const saved = localStorage.getItem("theme");
    if (!isTheme(saved)) {
      localStorage.setItem("theme", theme);
    }
  }, []);

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    syncThemeColorMeta();

    const root = document.documentElement;
    if (!root.hasAttribute(THEME_SWITCHING_ATTR)) return;

    let raf1 = 0;
    let raf2 = 0;
    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        root.removeAttribute(THEME_SWITCHING_ATTR);
      });
    });

    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
    };
  }, [theme]);

  const handleThemeChange = (newTheme: Theme) => {
    document.documentElement.setAttribute(THEME_SWITCHING_ATTR, "true");
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const nextTheme: Theme = theme === "light" ? "dark" : "light";
  const label =
    theme === "light" ? "Switch to dark theme" : "Switch to light theme";

  return (
    <div className={styles.switcher}>
      <button
        onClick={() => handleThemeChange(nextTheme)}
        aria-label={label}
        aria-pressed={theme === "dark"}
        type="button"
      >
        {theme === "light" ? (
          <Sun className={styles.icon} aria-hidden="true" />
        ) : (
          <Moon className={styles.icon} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
