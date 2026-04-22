import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { normalizeBbbAuthorizationValue } from "./src/lib/bbb/authorization.js";
import { handleStatsApi } from "./server/statsApi.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const bbbToken = env.BBB_API_TOKEN?.trim();
  const apiPort = env.VITE_API_PORT?.trim() || "3001";
  const apiTarget = `http://127.0.0.1:${apiPort}`;

  return {
    plugins: [
      react(),
      {
        name: "stats-api-dev",
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === "/api/stats") {
              handleStatsApi(req, res);
            } else {
              next();
            }
          });
        },
      },
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return;
            if (
              id.includes("react-dom") ||
              id.includes("/react/") ||
              id.includes("react-router")
            ) {
              return "react-vendor";
            }
            if (id.includes("@dnd-kit")) return "dnd-kit";
            if (id.includes("@radix-ui")) return "radix-ui";
            if (id.includes("lucide-react")) return "lucide";
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api/bbb": {
          target: "https://api.builtbybit.com",
          changeOrigin: true,
          rewrite: (p) => "/v1" + p.slice("/api/bbb".length),
          configure(proxy) {
            proxy.on("proxyReq", (proxyReq, req) => {
              const clientToken = req.headers["x-bbb-token"];
              const raw = clientToken ? clientToken.trim() : bbbToken;
              const auth = normalizeBbbAuthorizationValue(raw || "");
              if (auth) {
                proxyReq.setHeader("Authorization", auth);
              }
              proxyReq.setHeader("Accept", "application/json");
              proxyReq.removeHeader("x-bbb-token"); // don't send this upstream
            });
          },
        },
        "/api/jobs": {
          target: apiTarget,
          changeOrigin: true,
        },
        "/api/health": {
          target: apiTarget,
          changeOrigin: true,
        },
      },
    },
  };
});
