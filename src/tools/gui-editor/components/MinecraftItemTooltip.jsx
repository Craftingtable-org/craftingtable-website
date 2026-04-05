import { memo } from "react";
import {
  MINECRAFT_PARSE_OPTIONS,
  parseColorCodes,
} from "../utils/colorCodes.jsx";

/**
 * Vanilla-style item tooltip: dark purple panel, inset border, shadow.
 * Name and lore lines use legacy & color parsing (same as export).
 */
export const MinecraftItemTooltip = memo(function MinecraftItemTooltip({
  name,
  lore,
}) {
  const loreLines = lore
    ? lore.split(/\r?\n/).filter((line) => line.trim().length > 0)
    : [];
  const showName = Boolean(name?.trim());
  const showLore = loreLines.length > 0;

  if (!showName && !showLore) return null;

  return (
    <div
      className="ct-minecraft-item-tooltip pointer-events-none absolute bottom-full left-1/2 z-[60] mb-1.5 w-max max-w-[calc(100vw-1rem)] -translate-x-1/2 overflow-x-auto px-2.5 py-2 text-left text-[10px] leading-normal tracking-wide opacity-0 transition-opacity duration-100 group-hover:opacity-100"
      style={{
        background:
          "linear-gradient(180deg, rgba(16, 2, 24, 0.97) 0%, rgba(10, 0, 14, 0.99) 100%)",
        boxShadow:
          "inset 0 0 0 2px rgb(56, 36, 92), 0 4px 14px rgba(0,0,0,0.55), 0 0 1px rgba(255,255,255,0.08)",
      }}
      role="tooltip"
    >
      {showName ? (
        <div
          className="mb-1 whitespace-pre"
          style={{ textShadow: "1px 1px 0 #2a1a3a" }}
        >
          {parseColorCodes(name.trim(), MINECRAFT_PARSE_OPTIONS) ?? name.trim()}
        </div>
      ) : null}
      {showLore ? (
        <div className="flex flex-col gap-0.5">
          {loreLines.map((line, i) => (
            <div
              key={i}
              className="whitespace-pre"
              style={{ textShadow: "1px 1px 0 #1a1020" }}
            >
              {parseColorCodes(line, MINECRAFT_PARSE_OPTIONS) ?? line}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
});
