import { Outlet } from "react-router";
import { PageContainer } from "@packages/components/basePageContainers/PageContainer/PageContainer";
import Footer from "@features/Footer/Footer";
import { InnerColumnSection } from "@packages/components";
import Logo from "@components/Logo/Logo";
import styles from "./BlogLayout.module.css";

const BlogLayout = () => {
  return (
    <PageContainer>
      <div className={styles.blogGrid}>
        <InnerColumnSection
          selector="nav"
          direction="column"
          className={styles.nav}
        >
          <Logo />
          <nav>Nawigacja</nav>
        </InnerColumnSection>
        <InnerColumnSection
          selector="section"
          direction="column"
          className={styles.section}
        >
          <div>Search</div>

          <div className={styles.contentGrid}>
            <div className={styles.mainColumn}>
              <h2 id="blog-heading">Wpisy blogowe</h2>
              <main className={styles.main}>
                <Outlet />
              </main>
            </div>
            <aside className={styles.aside}>
              <h3>Popularne tagi</h3>
              <ul>
                <li>React</li>
                <li>TypeScript</li>
                <li>NestJS</li>
                <li>Prisma</li>
                <li>Docker</li>
                <li>CSS</li>
                <li>Turborepo</li>
                <li>Vitest</li>
                <li>PostgreSQL</li>
                <li>Redis</li>
              </ul>
              <h3>Ostatnie wpisy</h3>
              <ul>
                <li>Monorepo z Turborepo</li>
                <li>CSS Design System</li>
                <li>NestJS + Prisma</li>
                <li>Docker Compose</li>
                <li>Testowanie React</li>
                <li>ESM w Node.js</li>
                <li>GitHub Actions</li>
                <li>Nginx reverse proxy</li>
              </ul>
              <h3>Archiwum</h3>
              <ul>
                <li>Marzec 2026</li>
                <li>Luty 2026</li>
                <li>Styczeń 2026</li>
                <li>Grudzień 2025</li>
                <li>Listopad 2025</li>
                <li>Październik 2025</li>
                <li>Wrzesień 2025</li>
                <li>Sierpień 2025</li>
                <li>Lipiec 2025</li>
                <li>Czerwiec 2025</li>
                <li>Maj 2025</li>
                <li>Kwiecień 2025</li>
              </ul>
            </aside>
          </div>
          <Footer />
        </InnerColumnSection>
      </div>
    </PageContainer>
  );
};

export default BlogLayout;
