import { useParams } from "react-router";
import { ARTICLES_CARD_MOCK } from "@constans/articlesCardMock";
import { ARTICLES_CONTENT_MOCK } from "@constans/articlesContentMock";

const Article = () => {
  const { slug } = useParams<{ slug: string }>();

  const card = ARTICLES_CARD_MOCK.find((a) => a.slug === slug);
  const content = card
    ? ARTICLES_CONTENT_MOCK.find((c) => c.id === card.id)
    : undefined;

  if (!card || !content) {
    return <p>Nie znaleziono artykułu.</p>;
  }

  return (
    <article>
      <p>{card.excerpt}</p>
      <div>
        <span>{card.author}</span>
        <time dateTime={card.date}>{card.date}</time>
      </div>
      <ul>
        {card.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <p>{content.content}</p>
    </article>
  );
};

export default Article;
