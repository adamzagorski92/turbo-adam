import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import ArticleSeriesNavigation from "./ArticleSeriesNavigation";

describe("ArticleSeriesNavigation", () => {
  it("does not render when slug is missing", () => {
    const { container } = render(
      <MemoryRouter>
        <ArticleSeriesNavigation />
      </MemoryRouter>,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("does not render when article is outside any series", () => {
    const { container } = render(
      <MemoryRouter>
        <ArticleSeriesNavigation slug="accessibility-w-react-praktyczny-poradnik" />
      </MemoryRouter>,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders series steps and marks current article", () => {
    render(
      <MemoryRouter>
        <ArticleSeriesNavigation slug="css-design-system-od-zera-tokeny-motywy-layout" />
      </MemoryRouter>,
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("Nawigacja serii")).toBeInTheDocument();
    expect(screen.queryByText(/\d+ z \d+/)).not.toBeInTheDocument();

    const previousButton = screen.getByRole("button", {
      name: /Pokaż poprzednie kroki serii/i,
    });
    const nextButton = screen.getByRole("button", {
      name: /Pokaż kolejne kroki serii/i,
    });

    expect(previousButton).toBeDisabled();
    expect(nextButton).toBeEnabled();

    const currentLink = screen.getByRole("link", {
      name: /Krok 2: CSS Design System od zera/i,
    });
    expect(currentLink).toHaveAttribute("aria-current", "page");

    expect(
      screen.getByRole("link", {
        name: /Krok 1: Jak zbudować monorepo z Turborepo i pnpm/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("link", {
        name: /Krok 4: Docker Compose dla full-stack developera/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("slides through steps and keeps only three visible", async () => {
    render(
      <MemoryRouter>
        <ArticleSeriesNavigation slug="css-design-system-od-zera-tokeny-motywy-layout" />
      </MemoryRouter>,
    );

    const user = userEvent.setup();
    const nextButton = screen.getByRole("button", {
      name: /Pokaż kolejne kroki serii/i,
    });

    await user.click(nextButton);

    expect(
      screen.getByRole("link", {
        name: /Krok 4: Docker Compose dla full-stack developera/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("link", {
        name: /Krok 1: Jak zbudować monorepo z Turborepo i pnpm/i,
      }),
    ).not.toBeInTheDocument();

    expect(screen.getAllByRole("link", { name: /Krok /i })).toHaveLength(3);
  });

  it("renders single article message for one-entry series", () => {
    render(
      <MemoryRouter>
        <ArticleSeriesNavigation slug="react-19-server-components-i-nowe-api" />
      </MemoryRouter>,
    );

    expect(screen.getByText("Jeden artykuł w serii.")).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Krok/i }),
    ).not.toBeInTheDocument();
  });
});
