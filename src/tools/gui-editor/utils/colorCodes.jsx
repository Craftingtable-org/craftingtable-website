import React, { memo } from "react";
import { toSmallCapsUnicode } from "@/tools/text-formatter/transforms";

const legacyColors = {
  '0': '#000000', '1': '#0000AA', '2': '#00AA00', '3': '#00AAAA',
  '4': '#AA0000', '5': '#AA00AA', '6': '#FFAA00', '7': '#AAAAAA',
  '8': '#555555', '9': '#5555FF', 'a': '#55FF55', 'b': '#55FFFF',
  'c': '#FF5555', 'd': '#FF55FF', 'e': '#FFFF55', 'f': '#FFFFFF',
};

const miniMessageColors = {
  'black': '#000000', 'dark_blue': '#0000AA', 'dark_green': '#00AA00', 'dark_aqua': '#00AAAA',
  'dark_red': '#AA0000', 'dark_purple': '#AA00AA', 'gold': '#FFAA00', 'gray': '#AAAAAA',
  'dark_gray': '#555555', 'blue': '#5555FF', 'green': '#55FF55', 'aqua': '#55FFFF',
  'red': '#FF5555', 'light_purple': '#FF55FF', 'yellow': '#FFFF55', 'white': '#FFFFFF',
};

const MINECRAFT_FONT =
  "'Minecraft', 'Press Start 2P', ui-monospace, monospace";

/** Stable `parseColorCodes` options — avoids allocating new objects per render. */
export const MINECRAFT_PARSE_OPTIONS = Object.freeze({ font: "minecraft" });
const DEFAULT_PARSE_OPTIONS = Object.freeze({});

const COLOR_CODE_REGEX =
  /(&[0-9a-fk-or])|(<[a-zA-Z_]+>)|([^&<]+)|(&)|(<)/g;

/**
 * @param {string} text
 * @param {{ font?: 'default' | 'minecraft', smallCaps?: boolean }} [options]
 *   `minecraft` — use /public/fonts/ @font-face (&l→bold, &o→italic; italic is synthesized).
 *   `smallCaps` — Unicode small caps on visible text runs only (not on codes or tags).
 */
export function parseColorCodes(text, options = {}) {
  if (!text) return null;

  const useMinecraft = options.font === "minecraft";
  const smallCaps = options.smallCaps === true;
  const result = [];
  let currentColor = "#FFFFFF";
  let isBold = false;
  let isItalic = false;
  let isUnderline = false;
  let isStrikethrough = false;

  COLOR_CODE_REGEX.lastIndex = 0;
  let match;
  let key = 0;

  while ((match = COLOR_CODE_REGEX.exec(text)) !== null) {
    if (match[1]) {
      const code = match[1][1];
      if (legacyColors[code]) currentColor = legacyColors[code];
      else if (code === "l") isBold = true;
      else if (code === "o") isItalic = true;
      else if (code === "n") isUnderline = true;
      else if (code === "m") isStrikethrough = true;
      else if (code === "r") {
        currentColor = "#FFFFFF";
        isBold = false;
        isItalic = false;
        isUnderline = false;
        isStrikethrough = false;
      }
    } else if (match[2]) {
      const tag = match[2].slice(1, -1);
      if (miniMessageColors[tag]) currentColor = miniMessageColors[tag];
      else if (tag === "bold") isBold = true;
      else if (tag === "italic") isItalic = true;
      else if (tag === "underlined") isUnderline = true;
      else if (tag === "strikethrough") isStrikethrough = true;
      else if (tag === "reset") {
        currentColor = "#FFFFFF";
        isBold = false;
        isItalic = false;
        isUnderline = false;
        isStrikethrough = false;
      }
    } else if (match[3] || match[4] || match[5]) {
      const rawContent = match[3] || match[4] || match[5];
      const content =
        smallCaps && match[3] ? toSmallCapsUnicode(rawContent) : rawContent;
      const decoration =
        `${isUnderline ? "underline " : ""}${isStrikethrough ? "line-through" : ""}`.trim() ||
        "none";

      const style = useMinecraft
        ? {
            color: currentColor,
            fontFamily: MINECRAFT_FONT,
            fontWeight: isBold ? 700 : 400,
            fontStyle: isItalic ? "italic" : "normal",
            textDecoration: decoration,
          }
        : {
            color: currentColor,
            fontWeight: isBold ? "bold" : "normal",
            fontStyle: isItalic ? "italic" : "normal",
            textDecoration: decoration,
          };

      result.push(
        <span key={key++} style={style}>
          {content}
        </span>,
      );
    }
  }

  return result;
}

export const ColorPreview = memo(function ColorPreview({
  text,
  className = "",
  minecraftFont,
}) {
  if (!text) return null;
  return (
    <div
      className={`text-white bg-slate-900 p-2 rounded whitespace-pre-wrap ${minecraftFont ? "text-[11px] leading-snug" : "font-mono"} ${className}`}
    >
      {parseColorCodes(
        text,
        minecraftFont ? MINECRAFT_PARSE_OPTIONS : DEFAULT_PARSE_OPTIONS,
      )}
    </div>
  );
});
