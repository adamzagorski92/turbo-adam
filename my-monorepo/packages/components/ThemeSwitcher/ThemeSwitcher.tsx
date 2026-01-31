import { useEffect, useState } from "react";
import styles from "./ThemeSwitcher.module.css";

type Theme = "light" | "dark" | "system";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;

    if (newTheme === "system") {
      root.removeAttribute("data-theme");
      localStorage.removeItem("theme");
    } else {
      root.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <div className={styles.switcher}>
      <button
        className={theme === "light" ? styles.active : ""}
        onClick={() => handleThemeChange("light")}
        aria-label="Light theme"
      >
        ☀️
      </button>
      <button
        className={theme === "system" ? styles.active : ""}
        onClick={() => handleThemeChange("system")}
        aria-label="System theme"
      >
        💻
      </button>
      <button
        className={theme === "dark" ? styles.active : ""}
        onClick={() => handleThemeChange("dark")}
        aria-label="Dark theme"
      >
        🌙
      </button>
    </div>
  );
}
