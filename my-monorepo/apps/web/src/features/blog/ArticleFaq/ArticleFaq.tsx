import type { FC } from "react";
import { ChevronDown, CircleHelp, MessageCircleQuestion } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { FaqItem } from "@constans/articlesFaqMock";
import styles from "./ArticleFaq.module.css";

interface ArticleFaqProps {
  faq: FaqItem[];
}

const ArticleFaq: FC<ArticleFaqProps> = ({ faq }) => {
  const { t } = useTranslation("UI");

  return (
    <section className={styles.faq} aria-labelledby="faq-heading">
      <div className={styles.faqHeader}>
        <MessageCircleQuestion className={styles.faqHeaderIcon} aria-hidden />
        <h3 id="faq-heading" className={styles.faqHeading}>
          {t("blog.faqHeading")}
        </h3>
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
