import { ADS_MOCK } from "@constans/adsMock";
import { SidebarAd } from "@features/blog/SidebarAd/SidebarAd";

interface SidebarAdsProps {
  category: string;
}

export function SidebarAds({ category }: SidebarAdsProps) {
  const filtered = ADS_MOCK.filter((ad) => ad.adsCategory === category);

  return (
    <>
      {filtered.map((ad) => (
        <SidebarAd key={ad.id} ad={ad} />
      ))}
    </>
  );
}
