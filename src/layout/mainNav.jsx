import { Box, CaseSensitive, FileText, Home, ImageIcon, LayoutGrid } from "lucide-react";

/**
 * Single source of truth for the app sidebar. Every route that should appear in the nav
 * must be listed here so the bar stays identical on all pages (same order, labels, icons).
 */
export const mainNavItems = [
  { to: "/", label: "Home", icon: Home, end: true },
  {
    to: "/tools/thumbnail-tester",
    label: "A/B thumbnail tester",
    icon: ImageIcon,
    end: false,
  },
  {
    to: "/tools/gui-editor",
    label: "Minecraft GUI editor",
    icon: LayoutGrid,
    end: false,
  },
  {
    to: "/tools/schematic-to-bedrock",
    label: "Schematic → Bedrock",
    icon: Box,
    end: false,
  },
  {
    to: "/tools/readme-builder",
    label: "Resource README",
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
