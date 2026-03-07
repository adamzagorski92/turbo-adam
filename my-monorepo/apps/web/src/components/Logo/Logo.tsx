import lightLogoUrl from "@assets/light_logo.webp";
import darkLogoUrl from "@assets/dark_logo.webp";
import { useTranslation } from "react-i18next";
import styles from "./Logo.module.css";

function Logo() {
  const { t } = useTranslation("UI");
  const alt = t("logo.alt");

  return (
    <a href="/" className={styles.logo} aria-label={t("logo.homeAriaLabel")}>
      <img
        src={lightLogoUrl}
        alt={alt}
        className={styles.lightVariant}
        width={174}
        height={44}
        fetchPriority="high"
      />
      <img
        src={darkLogoUrl}
        alt={alt}
        className={styles.darkVariant}
        width={174}
        height={44}
        fetchPriority="high"
      />
    </a>
  );
}

export default Logo;
