import adTurbobundleUrl from "@assets/ad-turbobundle.svg";
import adAutodeployUrl from "@assets/ad-autodeploy.svg";

export interface Ad {
  id: number;
  adsCategory: string;
  hook: string;
  solution: string;
  cta: string;
  ctaUrl: string;
  imageUrl?: string;
}

export const ADS_MOCK: Ad[] = [
  {
    id: 1,
    adsCategory: "frontend",
    hook: "Twoje buildy trwają wieczność?",
    solution:
      "Przyspiesz bundlowanie nawet o 80% dzięki naszemu narzędziu opartemu na Rust.",
    cta: "Sprawdź TurboBundle",
    ctaUrl: "/tools/turbobundle",
    imageUrl: adTurbobundleUrl,
  },
  {
    id: 2,
    adsCategory: "frontend",
    hook: "Deployment to Twój najgorszy koszmar?",
    solution:
      "Zautomatyzuj wdrożenia jednym kliknięciem — zero przestojów, pełna kontrola.",
    cta: "Wypróbuj AutoDeploy",
    ctaUrl: "/tools/autodeploy",
    imageUrl: adAutodeployUrl,
  },
];
