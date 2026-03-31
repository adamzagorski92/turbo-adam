import { SidebarAds } from "@features/blog/SidebarAds/SidebarAds";
import { TableOfContent } from "@features/blog/TableOfContent/TableOfContent";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

import styles from "./MobileDetails.module.css";

const MobileDetails = ({ slug }: { slug?: string }) => {
  const { t } = useTranslation("UI");
  return (
    <details className={styles.inlineSidebar}>
      <summary className={styles.inlineSidebarSummary}>
        {t(slug ? "blog.showSidebar" : "blog.showSidebarGeneric")}
        <ChevronDown className={styles.inlineSidebarChevron} aria-hidden />
      </summary>
      <div className={styles.inlineSidebarContent}>
        {slug && <TableOfContent slug={slug} />}
        <SidebarAds category="frontend" />
      </div>
    </details>
  );
};

export default MobileDetails;
