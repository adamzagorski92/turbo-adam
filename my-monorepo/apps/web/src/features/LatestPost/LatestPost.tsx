import {
  ColumnSection,
  InnerColumnSection,
  SectionContainer,
  Thumbnail,
} from "@packages/components";

import styles from "./LatestPost.module.css";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
}

interface LatestPostProps {
  post: Post;
}

const LatestPost = ({ post }: LatestPostProps) => {
  return (
    <SectionContainer noBottomPadding paddingLeft={0} paddingRight={0}>
      <div className={styles.wrapper}>
        <span className={styles.label}>Najnowszy wpis</span>
        <ColumnSection
          ratio="2:1"
          stackAt="tablet"
          gapX="gx-16"
          className={styles.columns}
        >
          <InnerColumnSection>
            <Thumbnail size="lg" />
          </InnerColumnSection>
          <InnerColumnSection direction="column" gap={16}>
            <div className={styles.meta}>
              <time dateTime={post.date}>{post.date}</time>
              <span>{post.author}</span>
            </div>
            <h2 className={styles.title}>{post.title}</h2>
            <p className={styles.excerpt}>{post.excerpt}</p>
            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </InnerColumnSection>
        </ColumnSection>
      </div>
    </SectionContainer>
  );
};

export default LatestPost;
