import { ContentSection, ThemeSwitcher } from "@my-monorepo/components";
import { Coffee } from "lucide-react";
import Logo from "@components/Logo/Logo";
import LanguageSwitcher from "@components/LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { t } = useTranslation("UI");

  return (
    <ContentSection
      direction="row"
      horizontalAlign="left"
      verticalAlign="middle"
      className={styles.topBar}
    >
      <Logo />
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
    </ContentSection>
  );
};

export default Navbar;
