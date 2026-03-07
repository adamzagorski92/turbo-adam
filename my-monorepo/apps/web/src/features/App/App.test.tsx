import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

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
  it("renders main heading", async () => {
    window.localStorage.setItem("language", "pl");

    const { default: App } = await import("./App");
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /Frontend Developer/i, level: 1 }),
    ).toBeTruthy();

    expect(screen.getByText(/Cześć, tu Adam/i)).toBeTruthy();
  });
});
