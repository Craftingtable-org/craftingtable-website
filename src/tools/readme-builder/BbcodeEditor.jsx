import {
  Bold,
  Code,
  Heading2,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  Minus,
  Quote,
  Strikethrough,
  Underline,
} from "lucide-react";
import { useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { insertBbcode } from "@/tools/readme-builder/bbcode";
import { MinimizableToolbarShell } from "@/tools/readme-builder/MinimizableToolbarShell";
import { cn } from "@/lib/utils";

function ToolbarBtn({ onClick, title, children, className }) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={cn("h-8 w-8 shrink-0 p-0", className)}
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

/**
 * @param {{ current: HTMLTextAreaElement | null }} textareaRef
 * @param {string} value
 * @param {(v: string) => void} onChange
 */
export function useBbcodeApply(textareaRef, value, onChange) {
  const apply = useCallback(
    (before, after = "", placeholder = "") => {
      const el = textareaRef.current;
      if (!el) return;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const { value: next, selectionStart, selectionEnd } = insertBbcode(
        value,
        start,
        end,
        before,
        after,
        placeholder,
      );
      onChange(next);
      requestAnimationFrame(() => {
        el.focus();
        el.setSelectionRange(selectionStart, selectionEnd);
      });
    },
    [value, onChange, textareaRef],
  );

  const promptInsert = useCallback(
    (build) => {
      const out = build();
      if (out == null) return;
      apply(out.before, out.after, out.placeholder);
    },
    [apply],
  );

  return { apply, promptInsert };
}

/**
 * @param {{
 *   textareaRef: React.RefObject<HTMLTextAreaElement | null>,
 *   value: string,
 *   onChange: (v: string) => void,
 *   className?: string,
 *   variant?: "horizontal" | "sidebar",
 *   unstyled?: boolean,
 * }} props
 */
export function BbcodeToolbar({
  textareaRef,
  value,
  onChange,
  className,
  variant = "horizontal",
  unstyled = false,
}) {
  const { apply, promptInsert } = useBbcodeApply(textareaRef, value, onChange);

  return (
    <div
      className={cn(
        variant === "sidebar"
          ? "flex min-w-0 max-w-full flex-col gap-1.5"
          : "flex min-w-0 max-w-full flex-wrap items-center gap-1 overflow-x-auto [scrollbar-width:thin]",
        !unstyled &&
          "rounded-xl border border-border/60 bg-card p-1.5 shadow-sm ring-1 ring-border/40",
        className,
      )}
      role="toolbar"
      aria-label="BBCode formatting"
    >
      <div
        className={cn(
          "flex flex-wrap items-center gap-1",
          variant === "sidebar" && "justify-start",
        )}
      >
        <ToolbarBtn title="Bold [b]" onClick={() => apply("[b]", "[/b]")}>
          <Bold className="h-4 w-4" aria-hidden />
        </ToolbarBtn>
        <ToolbarBtn title="Italic [i]" onClick={() => apply("[i]", "[/i]")}>
          <Italic className="h-4 w-4" aria-hidden />
        </ToolbarBtn>
        <ToolbarBtn title="Underline [u]" onClick={() => apply("[u]", "[/u]")}>
          <Underline className="h-4 w-4" aria-hidden />
        </ToolbarBtn>
        <ToolbarBtn title="Strikethrough [s]" onClick={() => apply("[s]", "[/s]")}>
          <Strikethrough className="h-4 w-4" aria-hidden />
        </ToolbarBtn>
      </div>
      <span
        className={cn(
          "bg-border",
          variant === "sidebar" ? "h-px w-full" : "mx-0.5 h-6 w-px",
        )}
        aria-hidden
      />
      <div className="flex flex-wrap items-center gap-1">
        <ToolbarBtn title="Heading [h2]" onClick={() => apply("[h2]", "[/h2]")}>
          <Heading2 className="h-4 w-4" aria-hidden />
        </ToolbarBtn>
        <ToolbarBtn
          title="Code [code]"
          onClick={() => apply("[code]", "[/code]", "yaml")}
        >
          <Code className="h-4 w-4" aria-hidden />
        </ToolbarBtn>
        <ToolbarBtn
          title="Quote [quote]"
          onClick={() => apply("[quote]", "[/quote]")}
        >
          <Quote className="h-4 w-4" aria-hidden />
        </ToolbarBtn>
        <ToolbarBtn
          title="Bullet list [list][*]…"
          onClick={() => apply("[list]\n[*]", "\n[/list]", "First item")}
        >
          <List className="h-4 w-4" aria-hidden />
        </ToolbarBtn>
        <ToolbarBtn title="Horizontal rule [hr]" onClick={() => apply("[hr]\n", "")}>
          <Minus className="h-4 w-4" aria-hidden />
        </ToolbarBtn>
      </div>
      <span
        className={cn(
          "bg-border",
          variant === "sidebar" ? "h-px w-full" : "mx-0.5 h-6 w-px",
        )}
        aria-hidden
      />
      <div className="flex flex-wrap items-center gap-1">
        <ToolbarBtn
          title="Link [url]"
          onClick={() =>
            promptInsert(() => {
              const url = window.prompt("Link URL (https://…)", "https://");
              if (!url || !url.trim()) return null;
              const safe = url.trim();
              const label = window.prompt("Link text (optional)", safe) || safe;
              return {
                before: `[url=${safe}]`,
                after: "[/url]",
                placeholder: label,
              };
            })
          }
        >
          <LinkIcon className="h-4 w-4" aria-hidden />
        </ToolbarBtn>
        <ToolbarBtn
          title="Image [img] (not used in .txt export)"
          onClick={() =>
            promptInsert(() => {
              const url = window.prompt("Image URL (https://…)", "https://");
              if (!url || !url.trim()) return null;
              return { before: "[img]", after: "[/img]", placeholder: url.trim() };
            })
          }
        >
          <ImageIcon className="h-4 w-4" aria-hidden />
        </ToolbarBtn>
      </div>
    </div>
  );
}

/**
 * @param {{
 *   value: string,
 *   onChange: (v: string) => void,
 *   className?: string,
 *   minHeight?: string,
 *   hideToolbar?: boolean,
 *   textareaRef?: React.RefObject<HTMLTextAreaElement | null>,
 * }} props
 */
export function BbcodeEditor({
  value,
  onChange,
  className,
  minHeight,
  hideToolbar = false,
  textareaRef: textareaRefProp,
}) {
  const internalRef = useRef(null);
  const taRef = textareaRefProp ?? internalRef;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {!hideToolbar ? (
        <MinimizableToolbarShell label="BBCode">
          <BbcodeToolbar
            textareaRef={taRef}
            value={value}
            onChange={onChange}
            variant="horizontal"
            unstyled
          />
        </MinimizableToolbarShell>
      ) : null}
      <Textarea
        ref={taRef}
        id="readme-body"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "min-h-[min(70vh,520px)] rounded-2xl font-mono text-sm leading-relaxed",
          minHeight,
        )}
        spellCheck={true}
        placeholder="Use the toolbar for BBCode, or type tags like [b]bold[/b], [img]https://…[/img]"
      />
    </div>
  );
}
