import { useState, useRef, useEffect, type ChangeEvent } from "react";
import { InputText } from "@packages/components";
import styles from "./SearchEngine.module.css";
import { useTranslation } from "react-i18next";
import { useBlogFilterStore } from "@stores/useBlogFilterStore";

const DEBOUNCE_MS = 500;

const SearchEngine = () => {
  const { t } = useTranslation("UI");
  const setSearchQuery = useBlogFilterStore((s) => s.setSearchQuery);
  const storeQuery = useBlogFilterStore((s) => s.searchQuery);

  const [localQuery, setLocalQuery] = useState(storeQuery);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setSearchQuery(value), DEBOUNCE_MS);
  };

  return (
    <div className={styles.searchWrapper}>
      <InputText
        type="search"
        globalAttributes={{ className: styles.searchInput }}
        textInputSpecificAttrs={{
          placeholder: t("blog.searchPlaceholder"),
          value: localQuery,
        }}
        a11y={{ ariaLabel: t("blog.searchPlaceholder") }}
        eventHandlers={{ onChange: handleChange }}
      />
    </div>
  );
};

export default SearchEngine;
