import { InnerColumnSection } from "@my-monorepo/components";
import AboveTheFold from "../../../../components/AboveTheFold/AboveTheFold";
import Card from "../../../../components/Card/Card";
import { quickLinks } from "../../../../constans/links";
import ProjectLink from "../../../../components/ProjectLink/ProjectLink";

const HomePageAboveTheFold = () => {
  return (
    <AboveTheFold
      heading={{
        kicker: "Cześć, tu Adam",
        title: "Frontend Developer",
        subtitle: "Buduję nowoczesne aplikacje w React + TypeScript.",
      }}
    >
      <InnerColumnSection direction="column">
        <p>
          W tym miejscu planuję zebrać moje projekty i pomysły, aby prezentować
          umiejętności i kompetencje.
        </p>
        <p>
          Do tej pory zebrałem{" "}
          <strong>6 miesięcy komercyjnego doświadczenia</strong> na AGH.
        </p>
      </InnerColumnSection>

      <InnerColumnSection direction="column" selector="nav">
        <Card title="Szybkie linki">
          {quickLinks.map((l) => (
            <ProjectLink
              key={l.href}
              href={l.href}
              title={l.title}
              Icon={l.Icon}
            />
          ))}
        </Card>
      </InnerColumnSection>
    </AboveTheFold>
  );
};

export default HomePageAboveTheFold;
