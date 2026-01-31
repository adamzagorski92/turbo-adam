import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Label from "./Label";

describe("Label", () => {
  it("has been rendered", () => {
    render(<Label>Label text</Label>);
    expect(screen.getByText("Label text")).toBeInTheDocument();
  });
});
