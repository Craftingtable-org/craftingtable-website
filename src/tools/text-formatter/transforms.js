/**
 * Text transforms for Minecraft-style formatting (legacy §/& codes, MiniMessage).
 */

/**
 * Unicode small caps (phonetic / Latin letter shapes). Unmapped letters stay as-is.
 * @param {string} str
 */
export function toSmallCapsUnicode(str) {
  const map = {
    a: "ᴀ",
    b: "ʙ",
    c: "ᴄ",
    d: "ᴅ",
    e: "ᴇ",
    f: "ғ",
    g: "ɢ",
    h: "ʜ",
    i: "ɪ",
    j: "ᴊ",
    k: "ᴋ",
    l: "ʟ",
    m: "ᴍ",
    n: "ɴ",
    o: "ᴏ",
    p: "ᴘ",
    q: "ǫ",
    r: "ʀ",
    s: "s",
    t: "ᴛ",
    u: "ᴜ",
    v: "ᴠ",
    w: "ᴡ",
    x: "x",
    y: "ʏ",
    z: "ᴢ",
  };
  let out = "";
  for (const ch of String(str)) {
    const lower = ch.toLowerCase();
    if (map[lower]) out += map[lower];
    else out += ch;
  }
  return out;
}

/** Legacy colour / reset codes → MiniMessage tag names (single char after & or §). */
const LEGACY_TO_MM = {
  "0": "<black>",
  "1": "<dark_blue>",
  "2": "<dark_green>",
  "3": "<dark_aqua>",
  "4": "<dark_red>",
  "5": "<dark_purple>",
  "6": "<gold>",
  "7": "<gray>",
  "8": "<dark_gray>",
  "9": "<blue>",
  a: "<green>",
  b: "<aqua>",
  c: "<red>",
  d: "<light_purple>",
  e: "<yellow>",
  f: "<white>",
  l: "<bold>",
  m: "<strikethrough>",
  n: "<underlined>",
  o: "<italic>",
  r: "<reset>",
};

/** MiniMessage named colour / format tags → legacy & codes (longest tag names first). */
const MM_TO_LEGACY_ENTRIES = [
  ["dark_blue", "&1"],
  ["dark_green", "&2"],
  ["dark_aqua", "&3"],
  ["dark_red", "&4"],
  ["dark_purple", "&5"],
  ["dark_gray", "&8"],
  ["light_purple", "&d"],
  ["strikethrough", "&m"],
  ["underlined", "&n"],
  ["black", "&0"],
  ["gold", "&6"],
  ["gray", "&7"],
  ["blue", "&9"],
  ["green", "&a"],
  ["aqua", "&b"],
  ["red", "&c"],
  ["yellow", "&e"],
  ["white", "&f"],
  ["bold", "&l"],
  ["italic", "&o"],
  ["reset", "&r"],
];

/**
 * Convert legacy § or & codes to MiniMessage-style tags. Hex and gradients are left as-is.
 * @param {string} text
 */
export function legacyToMiniMessage(text) {
  const s = String(text);
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const a = s[i];
    const b = s[i + 1];
    if ((a === "&" || a === "§") && b && /[0-9a-fk-or]/i.test(b)) {
      const tag = LEGACY_TO_MM[b.toLowerCase()];
      out += tag ?? `${a}${b}`;
      i += 1;
    } else {
      out += a;
    }
  }
  return out;
}

/**
 * Replace common MiniMessage named tags with legacy & codes. Other tags unchanged.
 * @param {string} text
 */
export function miniMessageToLegacy(text) {
  let s = String(text);
  for (const [name, code] of MM_TO_LEGACY_ENTRIES) {
    const re = new RegExp(`<${name}>`, "gi");
    s = s.replace(re, code);
  }
  return s;
}

/**
 * Remove legacy codes and angle-bracket tags (best-effort plain text).
 * @param {string} text
 */
export function stripMinecraftFormatting(text) {
  return String(text)
    .replace(/&[0-9a-fk-or]/gi, "")
    .replace(/§[0-9a-fk-or]/gi, "")
    .replace(/<[^>]+>/g, "");
}

const SC_PROTECT =
  /(&[0-9a-fk-or])|(§[0-9a-fk-or])|(<[^>]+>)/g;

/**
 * Apply Unicode small caps to letters only outside legacy codes and &lt;…&gt; tags.
 * @param {string} text
 */
export function applySmallCapsPreservingFormatting(text) {
  const s = String(text);
  let out = "";
  let last = 0;
  let m;
  const re = new RegExp(SC_PROTECT.source, SC_PROTECT.flags);
  while ((m = re.exec(s)) !== null) {
    if (m.index > last) {
      out += toSmallCapsUnicode(s.slice(last, m.index));
    }
    out += m[0];
    last = m.index + m[0].length;
  }
  if (last < s.length) out += toSmallCapsUnicode(s.slice(last));
  return out;
}

/**
 * Wrap selection in MiniMessage gradient tags.
 * @param {string} inner
 * @param {string} fromHex e.g. #ff5555 or red
 * @param {string} toHex e.g. #5555ff or blue
 */
export function wrapMiniMessageGradient(inner, fromHex, toHex) {
  const a = String(fromHex).trim();
  const b = String(toHex).trim();
  return `<gradient:${a}:${b}>${inner}</gradient>`;
}

/**
 * Normalize § to & for web preview / editors that use &.
 * @param {string} text
 */
export function normalizeAmpersandSection(text) {
  return text.replace(/§/g, "&");
}
