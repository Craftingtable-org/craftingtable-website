import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Header row with Minimize/Expand; hides children when collapsed.
 *
 * @param {{
 *   label: string,
 *   children: React.ReactNode,
 *   className?: string,
 *   defaultExpanded?: boolean,
 * }} props
 */
export function MinimizableToolbarShell({
  label,
  children,
  className,
  defaultExpanded = true,
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div
      className={cn(
        "min-w-0 max-w-full rounded-xl border border-border/60 bg-card text-card-foreground shadow-sm ring-1 ring-border/40",
        className,
      )}
    >
      <div className="flex min-w-0 items-center justify-between gap-2 border-b border-border/60 px-2 py-1.5">
        <span className="min-w-0 flex-1 truncate text-xs font-medium text-muted-foreground">
          {label}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 shrink-0 gap-1 px-2 text-xs whitespace-nowrap"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              <ChevronUp className="h-3.5 w-3.5" aria-hidden />
              Minimize
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5" aria-hidden />
              Expand
            </>
          )}
        </Button>
      </div>
      {expanded ? (
        <div className="flex min-w-0 max-w-full flex-col gap-0 p-2">
          {children}
        </div>
      ) : null}
    </div>
  );
}
