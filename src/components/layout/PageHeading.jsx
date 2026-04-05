import { cn } from "@/lib/utils";

/** Small pill label above the page title (e.g. “Craftingtable tools”) */
export function PageEyebrow({ children, className, icon: Icon }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/15",
        className
      )}
    >
      {Icon ? <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden /> : null}
      {children}
    </div>
  );
}

/** Primary page heading — use once per view */
export function PageTitle({ children, className }) {
  return (
    <h1
      className={cn(
        "text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl",
        className
      )}
    >
      {children}
    </h1>
  );
}

/** Supporting line under the title */
export function PageSubtitle({ children, className }) {
  return (
    <p
      className={cn(
        "max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg",
        className
      )}
    >
      {children}
    </p>
  );
}

/** Standard vertical rhythm for eyebrow + title + subtitle blocks */
export function PageHero({ children, className }) {
  return <div className={cn("space-y-4", className)}>{children}</div>;
}
