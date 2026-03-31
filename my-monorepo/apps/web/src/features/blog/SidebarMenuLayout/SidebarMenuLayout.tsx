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
  const isLeft = sidebarPosition === "left";

  return (
    <InnerColumnSection
      gap={isLeft ? undefined : 16}
      selector={selector}
      direction={direction}
      className={isLeft ? styles.leftPanel : styles.rightPanel}
    >
      {isLeft && <Logo />}
      {isLeft ? (
        <div className={styles.leftPanelScroll}>{children}</div>
      ) : (
        children
      )}
    </InnerColumnSection>
  );
};

export default SidebarMenuLayout;
