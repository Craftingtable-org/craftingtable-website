/**
 * Legacy entry: default body + Markdown detection. Bodies live in `baseTemplates.js`.
 */

export {
  DEFAULT_README_TEMPLATE,
  getReadmeBaseTemplateBody,
  README_BASE_TEMPLATES,
} from "@/tools/readme-builder/baseTemplates";

/** Detect legacy Markdown templates saved before BBCode editor */
export function looksLikeMarkdownTemplate(body) {
  if (!body || !body.trim()) return false;
  const t = body.trimStart();
  if (/^#{1,3}\s/m.test(t)) return true;
  if (t.startsWith("## ") || t.startsWith("# ")) return true;
  if (/\*\*[^*]+\*\*/.test(body) && !/\[b]/.test(body)) return true;
  return false;
}
