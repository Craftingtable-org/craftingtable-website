import {
  Bookmark,
  CircleHelp,
  Download,
  FileText,
  Plus,
  RotateCcw,
  Trash2,
  Upload,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BbcodeEditor, BbcodeToolbar } from "@/tools/readme-builder/BbcodeEditor";
import { ToolPageHeader } from "@/layout/PageHeader";
import { PageTemplate } from "@/layout/PageTemplate";
import { cn } from "@/lib/utils";
import { BUILTIN_PLACEHOLDER_DEFS, placeholderHelpLines } from "@/tools/readme-builder/placeholders";
import {
  PLUGIN_SNIPPET_IDS,
  PLUGIN_SNIPPET_LABELS,
} from "@/tools/readme-builder/pluginSnippets";
import { useReadmeBuilder } from "@/tools/readme-builder/useReadmeBuilder";

/** Shared surface for mode switch, plugin toggles, and inset rows on this page */
const readmeToggleSurface =
  "rounded-xl border border-border/60 bg-card shadow-sm ring-1 ring-border/40";

/** Muted track + inset shadow — matches BBCode/Markdown and Template/Preview segments */
const readmeSegmentTrackClass =
  "mr-1 inline-flex w-full max-w-[min(100%,22rem)] min-w-0 shrink-0 rounded-xl border border-border/60 bg-muted p-1 shadow-[inset_0_1px_2px_rgba(15,23,42,0.08)] sm:w-auto sm:max-w-none dark:border-border/50 dark:bg-zinc-800 dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.22)]";

/** Raised active pill on muted track (shared by format + view toggles) */
function readmeSegmentClass(active) {
  return cn(
    "inline-flex h-8 min-w-[6.5rem] flex-1 items-center justify-center rounded-lg px-3 text-xs font-semibold tracking-wide transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    active
      ? "bg-card text-foreground shadow-sm ring-1 ring-border/60"
      : "text-muted-foreground hover:bg-card hover:text-foreground dark:hover:bg-zinc-700",
  );
}

function readmePluginLabelClass(checked) {
  return cn(
    "flex min-w-0 cursor-pointer items-start gap-2.5 px-3 py-2 text-xs font-medium transition-colors",
    readmeToggleSurface,
    checked
      ? "border-primary/40 bg-primary/5 text-foreground"
      : "text-muted-foreground hover:bg-muted/30 hover:text-foreground",
  );
}

const readmeActionBtn =
  "h-8 gap-1 rounded-lg px-3 text-xs font-medium";

const actionsBarClass =
  "min-w-0 max-w-full rounded-xl border border-border/60 bg-card text-card-foreground shadow-sm ring-1 ring-border/40";

/** Inset blocks inside Templates & export sidebar card */
const templatesPanelClass =
  "rounded-xl border border-border/50 bg-muted/40 p-3 shadow-sm ring-1 ring-border/25 dark:bg-zinc-900/45 dark:ring-border/35";

const templatesExportBtn =
  "h-auto min-h-[3.25rem] flex-col gap-1 rounded-lg py-2 text-xs font-semibold leading-none";

export function ReadmeBuilderPage() {
  const r = useReadmeBuilder();
  const [tab, setTab] = useState("edit");
  const [saveName, setSaveName] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);
  const [baseTemplateId, setBaseTemplateId] = useState("general");
  const fileImportRef = useRef(null);
  const infoWrapRef = useRef(null);
  const bbcodeTextareaRef = useRef(/** @type {HTMLTextAreaElement | null} */ (null));
  const infoButtonId = useId();
  const infoPanelId = useId();

  useEffect(() => {
    if (!infoOpen) return;
    const close = (e) => {
      if (
        infoWrapRef.current &&
        !infoWrapRef.current.contains(/** @type {Node} */ (e.target))
      ) {
        setInfoOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [infoOpen]);

  const handleImportFile = (e) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? "");
      if (f.name.toLowerCase().endsWith(".json")) {
        try {
          r.importTemplateJson(text);
        } catch {
          /* invalid json */
        }
      } else {
        r.importRawBody(text);
      }
    };
    reader.readAsText(f);
  };

  return (
    <PageTemplate
      header={
        <ToolPageHeader
          title="Resource README builder"
          description="BBCode editor with toolbar, placeholders, plugin guides, and exports. Pick a base template (general, plugins, builds, setups) and Apply base to load a starter README. Switch to Markdown for legacy # headings. Saved in your browser."
          icon={<FileText className="h-6 w-6" aria-hidden />}
        />
      }
    >
      <div className="ct-readme-page w-full min-w-0">
        <div className="mx-auto flex w-full min-w-0 max-w-[1480px] flex-col gap-6 px-0 py-6 sm:py-8 lg:flex-row lg:items-start lg:gap-8 lg:py-10">
        <div className="w-full min-w-0 flex-1 space-y-4">
          <div className={actionsBarClass}>
            <div className="flex min-w-0 max-w-full flex-col gap-0 p-3">
            <div className="flex min-w-0 w-full flex-wrap items-center gap-2 overflow-x-auto [scrollbar-width:thin]">
              <div className={readmeSegmentTrackClass} role="group" aria-label="Template format">
                <button
                  type="button"
                  className={readmeSegmentClass(r.editorMode === "bbcode")}
                  aria-pressed={r.editorMode === "bbcode"}
                  onClick={() => r.setEditorMode("bbcode")}
                >
                  BBCode
                </button>
                <button
                  type="button"
                  className={readmeSegmentClass(r.editorMode === "markdown")}
                  aria-pressed={r.editorMode === "markdown"}
                  onClick={() => r.setEditorMode("markdown")}
                >
                  Markdown
                </button>
              </div>
              <div className={readmeSegmentTrackClass} role="group" aria-label="Editor or preview">
                <button
                  type="button"
                  className={readmeSegmentClass(tab === "edit")}
                  aria-pressed={tab === "edit"}
                  onClick={() => setTab("edit")}
                >
                  Template
                </button>
                <button
                  type="button"
                  className={readmeSegmentClass(tab === "preview")}
                  aria-pressed={tab === "preview"}
                  onClick={() => setTab("preview")}
                >
                  Preview
                </button>
              </div>
              <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                <div
                  className={cn(
                    readmeSegmentTrackClass,
                    "w-[min(16rem,78vw)] sm:w-[17.5rem]",
                  )}
                >
                  <Select value={baseTemplateId} onValueChange={setBaseTemplateId}>
                    <SelectTrigger
                      className={cn(
                        "h-8 min-h-8 w-full rounded-lg border-0 bg-card px-3 py-0 text-xs font-semibold tracking-wide shadow-sm ring-1 ring-border/60",
                        "focus:ring-2 focus:ring-ring data-[placeholder]:text-muted-foreground",
                      )}
                      aria-label="Base template to apply"
                    >
                      <SelectValue placeholder="Base template" />
                    </SelectTrigger>
                    <SelectContent>
                      {r.baseTemplates.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className={readmeActionBtn}
                  onClick={() => r.applyBaseTemplate(baseTemplateId)}
                  title="Replace editor content with the selected starter"
                >
                  <RotateCcw className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  Apply base
                </Button>
              </div>
            </div>
            {r.editorMode === "bbcode" && tab === "edit" ? (
              <div className="min-w-0 mt-4 border-t border-border/50 pt-5">
                <BbcodeToolbar
                  textareaRef={bbcodeTextareaRef}
                  value={r.body}
                  onChange={r.setBody}
                  variant="horizontal"
                  unstyled
                />
              </div>
            ) : null}
            </div>
          </div>

          {tab === "edit" ? (
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Label
                  htmlFor="readme-body"
                  className="text-xs font-medium text-foreground"
                >
                  {r.editorMode === "bbcode"
                    ? "Template (BBCode)"
                    : "Template (Markdown)"}
                </Label>
                {r.editorMode === "bbcode" ? (
                  <p className="max-w-md text-xs text-muted-foreground">
                    Images and rich layout apply to Preview, Markdown, and HTML —
                    not to plain .txt.
                  </p>
                ) : null}
              </div>
              {r.editorMode === "bbcode" ? (
                <BbcodeEditor
                  value={r.body}
                  onChange={r.setBody}
                  hideToolbar
                  textareaRef={bbcodeTextareaRef}
                />
              ) : (
                <Textarea
                  id="readme-body"
                  value={r.body}
                  onChange={(e) => r.setBody(e.target.value)}
                  className="min-h-[min(70vh,520px)] rounded-2xl font-mono text-sm leading-relaxed"
                  spellCheck={true}
                />
              )}
            </div>
          ) : (
            <Card className="rounded-2xl border-border/80 shadow-sm ring-1 ring-border/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold tracking-tight">
                  Live preview
                </CardTitle>
                <CardDescription>
                  Resolved placeholders and plugin guides (
                  {r.editorMode === "bbcode" ? "BBCode → HTML" : "Markdown → HTML"}
                  ).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="max-h-[min(70vh,560px)] overflow-auto rounded-xl border border-border/60 bg-card p-4 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: r.previewHtml }}
                />
              </CardContent>
            </Card>
          )}
        </div>

        <aside className="flex w-full shrink-0 flex-col gap-4 lg:w-[300px] lg:max-w-[300px]">
          <Card className="rounded-2xl border-border/80 shadow-sm ring-1 ring-border/40">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-base font-semibold tracking-tight">
                    Placeholders
                  </CardTitle>
                  <CardDescription>
                    Values fill <code className="text-xs">{"{{…}}"}</code> in your
                    template.
                  </CardDescription>
                </div>
                <div className="relative shrink-0" ref={infoWrapRef}>
                  <button
                    type="button"
                    id={infoButtonId}
                    aria-expanded={infoOpen}
                    aria-controls={infoPanelId}
                    className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                    onClick={() => setInfoOpen((v) => !v)}
                    aria-label="Placeholder reference"
                  >
                    <CircleHelp className="h-5 w-5" aria-hidden />
                  </button>
                  {infoOpen ? (
                    <div
                      id={infoPanelId}
                      role="tooltip"
                      className="absolute right-0 top-full z-[100] mt-2 w-[min(100vw-2rem,22rem)] rounded-xl border border-border bg-card p-3 text-xs text-card-foreground shadow-xl ring-1 ring-border/80"
                    >
                      <p className="mb-2 font-semibold text-foreground">
                        Available placeholders
                      </p>
                      <ul className="max-h-64 space-y-1.5 overflow-y-auto text-muted-foreground">
                        {placeholderHelpLines().map((line) => (
                          <li key={line} className="leading-snug">
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {BUILTIN_PLACEHOLDER_DEFS.map((def) => (
                <div key={def.key} className="space-y-1">
                  <Label htmlFor={`ph-${def.key}`} className="text-xs">
                    {def.label}
                  </Label>
                  <Input
                    id={`ph-${def.key}`}
                    value={r.values[def.key] ?? ""}
                    placeholder={def.example}
                    onChange={(e) => r.updateValue(def.key, e.target.value)}
                    className="rounded-xl text-sm"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/80 shadow-sm ring-1 ring-border/40">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base font-semibold tracking-tight">
                  Custom placeholders
                </CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className={readmeActionBtn}
                  onClick={r.addCustomPlaceholder}
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden />
                  Add
                </Button>
              </div>
              <CardDescription>
                Use <code className="text-xs">{"{{your_key}}"}</code> in the
                template body (letters, numbers, underscores).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {r.customPlaceholders.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  No custom fields yet.
                </p>
              ) : null}
              {r.customPlaceholders.map((row, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex flex-col gap-2 p-3 sm:flex-row sm:items-end",
                    readmeToggleSurface,
                  )}
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <Label className="text-xs">Key</Label>
                    <Input
                      value={row.key}
                      placeholder="e.g. changelog_url"
                      onChange={(e) =>
                        r.updateCustomPlaceholder(i, "key", e.target.value)
                      }
                      className="rounded-lg font-mono text-sm"
                    />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <Label className="text-xs">Sample value</Label>
                    <Input
                      value={row.value}
                      placeholder="Filled in preview"
                      onChange={(e) =>
                        r.updateCustomPlaceholder(i, "value", e.target.value)
                      }
                      className="rounded-lg text-sm"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    onClick={() => r.removeCustomPlaceholder(i)}
                    aria-label="Remove"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/80 shadow-sm ring-1 ring-border/40">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold tracking-tight">
                Plugin edit guides
              </CardTitle>
              <CardDescription>
                Checked plugins append sections at{" "}
                <code className="text-xs">{"{{PLUGIN_GUIDES}}"}</code> in your
                template.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-2">
              {PLUGIN_SNIPPET_IDS.map((id) => (
                <label
                  key={id}
                  className={readmePluginLabelClass(!!r.pluginEnabled[id])}
                >
                  <input
                    type="checkbox"
                    checked={!!r.pluginEnabled[id]}
                    onChange={() => r.togglePlugin(id)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-input"
                  />
                  <span className="min-w-0 flex-1 break-words leading-snug">
                    {PLUGIN_SNIPPET_LABELS[id] || id}
                  </span>
                </label>
              ))}
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-2xl border-border/80 shadow-sm ring-1 ring-border/40">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold leading-tight tracking-tight">
                Templates &amp; export
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <section className={templatesPanelClass} aria-labelledby="readme-export-heading">
                <div className="mb-3 space-y-1">
                  <h4
                    id="readme-export-heading"
                    className="text-xs font-semibold tracking-tight text-foreground"
                  >
                    README for your page
                  </h4>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    Uses your template with placeholders filled in — same idea as
                    a SpigotMC resource description.
                  </p>
                </div>
                <div
                  className="grid grid-cols-3 gap-2"
                  role="group"
                  aria-label="Download README in a file format"
                >
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className={cn(readmeActionBtn, templatesExportBtn, "w-full")}
                    onClick={r.downloadMd}
                    title="Markdown (.md) — repos and editors"
                    aria-label="Download README as Markdown (.md)"
                  >
                    <Download className="h-4 w-4 shrink-0 opacity-85" aria-hidden />
                    <span>.md</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className={cn(readmeActionBtn, templatesExportBtn, "w-full")}
                    onClick={r.downloadTxt}
                    title="Plain text (.txt) — paste anywhere"
                    aria-label="Download README as plain text (.txt)"
                  >
                    <Download className="h-4 w-4 shrink-0 opacity-85" aria-hidden />
                    <span>.txt</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className={cn(readmeActionBtn, templatesExportBtn, "w-full")}
                    onClick={r.downloadHtml}
                    title="HTML (.html) — sites or rich paste"
                    aria-label="Download README as HTML (.html)"
                  >
                    <Download className="h-4 w-4 shrink-0 opacity-85" aria-hidden />
                    <span>.html</span>
                  </Button>
                </div>
              </section>

              <section
                className={templatesPanelClass}
                aria-labelledby="template-file-heading"
              >
                <div className="mb-3 space-y-1">
                  <h4
                    id="template-file-heading"
                    className="text-xs font-semibold tracking-tight text-foreground"
                  >
                    Template file
                  </h4>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    JSON stores your text, placeholders, and settings — share it
                    or reload it later.
                  </p>
                </div>
                <div
                  className="flex min-w-0 flex-col gap-1.5"
                  role="group"
                  aria-label="Template JSON backup"
                >
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className={cn(
                      "h-8 w-full min-w-0 justify-center gap-1.5 rounded-lg px-2.5 text-[11px] font-medium leading-none",
                    )}
                    onClick={r.downloadTemplateJson}
                    title="Download template as JSON"
                  >
                    <Download className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    <span className="truncate">Download JSON</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className={cn(
                      "h-8 w-full min-w-0 justify-center gap-1.5 rounded-lg px-2.5 text-[11px] font-medium leading-none",
                    )}
                    onClick={() => fileImportRef.current?.click()}
                    title="Import template from a JSON or text file"
                  >
                    <Upload className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    <span className="truncate">Import JSON</span>
                  </Button>
                  <input
                    ref={fileImportRef}
                    type="file"
                    accept=".json,.md,.txt,text/markdown,text/plain,application/json"
                    className="sr-only"
                    onChange={handleImportFile}
                  />
                </div>
              </section>

              <section
                className={templatesPanelClass}
                aria-labelledby="saved-local-heading"
              >
                <div className="mb-3 flex items-start gap-2">
                  <Bookmark
                    className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                    aria-hidden
                  />
                  <div className="min-w-0 space-y-1">
                    <h4
                      id="saved-local-heading"
                      className="text-xs font-semibold tracking-tight text-foreground"
                    >
                      Saved in this browser
                    </h4>
                    <p className="text-[11px] leading-relaxed text-muted-foreground">
                      Quick slots on this device — not synced to an account.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
                    <Input
                      value={saveName}
                      onChange={(e) => setSaveName(e.target.value)}
                      placeholder="e.g. Release post, Minimal"
                      className="min-h-9 flex-1 rounded-xl border-border/60 bg-background text-sm"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          r.saveCurrentTemplate(saveName);
                          setSaveName("");
                        }
                      }}
                      aria-label="Name for saved template"
                    />
                    <Button
                      type="button"
                      className={cn(
                        readmeActionBtn,
                        "min-h-9 w-full shrink-0 sm:w-auto sm:min-w-[5.5rem]",
                      )}
                      onClick={() => {
                        r.saveCurrentTemplate(saveName);
                        setSaveName("");
                      }}
                    >
                      Save
                    </Button>
                  </div>
                  {r.savedTemplates.length > 0 ? (
                    <ul className="space-y-1.5" role="list">
                      {r.savedTemplates.map((t) => (
                        <li key={t.id}>
                          <div
                            className={cn(
                              "flex items-center justify-between gap-2 rounded-lg border border-border/50 bg-card/80 px-2 py-2 text-sm shadow-sm transition-colors",
                              "hover:border-border hover:bg-muted/30",
                            )}
                          >
                            <button
                              type="button"
                              className="min-w-0 flex-1 truncate rounded-md px-1 text-left font-medium text-foreground hover:bg-muted/50 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              onClick={() => r.loadTemplate(t.id)}
                            >
                              {t.name}
                            </button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                              onClick={() => r.deleteTemplate(t.id)}
                              aria-label={`Delete ${t.name}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div
                      className="flex flex-col items-center rounded-lg border border-dashed border-border/60 bg-muted/25 px-3 py-7 text-center dark:bg-muted/15"
                      role="status"
                    >
                      <Bookmark className="mb-2 h-9 w-9 text-muted-foreground/45" aria-hidden />
                      <p className="text-xs font-medium text-foreground">
                        Nothing saved yet
                      </p>
                      <p className="mt-1 max-w-[16rem] text-[11px] leading-relaxed text-muted-foreground">
                        Add a name above and tap Save to store this template in
                        your browser.
                      </p>
                    </div>
                  )}
                </div>
              </section>
            </CardContent>
          </Card>
        </aside>
        </div>
      </div>
    </PageTemplate>
  );
}
