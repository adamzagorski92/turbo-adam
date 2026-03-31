import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TextArea from "./TextArea";

describe("TextArea", () => {
  it("has been rendered", () => {
    render(<TextArea defaultValue="Type your text there" />);
    expect(
      screen.getByDisplayValue("Type your text there"),
    ).toBeInTheDocument();
  });
});
