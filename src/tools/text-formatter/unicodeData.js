/**
 * Allowed unicode for insert: Popular row + full corpus (grapheme-split for emoji/ZWJ).
 */

import ALL_UNICODE_RAW from "./allUnicode.txt?raw";

export const POPULAR_UNICODE_RAW =
  "§⛏⬤█»▶★❤•💎⚔☀✓✔✖✗⛀⛁💰";

export { ALL_UNICODE_RAW };

/**
 * @param {string} str
 * @returns {string[]}
 */
export function splitGraphemes(str) {
  if (typeof str !== "string" || !str) return [];
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    return [
      ...new Intl.Segmenter("en", { granularity: "grapheme" }).segment(str),
    ].map((s) => s.segment);
  }
  return Array.from(str);
}

export function getPopularGraphemes() {
  return splitGraphemes(POPULAR_UNICODE_RAW);
}

/**
 * @param {string} raw
 * @returns {string[]}
 */
export function getAllGraphemesFromRaw(raw) {
  const s = String(raw ?? "").trim();
  if (!s) return [];
  const seen = new Set();
  const out = [];
  for (const g of splitGraphemes(s)) {
    if (!g || seen.has(g)) continue;
    seen.add(g);
    out.push(g);
  }
  return out;
}

export function getAllGraphemes() {
  return getAllGraphemesFromRaw(ALL_UNICODE_RAW);
}
