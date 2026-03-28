import { useTranslation } from "react-i18next";
import type { Ad } from "@constans/adsMock";
import styles from "./SidebarAd.module.css";

interface SidebarAdProps {
  ad: Ad;
}

export function SidebarAd({ ad }: SidebarAdProps) {
  const { t } = useTranslation("UI");

  return (
    <aside className={styles.wrapper}>
      <span className={styles.label}>{t("blog.adLabel")}</span>
      {ad.imageUrl && (
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={ad.imageUrl} alt={ad.hook} />
        </div>
      )}
      <div className={styles.content}>
        <p className={styles.hook}>{ad.hook}</p>
        <p className={styles.solution}>{ad.solution}</p>
        <a
          className={styles.cta}
          href={ad.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {ad.cta}
        </a>
      </div>
    </aside>
  );
}
