import type {
  EventHandlers,
  GlobalAttributes,
  SpecificInputAttributes,
} from "../../../types/globalAttributes";
import type { InputAriaCheckedInputs } from "../../../types/inputAria";

interface InputRadioProps {
  a11y?: InputAriaCheckedInputs;
  globalAttributes?: GlobalAttributes;
  textInputSpecificAttrs?: SpecificInputAttributes;
  eventHandlers?: EventHandlers;
}

const InputRadio = ({
  a11y = {},
  globalAttributes = {},
  textInputSpecificAttrs = {},
  eventHandlers = {},
}: InputRadioProps) => {
  const {
    ariaLabel,
    ariaLabelledby,
    ariaDescribedby,
    ariaRequired,
    ariaDisabled,
  } = a11y;

  const { id, className, tabIndex, title, hidden = false } = globalAttributes;
  const {
    ref,
    name,
    value,
    disabled = false,
    required = false,
  } = textInputSpecificAttrs;
  return (
    <input
      type="radio"
      // global
      id={id}
      className={className}
      tabIndex={tabIndex}
      title={title}
      hidden={hidden}
      // specific
      ref={ref}
      disabled={disabled}
      required={required}
      name={name}
      value={value}
      //aria
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-required={ariaRequired}
      aria-disabled={ariaDisabled}
      // handlers
      {...eventHandlers}
    />
  );
};

export default InputRadio;
