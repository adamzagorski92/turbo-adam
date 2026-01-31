import type { ReactNode } from "react";

const Label = ({ children }: { children: ReactNode }) => {
  return <label>{children}</label>;
};

export default Label;
