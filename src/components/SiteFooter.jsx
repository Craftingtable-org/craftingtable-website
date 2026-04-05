export function SiteFooter() {
  return (
    <footer className="ct-footer border-t border-border/60 bg-background/80 px-6 py-8 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl space-y-2 text-center">
        <p className="text-xs leading-relaxed text-muted-foreground">
          Craftingtable is an independent project and is not affiliated with, endorsed by, or
          sponsored by BuiltByBit.
        </p>
        <p className="text-xs text-muted-foreground">
          Questions?{" "}
          <a
            href="mailto:hi@craftingtable.org"
            className="font-medium text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
          >
            hi@craftingtable.org
          </a>
        </p>
      </div>
    </footer>
  );
}
