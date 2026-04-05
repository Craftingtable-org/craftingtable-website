import { sanitizeBbbTokenInput } from "@/lib/bbb/authorization";

/**
 * Browser-side client for BuiltByBit Ultimate API via same-origin `/api/bbb/*`
 * (Vite dev proxy or `server.mjs`). The API token stays server-side — never use VITE_* for tokens.
 *
 * Note: BuiltByBit often returns HTTP **400** (not 401) for missing/invalid auth, with
 * `result: "error"` and codes like `HeaderMissingError` — see `formatBbbApiError`.
 */

/**
 * @param {unknown} json
 * @param {number} [httpStatus]
 * @returns {string}
 */
function formatBbbApiError(json, httpStatus) {
  const err = json && typeof json === "object" ? json.error : null;
  const code = err && typeof err === "object" ? err.code : null;
  const message =
    err && typeof err === "object" && typeof err.message === "string"
      ? err.message
      : null;

  if (code === "HeaderMissingError") {
    return "No BuiltByBit API token was sent. Add BBB_API_TOKEN to your project .env (then restart the dev server) or paste your token in the thumbnail tester sidebar.";
  }
  if (code === "HeaderMalformedError") {
    return "BuiltByBit rejected the Authorization header. Paste the token exactly as shown on BuiltByBit (including the Private or Shared prefix).";
  }

  // BuiltByBit returns real reasons in `error.message` (e.g. 401 + TokenNotFoundError).
  // Never hide those behind a generic "access denied" line.
  if (message) {
    if (code === "TokenNotFoundError") {
      return `${message} Create or copy a current Ultimate API key from builtbybit.com/account/api and paste the full line (Private … or Shared …). If you only paste the secret, we send it as a Private key—add Shared yourself if your key uses that type.`;
    }
    return message;
  }

  if (httpStatus === 401 || httpStatus === 403) {
    return "BuiltByBit API access denied (HTTP " + httpStatus + "). Use a valid Ultimate API key from your BuiltByBit account, or set BBB_API_TOKEN in .env / paste the key in the thumbnail tester.";
  }

  if (typeof code === "string" && code) return code;
  if (httpStatus != null) {
    return `BuiltByBit API request failed (HTTP ${httpStatus}).`;
  }
  return "BuiltByBit API error.";
}

/**
 * @param {string} path API path starting with `/`, e.g. `/resources?page=1`
 * @param {{ token?: string | null }} [options] If `token` is set (including empty string), it wins over `localStorage` so pasted keys apply immediately.
 * @returns {Promise<unknown>}
 */
export async function bbbRequest(path, options = {}) {
  const url = path.startsWith("/api/bbb")
    ? path
    : `/api/bbb${path.startsWith("/") ? path : `/${path}`}`;

  const headers = { Accept: "application/json" };
  const fromStorage = localStorage.getItem("bbb_custom_token") ?? "";
  const explicit =
    options.token !== undefined && options.token !== null
      ? String(options.token)
      : null;
  let customToken = sanitizeBbbTokenInput(
    explicit !== null ? explicit : fromStorage,
  );
  if (customToken) {
    headers["x-bbb-token"] = customToken;
  }

  const res = await fetch(url, { headers });
  const text = await res.text();

  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    if (!res.ok) {
      throw new Error(
        res.status === 401 || res.status === 403
          ? formatBbbApiError({}, res.status)
          : `BuiltByBit API error (HTTP ${res.status}, non-JSON body).`,
      );
    }
    throw new Error(`BuiltByBit API returned non-JSON (${res.status})`);
  }

  if (!res.ok) {
    if (json?.result === "error") {
      throw new Error(formatBbbApiError(json, res.status));
    }
    throw new Error(formatBbbApiError(json, res.status));
  }

  if (json.result === "error") {
    throw new Error(formatBbbApiError(json, res.status));
  }
  if (json.result !== "success") {
    throw new Error("Unexpected BuiltByBit API response");
  }
  return json.data;
}
