import { ContentSection, ThemeSwitcher } from "@my-monorepo/components";
import { Coffee } from "lucide-react";
import Logo from "@components/Logo/Logo";
import styles from "./Navbar.module.css";

const Navbar = () => {
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
        className={styles.coffeeLink}
      >
        <Coffee className={styles.coffeeLinkIcon} aria-hidden="true" />
        <span>Postaw Kawę</span>
      </a>
      <ThemeSwitcher />
    </ContentSection>
  );
};

export default Navbar;
