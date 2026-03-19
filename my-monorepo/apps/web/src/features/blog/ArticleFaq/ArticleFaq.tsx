import type { FC } from "react";
import { ChevronDown, CircleHelp, MessageCircleQuestion } from "lucide-react";
import type { FaqItem } from "@constans/articlesFaqMock";
import styles from "./ArticleFaq.module.css";

interface ArticleFaqProps {
  faq: FaqItem[];
}

const ArticleFaq: FC<ArticleFaqProps> = ({ faq }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className={styles.faq} aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={styles.faqHeader}>
        <MessageCircleQuestion className={styles.faqHeaderIcon} aria-hidden />
        <h2 id="faq-heading" className={styles.faqHeading}>
          Najczęściej zadawane pytania
        </h2>
      </div>
      <div className={styles.faqList}>
        {faq.map((item, index) => (
          <details key={index} className={styles.faqItem}>
            <summary className={styles.faqSummary}>
              <CircleHelp className={styles.faqQuestionIcon} aria-hidden />
              {item.question}
              <ChevronDown className={styles.faqChevron} aria-hidden />
            </summary>
            <p className={styles.faqAnswer}>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default ArticleFaq;
