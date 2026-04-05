/**
 * Built-in starter bodies for “Apply base template”. All use BBCode + {{…}} placeholders.
 * {{PLUGIN_GUIDES}} is filled from the Plugin edit guides sidebar when present in the body.
 */

/** @typedef {{ id: string, label: string, description: string, body: string }} ReadmeBaseTemplate */

/** General listing README — default starter */
const GENERAL = `[h1]{{resource_title}}[/h1]

[b]Author:[/b] {{author}}
[b]Version:[/b] {{resource_version}} · [b]Minecraft:[/b] {{minecraft_version}}

[h2]Overview[/h2]
Short description of what this resource does and who it is for. Replace this paragraph in your listing or keep it synced with BuiltByBit.

[h2]Where to edit (general)[/h2]
[list]
[*][b]Main plugin config[/b] — [code]plugins/{{resource_title}}/config.yml[/code] (adjust folder to your plugin id)
[*][b]Messages / lang[/b] — [code]plugins/.../lang/[/code] or [code]messages.yml[/code]
[*][b]Permissions[/b] — your [code]plugin.yml[/code] or permission nodes in docs below
[/list]

[h2]Support[/h2]
[list]
[*][b]Discord:[/b] [url]{{discord_link}}[/url]
[*][b]Website / docs:[/b] [url]{{website_link}}[/url]
[*][b]Email:[/b] {{support_email}}
[/list]

[h2]Installation[/h2]
[list]
[*]Download the latest jar from your purchase page.
[*]Stop the server, place the jar in [code]plugins/[/code].
[*]Start the server and edit [code]config.yml[/code] before going live.
[*]Reload or restart as required by the plugin.
[/list]

{{PLUGIN_GUIDES}}

[h2]Permissions (example)[/h2]
[code]yourplugin.use:
  description: Basic use
  default: true
yourplugin.admin:
  description: Admin commands
  default: op[/code]

[h2]Need help?[/h2]
Open a ticket on BuiltByBit or join our Discord above — include your server version and a paste of any error from [code]logs/latest.log[/code].`;

/** Plugins — licensing, JARs, downloads, compliance */
const PLUGINS = `[h1]{{resource_title}}[/h1]

[b]Author:[/b] {{author}}
[b]Version:[/b] {{resource_version}} · [b]Minecraft:[/b] {{minecraft_version}}

[h2]Overview[/h2]
Describe what your plugin does, supported server software (Paper, Spigot, Purpur, etc.), and Java version if relevant.

[h2]License & use[/h2]
[list]
[*][b]Purchase / entitlement[/b] — One license per server or per network as stated on your BuiltByBit resource page. Redistribution of the [code].jar[/code] or source is not allowed unless you explicitly permit it.
[*][b]Dependencies[/b] — List required plugins (Vault, PlaceholderAPI, etc.) and optional integrations. Users must download those separately unless you bundle them with permission.
[*][b]Updates[/b] — Explain how buyers get updates (same download link, changelog, Discord announcements).
[/list]

[h2]Downloading & installing the JAR[/h2]
[list]
[*][b]BuiltByBit[/b] — Download the latest [code].jar[/code] from your [b]Purchases[/b] or the resource page after buying.
[*][b]Never[/b] use unofficial mirrors — they may be outdated or tampered with.
[*]Place the file in [code]plugins/[/code] on your [b]game[/b] server (not the proxy unless this is a proxy plugin).
[*]Start or restart the server once so folders and default configs are created.
[/list]

[h2]First-time configuration[/h2]
[list]
[*]Edit [code]plugins/{{resource_title}}/config.yml[/code] (path may differ — use your plugin’s folder name).
[*]Set [b]database[/b], [b]webhooks[/b], or [b]API keys[/b] before going live if your plugin uses them.
[*]Use [code]/yourplugin reload[/code] or a full restart only when the docs say it’s safe.
[/list]

[h2]Support[/h2]
[list]
[*][b]Discord:[/b] [url]{{discord_link}}[/url]
[*][b]Website / docs:[/b] [url]{{website_link}}[/url]
[*][b]Email:[/b] {{support_email}}
[/list]

{{PLUGIN_GUIDES}}

[h2]Permissions (example)[/h2]
[code]yourplugin.use:
  description: Basic use
  default: true[/code]

[h2]Troubleshooting[/h2]
If the plugin does not load, check [code]logs/latest.log[/code] for “Error” or “Could not load” and confirm your server version matches this resource.`;

/** Builds — worlds, WE/FAWE, tick / performance */
const BUILDS = `[h1]{{resource_title}}[/h1]

[b]Author:[/b] {{author}}
[b]Version:[/b] {{resource_version}} · [b]Minecraft:[/b] {{minecraft_version}}

[h2]Overview[/h2]
Describe the build: style (spawn, PvP arena, lobby, redstone map), world type (overworld flat, void, schematic paste), and what the buyer receives (world folder, schematic, both).

[h2]What’s included[/h2]
[list]
[*][b]Download format[/b] — e.g. [code].zip[/code] with [code]region/[/code] and [code]level.dat[/code], or [code].schem[/code] / [code].schematic[/code] only.
[*][b]Dimensions[/b] — Single world vs multiple worlds; note if the Nether/End are empty or included.
[/list]

[h2]Importing & pasting (FastAsyncWorldEdit / WorldEdit)[/h2]
[list]
[*]Install [b]FastAsyncWorldEdit[/b] (or WorldEdit) on a test server before importing to production.
[*]Use [code]//schem load <name>[/code] then [code]//paste[/code] (or FAWE equivalents). Stand where you want the origin; use [code]//rotate[/code] / [code]//flip[/code] if needed.
[*]For very large pastes, pre-generate chunks or raise memory; paste in stages if the server watchdog kicks in.
[/list]

[h2]Performance & tick settings[/h2]
[list]
[*][b]Redstone / technical maps[/b] — For showcases or AFK inspection, consider [code]/gamerule randomTickSpeed 0[/code] to reduce crop growth and random block updates while you tour the build. Set back to [code]3[/code] (default) for normal gameplay.
[*][b]Entity cramming[/b] — If the build has many item frames or armor stands, mention [code]max-entity-collisions[/code] or cleanup in [code]paper-global.yml[/code] if relevant.
[*][b]Lighting[/b] — After large pastes, run a lighting fix ([code]/paper fixlight[/code] or relight tools) if you see black patches.
[/list]

[h2]Support[/h2]
[list]
[*][b]Discord:[/b] [url]{{discord_link}}[/url]
[*][b]Website / docs:[/b] [url]{{website_link}}[/url]
[*][b]Email:[/b] {{support_email}}
[/list]

[h2]Need help?[/h2]
Include your server version, Paper vs Spigot, and whether the issue happens on a fresh paste or an existing world. Screenshots of FAWE/WE errors help.`;

/** Premade setups — files buyers must edit to “make it theirs” */
const SETUPS = `[h1]{{resource_title}}[/h1]

[b]Author:[/b] {{author}}
[b]Version:[/b] {{resource_version}} · [b]Minecraft:[/b] {{minecraft_version}}

[h2]Overview[/h2]
This is a [b]premade setup[/b] (lobby, network skeleton, minigame hub, etc.). Summarize what works out of the box and what the buyer must customize (name, NPCs, holograms, MySQL).

[h2]Before you start[/h2]
[list]
[*][b]Backup[/b] — Work on a copy; keep a vanilla backup of [code]world/[/code] before edits.
[*][b]Software[/b] — State Paper/Purpur/Folia if you tested on them; note proxy (Velocity/Bungee) if the setup uses it.
[/list]

[h2]Files you should edit first[/h2]
[list]
[*][b]Server identity[/b] — [code]server.properties[/code] ([code]motd[/code], [code]server-port[/code]), [code]bukkit.yml[/code] / [code]spigot.yml[/code] if you ship tuned values.
[*][b]Per-plugin configs[/b] — Under [code]plugins/<PluginName>/config.yml[/code]; search for [code]localhost[/code], [code]changeme[/code], [code]YOUR_API_KEY[/code], and your old branding strings.
[*][b]Permissions[/b] — [code]LuckPerms[/code] YAML or web editor — replace example ranks and prefix colors with yours.
[*][b]Worlds[/b] — If the setup ships a default world, rename regions only if you know how; otherwise change spawn in [code]paper-world-defaults.yml[/code] or Multiverse config as your docs describe.
[*][b]Placeholders[/b] — DeluxeMenus, TAB, hologram plugins: replace [code]%server_name%[/code]-style defaults with your PlaceholderAPI expansions.
[/list]

[h2]Database & APIs[/h2]
[list]
[*]If the setup uses MySQL/MariaDB, fill [code]host[/code], [code]database[/code], [code]user[/code], [code]password[/code] in the plugin’s storage config and create empty tables if the plugin expects that.
[*]Remove or rotate any [b]test API keys[/b] shipped for demos.
[/list]

[h2]Support[/h2]
[list]
[*][b]Discord:[/b] [url]{{discord_link}}[/url]
[*][b]Website / docs:[/b] [url]{{website_link}}[/url]
[*][b]Email:[/b] {{support_email}}
[/list]

{{PLUGIN_GUIDES}}

[h2]After you go live[/h2]
[list]
[*]Re-scan configs for IP addresses, Discord webhooks, or donation URLs that still point to the template author.
[*]Document any [b]optional[/b] plugins you disabled so buyers know what they can add back.
[/list]

[h2]Need help?[/h2]
When opening a ticket, say which files you already changed and paste errors from [code]logs/latest.log[/code] (remove secrets first).`;

/** @type {ReadmeBaseTemplate[]} */
export const README_BASE_TEMPLATES = [
  {
    id: "general",
    label: "General resource",
    description: "Default plugin README: overview, install, support, permissions.",
    body: GENERAL,
  },
  {
    id: "plugins",
    label: "Plugins (license & JARs)",
    description: "Licensing, BuiltByBit downloads, dependencies, first-time config.",
    body: PLUGINS,
  },
  {
    id: "builds",
    label: "Builds / worlds",
    description: "World delivery, FAWE/WE paste, randomTickSpeed and performance tips.",
    body: BUILDS,
  },
  {
    id: "setups",
    label: "Premade setups",
    description: "Files to edit, databases, permissions, rebranding a shipped setup.",
    body: SETUPS,
  },
];

/** @param {string} id */
export function getReadmeBaseTemplateBody(id) {
  const t = README_BASE_TEMPLATES.find((x) => x.id === id);
  return t?.body ?? README_BASE_TEMPLATES[0].body;
}

/** Default body for new sessions (general). */
export const DEFAULT_README_TEMPLATE = README_BASE_TEMPLATES[0].body;
