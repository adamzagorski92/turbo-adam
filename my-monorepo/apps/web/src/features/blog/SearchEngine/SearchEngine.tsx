import { InputText } from "@packages/components";
import { Search } from "lucide-react";
import styles from "./SearchEngine.module.css";
import { useTranslation } from "react-i18next";

const SearchEngine = () => {
  const { t } = useTranslation("UI");

  return (
    <div className={styles.searchWrapper}>
      <InputText
        type="search"
        globalAttributes={{ className: styles.searchInput }}
        textInputSpecificAttrs={{ placeholder: t("blog.searchPlaceholder") }}
        a11y={{ ariaLabel: t("blog.searchPlaceholder") }}
        eventHandlers={{
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              console.log("Search:", (e.target as HTMLInputElement).value);
            }
          },
        }}
      />
      <button
        type="button"
        className={styles.searchButton}
        aria-label={t("blog.searchPlaceholder")}
        onClick={() => {
          const input = document.querySelector<HTMLInputElement>(
            `.${styles.searchInput}`,
          );
          if (input) console.log("Search:", input.value);
        }}
      >
        <Search className={styles.searchButtonIcon} aria-hidden="true" />
      </button>
    </div>
  );
};

export default SearchEngine;
