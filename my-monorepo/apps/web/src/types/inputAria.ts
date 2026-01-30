// use common type to all input types without: range | color | checkbox | radio | button | submit | reset | image | hidden
export interface InputAriaCommon {
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  ariaInvalid?: boolean;
  ariaRequired?: boolean;
  ariaDisabled?: boolean;
  ariaReadonly?: boolean;
}

interface ExtraAria {
  ariaValuemin?: number;
  ariaValuemax?: number;
  ariaValuenow?: number;
  ariaOrientation?: string;
}

type InputAriaWithoutValidation = Omit<
  InputAriaCommon,
  "ariaInvalid" | "ariaRequired" | "ariaReadonly"
>;

type InputAriaBooleanInput = Omit<
  InputAriaCommon,
  "ariaInvalid" | "ariaReadonly"
>;

type InputAriaWithoutOrientation = Omit<ExtraAria, "ariaOrientation">;

// use to input type range
export interface InputAriaRange extends InputAriaWithoutValidation, ExtraAria {}

// use to input types: color | button | submit | reset | image
export interface InputAriaButtonAllTypes extends InputAriaWithoutValidation {}

// use to input types: checkbox | radio
export interface InputAriaCheckedInputs extends InputAriaBooleanInput {}

// use to input types: number
export interface InputAriaNumberInput
  extends InputAriaCommon,
    InputAriaWithoutOrientation {}
