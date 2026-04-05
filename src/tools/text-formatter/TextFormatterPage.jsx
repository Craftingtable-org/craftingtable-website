import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import EmojiPicker from "emoji-picker-react";
import {
  Bold,
  CaseSensitive,
  Copy,
  Italic,
  Palette,
  Smile,
  Strikethrough,
  Underline,
} from "lucide-react";
import { ToolPageHeader } from "@/layout/PageHeader";
import { PageTemplate } from "@/layout/PageTemplate";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { RichMinecraftPreview } from "@/tools/text-formatter/minecraftRichPreview.jsx";
import { PreviewFrame } from "@/tools/text-formatter/PreviewFrame";
import {
  applySmallCapsPreservingFormatting,
  legacyToMiniMessage,
  miniMessageToLegacy,
  normalizeAmpersandSection,
  stripMinecraftFormatting,
  wrapMiniMessageGradient,
  toSmallCapsUnicode,
} from "@/tools/text-formatter/transforms";

const LEGACY_PALETTE = [
  { code: "0", name: "Black", hex: "#000000" },
  { code: "1", name: "Dark blue", hex: "#0000AA" },
  { code: "2", name: "Dark green", hex: "#00AA00" },
  { code: "3", name: "Dark aqua", hex: "#00AAAA" },
  { code: "4", name: "Dark red", hex: "#AA0000" },
  { code: "5", name: "Dark purple", hex: "#AA00AA" },
  { code: "6", name: "Gold", hex: "#FFAA00" },
  { code: "7", name: "Gray", hex: "#AAAAAA" },
  { code: "8", name: "Dark gray", hex: "#555555" },
  { code: "9", name: "Blue", hex: "#5555FF" },
  { code: "a", name: "Green", hex: "#55FF55" },
  { code: "b", name: "Aqua", hex: "#55FFFF" },
  { code: "c", name: "Red", hex: "#FF5555" },
  { code: "d", name: "Light purple", hex: "#FF55FF" },
  { code: "e", name: "Yellow", hex: "#FFFF55" },
  { code: "f", name: "White", hex: "#FFFFFF" },
];

/** @param {string} raw */
function normalizeHexDigits(raw) {
  const t = String(raw ?? "")
    .trim()
    .replace(/^#/, "");
  if (/^[0-9A-Fa-f]{6}$/i.test(t)) return t.toUpperCase();
  if (/^[0-9A-Fa-f]{3}$/i.test(t)) {
    return t
      .split("")
      .map((c) => (c + c).toUpperCase())
      .join("");
  }
  return null;
}

function ToolbarSep({ className }) {
  return (
    <div
      className={cn(
        "mx-2 hidden min-h-[2rem] w-px shrink-0 self-stretch bg-border md:block",
        className,
      )}
      aria-hidden
      role="separator"
    />
  );
}

/**
 * @param {{ label: string, children: React.ReactNode, className?: string, contentClassName?: string, fillHeight?: boolean }} props
 * When `fillHeight` is true, the group stretches to match siblings in a row and content is vertically centered.
 */
function ToolbarGroup({
  label,
  children,
  className,
  contentClassName,
  fillHeight,
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-2 rounded-xl border border-border/60 bg-background/80 p-2.5 shadow-sm",
        fillHeight && "h-full min-h-0",
        className,
      )}
    >
      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div
        className={cn(
          "flex min-w-0 flex-wrap items-center gap-1",
          fillHeight && "min-h-0 flex-1 content-center items-center",
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

const PREVIEW_MODE_HINT = {
  chat: "Bottom-aligned strip, dark background — like in-game chat.",
  sign: "Four lines, high contrast on wood — good for short lines.",
  book: "Paged text, warm paper tone.",
  lore: "Italic, purple-tinted panel — item description lines.",
  item_name: "Centered, bold — yellow-style name bar.",
  plain: "No frame; system fonts only in this panel.",
};

function useTextareaInsert(value, setValue, ref) {
  const insert = useCallback(
    (snippet) => {
      const el = ref.current;
      const v = value;
      if (!el) {
        setValue(v + snippet);
        return;
      }
      const start = el.selectionStart ?? v.length;
      const end = el.selectionEnd ?? v.length;
      const next = v.slice(0, start) + snippet + v.slice(end);
      setValue(next);
      requestAnimationFrame(() => {
        try {
          el.focus();
          const pos = start + snippet.length;
          el.setSelectionRange(pos, pos);
        } catch {
          /* ignore */
        }
      });
    },
    [value, setValue, ref],
  );

  const replaceRange = useCallback(
    (start, end, text) => {
      const el = ref.current;
      const v = value;
      const next = v.slice(0, start) + text + v.slice(end);
      setValue(next);
      requestAnimationFrame(() => {
        try {
          el?.focus();
          const pos = start + text.length;
          el?.setSelectionRange(pos, pos);
        } catch {
          /* ignore */
        }
      });
    },
    [value, setValue, ref],
  );

  const withSelection = useCallback(
    (fn) => {
      const el = ref.current;
      if (!el) return;
      const start = el.selectionStart ?? 0;
      const end = el.selectionEnd ?? 0;
      const sel = value.slice(start, end);
      const next = fn(sel);
      replaceRange(start, end, next);
    },
    [value, replaceRange, ref],
  );

  const withAll = useCallback(
    (fn) => {
      setValue(fn(value));
    },
    [value, setValue],
  );

  return { insert, withSelection, withAll };
}

export function TextFormatterPage() {
  const taRef = useRef(/** @type {HTMLTextAreaElement | null} */ (null));
  const [text, setText] = useState(
    "&aHello &7— &fadd &lcolors &ror use &bMiniMessage &3<tags>&r.",
  );
  const [previewMode, setPreviewMode] = useState("chat");
  const [hexPick, setHexPick] = useState("#55ff55");
  const [gradFrom, setGradFrom] = useState("#ff5555");
  const [gradTo, setGradTo] = useState("#5555ff");
  const [convertKey, setConvertKey] = useState(0);
  const [clipboardStatus, setClipboardStatus] = useState(
    /** @type {null | "success" | "error"} */ (null),
  );
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [smallCapsInput, setSmallCapsInput] = useState("");
  const [smallCapsClipboardStatus, setSmallCapsClipboardStatus] = useState(
    /** @type {null | "success" | "error"} */ (null),
  );

  const smallCapsOutput = useMemo(
    () => toSmallCapsUnicode(smallCapsInput),
    [smallCapsInput],
  );

  useEffect(() => {
    if (!clipboardStatus) return;
    const t = window.setTimeout(() => setClipboardStatus(null), 2600);
    return () => window.clearTimeout(t);
  }, [clipboardStatus]);

  useEffect(() => {
    if (!smallCapsClipboardStatus) return;
    const t = window.setTimeout(() => setSmallCapsClipboardStatus(null), 2600);
    return () => window.clearTimeout(t);
  }, [smallCapsClipboardStatus]);

  const copySmallCaps = useCallback(() => {
    if (!smallCapsOutput) return;
    void navigator.clipboard
      .writeText(smallCapsOutput)
      .then(() => setSmallCapsClipboardStatus("success"))
      .catch(() => setSmallCapsClipboardStatus("error"));
  }, [smallCapsOutput]);

  const { insert, withSelection, withAll } = useTextareaInsert(
    text,
    setText,
    taRef,
  );

  const previewSource = useMemo(() => normalizeAmpersandSection(text), [text]);

  const copyEditor = useCallback(() => {
    void navigator.clipboard
      .writeText(text)
      .then(() => setClipboardStatus("success"))
      .catch(() => setClipboardStatus("error"));
  }, [text]);

  const hexValid = useMemo(
    () => normalizeHexDigits(hexPick) !== null,
    [hexPick],
  );

  const insertHexLiteral = useCallback(() => {
    const digits = normalizeHexDigits(hexPick);
    if (!digits) return;
    insert(`#${digits}`);
  }, [hexPick, insert]);

  const applyGradient = useCallback(
    (scopeAll) => {
      const run = (chunk) => wrapMiniMessageGradient(chunk, gradFrom, gradTo);
      if (scopeAll) withAll(run);
      else withSelection((s) => run(s || "Gradient text"));
    },
    [gradFrom, gradTo, withAll, withSelection],
  );

  const convertAllToMm = useCallback(() => {
    withAll((t) => legacyToMiniMessage(t));
  }, [withAll]);

  const convertAllToLegacy = useCallback(() => {
    withAll((t) => miniMessageToLegacy(t));
  }, [withAll]);

  const convertAllToPlain = useCallback(() => {
    withAll((t) => stripMinecraftFormatting(t));
  }, [withAll]);

  const smallCapsAll = useCallback(() => {
    withAll((t) => applySmallCapsPreservingFormatting(t));
  }, [withAll]);

  return (
    <PageTemplate
      header={
        <ToolPageHeader
          title="Text formatter"
          description="Minecraft-style rich text: legacy ampersand codes, MiniMessage tags, hex and gradients, plus live previews for chat, signs, books, and items."
          icon={<CaseSensitive className="h-6 w-6" aria-hidden />}
        />
      }
    >
      <div className="mx-auto flex w-full min-w-0 max-w-[1600px] flex-col gap-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:gap-10">
          <div className="min-w-0">
            <Card className="overflow-hidden rounded-2xl border-border/80 shadow-md ring-1 ring-border/40">
              <CardHeader className="space-y-2 border-b border-border/60 bg-muted/30 pb-4 pt-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold tracking-tight">
                      Editor
                    </CardTitle>
                    <CardDescription
                      id="tf-editor-desc"
                      className="max-w-xl text-sm leading-relaxed text-muted-foreground"
                    >
                      Use the toolbar to insert codes at the cursor. Legacy
                      colours use{" "}
                      <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">
                        &amp;a
                      </code>{" "}
                      style markers; pasted section-sign characters are
                      normalized to{" "}
                      <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">
                        &amp;
                      </code>
                      . MiniMessage uses tags such as{" "}
                      <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">
                        &lt;red&gt;
                      </code>
                      ,{" "}
                      <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">
                        &lt;#RRGGBB&gt;
                      </code>
                      , and{" "}
                      <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">
                        &lt;gradient:…&gt;
                      </code>
                      .
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <div className="border-b border-border/60 bg-muted/20">
                {/* Line 1 — Text style, legacy colours, hex */}
                <div
                  className="flex flex-col gap-3 p-3 md:flex-row md:flex-wrap md:items-stretch md:gap-3 lg:p-4"
                  role="toolbar"
                  aria-label="Insert formatting"
                >
                  <ToolbarGroup
                    fillHeight
                    label="Text style"
                    className="w-full shrink-0 md:w-auto md:min-w-[10.5rem]"
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 shrink-0"
                      onClick={() => insert("&l")}
                      title="Bold — inserts &amp;l"
                    >
                      <Bold className="h-4 w-4" aria-hidden />
                      <span className="sr-only">Bold</span>
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 shrink-0"
                      onClick={() => insert("&o")}
                      title="Italic — inserts &amp;o"
                    >
                      <Italic className="h-4 w-4" aria-hidden />
                      <span className="sr-only">Italic</span>
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 shrink-0"
                      onClick={() => insert("&n")}
                      title="Underline — inserts &amp;n"
                    >
                      <Underline className="h-4 w-4" aria-hidden />
                      <span className="sr-only">Underline</span>
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 shrink-0"
                      onClick={() => insert("&m")}
                      title="Strikethrough — inserts &amp;m"
                    >
                      <Strikethrough className="h-4 w-4" aria-hidden />
                      <span className="sr-only">Strikethrough</span>
                    </Button>
                  </ToolbarGroup>

                  <ToolbarSep className="hidden md:block" />

                  <ToolbarGroup
                    fillHeight
                    label="Colour (legacy)"
                    className="min-w-0 w-full md:max-w-[19rem] md:flex-1"
                  >
                    <div
                      className="grid w-full grid-cols-8 gap-1"
                      role="group"
                      aria-label="Legacy colour codes 0 through f"
                    >
                      {LEGACY_PALETTE.map(({ code, name, hex }) => (
                        <button
                          key={code}
                          type="button"
                          title={`${name} — insert &amp;${code}`}
                          onClick={() => insert(`&${code}`)}
                          className="h-7 w-7 shrink-0 rounded-md border border-black/25 shadow-sm ring-1 ring-black/10 transition hover:scale-105 hover:ring-2 hover:ring-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          style={{ backgroundColor: hex }}
                        >
                          <span className="sr-only">
                            {name}, code &amp;{code}
                          </span>
                        </button>
                      ))}
                    </div>
                  </ToolbarGroup>

                  <ToolbarSep className="hidden md:block" />

                  <ToolbarGroup
                    fillHeight
                    label="RGB / hex"
                    className="w-full shrink-0 md:w-auto md:min-w-[17rem]"
                  >
                    <Palette
                      className="h-4 w-4 shrink-0 text-muted-foreground"
                      aria-hidden
                    />
                    <input
                      type="color"
                      value={hexPick.length === 7 ? hexPick : "#ffffff"}
                      onChange={(e) => setHexPick(e.target.value)}
                      className="h-9 w-11 cursor-pointer rounded-md border border-border bg-background p-0.5"
                      aria-label="RGB colour picker — updates hex field"
                    />
                    <Input
                      value={hexPick}
                      onChange={(e) => setHexPick(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          insertHexLiteral();
                        }
                      }}
                      className="h-9 w-[6.25rem] font-mono text-xs"
                      placeholder="#RRGGBB"
                      aria-label="Hex colour value"
                      aria-invalid={hexPick.trim() !== "" && !hexValid}
                    />
                    <Button
                      type="button"
                      variant="default"
                      size="sm"
                      className="h-9 whitespace-nowrap px-3 text-xs font-medium"
                      onClick={insertHexLiteral}
                      disabled={!hexValid}
                      title={
                        hexValid
                          ? "Insert #RRGGBB at cursor (Enter)"
                          : "Enter a valid hex colour, e.g. #RRGGBB or #RGB"
                      }
                    >
                      Add HEX
                    </Button>
                  </ToolbarGroup>
                </div>

                {/* Line 2 — Gradient */}
                <div className="border-t border-border/40 px-3 pb-3 pt-2 md:px-4 md:pb-4">
                  <ToolbarGroup
                    label="Gradient (MiniMessage)"
                    className="w-full"
                    contentClassName="flex flex-wrap items-center gap-x-2 gap-y-2"
                  >
                    <span className="text-[11px] text-muted-foreground">
                      From
                    </span>
                    <input
                      type="color"
                      value={gradFrom.length === 7 ? gradFrom : "#ff5555"}
                      onChange={(e) => setGradFrom(e.target.value)}
                      className="h-9 w-11 cursor-pointer rounded-md border p-0.5"
                      aria-label="Gradient start colour"
                    />
                    <span className="text-[11px] text-muted-foreground">
                      to
                    </span>
                    <input
                      type="color"
                      value={gradTo.length === 7 ? gradTo : "#5555ff"}
                      onChange={(e) => setGradTo(e.target.value)}
                      className="h-9 w-11 cursor-pointer rounded-md border p-0.5"
                      aria-label="Gradient end colour"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="h-9 px-3 text-xs font-medium"
                      onClick={() => applyGradient(false)}
                      title="Wrap selected text in a gradient tag pair"
                    >
                      Wrap selection
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="h-9 px-3 text-xs font-medium"
                      onClick={() => applyGradient(true)}
                      title="Wrap the entire editor contents in a gradient"
                    >
                      Wrap all text
                    </Button>
                  </ToolbarGroup>
                </div>

                {/* Line 3 — Actions */}
                <div
                  className="border-t border-border/40 px-3 pb-3 pt-3 md:px-4 md:pb-4"
                  role="toolbar"
                  aria-label="Editor actions"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-3">
                    <ToolbarGroup
                      label="Tools & Clipboard"
                      className="min-w-0 w-full md:flex-1"
                      contentClassName="flex-row flex-wrap items-center gap-2"
                    >
                      <div className="relative">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-9 gap-2 border-border/80 bg-background px-3 text-xs font-medium"
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          title="Insert an emoji at the cursor"
                        >
                          <Smile
                            className="h-3.5 w-3.5 shrink-0 opacity-70"
                            aria-hidden
                          />
                          Emoji
                        </Button>
                        {showEmojiPicker && (
                          <div className="absolute bottom-[calc(100%+0.5rem)] left-0 z-50 md:bottom-auto md:top-[calc(100%+0.5rem)] shadow-xl">
                            <EmojiPicker
                              theme="dark"
                              onEmojiClick={(emojiData) => {
                                insert(emojiData.emoji);
                                setShowEmojiPicker(false);
                              }}
                            />
                          </div>
                        )}
                      </div>

                      <Button
                        type="button"
                        variant="default"
                        size="sm"
                        className="h-9 gap-2 px-4 text-xs font-semibold shadow-sm"
                        onClick={copyEditor}
                        title="Copy the editor text exactly as written, including formatting codes"
                      >
                        <Copy
                          className="h-3.5 w-3.5 shrink-0 opacity-70"
                          aria-hidden
                        />
                        Copy
                      </Button>

                      <div className="ml-1 min-w-[5rem]" aria-hidden="true">
                        {clipboardStatus === "success" ? (
                          <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                            Copied!
                          </p>
                        ) : clipboardStatus === "error" ? (
                          <p className="text-[11px] font-medium text-destructive">
                            Failed to copy.
                          </p>
                        ) : null}
                      </div>
                      <p className="mt-0.5 w-full text-[10px] leading-none text-muted-foreground">
                        Emoji inserts at cursor. Copy grabs full editor
                        contents.
                      </p>
                    </ToolbarGroup>

                    <ToolbarSep className="hidden md:block" />

                    <ToolbarGroup
                      label="Convert Format"
                      className="min-w-0 w-full md:w-[20rem] md:flex-none"
                      contentClassName="flex-col items-stretch gap-1.5"
                    >
                      <Label htmlFor="tf-conv" className="sr-only">
                        Convert entire editor
                      </Label>
                      <Select
                        key={convertKey}
                        defaultValue="_noop"
                        onValueChange={(v) => {
                          if (v === "_noop") return;
                          if (v === "all-mm") convertAllToMm();
                          else if (v === "all-legacy") convertAllToLegacy();
                          else if (v === "all-plain") convertAllToPlain();
                          else if (v === "all-sc") smallCapsAll();
                          setConvertKey((k) => k + 1);
                        }}
                      >
                        <SelectTrigger
                          id="tf-conv"
                          className="h-9 w-full min-w-0 max-w-none text-left text-xs"
                        >
                          <SelectValue placeholder="Choose an action..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="_noop">
                            Choose an action...
                          </SelectItem>
                          <SelectSeparator />
                          <SelectGroup>
                            <SelectLabel className="text-[11px]">
                              Change format
                            </SelectLabel>
                            <SelectItem value="all-mm">
                              To MiniMessage tags
                            </SelectItem>
                            <SelectItem value="all-legacy">
                              To legacy &amp; codes
                            </SelectItem>
                            <SelectItem value="all-plain">
                              To plain text (strip codes)
                            </SelectItem>
                          </SelectGroup>
                          <SelectSeparator />
                          <SelectGroup>
                            <SelectLabel className="text-[11px]">
                              Letter style
                            </SelectLabel>
                            <SelectItem value="all-sc">
                              To Unicode small caps
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <p className="text-[10px] leading-none text-muted-foreground">
                        Always applies to the full editor contents.
                      </p>
                    </ToolbarGroup>
                  </div>
                </div>
              </div>

              <div className="border-b border-border/60 bg-muted/10 px-4 py-2">
                <Label
                  htmlFor="tf-editor"
                  className="text-[11px] font-medium text-muted-foreground"
                >
                  Message content
                </Label>
              </div>
              <Textarea
                id="tf-editor"
                ref={taRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[min(52vh,24rem)] resize-y rounded-none border-0 bg-background px-4 py-4 font-mono text-sm leading-relaxed shadow-none placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-0"
                placeholder="Write your message here. Click toolbar buttons to insert codes at the cursor."
                spellCheck={false}
                aria-describedby="tf-editor-desc"
              />
            </Card>

            <Card className="mt-8 overflow-hidden rounded-2xl border-border/80 shadow-md ring-1 ring-border/40">
              <CardHeader className="space-y-1 border-b border-border/60 bg-muted/30 pb-4 pt-5">
                <CardTitle className="text-base font-semibold tracking-tight">
                  Text ➔ Small Caps Converter
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                  Convert regular text into ꜱᴍᴀʟʟ ᴄᴀᴘꜱ to easily paste into the
                  editor or in-game.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid divide-y border-border/60 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                  <div className="flex flex-col">
                    <div className="border-b border-border/60 bg-muted/10 px-4 py-2">
                      <Label
                        htmlFor="tf-sc-input"
                        className="text-[11px] font-medium text-muted-foreground"
                      >
                        Input text
                      </Label>
                    </div>
                    <Textarea
                      id="tf-sc-input"
                      value={smallCapsInput}
                      onChange={(e) => setSmallCapsInput(e.target.value)}
                      className="min-h-[140px] resize-none rounded-none border-0 bg-background px-4 py-4 font-mono text-sm leading-relaxed shadow-none placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-0"
                      placeholder="Type text here..."
                      spellCheck={false}
                    />
                  </div>
                  <div className="flex flex-col bg-muted/5">
                    <div className="flex items-center justify-between border-b border-border/60 bg-muted/10 px-4 py-2">
                      <Label
                        htmlFor="tf-sc-output"
                        className="text-[11px] font-medium text-muted-foreground"
                      >
                        Small Caps output
                      </Label>
                      <div className="flex items-center gap-2">
                        {smallCapsClipboardStatus === "success" && (
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
                            Copied.
                          </span>
                        )}
                        {smallCapsClipboardStatus === "error" && (
                          <span className="text-[10px] text-destructive">
                            Could not copy.
                          </span>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 gap-1 px-2 text-[10px] hover:bg-muted/50"
                          onClick={copySmallCaps}
                          disabled={!smallCapsOutput}
                        >
                          <Copy className="h-3 w-3 opacity-70" />
                          Copy
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      id="tf-sc-output"
                      value={smallCapsOutput}
                      readOnly
                      className="min-h-[140px] resize-none rounded-none border-0 bg-transparent px-4 py-4 font-mono text-sm leading-relaxed shadow-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-0"
                      placeholder="ꜱᴍᴀʟʟ ᴄᴀᴘꜱ ᴡɪʟʟ ᴀᴘᴘᴇᴀʀ ʜᴇʀᴇ..."
                      spellCheck={false}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="min-w-0 space-y-4 lg:sticky lg:top-4 lg:self-start">
            <Card className="rounded-2xl border-border/80 shadow-md ring-1 ring-border/40">
              <CardHeader className="space-y-1 border-b border-border/60 bg-muted/25 pb-4 pt-5">
                <CardTitle className="text-lg font-semibold tracking-tight">
                  Live preview
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  MiniMessage tags and legacy &amp; codes are both parsed.
                  Choose where it appears, then check the preview below; the
                  preview uses the bundled Minecraft-style font.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 pt-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="tf-preview-mode"
                    className="text-xs font-medium"
                  >
                    Where it appears in-game
                  </Label>
                  <Select value={previewMode} onValueChange={setPreviewMode}>
                    <SelectTrigger
                      id="tf-preview-mode"
                      className="h-10 rounded-xl text-sm"
                      aria-describedby="tf-preview-hint"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chat">Chat (hud line)</SelectItem>
                      <SelectItem value="sign">Sign (four lines)</SelectItem>
                      <SelectItem value="book">Written book page</SelectItem>
                      <SelectItem value="lore">Item lore</SelectItem>
                      <SelectItem value="item_name">
                        Item name (hotbar)
                      </SelectItem>
                      <SelectItem value="plain">Plain (no frame)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p
                    id="tf-preview-hint"
                    className="text-[11px] leading-snug text-muted-foreground"
                  >
                    {PREVIEW_MODE_HINT[previewMode] ?? ""}
                  </p>
                </div>

                <PreviewFrame mode={previewMode}>
                  {previewSource.trim() ? (
                    <RichMinecraftPreview text={previewSource} />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
                      <CaseSensitive
                        className="h-10 w-10 text-muted-foreground/40"
                        aria-hidden
                      />
                      <p className="max-w-[16rem] text-sm text-muted-foreground">
                        Start typing in the editor or paste text to see it here.
                      </p>
                    </div>
                  )}
                </PreviewFrame>

                <div className="space-y-1.5">
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    className="h-9 w-full gap-2 px-4 text-xs font-semibold shadow-sm sm:w-auto"
                    onClick={copyEditor}
                    title="Copy the editor text exactly as written, including formatting codes"
                  >
                    <Copy
                      className="h-3.5 w-3.5 shrink-0 opacity-70"
                      aria-hidden
                    />
                    Copy
                  </Button>
                  <div className="min-h-[1.25rem]" aria-live="polite">
                    {clipboardStatus === "success" ? (
                      <p
                        className="text-[11px] text-emerald-600 dark:text-emerald-400"
                        role="status"
                      >
                        Copied.
                      </p>
                    ) : clipboardStatus === "error" ? (
                      <p className="text-[11px] text-destructive" role="alert">
                        Could not copy. Check permissions or try again.
                      </p>
                    ) : null}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
