import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterNotice from "./FilterNotice";

describe("FilterNotice", () => {
  it("does not render content when isModified is false", () => {
    render(<FilterNotice isModified={false} onReset={vi.fn()} />);

    expect(screen.queryByText(/Ograniczono/)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Wyczyść filtry/ }),
    ).not.toBeInTheDocument();
  });

  it("renders notice text when isModified is true", () => {
    render(<FilterNotice isModified={true} onReset={vi.fn()} />);

    expect(
      screen.getByText(/Ograniczono liczbę wyników filtrami/),
    ).toBeInTheDocument();
  });

  it("renders reset link when isModified is true", () => {
    render(<FilterNotice isModified={true} onReset={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: /Wyczyść filtry/ }),
    ).toBeInTheDocument();
  });

  it("calls onReset when reset link is clicked", async () => {
    const onReset = vi.fn();
    render(<FilterNotice isModified={true} onReset={onReset} />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /Wyczyść filtry/ }));

    expect(onReset).toHaveBeenCalledOnce();
  });
});
