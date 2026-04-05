import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SponsoredSlot } from "@/components/SponsoredSlot";
import { PageSubtitle, PageTitle } from "@/components/layout/PageHeading";

/**
 * Shared page header: breadcrumbs + title row + sponsored slot.
 *
 * Uses the same width and right column as the thumbnail tester (`.market-content`
 * max 1480px, `.market-sidebar-toolbar` 300px) so the sponsor aligns with the tool
 * bar on every route.
 */
export function ToolPageHeader({
  title,
  description,
  icon,
  actions,
  crumbs,
}) {
  const items = crumbs ?? [{ label: "All tools", to: "/" }, { label: title }];

  return (
    <header className="w-full max-w-[1480px] space-y-8">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          {items.map((c, i) => (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1">
              {i > 0 ? (
                <ChevronRight
                  className="h-3.5 w-3.5 shrink-0 opacity-50"
                  aria-hidden
                />
              ) : null}
              {c.to ? (
                <Link
                  to={c.to}
                  className="rounded-md transition-colors hover:text-foreground"
                >
                  {c.label}
                </Link>
              ) : (
                <span className="font-medium text-foreground">{c.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-start lg:gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 gap-4">
            {icon ? (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm ring-1 ring-primary/10">
                {icon}
              </div>
            ) : null}
            <div className="min-w-0 space-y-4">
              <PageTitle>{title}</PageTitle>
              {description ? <PageSubtitle>{description}</PageSubtitle> : null}
            </div>
          </div>
          {actions ? (
            <div className="flex shrink-0 flex-wrap items-center gap-2 sm:pt-1">
              {actions}
            </div>
          ) : null}
        </div>
        <div className="flex w-full shrink-0 flex-col lg:w-[300px] lg:max-w-[300px]">
          <SponsoredSlot toolbarColumn />
        </div>
      </div>
    </header>
  );
}
