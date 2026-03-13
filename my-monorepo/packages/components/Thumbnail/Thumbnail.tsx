import styles from "./Thumbnail.module.css";

interface ThumbnailProps {
  size?: "sm" | "lg";
  className?: string;
}

const Thumbnail = ({ size = "sm", className }: ThumbnailProps) => {
  const classes = [styles.thumbnail, styles[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
    </div>
  );
};

export default Thumbnail;
