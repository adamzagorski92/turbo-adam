import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import App from "./App";

vi.mock("@my-monorepo/components/ThemeSwitcher/ThemeSwitcher", () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher" />,
}));

describe("App", () => {
  it("renders main heading", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /Jestem Adam/i, level: 1 }),
    ).toBeTruthy();
  });
});
