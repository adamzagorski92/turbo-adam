export interface AriaCommon {
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  ariaBusy?: boolean;
  ariaHidden?: boolean;
}

export type HaspopupType = "menu" | "listbox" | "dialog" | "grid" | "tree";

export interface AriaInteractive extends AriaCommon {
  ariaPressed?: boolean | "mixed";
  ariaHaspopup?: HaspopupType;
  ariaControls?: string;
  ariaInvalid?: boolean;
  ariaRequired?: boolean; // TODO write test in component, where you using that
}

export interface AriaCombobox extends AriaInteractive {
  ariaExpanded?: boolean;
  ariaActiveDescendant?: string;
  ariaOwns?: string;
}

export interface AriaButton extends AriaInteractive {
  // You can add more specific Aria attributes for Button
}

export interface AriaForm extends AriaCommon {
  ariaInvalid?: boolean;
  // You can add more specific Aria attributes for Form
}

export interface AriaInput extends AriaCommon {
  ariaValuemin?: number;
  ariaValuemax?: number;
}
