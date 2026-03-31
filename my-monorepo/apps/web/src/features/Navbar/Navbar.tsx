import {
  ContentSection,
  ThemeSwitcher,
  Drawer,
  Button,
} from "@my-monorepo/components";
import { Coffee, Settings } from "lucide-react";
import { useState } from "react";
import Logo from "@components/Logo/Logo";
import LanguageSwitcher from "@components/LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { t } = useTranslation("UI");
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <ContentSection
      direction="row"
      horizontalAlign="left"
      verticalAlign="middle"
      className={styles.topBar}
    >
      <Logo />

      <nav className={styles.navMenu}>
        <span className={styles.menuSeparator} aria-hidden="true" />
        <Link to="/blog" className={styles.blogLink}>
          {t("navbar.blog")}
        </Link>
      </nav>

      <div className={styles.navActions}>
        <a
          href="https://buycoffee.to/zagorski"
          target="_blank"
          rel="noopener noreferrer"
          className={`btn-action ${styles.coffeeLink} ${styles.desktopOnly}`}
        >
          <Coffee className={styles.coffeeLinkIcon} aria-hidden="true" />
          <span>{t("navbar.buyCoffeeCta")}</span>
        </a>
        <div className={styles.desktopOnly}>
          <LanguageSwitcher />
        </div>
        <div className={styles.desktopOnly}>
          <ThemeSwitcher />
        </div>

        <Button
          id="navbar-settings-toggle"
          className={`${styles.iconButton} ${styles.mobileOnly}`}
          ariaAttributes={{ ariaLabel: t("navbar.settings") }}
          onClick={() => setSettingsOpen(true)}
        >
          <Settings className={styles.iconSize} aria-hidden="true" />
        </Button>
      </div>

      <Drawer
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        side="right"
        ariaLabel={t("navbar.settings")}
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

          <div
            className={styles.settingsRow}
            role="button"
            tabIndex={0}
            onClick={(e) => e.currentTarget.querySelector("button")?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.currentTarget.querySelector("button")?.click();
              }
            }}
          >
            <span className={styles.settingsLabel}>{t("blog.language")}</span>
            <LanguageSwitcher />
          </div>
          <div
            className={styles.settingsRow}
            role="button"
            tabIndex={0}
            onClick={(e) => e.currentTarget.querySelector("button")?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.currentTarget.querySelector("button")?.click();
              }
            }}
          >
            <span className={styles.settingsLabel}>{t("blog.theme")}</span>
            <ThemeSwitcher />
          </div>
        </nav>
      </Drawer>
    </ContentSection>
  );
};

export default Navbar;
