import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router";

import { SidebarAd } from "./SidebarAd";
import { ADS_MOCK, type Ad } from "@constans/adsMock";

const renderSidebarAd = (ad: Ad) =>
  render(
    <MemoryRouter>
      <SidebarAd ad={ad} />
    </MemoryRouter>,
  );

describe("SidebarAd", () => {
  it('renders "Reklama" badge', () => {
    renderSidebarAd(ADS_MOCK[0]);
    expect(screen.getByText("Reklama")).toBeInTheDocument();
  });

  it("renders the hook text", () => {
    renderSidebarAd(ADS_MOCK[0]);
    expect(screen.getByText(ADS_MOCK[0].hook)).toBeInTheDocument();
  });

  it("renders the solution text", () => {
    renderSidebarAd(ADS_MOCK[0]);
    expect(screen.getByText(ADS_MOCK[0].solution)).toBeInTheDocument();
  });

  it("renders the CTA as a link", () => {
    renderSidebarAd(ADS_MOCK[0]);
    const link = screen.getByRole("link", { name: ADS_MOCK[0].cta });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", ADS_MOCK[0].ctaUrl);
  });

  it("renders image when imageUrl is provided", () => {
    renderSidebarAd(ADS_MOCK[0]);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", ADS_MOCK[0].imageUrl);
  });

  it("does not render image when imageUrl is absent", () => {
    const adWithoutImage: Ad = { ...ADS_MOCK[1], imageUrl: undefined };
    renderSidebarAd(adWithoutImage);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
