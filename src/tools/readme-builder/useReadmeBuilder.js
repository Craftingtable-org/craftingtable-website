import { useCallback, useEffect, useMemo, useState } from "react";
import {
  applyReadmeTemplate,
  markdownToBasicHtml,
  stripMarkdownToTxt,
} from "@/tools/readme-builder/applyTemplate";
import {
  bbcodeToHtml,
  bbcodeToMarkdown,
  bbcodeToPlainText,
} from "@/tools/readme-builder/bbcode";
import {
  DEFAULT_README_TEMPLATE,
  getReadmeBaseTemplateBody,
  looksLikeMarkdownTemplate,
  README_BASE_TEMPLATES,
} from "@/tools/readme-builder/defaultTemplate";
import {
  BUILTIN_PLACEHOLDER_DEFS,
  mergeCustomPlaceholderRowsFromBody,
} from "@/tools/readme-builder/placeholders";
import { PLUGIN_SNIPPET_IDS } from "@/tools/readme-builder/pluginSnippets";

const STORAGE_V2 = "readme_builder_state_v2";
const STORAGE_V1 = "readme_builder_state_v1";

function defaultValues() {
  /** @type {Record<string, string>} */
  const v = {};
  for (const def of BUILTIN_PLACEHOLDER_DEFS) {
    v[def.key] = "";
  }
  return v;
}

function defaultPluginState() {
  /** @type {Record<string, boolean>} */
  const o = {};
  for (const id of PLUGIN_SNIPPET_IDS) {
    o[id] = false;
  }
  return o;
}

function loadMergedState() {
  try {
    const v2 = localStorage.getItem(STORAGE_V2);
    if (v2) return JSON.parse(v2);
    const v1 = localStorage.getItem(STORAGE_V1);
    if (v1) {
      const o = JSON.parse(v1);
      const editorMode = looksLikeMarkdownTemplate(o.body)
        ? "markdown"
        : "bbcode";
      const next = { ...o, editorMode };
      localStorage.setItem(STORAGE_V2, JSON.stringify(next));
      return next;
    }
  } catch {
    /* ignore */
  }
  return null;
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useReadmeBuilder() {
  const initial = loadMergedState();

  const [editorMode, setEditorMode] = useState(
    () => initial?.editorMode ?? "bbcode",
  );
  const [body, setBody] = useState(
    () => initial?.body ?? DEFAULT_README_TEMPLATE,
  );
  const [values, setValues] = useState(() => ({
    ...defaultValues(),
    ...(initial?.values || {}),
  }));
  const [customPlaceholders, setCustomPlaceholders] = useState(
    initial?.customPlaceholders ?? [],
  );
  const [pluginEnabled, setPluginEnabled] = useState(() => ({
    ...defaultPluginState(),
    ...(initial?.pluginEnabled || {}),
  }));
  const [pluginGuideOverrides, setPluginGuideOverrides] = useState(
    () => initial?.pluginGuideOverrides ?? {},
  );
  const [savedTemplates, setSavedTemplates] = useState(
    initial?.savedTemplates ?? [],
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_V2,
        JSON.stringify({
          editorMode,
          body,
          values,
          customPlaceholders,
          pluginEnabled,
          pluginGuideOverrides,
          savedTemplates,
        }),
      );
    } catch {
      /* quota */
    }
  }, [
    editorMode,
    body,
    values,
    customPlaceholders,
    pluginEnabled,
    pluginGuideOverrides,
    savedTemplates,
  ]);

  const pluginFormat = editorMode === "markdown" ? "markdown" : "bbcode";

  const resolvedOutput = useMemo(
    () =>
      applyReadmeTemplate(body, values, customPlaceholders, pluginEnabled, {
        pluginFormat,
        pluginGuideOverrides,
      }),
    [body, values, customPlaceholders, pluginEnabled, pluginGuideOverrides, pluginFormat],
  );

  const previewHtml = useMemo(() => {
    if (editorMode === "markdown") {
      return markdownToBasicHtml(resolvedOutput);
    }
    return bbcodeToHtml(resolvedOutput);
  }, [editorMode, resolvedOutput]);

  const updateValue = useCallback((key, val) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  }, []);

  const saveCurrentTemplate = useCallback(
    (name) => {
      const trimmed = (name || "").trim() || "Untitled template";
      const mergedCustom = mergeCustomPlaceholderRowsFromBody(
        body,
        customPlaceholders,
      );
      setCustomPlaceholders(mergedCustom);
      const entry = {
        id: uid(),
        name: trimmed,
        editorMode,
        body,
        values: { ...values },
        customPlaceholders: mergedCustom,
        pluginEnabled: { ...pluginEnabled },
        pluginGuideOverrides: { ...pluginGuideOverrides },
      };
      setSavedTemplates((prev) => [...prev, entry]);
    },
    [
      editorMode,
      body,
      values,
      customPlaceholders,
      pluginEnabled,
      pluginGuideOverrides,
    ],
  );

  const loadTemplate = useCallback(
    (id) => {
      const t = savedTemplates.find((x) => x.id === id);
      if (!t) return;
      setEditorMode(t.editorMode ?? "bbcode");
      setBody(t.body);
      setValues({ ...defaultValues(), ...t.values });
      setCustomPlaceholders(t.customPlaceholders || []);
      setPluginEnabled({ ...defaultPluginState(), ...t.pluginEnabled });
      setPluginGuideOverrides(t.pluginGuideOverrides ?? {});
    },
    [savedTemplates],
  );

  const deleteTemplate = useCallback((id) => {
    setSavedTemplates((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const getTemplateExportPayload = useCallback(() => {
    const mergedCustom = mergeCustomPlaceholderRowsFromBody(
      body,
      customPlaceholders,
    );
    return {
      mergedCustom,
      json: JSON.stringify(
        {
          version: 2,
          editorMode,
          body,
          values,
          customPlaceholders: mergedCustom,
          pluginEnabled,
          pluginGuideOverrides,
        },
        null,
        2,
      ),
    };
  }, [
    editorMode,
    body,
    values,
    customPlaceholders,
    pluginEnabled,
    pluginGuideOverrides,
  ]);

  const exportTemplateJson = useCallback(
    () => getTemplateExportPayload().json,
    [getTemplateExportPayload],
  );

  const importTemplateJson = useCallback((jsonText) => {
    const data = JSON.parse(jsonText);
    if (data.editorMode === "markdown" || data.editorMode === "bbcode") {
      setEditorMode(data.editorMode);
    }
    const bodyStr = data.body != null ? String(data.body) : null;
    if (bodyStr != null) setBody(bodyStr);
    if (data.values && typeof data.values === "object") {
      setValues({ ...defaultValues(), ...data.values });
    }
    let nextCustom = Array.isArray(data.customPlaceholders)
      ? [...data.customPlaceholders]
      : [];
    if (bodyStr != null) {
      nextCustom = mergeCustomPlaceholderRowsFromBody(bodyStr, nextCustom);
    }
    setCustomPlaceholders(nextCustom);
    if (data.pluginEnabled && typeof data.pluginEnabled === "object") {
      setPluginEnabled({ ...defaultPluginState(), ...data.pluginEnabled });
    }
    if (data.pluginGuideOverrides && typeof data.pluginGuideOverrides === "object") {
      setPluginGuideOverrides(data.pluginGuideOverrides);
    } else {
      setPluginGuideOverrides({});
    }
  }, []);

  const importRawBody = useCallback((text) => {
    setBody(text);
    setEditorMode(looksLikeMarkdownTemplate(text) ? "markdown" : "bbcode");
    setCustomPlaceholders((prev) =>
      mergeCustomPlaceholderRowsFromBody(text, prev),
    );
  }, []);

  const downloadFile = useCallback((filename, content, mime) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const downloadMd = useCallback(() => {
    const title = (values.resource_title || "README").replace(
      /[^\w\s-]/g,
      "",
    );
    const content =
      editorMode === "markdown"
        ? resolvedOutput
        : bbcodeToMarkdown(resolvedOutput);
    downloadFile(
      `${title.trim() || "README"}.md`,
      content,
      "text/markdown;charset=utf-8",
    );
  }, [downloadFile, resolvedOutput, values.resource_title, editorMode]);

  const downloadTxt = useCallback(() => {
    const title = (values.resource_title || "README").replace(
      /[^\w\s-]/g,
      "",
    );
    const content =
      editorMode === "markdown"
        ? stripMarkdownToTxt(resolvedOutput)
        : bbcodeToPlainText(resolvedOutput);
    downloadFile(
      `${title.trim() || "README"}.txt`,
      content,
      "text/plain;charset=utf-8",
    );
  }, [downloadFile, resolvedOutput, values.resource_title, editorMode]);

  const downloadHtml = useCallback(() => {
    const title = values.resource_title?.trim() || "Resource README";
    const inner =
      editorMode === "markdown"
        ? markdownToBasicHtml(resolvedOutput)
        : bbcodeToHtml(resolvedOutput);
    const doc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escAttr(title)}</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 42rem; margin: 2rem auto; padding: 0 1rem; line-height: 1.65; color: #18181b; }
    code, pre { font-family: ui-monospace, monospace; font-size: 0.9em; }
    pre { background: #f4f4f5; padding: 1rem; border-radius: 8px; overflow-x: auto; }
    code { background: #f4f4f5; padding: 0.15em 0.35em; border-radius: 4px; }
    a { color: #2563eb; }
    h1 { font-size: 1.75rem; margin-top: 0; }
    h2 { font-size: 1.35rem; margin-top: 1.5em; }
    h3 { font-size: 1.1rem; margin-top: 1.25em; }
    img { max-width: 100%; height: auto; }
  </style>
</head>
<body>
${inner}
</body>
</html>`;
    const safe = (values.resource_title || "README").replace(/[^\w\s-]/g, "");
    downloadFile(
      `${safe.trim() || "README"}.html`,
      doc,
      "text/html;charset=utf-8",
    );
  }, [
    downloadFile,
    resolvedOutput,
    values.resource_title,
    editorMode,
  ]);

  const addCustomPlaceholder = useCallback(() => {
    setCustomPlaceholders((prev) => [...prev, { key: "", value: "" }]);
  }, []);

  const updateCustomPlaceholder = useCallback((index, field, val) => {
    setCustomPlaceholders((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: val } : row)),
    );
  }, []);

  const removeCustomPlaceholder = useCallback((index) => {
    setCustomPlaceholders((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const togglePlugin = useCallback((id) => {
    setPluginEnabled((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const updatePluginGuideOverride = useCallback((id, field, val) => {
    setPluginGuideOverrides((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: val },
    }));
  }, []);

  const clearPluginGuideOverride = useCallback((id) => {
    setPluginGuideOverrides((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const applyBaseTemplate = useCallback((templateId) => {
    const meta = README_BASE_TEMPLATES.find((t) => t.id === templateId);
    const label = meta?.label ?? "base template";
    if (
      !window.confirm(
        `Replace the current template with “${label}”? Your placeholder values and plugin checkboxes stay as they are.`,
      )
    ) {
      return;
    }
    const nextBody = getReadmeBaseTemplateBody(templateId);
    setBody(nextBody);
    setEditorMode("bbcode");
    setCustomPlaceholders((prev) =>
      mergeCustomPlaceholderRowsFromBody(nextBody, prev),
    );
  }, []);

  const downloadTemplateJson = useCallback(() => {
    const { mergedCustom, json } = getTemplateExportPayload();
    setCustomPlaceholders(mergedCustom);
    downloadFile(
      "readme-template.json",
      json,
      "application/json;charset=utf-8",
    );
  }, [downloadFile, getTemplateExportPayload]);

  return {
    editorMode,
    setEditorMode,
    body,
    setBody,
    values,
    updateValue,
    customPlaceholders,
    addCustomPlaceholder,
    updateCustomPlaceholder,
    removeCustomPlaceholder,
    pluginEnabled,
    togglePlugin,
    pluginGuideOverrides,
    updatePluginGuideOverride,
    clearPluginGuideOverride,
    resolvedOutput,
    previewHtml,
    savedTemplates,
    saveCurrentTemplate,
    loadTemplate,
    deleteTemplate,
    exportTemplateJson,
    importTemplateJson,
    importRawBody,
    downloadMd,
    downloadTxt,
    downloadHtml,
    downloadTemplateJson,
    downloadFile,
    applyBaseTemplate,
    baseTemplates: README_BASE_TEMPLATES,
  };
}

function escAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}
