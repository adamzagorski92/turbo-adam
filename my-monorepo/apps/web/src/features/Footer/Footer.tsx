import { SectionContainer } from "@my-monorepo/components";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <SectionContainer>
      <footer className={styles.footer}>
        <p>
          Stronę zbudowałem przy użyciu React, TypeScript i Turborepo na
          serwerze deweloperskim{" "}
          <a
            href="https://mikr.us/?r=adamzagorski"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mikrus
          </a>
          . Więcej informacji w kodzie źródłowym.
        </p>
      </footer>
    </SectionContainer>
  );
};

export default Footer;
