/**
 * Markdown blocks appended when a plugin guide is enabled (BuiltByBit-style resource README).
 * Keys match checkbox ids in the UI.
 */

export const PLUGIN_SNIPPET_IDS = [
  "deluxemenus",
  "luckperms",
  "commandpanels",
  "essentialsx",
  "placeholderapi",
  "vault",
  "citizens",
  "worldguard",
];

export const PLUGIN_SNIPPET_LABELS = {
  deluxemenus: "DeluxeMenus",
  luckperms: "LuckPerms",
  commandpanels: "CommandPanels",
  essentialsx: "EssentialsX",
  placeholderapi: "PlaceholderAPI",
  vault: "Vault",
  citizens: "Citizens",
  worldguard: "WorldGuard",
};

/** @type {Record<string, string>} */
export const PLUGIN_SNIPPETS = {
  deluxemenus: `### DeluxeMenus
- **Config folder:** \`plugins/DeluxeMenus/gui_menus/\`
- Create or edit menu YAML files here. Link items to commands or open other menus.
- **Main config:** \`plugins/DeluxeMenus/config.yml\` — global settings, sounds, and defaults.
- **Tip:** Use \`/dm open <menu>\` in-game to test after edits.`,

  luckperms: `### LuckPerms
- **Groups & tracks:** Use \`/lp editor\` or edit \`plugins/LuckPerms/yaml-storage/groups.yml\` (if using YAML).
- **Per-resource permissions:** Add nodes under your resource’s permission branch (e.g. \`yourplugin.use\`).
- **Tip:** Use \`/lp user <player> permission set <node> true\` for testing.`,

  commandpanels: `### CommandPanels
- **Panels:** \`plugins/CommandPanels/panels/\` — one YAML file per panel.
- **config.yml:** \`plugins/CommandPanels/config.yml\` — opener items, cooldowns, and hooks.
- **Tip:** Reload with \`/cpanels reload\` after changes (exact command may vary by version).`,

  essentialsx: `### EssentialsX
- **Main config:** \`plugins/Essentials/config.yml\`
- **Messages:** \`plugins/Essentials/messages/\` — customize chat, kits, and warps text.
- **Kits:** Define in \`config.yml\` under \`kits:\` or use \`/createkit\` where supported.`,

  placeholderapi: `### PlaceholderAPI
- **Expansions:** Download from [PlaceholderAPI eCloud](https://api.extendedclip.com/) or use \`/papi ecloud download <expansion>\`.
- **Use in configs:** \`%expansion_placeholder%\` — works in many plugins when expansion is installed.
- **Tip:** \`/papi parse me <placeholder>\` to test output.`,

  vault: `### Vault
- **Usually no GUI files** — Vault is an API for economy and permissions.
- Ensure your economy/perms plugins hook Vault so other plugins can read balances and groups.
- **Verify:** \`/vault-info\` or check server log on startup for Vault hooks.`,

  citizens: `### Citizens
- **Saves:** \`plugins/Citizens/saves.yml\` (or \`.npc\` folder depending on version).
- **In-game:** \`/npc create\`, \`/npc sel\`, then edit traits and commands.
- **Tip:** Back up saves before bulk edits.`,

  worldguard: `### WorldGuard
- **Regions:** \`/rg define\`, \`/rg flag\` — or edit \`plugins/WorldGuard/worlds/<world>/regions.yml\` when offline.
- **Flags:** Build, PVP, mob-spawning, etc. per region.
- **Tip:** Use \`/rg info\` while standing in a region to inspect flags.`,
};

export function buildPluginGuidesMarkdown(enabledIds) {
  const ids = PLUGIN_SNIPPET_IDS.filter((id) => enabledIds[id]);
  if (ids.length === 0) return "";
  const parts = ids.map((id) => PLUGIN_SNIPPETS[id]).filter(Boolean);
  return ["---", "## Common plugin edits", "", ...parts].join("\n");
}

/** @type {Record<string, string>} */
export const PLUGIN_SNIPPETS_BB = {
  deluxemenus: `[h2]DeluxeMenus[/h2]
[list]
[*][b]Config folder:[/b] [code]plugins/DeluxeMenus/gui_menus/[/code]
[*]Create or edit menu YAML files here. Link items to commands or open other menus.
[*][b]Main config:[/b] [code]plugins/DeluxeMenus/config.yml[/code] — global settings, sounds, and defaults.
[*][b]Tip:[/b] Use [code]/dm open <menu>[/code] in-game to test after edits.
[/list]`,

  luckperms: `[h2]LuckPerms[/h2]
[list]
[*][b]Groups & tracks:[/b] Use [code]/lp editor[/code] or edit [code]plugins/LuckPerms/yaml-storage/groups.yml[/code] (if using YAML).
[*][b]Per-resource permissions:[/b] Add nodes under your resource’s permission branch (e.g. [code]yourplugin.use[/code]).
[*][b]Tip:[/b] Use [code]/lp user <player> permission set <node> true[/code] for testing.
[/list]`,

  commandpanels: `[h2]CommandPanels[/h2]
[list]
[*][b]Panels:[/b] [code]plugins/CommandPanels/panels/[/code] — one YAML file per panel.
[*][b]config.yml:[/b] [code]plugins/CommandPanels/config.yml[/code] — opener items, cooldowns, and hooks.
[*][b]Tip:[/b] Reload with [code]/cpanels reload[/code] after changes (exact command may vary by version).
[/list]`,

  essentialsx: `[h2]EssentialsX[/h2]
[list]
[*][b]Main config:[/b] [code]plugins/Essentials/config.yml[/code]
[*][b]Messages:[/b] [code]plugins/Essentials/messages/[/code] — customize chat, kits, and warps text.
[*][b]Kits:[/b] Define in [code]config.yml[/code] under [code]kits:[/code] or use [code]/createkit[/code] where supported.
[/list]`,

  placeholderapi: `[h2]PlaceholderAPI[/h2]
[list]
[*][b]Expansions:[/b] Download from [url=https://api.extendedclip.com/]PlaceholderAPI eCloud[/url] or use [code]/papi ecloud download <expansion>[/code].
[*][b]Use in configs:[/b] [code]%expansion_placeholder%[/code] — works in many plugins when expansion is installed.
[*][b]Tip:[/b] [code]/papi parse me <placeholder>[/code] to test output.
[/list]`,

  vault: `[h2]Vault[/h2]
[list]
[*][b]Usually no GUI files[/b] — Vault is an API for economy and permissions.
[*]Ensure your economy/perms plugins hook Vault so other plugins can read balances and groups.
[*][b]Verify:[/b] [code]/vault-info[/code] or check server log on startup for Vault hooks.
[/list]`,

  citizens: `[h2]Citizens[/h2]
[list]
[*][b]Saves:[/b] [code]plugins/Citizens/saves.yml[/code] (or [code].npc[/code] folder depending on version).
[*][b]In-game:[/b] [code]/npc create[/code], [code]/npc sel[/code], then edit traits and commands.
[*][b]Tip:[/b] Back up saves before bulk edits.
[/list]`,

  worldguard: `[h2]WorldGuard[/h2]
[list]
[*][b]Regions:[/b] [code]/rg define[/code], [code]/rg flag[/code] — or edit [code]plugins/WorldGuard/worlds/<world>/regions.yml[/code] when offline.
[*][b]Flags:[/b] Build, PVP, mob-spawning, etc. per region.
[*][b]Tip:[/b] Use [code]/rg info[/code] while standing in a region to inspect flags.
[/list]`,
};

export function buildPluginGuidesBBCode(enabledIds) {
  const ids = PLUGIN_SNIPPET_IDS.filter((id) => enabledIds[id]);
  if (ids.length === 0) return "";
  const parts = ids.map((id) => PLUGIN_SNIPPETS_BB[id]).filter(Boolean);
  return ["[hr]", "[h2]Common plugin edits[/h2]", "", ...parts].join("\n\n");
}
