import { Moon, Sun } from "lucide-react";
import { useLayoutEffect, useState } from "react";
import styles from "./ThemeSwitcher.module.css";

type Theme = "light" | "dark";
const DEFAULT_THEME: Theme = "light";

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
  }, [theme]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className={styles.switcher}>
      <button
        className={theme === "light" ? styles.active : undefined}
        onClick={() => handleThemeChange("light")}
        aria-label="Light theme"
        aria-pressed={theme === "light"}
        type="button"
      >
        <Sun className={styles.icon} aria-hidden="true" />
      </button>
      <button
        className={theme === "dark" ? styles.active : undefined}
        onClick={() => handleThemeChange("dark")}
        aria-label="Dark theme"
        aria-pressed={theme === "dark"}
        type="button"
      >
        <Moon className={styles.icon} aria-hidden="true" />
      </button>
    </div>
  );
}
