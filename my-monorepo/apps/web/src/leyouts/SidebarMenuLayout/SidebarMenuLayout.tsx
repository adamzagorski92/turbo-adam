import Logo from "@components/Logo/Logo";
import { InnerColumnSection } from "@packages/components";
import type { SelectorElement } from "@packages/components/basePageContainers/types/selectorElement";
import type { Direction } from "@packages/components/basePageContainers/utils/align";
import styles from "./SidebarMenuLayout.module.css";

interface SidebarMenuLayoutProps {
  selector: SelectorElement;
  direction: Direction;
  sidebarPosition: "left" | "right";
  children?: React.ReactNode;
}

const SidebarMenuLayout = ({
  selector,
  direction,
  sidebarPosition,
  children,
}: SidebarMenuLayoutProps) => {
  return (
    <InnerColumnSection
      gap={16}
      selector={selector}
      direction={direction}
      className={`${styles.stickyPanel} ${sidebarPosition === "left" ? styles.borderRight : styles.borderLeft}`}
    >
      {sidebarPosition === "left" && <Logo />}
      {children}
    </InnerColumnSection>
  );
};

export default SidebarMenuLayout;
