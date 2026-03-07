import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "../../i18n/config";
import { useTranslation } from "react-i18next";

import styles from "./LanguageSwitcher.module.css";

function normalizeLanguage(language: string): SupportedLanguage {
  const normalized = language.replace("_", "-");
  const match = SUPPORTED_LANGUAGES.find((l) => normalized.startsWith(l));
  return match ?? "pl";
}

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation("UI");

  const resolved = i18n.resolvedLanguage ?? i18n.language ?? "pl";
  const current = normalizeLanguage(resolved);
  const next: SupportedLanguage = current === "pl" ? "en" : "pl";

  const handleToggle = () => {
    void i18n.changeLanguage(next);
  };

  return (
    <div className={styles.switcher}>
      <button
        onClick={handleToggle}
        aria-label={t("languageSwitcher.ariaLabel")}
        type="button"
      >
        <span className={styles.label}>{current.toUpperCase()}</span>
      </button>
    </div>
  );
}
