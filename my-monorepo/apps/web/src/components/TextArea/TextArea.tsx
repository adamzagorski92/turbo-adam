import type { ReactNode } from "react";

const TextArea = ({ children }: { children: ReactNode }) => {
  return <textarea>{children}</textarea>;
};

export default TextArea;
