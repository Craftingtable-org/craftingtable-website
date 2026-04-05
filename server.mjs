/**
 * Serves `dist/` and proxies `/api/bbb/*` → BuiltByBit Ultimate API with `BBB_API_TOKEN`
 * from the environment (never exposed to the browser). Run after `npm run build`.
 *
 * Usage: BBB_API_TOKEN=your_token node server.mjs
 * Or create a `.env` file in the project root (loaded automatically; do not commit it).
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { normalizeBbbAuthorizationValue } from "./src/lib/bbb/authorization.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "dist");
const UPSTREAM = "https://api.builtbybit.com/v1";
const PORT = Number(process.env.PORT || 8787);

loadEnvFile(path.join(process.cwd(), ".env"));

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const key = t.slice(0, i).trim();
    let val = t.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

function authorizationHeader(req) {
  const clientToken = req.headers["x-bbb-token"];
  let raw = clientToken
    ? clientToken.trim()
    : process.env.BBB_API_TOKEN?.trim();
  if (!raw) return null;
  return normalizeBbbAuthorizationValue(raw);
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".zip": "application/zip",
};

function sendFile(res, filePath) {
  const ext = path.extname(filePath);
  res.writeHead(200, {
    "Content-Type": MIME[ext] || "application/octet-stream",
  });
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer(async (req, res) => {
  const host = req.headers.host || "localhost";
  const url = new URL(req.url || "/", `http://${host}`);

  if (url.pathname.startsWith("/api/bbb")) {
    const auth = authorizationHeader(req);
    if (!auth) {
      res.writeHead(503, { "Content-Type": "application/json; charset=utf-8" });
      res.end(
        JSON.stringify({
          error: {
            message:
              "Set BBB_API_TOKEN in the server environment or .env (never in VITE_* or client code).",
          },
        }),
      );
      return;
    }

    const subPath = url.pathname.replace(/^\/api\/bbb/, "") || "/";
    const upstream = new URL(subPath + url.search, UPSTREAM);
    try {
      const r = await fetch(upstream, {
        headers: { Authorization: auth, Accept: "application/json" },
      });
      const body = await r.text();
      const ct = r.headers.get("content-type") || "application/json";
      /** Forward Retry-After so the client can back off (matches Ultimate API 429 behaviour). */
      const out = { "Content-Type": ct };
      const ra = r.headers.get("retry-after");
      if (ra) out["retry-after"] = ra;
      res.writeHead(r.status, out);
      res.end(body);
    } catch (e) {
      res.writeHead(502, { "Content-Type": "application/json; charset=utf-8" });
      res.end(
        JSON.stringify({
          error: { message: e instanceof Error ? e.message : String(e) },
        }),
      );
    }
    return;
  }

  let filePath = path.join(
    DIST,
    url.pathname === "/" ? "index.html" : url.pathname,
  );
  if (!filePath.startsWith(DIST)) {
    res.writeHead(403).end();
    return;
  }

  fs.stat(filePath, (err, st) => {
    if (!err && st.isFile()) {
      sendFile(res, filePath);
      return;
    }
    const fallback = path.join(DIST, "index.html");
    if (fs.existsSync(fallback)) {
      sendFile(res, fallback);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Run npm run build first.");
    }
  });
});

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}  (static + /api/bbb proxy)`);
});
