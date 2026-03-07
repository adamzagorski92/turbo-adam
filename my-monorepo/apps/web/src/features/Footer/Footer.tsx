import { SectionContainer } from "@my-monorepo/components";
import styles from "./Footer.module.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation("UI");

  return (
    <SectionContainer>
      <footer className={styles.footer}>
        <p>
          {t("footer.descriptionPrefix")}
          <a
            href="https://mikr.us/?r=adamzagorski"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("footer.mikrusLinkText")}
          </a>
          {t("footer.descriptionSuffix")}
        </p>
      </footer>
    </SectionContainer>
  );
};

export default Footer;
