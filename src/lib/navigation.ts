import type { LucideIcon } from "lucide-react";
import {
  Home,
  Route,
  NotebookPen,
  BookOpenText,
  Cpu,
  Trophy,
} from "lucide-react";

export const navigationItems = [
  { id: "home", label: "Home", icon: Home, caption: "Your workshop" },
  {
    id: "curriculum",
    label: "Projects",
    icon: Route,
    caption: "Build something brilliant",
  },
  {
    id: "progress",
    label: "Progress Tracker",
    icon: Trophy,
    caption: "Every small win counts",
  },
  {
    id: "notebook",
    label: "Lab Notebook",
    icon: NotebookPen,
    caption: "Keep your discoveries",
  },
  {
    id: "dictionary",
    label: "Dictionary",
    icon: BookOpenText,
    caption: "Big ideas, plain words",
  },
  {
    id: "pinout",
    label: "GPIO Pinout",
    icon: Cpu,
    caption: "Find the right connection",
  },
] as const satisfies ReadonlyArray<{
  id: string;
  label: string;
  icon: LucideIcon;
  caption: string;
}>;

export type AppTab = (typeof navigationItems)[number]["id"];
