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
} from "lucide-react";
import type { LinkGroup, LinkItem } from "../types/linkType";

export const quickLinks: LinkItem[] = [
  {
    title: "Kod źródłowy tej strony",
    href: "https://github.com/adamzagorski92/turbo-adam",
    Icon: GitBranch,
  },
  {
    title: "Mój LinkedIn",
    href: "https://www.linkedin.com/in/adazag/",
    Icon: BriefcaseBusiness,
  },
  {
    title: "Strona wizytówka (więcej o mnie)",
    href: "https://www.adamzagorski.pl/",
    Icon: UserRound,
  },
];

export const projectGroups: LinkGroup[] = [
  {
    title: "Strony low-code",
    description:
      "WordPress + Elementor — realizacje dla firm i osób prywatnych.",
    Icon: LayoutTemplate,
    links: [
      {
        title: "Willa Saga — pensjonat nad morzem",
        href: "https://www.willasaga.pl/",
        Icon: Home,
      },
      {
        title: "Hanya — strona wokalistki",
        href: "https://hanya.pl/",
        Icon: Mic,
      },
      {
        title: "NinjaKids — usługi i zajęcia dla dzieci",
        href: "https://www.ninjakids.pl/",
        Icon: Users,
      },
      {
        title: "SportPlay — sklep odzieżowy",
        href: "https://www.sportplay.pl/",
        Icon: Shirt,
      },
      {
        title: "Adam Zagórski — strona wizytówka",
        href: "https://www.adamzagorski.pl/",
        Icon: Globe,
      },
    ],
  },
  {
    title: "Aplikacje w React",
    description: "Zbiór aplikacji w React + TypeScript.",
    Icon: Code2,
    links: [
      {
        title: "Portfolio projektów (Netlify)",
        href: "https://adam-zag-portfolio-projects.netlify.app/",
        Icon: Globe,
      },
    ],
  },
  {
    title: "AI agenty",
    description: "Repozytoria z agentami AI i automatyzacjami.",
    Icon: Bot,
    links: [
      {
        title: "AI CV Agent — symulacja rozmowy z rekruterem",
        href: "https://github.com/adamzagorski92/ai-cvAgent",
        Icon: GitBranch,
      },
      {
        title: "Hawai Pizza Agent — żartobliwy agent kuchenny",
        href: "https://github.com/adamzagorski92/hawai-pizza-agentAI",
        Icon: GitBranch,
      },
    ],
  },
  {
    title: "Wtyczka Thunderbird",
    description: "Ekstraktor i segregator unikatowych adresów e-mail.",
    Icon: Mail,
    links: [
      {
        title: "Thunderbird Email Extractor (GitHub)",
        href: "https://github.com/adamzagorski92/thunderbird-email-extractor",
        Icon: Puzzle,
      },
    ],
  },
];
