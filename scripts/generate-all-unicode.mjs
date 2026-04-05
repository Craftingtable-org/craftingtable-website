/**
 * One-shot generator: writes src/tools/text-formatter/allUnicode.txt
 * Run: node scripts/generate-all-unicode.mjs
 *
 * Builds a flat string of codepoints (emoji + common symbols). Multi-codepoint
 * emoji that are not contiguous ranges are not included; grapheme splitting
 * in the app still handles skin tones etc. when pasted as full sequences.
 */

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "../src/tools/text-formatter/allUnicode.txt");

function cp(n) {
  try {
    return String.fromCodePoint(n);
  } catch {
    return "";
  }
}

function rangeInclusive(start, end) {
  let s = "";
  for (let n = start; n <= end; n++) {
    if (n >= 0xd800 && n <= 0xdfff) continue;
    s += cp(n);
  }
  return s;
}

/** Ranges: [start, end] inclusive, hex or number */
const RANGES = [
  [0x00a1, 0x00ff], // Latin-1 supplement (symbols; excludes control)
  [0x2010, 0x205e], // General punctuation (dashes, quotes)
  [0x2070, 0x209f], // Superscripts / subscripts
  [0x20a0, 0x20cf], // Currency
  [0x2100, 0x214f], // Letterlike
  [0x2150, 0x218f], // Number forms (fractions)
  [0x2190, 0x21ff], // Arrows
  [0x2200, 0x22ff], // Math operators
  [0x2300, 0x23ff], // Misc technical
  [0x2460, 0x24ff], // Enclosed alphanumerics
  [0x2500, 0x25ff], // Box drawing + geometric
  [0x2600, 0x26ff], // Misc symbols
  [0x2700, 0x27bf], // Dingbats
  [0x2900, 0x297f], // Supplemental arrows-B
  [0x2b00, 0x2bff], // Misc symbols and arrows
  [0x1f300, 0x1f5ff], // Misc symbols and pictographs
  [0x1f600, 0x1f64f], // Emoticons
  [0x1f650, 0x1f67f], // Ornamental dingbats
  [0x1f680, 0x1f6ff], // Transport and map
  [0x1f700, 0x1f77f], // Alchemical
  [0x1f780, 0x1f7ff], // Geometric shapes extended
  [0x1f800, 0x1f8ff], // Supplemental arrows-C
  [0x1f900, 0x1f9ff], // Supplemental symbols and pictographs
  [0x1fa00, 0x1fa6f], // Chess symbols
  [0x1fa70, 0x1faff], // Symbols and pictographs extended-A
  [0x1fb00, 0x1fbff], // Symbols for legacy computing
];

/** Explicit tail (user-specified vulgar fractions + ℅) */
const TAIL = "½⅓⅔¼¾⅛⅜⅝⅞℅";

function dedupeGraphemes(str) {
  const seg =
    typeof Intl !== "undefined" && Intl.Segmenter
      ? new Intl.Segmenter("en", { granularity: "grapheme" })
      : null;
  const seen = new Set();
  let out = "";
  if (seg) {
    for (const { segment } of seg.segment(str)) {
      if (!segment || seen.has(segment)) continue;
      seen.add(segment);
      out += segment;
    }
  } else {
    for (const ch of str) {
      if (seen.has(ch)) continue;
      seen.add(ch);
      out += ch;
    }
  }
  return out;
}

let raw = "";
for (const [a, b] of RANGES) {
  raw += rangeInclusive(a, b);
}
raw += TAIL;

const finalStr = dedupeGraphemes(raw);
writeFileSync(outPath, finalStr, "utf8");
const kb = (Buffer.byteLength(finalStr, "utf8") / 1024).toFixed(1);
console.log(`Wrote ${outPath} (${finalStr.length} graphemes, ~${kb} KiB UTF-8)`);
