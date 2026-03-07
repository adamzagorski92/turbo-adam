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
    titleKey: "Links:quick.sourceCode",
    href: "https://github.com/adamzagorski92/turbo-adam",
    Icon: GitBranch,
  },
  {
    titleKey: "Links:quick.linkedIn",
    href: "https://www.linkedin.com/in/adazag/",
    Icon: BriefcaseBusiness,
  },
  {
    titleKey: "Links:quick.aboutMe",
    href: "https://www.adamzagorski.pl/",
    Icon: UserRound,
  },
];

export const projectGroups: ProjectLinkGroup[] = [
  {
    titleKey: "Links:projectGroups.lowCode.title",
    descriptionKey: "Links:projectGroups.lowCode.description",
    Icon: LayoutTemplate,
    links: [
      {
        titleKey: "Links:projectGroups.lowCode.links.willaSaga",
        href: "https://www.willasaga.pl/",
        Icon: Home,
      },
      {
        titleKey: "Links:projectGroups.lowCode.links.hanya",
        href: "https://hanya.pl/",
        Icon: Mic,
      },
      {
        titleKey: "Links:projectGroups.lowCode.links.ninjaKids",
        href: "https://www.ninjakids.pl/",
        Icon: Users,
      },
      {
        titleKey: "Links:projectGroups.lowCode.links.sportPlay",
        href: "https://www.sportplay.pl/",
        Icon: Shirt,
      },
      {
        titleKey: "Links:projectGroups.lowCode.links.adamZagorski",
        href: "https://www.adamzagorski.pl/",
        Icon: Globe,
      },
    ],
  },
  {
    titleKey: "Links:projectGroups.reactApps.title",
    descriptionKey: "Links:projectGroups.reactApps.description",
    Icon: Code2,
    links: [
      {
        titleKey: "Links:projectGroups.reactApps.links.portfolioNetlify",
        href: "https://adam-zag-portfolio-projects.netlify.app/",
        Icon: Globe,
      },
    ],
  },
  {
    titleKey: "Links:projectGroups.aiAgents.title",
    descriptionKey: "Links:projectGroups.aiAgents.description",
    Icon: Bot,
    links: [
      {
        titleKey: "Links:projectGroups.aiAgents.links.aiCvAgent",
        href: "https://github.com/adamzagorski92/ai-cvAgent",
        Icon: GitBranch,
      },
      {
        titleKey: "Links:projectGroups.aiAgents.links.hawaiPizzaAgent",
        href: "https://github.com/adamzagorski92/hawai-pizza-agentAI",
        Icon: GitBranch,
      },
    ],
  },
  {
    titleKey: "Links:projectGroups.other.title",
    descriptionKey: "Links:projectGroups.other.description",
    Icon: Puzzle,
    links: [
      {
        titleKey: "Links:projectGroups.other.links.aplikujSie",
        href: "https://bit.ly/aplikuj-sie-v1-01",
        Icon: ClipboardList,
      },
      {
        titleKey: "Links:projectGroups.other.links.thunderbirdExtractor",
        href: "https://github.com/adamzagorski92/thunderbird-email-extractor",
        Icon: Mail,
      },
    ],
  },
];
