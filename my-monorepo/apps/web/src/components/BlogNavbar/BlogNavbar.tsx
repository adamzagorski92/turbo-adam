import { Coffee, Menu, Search, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { InputText, ThemeSwitcher } from "@packages/components";
import LanguageSwitcher from "@components/LanguageSwitcher/LanguageSwitcher";
import styles from "./BlogNavbar.module.css";

const BlogNavbar = () => {
  const { t } = useTranslation("UI");

  return (
    <div className={styles.navbar}>
      <button
        type="button"
        className={`${styles.iconButton} ${styles.mobileOnly}`}
        aria-label="Menu"
      >
        <Menu className={styles.iconSize} aria-hidden="true" />
      </button>

      <div className={styles.searchWrapper}>
        <InputText
          type="search"
          globalAttributes={{ className: styles.searchInput }}
          textInputSpecificAttrs={{ placeholder: t("blog.searchPlaceholder") }}
          a11y={{ ariaLabel: t("blog.searchPlaceholder") }}
          eventHandlers={{
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                console.log("Search:", (e.target as HTMLInputElement).value);
              }
            },
          }}
        />
        <button
          type="button"
          className={styles.searchButton}
          aria-label={t("blog.searchPlaceholder")}
          onClick={() => {
            const input = document.querySelector<HTMLInputElement>(
              `.${styles.searchInput}`,
            );
            if (input) console.log("Search:", input.value);
          }}
        >
          <Search className={styles.searchButtonIcon} aria-hidden="true" />
        </button>
      </div>

      <button
        type="button"
        className={`${styles.iconButton} ${styles.mobileOnly}`}
        aria-label={t("blog.settings")}
      >
        <Settings className={styles.iconSize} aria-hidden="true" />
      </button>

      <a
        href="https://buycoffee.to/zagorski"
        target="_blank"
        rel="noopener noreferrer"
        className={`btn-action ${styles.coffeeLink} ${styles.desktopOnly}`}
      >
        <Coffee className={styles.coffeeLinkIcon} aria-hidden="true" />
        <span>{t("navbar.buyCoffeeCta")}</span>
      </a>

      <span className={styles.desktopOnly}>
        <LanguageSwitcher />
      </span>
      <span className={styles.desktopOnly}>
        <ThemeSwitcher />
      </span>
    </div>
  );
};

export default BlogNavbar;
