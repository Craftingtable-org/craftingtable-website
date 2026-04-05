import { Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";

/** Default: compact card on the right of a max-w-5xl row (legacy / unused in headers). */
const shellDefault =
  "flex min-h-[5rem] w-full shrink-0 flex-row items-center gap-3 rounded-2xl px-3.5 py-3 sm:ml-auto sm:w-auto sm:max-w-sm sm:self-start";

/** Full-width row: tool page toolbar column and app sidebar (same look as the default slot). */
const shellToolbarColumn =
  "flex min-h-[5rem] w-full shrink-0 flex-row items-center gap-3 self-start rounded-2xl px-3.5 py-3";

export function SponsoredSlot({ sponsor, className, toolbarColumn }) {
  const shell = toolbarColumn ? shellToolbarColumn : shellDefault;
  if (!sponsor) {
    return (
      <aside
        className={cn(
          shell,
          "border border-dashed border-primary/30 bg-primary/5 text-left shadow-sm",
          className,
        )}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Megaphone className="h-4 w-4" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold leading-snug text-foreground">
            Advertise here
          </p>
          <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground">
            Get in touch:{" "}
            <a
              href="mailto:hi@craftingtable.org"
              className="font-medium text-primary hover:underline"
            >
              hi@craftingtable.org
            </a>
          </p>
        </div>
      </aside>
    );
  }

  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        shell,
        "border border-primary/20 bg-card text-left shadow-sm transition-colors hover:border-primary/50 hover:bg-muted/50",
        className,
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Megaphone className="h-4 w-4" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold leading-tight text-primary">
          Sponsored
        </p>
        <p className="line-clamp-1 text-xs font-semibold leading-snug text-foreground">
          {sponsor.title}
        </p>
        {sponsor.description ? (
          <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-muted-foreground">
            {sponsor.description}
          </p>
        ) : null}
      </div>
    </a>
  );
}
