import styles from "./App.module.css";
import "../../styles/global.css";
import { ThemeSwitcher } from "../../components/ThemeSwitcher/ThemeSwitcher";

function App() {
  return (
    <div className={styles.container}>
      <ThemeSwitcher />
      <header className={styles.header}>
        <h1 className={styles.title}>Jestem Adam</h1>
        <h2 className={styles.subtitle}>
          Aspiruję na stanowisko Junior Front-end developera
        </h2>
      </header>

      <section className={styles.content}>
        <p className={styles.paragraph}>
          W tym miejscu planuję zebrać moje projekty i pomysły, aby prezentować
          umiejętności i kompetencje
        </p>
        <p className={styles.paragraph}>
          Do tej pory zebrałem{" "}
          <strong>6 miesięcy komercyjnego doświadczenia</strong> na AGH
        </p>
      </section>

      <nav className={styles.links}>
        <a
          href="https://github.com/adamzagorski92/turbo-adam"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          📦 Kod źródłowy tej strony
        </a>

        <a
          href="https://www.linkedin.com/in/adazag/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          💼 Mój LinkedIn
        </a>

        <a
          href="https://www.adamzagorski.pl/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          🌐 Więcej o mnie
        </a>
      </nav>

      <hr className={styles.divider} />

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
    </div>
  );
}

export default App;
