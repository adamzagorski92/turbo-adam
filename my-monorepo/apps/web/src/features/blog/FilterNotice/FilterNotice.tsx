import { CircleAlert } from "lucide-react";
import styles from "./FilterNotice.module.css";

type FilterNoticeProps = {
  isModified: boolean;
  onReset: () => void;
};

const FilterNotice = ({ isModified, onReset }: FilterNoticeProps) => {
  return (
    <div className={styles.wrapper}>
      {isModified && (
        <p className={styles.notice}>
          <CircleAlert size={14} className={styles.icon} aria-hidden="true" />
          Ograniczono liczbę wyników filtrami{" "}
          <a
            role="button"
            className={styles.resetLink}
            onClick={(e) => {
              e.preventDefault();
              onReset();
            }}
          >
            Wyczyść filtry
          </a>
        </p>
      )}
    </div>
  );
};

export default FilterNotice;
