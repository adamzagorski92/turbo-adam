import type {
  EventHandlers,
  GlobalAttributes,
  SpecificInputAttributes,
} from "../../types/globalAttributes";
import type { InputAriaNumberInput } from "../../types/inputAria";

interface InputNumberProps {
  a11y?: InputAriaNumberInput;
  eventHandlers?: EventHandlers;
  globalAttributes?: GlobalAttributes;
  textInputSpecificAttrs?: SpecificInputAttributes;
}

const InputNumber = ({
  a11y = {},
  eventHandlers = {},
  globalAttributes = {},
  textInputSpecificAttrs = {},
}: InputNumberProps) => {
  const {
    ariaLabel,
    ariaLabelledby,
    ariaDescribedby,
    ariaInvalid,
    ariaRequired,
    ariaDisabled,
    ariaReadonly,
    ariaValuemin,
    ariaValuemax,
    ariaValuenow,
  } = a11y;

  const { id, className, style } = globalAttributes;

  const {
    ref,
    name,
    value,
    placeholder,
    disabled,
    readOnly,
    required,
    autoComplete,
  } = textInputSpecificAttrs;

  return (
    <input
      type="number"
      // global
      id={id}
      className={className}
      style={style}
      // specific
      ref={ref}
      name={name}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      autoComplete={autoComplete}
      //aria
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-invalid={ariaInvalid}
      aria-required={ariaRequired}
      aria-disabled={ariaDisabled}
      aria-readonly={ariaReadonly}
      aria-valuemin={ariaValuemin}
      aria-valuemax={ariaValuemax}
      aria-valuenow={ariaValuenow}
      //Event handlers
      {...eventHandlers}
    />
  );
};

export default InputNumber;
