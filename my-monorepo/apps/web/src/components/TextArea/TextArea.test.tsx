import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TextArea from "./TextArea";

describe("TextArea", () => {
  it("has been rendered", () => {
    render(<TextArea>Type your text there</TextArea>);
    expect(screen.getByText("Type your text there")).toBeInTheDocument();
  });
});
