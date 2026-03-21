import { Coffee, Menu, Search, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button, Drawer, InputText, ThemeSwitcher } from "@packages/components";
import LanguageSwitcher from "@components/LanguageSwitcher/LanguageSwitcher";
import styles from "./BlogNavbar.module.css";

interface BlogNavbarProps {
  onMenuOpen: () => void;
  settingsOpen: boolean;
  onSettingsOpen: () => void;
  onSettingsClose: () => void;
}

const BlogNavbar = ({
  onMenuOpen,
  settingsOpen,
  onSettingsOpen,
  onSettingsClose,
}: BlogNavbarProps) => {
  const { t } = useTranslation("UI");

  return (
    <div className={styles.navbar}>
      <Button
        id="blog-menu-toggle"
        className={`${styles.iconButton} ${styles.mobileOnly}`}
        ariaAttributes={{ ariaLabel: "Menu" }}
        onClick={onMenuOpen}
      >
        <Menu className={styles.iconSize} aria-hidden="true" />
      </Button>

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

      <Button
        id="blog-settings-toggle"
        className={`${styles.iconButton} ${styles.mobileOnly}`}
        ariaAttributes={{ ariaLabel: t("blog.settings") }}
        onClick={onSettingsOpen}
      >
        <Settings className={styles.iconSize} aria-hidden="true" />
      </Button>

      <div className={`${styles.desktopActions} ${styles.desktopOnly}`}>
        <a
          href="https://buycoffee.to/zagorski"
          target="_blank"
          rel="noopener noreferrer"
          className={`btn-action ${styles.coffeeLink}`}
        >
          <Coffee className={styles.coffeeLinkIcon} aria-hidden="true" />
          <span>{t("navbar.buyCoffeeCta")}</span>
        </a>
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>

      <Drawer
        open={settingsOpen}
        onClose={onSettingsClose}
        side="right"
        ariaLabel={t("blog.settings")}
      >
        <nav className={styles.settingsDrawerContent}>
          <a
            href="https://buycoffee.to/zagorski"
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-action btn-action-block ${styles.settingsCoffeeLink}`}
          >
            <Coffee className={styles.coffeeLinkIcon} aria-hidden="true" />
            <span>{t("navbar.buyCoffeeCta")}</span>
          </a>

          <hr className={styles.settingsDivider} />

          <div className={styles.settingsRow}>
            <span className={styles.settingsLabel}>{t("blog.language")}</span>
            <LanguageSwitcher />
          </div>
          <div className={styles.settingsRow}>
            <span className={styles.settingsLabel}>{t("blog.theme")}</span>
            <ThemeSwitcher />
          </div>
        </nav>
      </Drawer>
    </div>
  );
};

export default BlogNavbar;
