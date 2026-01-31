import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import App from "./App";

vi.mock("@my-monorepo/components", async () => {
  const actual = await vi.importActual<
    typeof import("@my-monorepo/components")
  >("@my-monorepo/components");

  return {
    ...actual,
    ThemeSwitcher: () => <div data-testid="theme-switcher" />,
  };
});

describe("App", () => {
  it("renders main heading", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /Frontend Developer/i, level: 1 }),
    ).toBeTruthy();

    expect(screen.getByText(/Cześć, tu Adam/i)).toBeTruthy();
  });
});
