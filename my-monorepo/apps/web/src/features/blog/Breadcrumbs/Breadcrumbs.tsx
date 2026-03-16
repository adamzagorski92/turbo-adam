import { Link, useLocation } from "react-router";
import styles from "./Breadcrumbs.module.css";

const LABEL_MAP: Record<string, string> = {
  blog: "Blog",
};

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = [
    { label: "Home", path: "/" },
    ...segments.map((segment, i) => ({
      label: LABEL_MAP[segment] ?? decodeURIComponent(segment),
      path: "/" + segments.slice(0, i + 1).join("/"),
    })),
  ];

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={crumb.path} className={styles.breadcrumbItem}>
            {i > 0 && <span className={styles.breadcrumbSeparator}>›</span>}
            {isLast ? (
              <span className={styles.breadcrumbLabel}>{crumb.label}</span>
            ) : (
              <Link to={crumb.path} className={styles.breadcrumbLink}>
                {crumb.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
