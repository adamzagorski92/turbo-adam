import { describe, it, expect } from "vitest";
import { getArticleSeriesContext } from "./getArticleSeriesContext";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import { ARTICLE_SERIES_MOCK } from "@constans/articleSeriesMock";

describe("getArticleSeriesContext", () => {
  it("returns series context for article assigned to a series", () => {
    const context = getArticleSeriesContext(
      "css-design-system-od-zera-tokeny-motywy-layout",
      ARTICLES_CARD_MOCK,
      ARTICLE_SERIES_MOCK,
    );

    expect(context).not.toBeNull();
    expect(context?.series.id).toBe("full-stack-setup");
    expect(context?.currentIndex).toBe(1);
    expect(context?.steps).toHaveLength(10);
    expect(context?.steps[1].slug).toBe(
      "css-design-system-od-zera-tokeny-motywy-layout",
    );
  });

  it("returns null when article has no seriesId", () => {
    const context = getArticleSeriesContext(
      "accessibility-w-react-praktyczny-poradnik",
      ARTICLES_CARD_MOCK,
      ARTICLE_SERIES_MOCK,
    );

    expect(context).toBeNull();
  });

  it("returns null when series does not include current slug", () => {
    const context = getArticleSeriesContext(
      "jak-zbudowac-monorepo-z-turborepo-i-pnpm",
      ARTICLES_CARD_MOCK,
      [
        {
          id: "full-stack-setup",
          title: "Broken",
          articles: ["css-design-system-od-zera-tokeny-motywy-layout"],
        },
      ],
    );

    expect(context).toBeNull();
  });

  it("keeps placeholders for series steps not published yet", () => {
    const context = getArticleSeriesContext(
      "jak-zbudowac-monorepo-z-turborepo-i-pnpm",
      ARTICLES_CARD_MOCK,
      [
        {
          id: "full-stack-setup",
          title: "Full Stack Setup od Zera",
          articles: [
            "jak-zbudowac-monorepo-z-turborepo-i-pnpm",
            "future-article-slug",
          ],
        },
      ],
    );

    expect(context).not.toBeNull();
    expect(context?.steps[1].article).toBeNull();
    expect(context?.steps[1].slug).toBe("future-article-slug");
  });
});
