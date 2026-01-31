import { type JSX } from "react";
import type {
  EventHandlers,
  GlobalAttributes,
  SpecificInputAttributes,
} from "../../types/globalAttributes";
import type { InputAriaCommon } from "../../types/inputAria";

interface InputTextProps {
  a11y?: InputAriaCommon;
  globalAttributes?: GlobalAttributes;
  textInputSpecificAttrs?: SpecificInputAttributes;
  eventHandlers?: EventHandlers;
  type?:
    | "text"
    | "email"
    | "password"
    | "url"
    | "tel"
    | "search"
    | "date"
    | "time"
    | "datetime-local"
    | "month"
    | "week"
    | "file";
}

const InputText = ({
  a11y = {},
  globalAttributes = {},
  textInputSpecificAttrs = {},
  eventHandlers = {},
  type = "text",
}: InputTextProps): JSX.Element => {
  const {
    ariaLabel,
    ariaLabelledby,
    ariaDescribedby,
    ariaInvalid,
    ariaRequired,
    ariaDisabled,
    ariaReadonly,
  } = a11y;

  const { id, className, style, title } = globalAttributes;
  const {
    ref,
    name,
    value,
    placeholder,
    disabled,
    readOnly,
    required,
    maxLength,
    minLength,
    pattern,
    autoComplete,
    inputMode,
    list,
  } = textInputSpecificAttrs;

  const { onChange, onBlur, onFocus, onKeyUp, onKeyDown } = eventHandlers;

  return (
    <input
      type={type}
      // global
      id={id}
      className={className}
      style={style}
      title={title}
      // specific
      ref={ref}
      name={name}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      maxLength={maxLength}
      minLength={minLength}
      pattern={pattern}
      autoComplete={autoComplete}
      inputMode={inputMode}
      list={list}
      //aria
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-invalid={ariaInvalid}
      aria-required={ariaRequired}
      aria-disabled={ariaDisabled}
      aria-readonly={ariaReadonly}
      //Event handlers
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
    />
  );
};

export default InputText;
