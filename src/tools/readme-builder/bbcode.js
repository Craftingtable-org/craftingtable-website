/**
 * BBCode subset for resource READMEs — safe HTML preview, Markdown & plain export.
 */

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safeUrl(u) {
  const t = String(u).trim();
  if (!/^https?:\/\//i.test(t)) return "";
  try {
    const x = new URL(t);
    if (x.protocol !== "http:" && x.protocol !== "https:") return "";
    return x.href;
  } catch {
    return "";
  }
}

function runInlineTags(s) {
  let t = s;
  let prev;
  let n = 0;
  do {
    prev = t;
    t = t.replace(/\[b]([\s\S]*?)\[\/b]/gi, "<strong>$1</strong>");
    t = t.replace(/\[i]([\s\S]*?)\[\/i]/gi, "<em>$1</em>");
    t = t.replace(/\[u]([\s\S]*?)\[\/u]/gi, '<span style="text-decoration:underline">$1</span>');
    t = t.replace(/\[s]([\s\S]*?)\[\/s]/gi, "<del>$1</del>");
    t = t.replace(
      /\[color=([^\]]+)]([\s\S]*?)\[\/color]/gi,
      (_, c, inner) =>
        `<span style="color:${esc(c.trim())}">${inner}</span>`,
    );
    n++;
  } while (prev !== t && n < 24);
  return t;
}

/**
 * @param {string} input
 * @returns {string}
 */
export function bbcodeToHtml(input) {
  if (!input) return "";

  const codeHtml = [];
  let s = input.replace(/\[code\]([\s\S]*?)\[\/code\]/gi, (_, code) => {
    const i = codeHtml.length;
    codeHtml.push(
      `<pre class="my-3 overflow-x-auto rounded-lg border border-border/60 bg-muted p-3 text-sm leading-relaxed"><code>${esc(code)}</code></pre>`,
    );
    return `\n___C${i}___\n`;
  });

  s = s.replace(
    /\[url=([^\]]+)]([\s\S]*?)\[\/url\]/gi,
    (_, u, text) => {
      const href = safeUrl(u);
      if (!href) return esc(text);
      return `<a href="${esc(href)}" class="text-primary underline underline-offset-2" rel="noopener noreferrer">${runInlineTags(esc(text))}</a>`;
    },
  );
  s = s.replace(/\[url]([\s\S]*?)\[\/url\]/gi, (_, u) => {
    const href = safeUrl(u);
    if (!href) return esc(u);
    return `<a href="${esc(href)}" class="text-primary underline underline-offset-2" rel="noopener noreferrer">${esc(href)}</a>`;
  });

  s = s.replace(/\[img]([\s\S]*?)\[\/img\]/gi, (_, u) => {
    const href = safeUrl(u);
    if (!href) return "";
    return `<figure class="my-3"><img src="${esc(href)}" alt="" class="max-h-96 max-w-full rounded-lg border border-border/50 object-contain" loading="lazy" decoding="async" /></figure>`;
  });

  s = s.replace(
    /\[quote(?:=([^\]]+))?]([\s\S]*?)\[\/quote\]/gi,
    (_, who, inner) => {
      const head = who
        ? `<p class="mb-1 text-xs font-medium text-muted-foreground">${esc(who.trim())}</p>`
        : "";
      const body = runInlineTags(esc(inner)).replace(/\n/g, "<br/>");
      return `<blockquote class="my-3 border-l-4 border-primary/35 bg-muted/30 py-2 pl-4 pr-2">${head}${body}</blockquote>`;
    },
  );

  s = s.replace(/\[list]([\s\S]*?)\[\/list\]/gi, (_, inner) => {
    const items = inner.split(/\[\*\]/).filter((x) => x.trim());
    if (items.length === 0) return "";
    const lis = items
      .map((item) => {
        const line = runInlineTags(esc(item.trim())).replace(/\n/g, "<br/>");
        return `<li class="ml-1">${line}</li>`;
      })
      .join("");
    return `<ul class="my-3 list-disc space-y-1 pl-6">${lis}</ul>`;
  });

  s = s.replace(/\[h([1-3])]([\s\S]*?)\[\/h\1\]/gi, (_, n, inner) => {
    const cls =
      n === "1"
        ? "text-2xl font-bold mt-6 mb-2"
        : n === "2"
          ? "text-xl font-semibold mt-5 mb-2"
          : "text-lg font-semibold mt-4 mb-1";
    return `<h${n} class="${cls}">${runInlineTags(esc(inner))}</h${n}>`;
  });

  s = s.replace(
    /\[center]([\s\S]*?)\[\/center\]/gi,
    (_, inner) =>
      `<div class="my-2 text-center">${runInlineTags(esc(inner)).replace(/\n/g, "<br/>")}</div>`,
  );

  s = s.replace(/\[hr\]/gi, '<hr class="my-6 border-border" />');

  s = runInlineTags(s);

  codeHtml.forEach((block, i) => {
    s = s.replace(`___C${i}___`, block);
  });

  const chunks = s.split(/\n{2,}/);
  const out = chunks
    .map((chunk) => {
      const t = chunk.trim();
      if (!t) return "";
      if (
        t.startsWith("<blockquote") ||
        t.startsWith("<ul") ||
        t.startsWith("<h") ||
        t.startsWith("<figure") ||
        t.startsWith("<div") ||
        t.startsWith("<hr") ||
        t.startsWith("<pre")
      ) {
        return t;
      }
      return `<p class="my-2 leading-relaxed text-foreground">${t.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("");

  return `<div class="readme-bbcode max-w-none text-sm">${out}</div>`;
}

export function bbcodeToMarkdown(input) {
  if (!input) return "";
  let s = input;
  s = s.replace(/\[code\]([\s\S]*?)\[\/code\]/gi, (_, c) => "```\n" + c.trim() + "\n```\n\n");
  s = s.replace(/\[h([1-3])]([\s\S]*?)\[\/h\1\]/gi, (_, n, inner) => {
    const h = "#".repeat(Number(n));
    return `${h} ${inner.replace(/\[[^\]]+\]/g, "").trim()}\n\n`;
  });
  s = s.replace(/\[url=([^\]]+)]([\s\S]*?)\[\/url\]/gi, (_, u, text) => `[${text.replace(/\[\/?.+?\]/g, "")}](${u.trim()})`);
  s = s.replace(/\[url]([\s\S]*?)\[\/url\]/gi, (_, u) => `<${u.trim()}>`);
  s = s.replace(/\[img]([\s\S]*?)\[\/img\]/gi, (_, u) => `![](${u.trim()})`);
  s = s.replace(/\[quote(?:=[^\]]+)?]([\s\S]*?)\[\/quote\]/gi, (_, inner) => `> ${inner.replace(/\n/g, "\n> ")}\n\n`);
  s = s.replace(/\[list]([\s\S]*?)\[\/list\]/gi, (_, inner) => {
    const items = inner.split(/\[\*\]/).filter(Boolean);
    return items.map((x) => `- ${x.trim()}`).join("\n") + "\n\n";
  });
  s = s.replace(/\[center]([\s\S]*?)\[\/center\]/gi, (_, x) => x.trim() + "\n\n");
  s = s.replace(/\[hr\]/gi, "\n---\n\n");
  let prev;
  let g = 0;
  do {
    prev = s;
    s = s.replace(/\[b]([\s\S]*?)\[\/b\]/gi, "**$1**");
    s = s.replace(/\[i]([\s\S]*?)\[\/i\]/gi, "*$1*");
    g++;
  } while (prev !== s && g < 24);
  s = s.replace(/\[u]([\s\S]*?)\[\/u\]/gi, "$1");
  s = s.replace(/\[s]([\s\S]*?)\[\/s\]/gi, "~~$1~~");
  s = s.replace(/\[color=[^\]]+]([\s\S]*?)\[\/color\]/gi, "$1");
  return s.trim() + "\n";
}

export function bbcodeToPlainText(input) {
  if (!input) return "";
  let s = input;
  s = s.replace(/\[code\]([\s\S]*?)\[\/code\]/gi, "$1\n");
  s = s.replace(/\[[^\]]*]/g, "");
  s = s.replace(/\n{3,}/g, "\n\n");
  return s.trim();
}

export function insertBbcode(value, selectionStart, selectionEnd, before, after = "", placeholder = "") {
  const selected = value.slice(selectionStart, selectionEnd);
  const middle = selected || placeholder;
  const insert = before + middle + after;
  const next =
    value.slice(0, selectionStart) + insert + value.slice(selectionEnd);
  const selStart = selectionStart + before.length;
  const selEnd = selStart + middle.length;
  return { value: next, selectionStart: selStart, selectionEnd: selEnd };
}
