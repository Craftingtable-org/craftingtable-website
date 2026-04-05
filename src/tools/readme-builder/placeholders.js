/**
 * Built-in placeholders for resource README templates.
 * Aliases resolve to the same value in the toolbar.
 */
export const BUILTIN_PLACEHOLDER_DEFS = [
  {
    key: "resource_title",
    aliases: ["title", "name"],
    label: "Resource title",
    example: "Skyblock Core",
  },
  {
    key: "discord_link",
    aliases: ["discord"],
    label: "Discord invite URL",
    example: "https://discord.gg/example",
  },
  {
    key: "website_link",
    aliases: ["website", "site"],
    label: "Website / docs URL",
    example: "https://example.com",
  },
  {
    key: "author",
    aliases: ["seller", "creator"],
    label: "Author / shop name",
    example: "YourStudio",
  },
  {
    key: "resource_version",
    aliases: ["version"],
    label: "Resource version",
    example: "2.1.0",
  },
  {
    key: "minecraft_version",
    aliases: ["mc_version", "minecraft"],
    label: "Minecraft version(s)",
    example: "1.20.4 – 1.21.x",
  },
  {
    key: "support_email",
    aliases: ["email"],
    label: "Support email",
    example: "support@example.com",
  },
];

/** @returns {string[]} e.g. "{{resource_title}}", "{{title}}" */
export function allBuiltinPlaceholderBraces() {
  const out = new Set();
  for (const def of BUILTIN_PLACEHOLDER_DEFS) {
    out.add(`{{${def.key}}}`);
    for (const a of def.aliases) {
      out.add(`{{${a}}}`);
    }
  }
  return [...out];
}

/** Build hover / help text lines */
export function placeholderHelpLines() {
  const lines = [];
  for (const def of BUILTIN_PLACEHOLDER_DEFS) {
    const braces = [`{{${def.key}}}`, ...def.aliases.map((a) => `{{${a}}}`)];
    lines.push(`${def.label}: ${braces.join(" · ")}`);
  }
  lines.push(
    "Custom: {{your_key}} — add keys in “Custom placeholders” below.",
  );
  lines.push(
    "Plugin guides: checked plugins insert at {{PLUGIN_GUIDES}} (BBCode or Markdown sections).",
  );
  lines.push(
    "BBCode: [b] [i] [u] [s] [url] [url=…] [img] [h1–h3] [list][*] [quote] [code] [hr] [center].",
  );
  return lines;
}
