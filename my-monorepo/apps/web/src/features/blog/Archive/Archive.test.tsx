import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return { ...actual, useParams: vi.fn() };
});

import { useParams } from "react-router";
import { MemoryRouter } from "react-router";
import { Archive } from "./Archive";

const mockUseParams = vi.mocked(useParams);

const renderArchive = () =>
  render(
    <MemoryRouter>
      <Archive />
    </MemoryRouter>,
  );

describe("Archive", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders StandardArchive for known archive types", () => {
    mockUseParams.mockReturnValue({ archive: "tags" });

    renderArchive();

    expect(screen.getByRole("heading", { name: /Tagi/i })).toBeInTheDocument();
  });

  it("renders SubArchive when archive and sub are known", () => {
    mockUseParams.mockReturnValue({ archive: "tags", sub: "a11y" });

    renderArchive();

    expect(screen.getByRole("heading", { name: /A11y/i })).toBeInTheDocument();
  });

  it("renders DateArchive when archive is a year and sub is a month", () => {
    mockUseParams.mockReturnValue({ archive: "2026", sub: "sty" });

    renderArchive();

    expect(
      screen.getByRole("heading", { name: /Styczeń 2026/i }),
    ).toBeInTheDocument();
  });

  it('renders "Nie znaleziono archiwum" for unknown archive type', () => {
    mockUseParams.mockReturnValue({ archive: "unknown" });

    renderArchive();

    expect(screen.getByText(/Nie znaleziono archiwum/i)).toBeInTheDocument();
  });

  it('renders "Nie znaleziono archiwum" when archive param is missing', () => {
    mockUseParams.mockReturnValue({});

    renderArchive();

    expect(screen.getByText(/Nie znaleziono archiwum/i)).toBeInTheDocument();
  });

  it("renders DateArchive with all year articles when archive is a year without sub", () => {
    mockUseParams.mockReturnValue({ archive: "2026" });

    renderArchive();

    expect(screen.getByRole("heading", { name: "2026" })).toBeInTheDocument();
  });
});
