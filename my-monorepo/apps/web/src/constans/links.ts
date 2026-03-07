import {
  Bot,
  BriefcaseBusiness,
  Code2,
  GitBranch,
  Globe,
  Home,
  LayoutTemplate,
  Mail,
  Mic,
  Puzzle,
  Shirt,
  Users,
  UserRound,
  ClipboardList,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

type I18nKey = string;

export type QuickLinkItem = {
  titleKey: I18nKey;
  href: string;
  Icon: LucideIcon;
};

export type ProjectLinkItem = {
  titleKey: I18nKey;
  href: string;
  Icon: LucideIcon;
};

export type ProjectLinkGroup = {
  titleKey: I18nKey;
  descriptionKey: I18nKey;
  Icon: LucideIcon;
  links: ProjectLinkItem[];
};

export const quickLinks: QuickLinkItem[] = [
  {
    titleKey: "content.links.quick.sourceCode",
    href: "https://github.com/adamzagorski92/turbo-adam",
    Icon: GitBranch,
  },
  {
    titleKey: "content.links.quick.linkedIn",
    href: "https://www.linkedin.com/in/adazag/",
    Icon: BriefcaseBusiness,
  },
  {
    titleKey: "content.links.quick.aboutMe",
    href: "https://www.adamzagorski.pl/",
    Icon: UserRound,
  },
];

export const projectGroups: ProjectLinkGroup[] = [
  {
    titleKey: "content.projectGroups.lowCode.title",
    descriptionKey: "content.projectGroups.lowCode.description",
    Icon: LayoutTemplate,
    links: [
      {
        titleKey: "content.projectGroups.lowCode.links.willaSaga",
        href: "https://www.willasaga.pl/",
        Icon: Home,
      },
      {
        titleKey: "content.projectGroups.lowCode.links.hanya",
        href: "https://hanya.pl/",
        Icon: Mic,
      },
      {
        titleKey: "content.projectGroups.lowCode.links.ninjaKids",
        href: "https://www.ninjakids.pl/",
        Icon: Users,
      },
      {
        titleKey: "content.projectGroups.lowCode.links.sportPlay",
        href: "https://www.sportplay.pl/",
        Icon: Shirt,
      },
      {
        titleKey: "content.projectGroups.lowCode.links.adamZagorski",
        href: "https://www.adamzagorski.pl/",
        Icon: Globe,
      },
    ],
  },
  {
    titleKey: "content.projectGroups.reactApps.title",
    descriptionKey: "content.projectGroups.reactApps.description",
    Icon: Code2,
    links: [
      {
        titleKey: "content.projectGroups.reactApps.links.portfolioNetlify",
        href: "https://adam-zag-portfolio-projects.netlify.app/",
        Icon: Globe,
      },
    ],
  },
  {
    titleKey: "content.projectGroups.aiAgents.title",
    descriptionKey: "content.projectGroups.aiAgents.description",
    Icon: Bot,
    links: [
      {
        titleKey: "content.projectGroups.aiAgents.links.aiCvAgent",
        href: "https://github.com/adamzagorski92/ai-cvAgent",
        Icon: GitBranch,
      },
      {
        titleKey: "content.projectGroups.aiAgents.links.hawaiPizzaAgent",
        href: "https://github.com/adamzagorski92/hawai-pizza-agentAI",
        Icon: GitBranch,
      },
    ],
  },
  {
    titleKey: "content.projectGroups.other.title",
    descriptionKey: "content.projectGroups.other.description",
    Icon: Puzzle,
    links: [
      {
        titleKey: "content.projectGroups.other.links.aplikujSie",
        href: "https://bit.ly/aplikuj-sie-v1-01",
        Icon: ClipboardList,
      },
      {
        titleKey: "content.projectGroups.other.links.thunderbirdExtractor",
        href: "https://github.com/adamzagorski92/thunderbird-email-extractor",
        Icon: Mail,
      },
    ],
  },
];
