import { describe, expect, it } from "vitest";
import { expectedLoginUrl, getLabelById } from "./helper";
import type { OptionList } from "../types/attributes";

describe("expectedLoginUrl", () => {
  it("build correct login URL from constans", () => {
    expect(expectedLoginUrl).toBe("http://localhost:3000/api/login");
  });
});

describe("getLabelById", () => {
  it("should return label for existing id", () => {
    const optionList: OptionList = [
      { id: "opt-1", label: "Poland" },
      { id: "opt-2", label: "Germany" },
      { id: "opt-3", label: "France" },
    ];

    expect(getLabelById(optionList, "opt-1")).toBe("Poland");
    expect(getLabelById(optionList, "opt-2")).toBe("Germany");
    expect(getLabelById(optionList, "opt-3")).toBe("France");
  });

  it("should return ReactNode label (including JSX)", () => {
    const mockReactNode = { type: "span", props: { children: "Poland" } };
    const optionList: OptionList = [
      { id: "opt-1", label: mockReactNode as any },
    ];

    const result = getLabelById(optionList, "opt-1");
    expect(result).toEqual(mockReactNode);
  });
  it("should work with different label types", () => {
    const mockBoldNode = { type: "strong", props: { children: "Bold Label" } };
    const optionList: OptionList = [
      { id: "opt-1", label: "String Label" },
      { id: "opt-2", label: 123 },
      { id: "opt-3", label: mockBoldNode as any },
    ];

    expect(getLabelById(optionList, "opt-1")).toBe("String Label");
    expect(getLabelById(optionList, "opt-2")).toBe(123);
    expect(getLabelById(optionList, "opt-3")).toEqual(mockBoldNode);
  });
});
