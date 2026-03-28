import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

type JsonLd = Record<string, unknown>;

type SeoHelmetProps = {
  title: string;
  description: string;
  siteName?: string;
  robots?: string;
  keywords?: string;
  themeColor?: string;
  canonicalPath?: string;
  canonicalUrl?: string;
  ogType?: "website" | "article" | "profile";
  ogLocale?: string;
  ogImagePath?: string;
  ogImageUrl?: string;
  twitterCard?: "summary" | "summary_large_image";
  jsonLd?: JsonLd | JsonLd[];
};

function toOgLocale(lang: string) {
  const [language, region] = lang.replace("_", "-").split("-");
  const normalizedLanguage = language.toLowerCase();
  const normalizedRegion = (region || language).toUpperCase();
  return `${normalizedLanguage}_${normalizedRegion}`;
}

function getRuntimeThemeColor() {
  const color = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-bg-canvas")
    .trim();
  return color || undefined;
}

function resolveAbsoluteUrl(base: string, value?: string) {
  const normalizedPath = !value || value === "/" ? "/" : value;
  return new URL(normalizedPath, base).toString();
}

const SeoHelmet = ({
  title,
  description,
  siteName,
  robots,
  keywords,
  themeColor,
  canonicalPath,
  canonicalUrl,
  ogType,
  ogLocale,
  ogImagePath,
  ogImageUrl,
  twitterCard,
  jsonLd,
}: SeoHelmetProps) => {
  const { i18n } = useTranslation();

  const siteUrl = import.meta.env.DEFAULT_SITE_URL || window.location.origin;
  const runtimePath = window.location.pathname;
  const resolvedLang = i18n.resolvedLanguage ?? i18n.language;
  const resolvedOgLocale = ogLocale ?? toOgLocale(resolvedLang);
  const resolvedThemeColor = useMemo(
    () => themeColor ?? getRuntimeThemeColor(),
    [themeColor],
  );

  const resolvedCanonical =
    canonicalUrl ?? resolveAbsoluteUrl(siteUrl, canonicalPath ?? runtimePath);
  const resolvedOgImage =
    ogImageUrl ??
    (ogImagePath ? resolveAbsoluteUrl(siteUrl, ogImagePath) : undefined);

  const jsonLdItems = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <html lang={resolvedLang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {robots ? <meta name="robots" content={robots} /> : null}
      {siteName ? <meta name="author" content={siteName} /> : null}
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      {resolvedThemeColor ? (
        <meta name="theme-color" content={resolvedThemeColor} />
      ) : null}

      <link rel="canonical" href={resolvedCanonical} />

      {ogType ? <meta property="og:type" content={ogType} /> : null}
      {siteName ? <meta property="og:site_name" content={siteName} /> : null}
      <meta property="og:locale" content={resolvedOgLocale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={resolvedCanonical} />
      {resolvedOgImage ? (
        <meta property="og:image" content={resolvedOgImage} />
      ) : null}

      {twitterCard ? <meta name="twitter:card" content={twitterCard} /> : null}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {resolvedOgImage ? (
        <meta name="twitter:image" content={resolvedOgImage} />
      ) : null}

      {jsonLdItems.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default SeoHelmet;
