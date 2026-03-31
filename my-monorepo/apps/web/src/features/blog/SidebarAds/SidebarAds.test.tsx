import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router";

import { SidebarAds } from "./SidebarAds";
import { ADS_MOCK } from "@constans/adsMock";

const renderSidebarAds = (category: string) =>
  render(
    <MemoryRouter>
      <SidebarAds category={category} />
    </MemoryRouter>,
  );

describe("SidebarAds — category filtering", () => {
  it("renders all ads matching the given category", () => {
    renderSidebarAds("frontend");
    expect(screen.getByText(ADS_MOCK[0].hook)).toBeInTheDocument();
    expect(screen.getByText(ADS_MOCK[1].hook)).toBeInTheDocument();
  });

  it("renders nothing when no ads match", () => {
    renderSidebarAds("nonexistent");
    expect(screen.queryByText(ADS_MOCK[0].hook)).not.toBeInTheDocument();
    expect(screen.queryByText(ADS_MOCK[1].hook)).not.toBeInTheDocument();
  });
});
