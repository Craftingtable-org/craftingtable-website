import React, { useMemo } from "react";
import {
  MINECRAFT_PARSE_OPTIONS,
  parseColorCodes,
} from "@/tools/gui-editor/utils/colorCodes.jsx";
import { cn } from "@/lib/utils";
import { toSmallCapsUnicode } from "@/tools/text-formatter/transforms";

const NAMED_MM = {
  black: "#000000",
  dark_blue: "#0000AA",
  dark_green: "#00AA00",
  dark_aqua: "#00AAAA",
  dark_red: "#AA0000",
  dark_purple: "#AA00AA",
  gold: "#FFAA00",
  gray: "#AAAAAA",
  dark_gray: "#555555",
  blue: "#5555FF",
  green: "#55FF55",
  aqua: "#55FFFF",
  red: "#FF5555",
  light_purple: "#FF55FF",
  yellow: "#FFFF55",
  white: "#FFFFFF",
};

function normalizeColorToken(s) {
  const t = String(s).trim();
  if (!t) return "#FFFFFF";
  if (t.startsWith("#")) return t.length === 7 ? t : "#FFFFFF";
  const lower = t.toLowerCase();
  if (NAMED_MM[lower]) return NAMED_MM[lower];
  if (/^[0-9A-Fa-f]{6}$/.test(t)) return `#${t}`;
  return "#FFFFFF";
}

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  if (h.length !== 6) return null;
  const n = parseInt(h, 16);
  if (Number.isNaN(n)) return null;
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function lerpRgb(a, b, t) {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
}

function GradientChars({
  from,
  to,
  text,
  minecraftFont,
  smallCaps = false,
}) {
  const c1 = normalizeColorToken(from);
  const c2 = normalizeColorToken(to);
  const rgb1 = hexToRgb(c1);
  const rgb2 = hexToRgb(c2);
  const chars = text == null ? [] : [...String(text)];
  const n = Math.max(chars.length, 1);

  if (!rgb1 || !rgb2) {
    return (
      <span className="text-red-400">
        Invalid gradient ({String(from)} → {String(to)})
      </span>
    );
  }

  const fontClass = minecraftFont
    ? "text-[11px] leading-snug"
    : "font-sans text-sm";

  return (
    <span className={cn("inline", fontClass)}>
      {chars.map((ch, idx) => {
        const t = n === 1 ? 0 : idx / (n - 1);
        const rgb = lerpRgb(rgb1, rgb2, t);
        const color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
        return (
          <span
            key={idx}
            style={{
              color,
              fontFamily: minecraftFont
                ? "'Minecraft', 'Press Start 2P', ui-monospace, monospace"
                : undefined,
            }}
          >
            {ch === "\n" ? (
              <>
                <br />
              </>
            ) : (
              smallCaps ? toSmallCapsUnicode(ch) : ch
            )}
          </span>
        );
      })}
    </span>
  );
}

/**
 * Legacy + MiniMessage named tags + hex `<#RRGGBB>` (until next `<#` or `<reset>`).
 * Does not parse nested gradients inside plain segments (use outer split).
 */
function renderPlainSegment(text, minecraftFont, keyPrefix, smallCaps) {
  const opts = {
    ...(minecraftFont ? MINECRAFT_PARSE_OPTIONS : { font: "default" }),
    ...(smallCaps ? { smallCaps: true } : {}),
  };
  const nodes = [];
  let i = 0;
  let k = 0;
  const s = String(text);

  while (i < s.length) {
    const rest = s.slice(i);
    const hexMatch = rest.match(/^<#([0-9A-Fa-f]{6})>/);
    if (hexMatch) {
      i += hexMatch[0].length;
      const hex = hexMatch[1];
      const idxHash = s.indexOf("<#", i);
      const idxReset = s.indexOf("<reset>", i);
      const candidates = [idxHash, idxReset].filter((x) => x >= 0);
      const next = candidates.length ? Math.min(...candidates) : s.length;
      const segment = s.slice(i, next);
      nodes.push(
        <span
          key={`${keyPrefix}-h-${k++}`}
          style={{ color: `#${hex}` }}
          className="inline"
        >
          {parseColorCodes(segment, opts)}
        </span>,
      );
      i = next;
      if (s.slice(i, i + 7) === "<reset>") i += 7;
    } else {
      const idxHash = s.indexOf("<#", i);
      const end = idxHash === -1 ? s.length : idxHash;
      const chunk = s.slice(i, end);
      if (chunk) {
        nodes.push(
          <span key={`${keyPrefix}-p-${k++}`} className="inline">
            {parseColorCodes(chunk, opts)}
          </span>,
        );
      }
      if (end === i && i < s.length) {
        i += 1;
      } else {
        i = end;
      }
    }
  }

  return nodes;
}

const GRADIENT_RE =
  /<gradient:([^:]+):([^:]+)>([\s\S]*?)<\/gradient>/gi;

function splitByGradients(raw) {
  /** @type {{ type: string, text?: string, a?: string, b?: string, inner?: string }[]} */
  const parts = [];
  let last = 0;
  let m;
  const re = new RegExp(GRADIENT_RE.source, GRADIENT_RE.flags);
  while ((m = re.exec(raw)) !== null) {
    if (m.index > last) {
      parts.push({ type: "plain", text: raw.slice(last, m.index) });
    }
    parts.push({
      type: "gradient",
      a: m[1],
      b: m[2],
      inner: m[3],
    });
    last = m.index + m[0].length;
  }
  if (last < raw.length) parts.push({ type: "plain", text: raw.slice(last) });
  if (parts.length === 0) parts.push({ type: "plain", text: raw });
  return parts;
}

/**
 * @param {string} text
 * @param {{ minecraftFont?: boolean, smallCaps?: boolean }} opts
 */
export function RichMinecraftPreview({
  text,
  minecraftFont = true,
  smallCaps = false,
}) {
  const nodes = useMemo(() => {
    const raw = String(text ?? "").replace(/§/g, "&");
    if (!raw.trim()) return null;

    const parts = splitByGradients(raw);

    return parts.map((p, i) => {
      if (p.type === "gradient") {
        return (
          <GradientChars
            key={`g-${i}`}
            from={p.a}
            to={p.b}
            text={p.inner}
            minecraftFont={minecraftFont}
            smallCaps={smallCaps}
          />
        );
      }
      return (
        <React.Fragment key={`p-${i}`}>
          {renderPlainSegment(
            p.text,
            minecraftFont,
            `seg-${i}`,
            smallCaps,
          )}
        </React.Fragment>
      );
    });
  }, [text, minecraftFont, smallCaps]);

  return <>{nodes}</>;
}
