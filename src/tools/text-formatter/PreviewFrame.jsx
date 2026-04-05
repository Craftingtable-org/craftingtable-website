import React from "react";
import { cn } from "@/lib/utils";

/**
 * Visual shells mimicking Minecraft chat, sign, book, lore, item name, or plain text.
 */
export function PreviewFrame({ mode, children, className }) {
  switch (mode) {
    case "chat":
      return (
        <div
          className={cn(
            "relative flex min-h-[320px] flex-col justify-end rounded-xl border border-border/60 bg-gradient-to-b from-[#2b2b2b] to-[#1a1a1a] p-4 shadow-inner",
            className,
          )}
        >
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Chat (bottom)
          </p>
          <div className="min-h-[220px] flex-1 rounded-lg border border-black/40 bg-black/55 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="min-h-[180px] whitespace-pre-wrap text-[11px] leading-relaxed text-white [overflow-wrap:anywhere]">
              {children}
            </div>
          </div>
        </div>
      );
    case "sign":
      return (
        <div
          className={cn(
            "rounded-lg border-4 border-[#6B4423] bg-[#C6B08A] p-4 shadow-md",
            className,
          )}
        >
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-[#3d2914]">
            Sign (4 lines)
          </p>
          <div className="min-h-[11rem] whitespace-pre-wrap font-mono text-[13px] leading-snug text-[#1a1a1a] [overflow-wrap:anywhere]">
            {children}
          </div>
        </div>
      );
    case "book":
      return (
        <div
          className={cn(
            "rounded-lg border border-[#5c4033] bg-[#fbf5e5] p-5 shadow-md",
            className,
          )}
        >
          <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-[#5c4033]">
            Book page
          </p>
          <div className="min-h-[12rem] whitespace-pre-wrap text-sm leading-relaxed text-[#2c1810] [overflow-wrap:anywhere]">
            {children}
          </div>
        </div>
      );
    case "lore":
      return (
        <div
          className={cn(
            "rounded-lg border border-purple-900/40 bg-[#100818] p-4 shadow-inner",
            className,
          )}
        >
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-purple-300/80">
            Item lore
          </p>
          <div className="min-h-[10rem] whitespace-pre-wrap text-xs italic leading-relaxed [overflow-wrap:anywhere]">
            {children}
          </div>
        </div>
      );
    case "item_name":
      return (
        <div
          className={cn(
            "rounded-lg border border-yellow-900/30 bg-[#181008] px-4 py-6 text-center shadow-inner",
            className,
          )}
        >
          <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-yellow-600/80">
            Item name
          </p>
          <div className="min-h-[4rem] whitespace-pre-wrap text-[13px] font-bold leading-tight [overflow-wrap:anywhere]">
            {children}
          </div>
        </div>
      );
    case "plain":
    default:
      return (
        <div
          className={cn(
            "rounded-lg border border-border/60 bg-background p-4 shadow-sm",
            className,
          )}
        >
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Plain text
          </p>
          <div className="min-h-[14rem] whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground [overflow-wrap:anywhere]">
            {children}
          </div>
        </div>
      );
  }
}
