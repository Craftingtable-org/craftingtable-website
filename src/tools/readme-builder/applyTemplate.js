import { BUILTIN_PLACEHOLDER_DEFS } from "@/tools/readme-builder/placeholders";
import {
  buildPluginGuidesBBCode,
  buildPluginGuidesMarkdown,
} from "@/tools/readme-builder/pluginSnippets";

/**
 * @param {string} body
 * @param {Record<string, string>} values Keys match \`BUILTIN_PLACEHOLDER_DEFS\` (\`resource_title\`, etc.)
 * @param {{ key: string, value: string }[]} customPairs
 * @param {Record<string, boolean>} pluginEnabled
 * @param {{ pluginFormat?: "bbcode" | "markdown"; pluginGuideOverrides?: Record<string, { markdown?: string; bbcode?: string }> }} [opts]
 */
export function applyReadmeTemplate(
  body,
  values,
  customPairs,
  pluginEnabled,
  opts = {},
) {
  const fmt = opts.pluginFormat ?? "bbcode";
  const og = opts.pluginGuideOverrides || {};
  const pluginBlock =
    fmt === "markdown"
      ? buildPluginGuidesMarkdown(pluginEnabled || {}, og)
      : buildPluginGuidesBBCode(pluginEnabled || {}, og);
  let s = body.replace(
    /\{\{PLUGIN_GUIDES\}\}/g,
    pluginBlock.trim() ? `\n${pluginBlock}\n` : "\n",
  );

  for (const def of BUILTIN_PLACEHOLDER_DEFS) {
    const v = values[def.key] ?? "";
    s = s.split(`{{${def.key}}}`).join(v);
    for (const a of def.aliases) {
      s = s.split(`{{${a}}}`).join(v);
    }
  }

  for (const pair of customPairs) {
    const raw = (pair.key || "").trim();
    if (!raw) continue;
    const k = raw.replace(/\s+/g, "_");
    s = s.split(`{{${k}}}`).join(pair.value ?? "");
  }

  return s;
}

function esc(t) {
  return t
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inlineMd(s) {
  return s
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(
      /\[(.+?)\]\((https?:\/\/[^)]+)\)/g,
      '<a href="$2" rel="noopener noreferrer">$1</a>',
    );
}

/** Readable HTML export without extra dependencies */
export function markdownToBasicHtml(md) {
  const lines = md.split("\n");
  const html = [];
  let code = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      code = !code;
      html.push(code ? "<pre><code>" : "</code></pre>");
      continue;
    }
    if (code) {
      html.push(esc(line) + "\n");
      continue;
    }

    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      const n = h[1].length;
      html.push(`<h${n}>${inlineMd(esc(h[2]))}</h${n}>`);
      continue;
    }

    if (line.trim() === "") {
      html.push("<br/>");
      continue;
    }

    html.push(`<p>${inlineMd(esc(line))}</p>`);
  }

  return `<article class="resource-readme">${html.join("\n")}</article>`;
}

export function stripMarkdownToTxt(md) {
  return md
    .replace(/^#{1,3}\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[(.+?)\]\((.+?)\)/g, "$1 ($2)");
}
