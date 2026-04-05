import {
  Box,
  CaseSensitive,
  FileText,
  ImageIcon,
  LayoutGrid,
} from "lucide-react";

/**
 * Tools listed on the home hub. Keep in sync with `src/routes.jsx` and `src/layout/mainNav.jsx`.
 */
export const TOOLS_CATALOG = [
  {
    to: "/tools/text-formatter",
    title: "Text formatter",
    description:
      "Format strings with legacy codes, hex, MiniMessage tags, gradients, small caps, and emoji — preview as chat, signs, books, lore, or item names.",
    icon: CaseSensitive,
    badge: "Minecraft",
    cta: "Try it",
  },
  {
    to: "/tools/thumbnail-tester",
    title: "A/B thumbnail tester",
    description:
      "Upload two thumbnails, adjust your title and price, and compare them side by side in a realistic resource grid.",
    icon: ImageIcon,
    badge: "Listing",
    cta: "Try it",
  },
  {
    to: "/tools/gui-editor",
    title: "Minecraft GUI editor",
    description:
      "Drag items to build server menus, then export YAML for CommandPanels or DeluxeMenus.",
    icon: LayoutGrid,
    badge: "Server",
    cta: "Try it",
  },
  {
    to: "/tools/schematic-to-bedrock",
    title: "Schematic → Bedrock",
    description:
      "Convert Java .schem/.schematic files into a downloadable Bedrock .mcworld using a void template.",
    icon: Box,
    badge: "Under construction",
    cta: "View",
  },
  {
    to: "/tools/readme-builder",
    title: "Resource README builder",
    description:
      "Build listing readmes with placeholders, DeluxeMenus/LuckPerms-style guides, saved templates, and export to Markdown, TXT, or HTML.",
    icon: FileText,
    badge: "Docs",
    cta: "Try it",
  },
];
