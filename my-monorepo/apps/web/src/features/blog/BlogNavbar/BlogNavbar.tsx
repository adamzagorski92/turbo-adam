import { Coffee, Menu, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button, Drawer, ThemeSwitcher } from "@packages/components";
import LanguageSwitcher from "@components/LanguageSwitcher/LanguageSwitcher";
import styles from "./BlogNavbar.module.css";
import SearchEngine from "../SearchEngine/SearchEngine";

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
        ariaAttributes={{ ariaLabel: t("blog.menu") }}
        onClick={onMenuOpen}
      >
        <Menu className={styles.iconSize} aria-hidden="true" />
      </Button>

      <SearchEngine />

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
