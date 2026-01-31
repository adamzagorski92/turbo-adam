import type {
  ChangeEvent,
  CSSProperties,
  FocusEvent,
  KeyboardEvent,
  Ref,
} from "react";

export interface GlobalAttributes {
  id?: string;
  className?: string;
  style?: CSSProperties;
  title?: string;
  lang?: string;
  dir?: "ltr" | "rtl" | "auto";
  hidden?: boolean;
  tabIndex?: number;
  accessKey?: string;
  contentEditable?: boolean | "true" | "false" | "inherit";
  spellCheck?: boolean;
  draggable?: boolean;
  dropzone?: "copy" | "move" | "link";
  role?: string;
  data?: Record<string, string>;
}

export interface SpecificInputAttributes {
  ref?: Ref<HTMLInputElement>;
  type?: string;
  name?: string;
  value?: string | number;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric" | "decimal" | "search";
  list?: string;
}

export interface EventHandlers {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
}
