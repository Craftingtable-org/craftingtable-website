import {
  CaseSensitive,
  FileText,
  Home,
  LayoutGrid,
} from "lucide-react";

/**
 * Single source of truth for the app sidebar. Every route that should appear in the nav
 * must be listed here so the bar stays identical on all pages (same order, labels, icons).
 */
export const mainNavItems = [
  { to: "/", label: "Overview", icon: Home, end: true },
  {
    to: "/tools/gui-editor",
    label: "GUI editor",
    icon: LayoutGrid,
    end: false,
  },
  {
    to: "/tools/readme-builder",
    label: "README builder",
    icon: FileText,
    end: false,
  },
  {
    to: "/tools/text-formatter",
    label: "Text formatter",
    icon: CaseSensitive,
    end: false,
  },
];
