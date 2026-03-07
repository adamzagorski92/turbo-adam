import lightLogoUrl from "@assets/light_logo.webp";
import darkLogoUrl from "@assets/dark_logo.webp";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <a href="/" className={styles.logo} aria-label="Strona główna">
      <img
        src={lightLogoUrl}
        alt="Adam Zagórski – logo"
        className={styles.lightVariant}
        width={174}
        height={44}
        fetchPriority="high"
      />
      <img
        src={darkLogoUrl}
        alt="Adam Zagórski – logo"
        className={styles.darkVariant}
        width={174}
        height={44}
        fetchPriority="high"
      />
    </a>
  );
}

export default Logo;
