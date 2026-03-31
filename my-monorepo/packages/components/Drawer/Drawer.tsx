import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import clsx from "clsx";
import styles from "./Drawer.module.css";

type DrawerSide = "left" | "right";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side: DrawerSide;
  children: ReactNode;
  ariaLabel: string;
  className?: string;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function useDrawerTransition(open: boolean) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const rafId = requestAnimationFrame(() => {
        requestAnimationFrame(() => setActive(true));
      });
      return () => cancelAnimationFrame(rafId);
    }
    setActive(false);
    const timer = setTimeout(() => setMounted(false), 350);
    return () => clearTimeout(timer);
  }, [open]);

  return { mounted, active };
}

function useFocusManagement(
  panelRef: React.RefObject<HTMLDivElement | null>,
  open: boolean,
  mounted: boolean,
  active: boolean,
) {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [open]);

  useEffect(() => {
    if (active) {
      panelRef.current?.focus();
    } else if (!mounted && previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [active, mounted, panelRef]);
}

function useBodyScrollLock(mounted: boolean) {
  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted]);
}

function useKeyboardHandler(
  panelRef: React.RefObject<HTMLDivElement | null>,
  mounted: boolean,
  onClose: () => void,
) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!mounted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }

      if (e.key !== "Tab") return;

      const focusable =
        panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (!focusable?.length) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mounted, panelRef]);
}

const Drawer = ({
  open,
  onClose,
  side,
  children,
  ariaLabel,
  className,
}: DrawerProps) => {
  const { mounted, active } = useDrawerTransition(open);
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusManagement(panelRef, open, mounted, active);
  useBodyScrollLock(mounted);
  useKeyboardHandler(panelRef, mounted, onClose);

  if (!mounted) return null;

  return createPortal(
    <div
      className={clsx(styles.overlay, active && styles.overlayActive)}
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        className={clsx(
          styles.panel,
          styles[side],
          active && styles.panelActive,
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Zamknij"
        >
          <X className={styles.closeIcon} aria-hidden="true" />
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default Drawer;
export type { DrawerProps, DrawerSide };
