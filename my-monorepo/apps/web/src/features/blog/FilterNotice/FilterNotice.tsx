import { CircleAlert } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "./FilterNotice.module.css";

type FilterNoticeProps = {
  isModified: boolean;
  onReset: () => void;
};

const FilterNotice = ({ isModified, onReset }: FilterNoticeProps) => {
  const { t } = useTranslation("UI");

  return (
    <div className={styles.wrapper}>
      {isModified && (
        <p className={styles.notice}>
          <CircleAlert size={14} className={styles.icon} aria-hidden="true" />
          {t("blog.filterNotice")}{" "}
          <a
            role="button"
            className={styles.resetLink}
            onClick={(e) => {
              e.preventDefault();
              onReset();
            }}
          >
            {t("blog.clearFilters")}
          </a>
        </p>
      )}
    </div>
  );
};

export default FilterNotice;
