/**
 * Shared helpers for BuiltByBit `Authorization` values (dev proxy, static server, and browser client).
 * Personal Ultimate API keys from the account page are usually **Private**; only use Shared when BuiltByBit shows that prefix.
 */

/**
 * Clean pasted API key input (invisible chars, line breaks, wrapping quotes).
 * @param {string} [input]
 * @returns {string}
 */
export function sanitizeBbbTokenInput(input) {
  if (input == null) return "";
  let s = String(input);
  s = s.replace(/[\u200B-\u200D\uFEFF]/g, "");
  s = s.replace(/\r\n/g, "\n").replace(/\n/g, " ").replace(/\s+/g, " ").trim();
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

/**
 * Value for the HTTP `Authorization` header (e.g. `Private abc…`).
 * If the user pasted only the secret (no prefix), we assume **Private** — not Shared — so the key is looked up correctly.
 * @param {string} raw
 * @returns {string}
 */
export function normalizeBbbAuthorizationValue(raw) {
  const t = sanitizeBbbTokenInput(raw);
  if (!t) return "";
  if (/^(Private|Shared)\s+/i.test(t)) return t;
  return `Private ${t}`;
}
