import type { FormEvent, ReactNode } from "react";
import type { CommonInteractiveProps } from "../types/attributes";
import type { AriaForm } from "../types/ariaAttributes";

interface FormProps extends CommonInteractiveProps {
  children?: ReactNode;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleReset?: (e: FormEvent<HTMLFormElement>) => void;
  noValidate?: boolean;
  ariaAtributes?: AriaForm;
}

const Form = ({
  id,
  children,
  handleSubmit,
  handleReset,
  noValidate,
  ariaAtributes = {},
  "data-testid": dataTestId,
}: FormProps) => {
  const { ariaLabel, ariaLabelledby, ariaBusy, ariaInvalid } = ariaAtributes;
  return (
    <form
      id={id}
      data-testid={dataTestId}
      onSubmit={handleSubmit}
      onReset={handleReset}
      noValidate={noValidate}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-busy={ariaBusy}
      aria-invalid={ariaInvalid}
    >
      <div>{children}</div>
    </form>
  );
};

export default Form;
