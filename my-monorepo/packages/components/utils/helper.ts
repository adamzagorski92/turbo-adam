import type { ReactNode } from "react";
import { path } from "../constans/apiPath";
import type { OptionList } from "../types/attributes";

export const expectedLoginUrl = `${path.BASE_URL}${path.LOGIN}`;

export const getLabelById = (optionList: OptionList, id: string): ReactNode => {
  const option = optionList.find((item) => item.id === id)!;
  return option.label;
};
