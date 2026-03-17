import { useLocation, useMatches } from "react-router";
import { useTranslation } from "react-i18next";
import SeoHelmet from "@components/SeoHelmet/SeoHelmet";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import { ARTICLES_META_MOCK } from "@constans/articlesMetaMock";

type I18nMeta = {
  siteName: string;
  title: string;
  description: string;
  keywords?: string;
  robots?: string;
  ogType?: "website" | "article" | "profile";
  twitterCard?: "summary" | "summary_large_image";
  ogImagePath?: string;
  personJsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const GlobalSeo = () => {
  const { pathname } = useLocation();
  const matches = useMatches();
  const { t: tHome } = useTranslation("HomePage");
  const { t: tBlog } = useTranslation("Blog");

  const leaf = matches[matches.length - 1];
  const slug = (leaf?.params as Record<string, string | undefined>)?.slug;

  // /blog/:slug — article page
  if (slug && pathname.startsWith("/blog/")) {
    const card = ARTICLES_CARD_MOCK.find((a) => a.slug === slug);
    const articleMeta = card
      ? ARTICLES_META_MOCK.find((m) => m.id === card.id)
      : undefined;
    const blogMeta = tBlog("meta", { returnObjects: true }) as I18nMeta;

    if (articleMeta) {
      return (
        <SeoHelmet
          siteName={blogMeta.siteName}
          title={articleMeta.title}
          description={articleMeta.description}
          keywords={articleMeta.keywords}
          robots={articleMeta.robots}
          ogType={articleMeta.ogType}
          twitterCard={articleMeta.twitterCard}
          canonicalPath={`/blog/${slug}`}
          jsonLd={articleMeta.articleJsonLd}
        />
      );
    }
  }

  // /blog — listing page
  if (pathname === "/blog" || pathname === "/blog/") {
    const meta = tBlog("meta", { returnObjects: true }) as I18nMeta;

    return (
      <SeoHelmet
        siteName={meta.siteName}
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        robots={meta.robots}
        ogType={meta.ogType}
        twitterCard={meta.twitterCard}
        ogImagePath={meta.ogImagePath}
        canonicalPath="/blog"
      />
    );
  }

  // / — homepage (default fallback)
  const meta = tHome("meta", { returnObjects: true }) as I18nMeta;

  return (
    <SeoHelmet
      siteName={meta.siteName}
      title={meta.title}
      description={meta.description}
      keywords={meta.keywords}
      robots={meta.robots}
      ogType={meta.ogType}
      twitterCard={meta.twitterCard}
      ogImagePath={meta.ogImagePath}
      jsonLd={meta.personJsonLd}
    />
  );
};

export default GlobalSeo;
