import { cn } from "@/lib/utils";

/**
 * Standard page scaffold: optional fixed header region (titles, breadcrumbs) + scrollable body.
 * Sponsored placement lives in `ToolPageHeader` (inline with titles).
 *
 * @param {React.ReactNode} [header] — Breadcrumbs + tool title row (`ToolPageHeader`, max-w-[1480px])
 * @param {React.ReactNode} children — Main page content (may be full-bleed, e.g. wide grids)
 * @param {string} [className] — On outer wrapper (e.g. override `gap-*` if a page needs different header/body rhythm)
 */
export function PageTemplate({ header, children, className }) {
  return (
    <div
      className={cn(
        "flex w-full min-w-0 flex-1 flex-col gap-12",
        className,
      )}
    >
      <div className="shrink-0">{header}</div>
      <div className="min-h-0 w-full min-w-0 flex-1">{children}</div>
    </div>
  );
}
