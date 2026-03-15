import { SectionContainer } from "@my-monorepo/components";
import styles from "./Footer.module.css";
import { useTranslation } from "react-i18next";

interface FooterProps {
  borderTop?: boolean;
}

const Footer = ({ borderTop = false }: FooterProps) => {
  const { t } = useTranslation("UI");

  return (
    <SectionContainer borderTop={borderTop}>
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
