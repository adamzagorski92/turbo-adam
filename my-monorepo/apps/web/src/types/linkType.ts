import { type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type LinkItem = {
  title: string;
  href: string;
  Icon: LucideIcon;
};

export type LinkGroup = {
  title: string;
  description: ReactNode;
  Icon: LucideIcon;
  links: LinkItem[];
};
