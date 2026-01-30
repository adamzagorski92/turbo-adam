import type { ReactNode } from "react";
import type { AriaButton, AriaCombobox } from "../../types/ariaAttributes";
import type {
  ButtonType,
  CommonInteractiveProps,
  MetaIcon,
} from "../../types/attributes";

interface ButtonProps extends CommonInteractiveProps {
  children: ReactNode;
  type?: ButtonType;
  name?: string;
  value?: string;
  isVisible?: boolean;
  ariaAttributes?: AriaButton;
  ariaCombobox?: AriaCombobox;
  metaIcon?: MetaIcon;
  onClick?: () => void;
}

const Button = ({
  children,
  type = "button",
  id,
  name,
  value,
  isVisible = true,
  disabled = false,
  className,
  ariaAttributes = {},
  ariaCombobox = {},
  onClick,
  metaIcon = {
    isIcon: false,
    src: "",
    alt: "",
  },
}: ButtonProps) => {
  const { ariaExpanded, ariaActiveDescendant, ariaOwns } = ariaCombobox;
  const { isIcon, src, alt } = metaIcon;
  const {
    ariaLabel,
    ariaLabelledby,
    ariaDescribedby,
    ariaPressed,
    ariaHaspopup,
    ariaControls,
    ariaBusy,
    ariaHidden,
  } = ariaAttributes;

  return (
    isVisible && (
      <button
        type={type}
        id={id}
        name={name}
        value={value}
        className={className}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-pressed={ariaPressed}
        aria-haspopup={ariaHaspopup}
        aria-controls={ariaControls}
        aria-busy={ariaBusy}
        aria-hidden={ariaHidden}
        aria-expanded={ariaExpanded}
        aria-activedescendant={ariaActiveDescendant}
        aria-owns={ariaOwns}
      >
        <div>
          {isIcon && <img src={src} alt={alt} />}
          {children}
        </div>
      </button>
    )
  );
};

export default Button;
