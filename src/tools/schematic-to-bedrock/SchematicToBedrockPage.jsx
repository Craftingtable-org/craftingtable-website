import { Box, TriangleAlert, Upload } from "lucide-react";
import { ToolPageHeader } from "@/layout/PageHeader";
import { PageTemplate } from "@/layout/PageTemplate";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SchematicToBedrockPage() {
  return (
    <PageTemplate
      header={
        <ToolPageHeader
          title="Schematic → Bedrock world"
          description="Convert Java .schem/.schematic files into a downloadable Bedrock .mcworld."
          icon={<Box className="h-6 w-6" aria-hidden />}
        />
      }
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div
          role="alert"
          className="flex gap-3 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-amber-950 shadow-sm ring-1 ring-amber-500/20 dark:bg-amber-500/10 dark:text-amber-50"
        >
          <TriangleAlert
            className="mt-0.5 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-200"
            aria-hidden
          />
          <div className="min-w-0 space-y-1">
            <p className="text-sm font-semibold leading-snug">
              This tool will not work yet
            </p>
            <p className="text-sm leading-relaxed text-amber-950/90 dark:text-amber-50/90">
              Conversion is disabled while the tool is under construction. The
              controls below show how the finished flow will look; uploads and
              downloads are not available.
            </p>
          </div>
        </div>

        <Card className="rounded-2xl border-border/80">
          <CardHeader>
            <CardTitle className="text-base">Upload schematic</CardTitle>
            <CardDescription>
              Java Sponge schematic (.schem) or legacy MCEdit schematic
              (.schematic). Max size depends on server limits when the tool is
              live.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative rounded-2xl border border-dashed border-border/80 bg-muted/30 p-1 ring-1 ring-border/40">
              <label
                className="flex min-h-[200px] cursor-not-allowed flex-col items-center justify-center gap-3 rounded-xl px-6 py-10 text-center opacity-60"
                aria-disabled="true"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground ring-1 ring-border/60">
                  <Upload className="h-6 w-6" aria-hidden />
                </span>
                <span className="text-sm font-medium text-foreground">
                  Drop a .schem or .schematic file here
                </span>
                <span className="text-xs text-muted-foreground">
                  Or choose a file — unavailable while under construction
                </span>
                <input
                  type="file"
                  accept=".schem,.schematic,application/gzip,application/x-schematic"
                  disabled
                  className="sr-only"
                  tabIndex={-1}
                />
              </label>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/80">
          <CardHeader>
            <CardTitle className="text-base">Conversion queue</CardTitle>
            <CardDescription>
              Jobs appear here with status and a download link when ready.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-border/60 bg-muted/20 px-4 py-8 text-center text-sm text-muted-foreground">
              No jobs in queue. When the tool is enabled, new uploads will show
              here with queued → processing → completed states.
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}
