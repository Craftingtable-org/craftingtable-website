# Schematic → Bedrock API

Fastify server with:

- **Redis + BullMQ** when `REDIS_URL` is set (recommended for production and `docker compose`).
- **In-memory FIFO** when `REDIS_URL` is omitted (simple local dev).

Worker **concurrency: 1** so conversions do not run in parallel.

## Requirements

- **`void-world-bedrock.mcworld`** at `assets/void-world-bedrock.mcworld` (or `VOID_WORLD_PATH`).
- **`leveldb-zlib`** (native). Use **Docker** if the addon does not build on your host (cmake + zlib).

## Run locally

```bash
cd server && npm install && npm run dev
```

Without Redis, the API uses the in-memory queue. `GET /api/health` reports `queue: "memory"` or `"redis+bullmq"`.

## Docker (Redis + API + native LevelDB build)

Place `void-world-bedrock.mcworld` in `server/assets/`, then:

```bash
docker compose up --build
```

Services: **redis** (port 6379) and **api** (3001) with `REDIS_URL=redis://redis:6379`.

## Environment

See `server/.env.example`. Notable variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `REDIS_URL` | _(empty)_ | If set, enables BullMQ global queue |
| `PORT` | `3001` | HTTP port |
| `VOID_WORLD_PATH` | `server/assets/void-world-bedrock.mcworld` | Template `.mcworld` |
| `MAX_UPLOAD_MB` | `32` | Upload limit |
| `JOB_TTL_MS` | `45m` | In-memory backend: completed job cleanup |
| `MAX_SCHEMATIC_DIMENSION` | `512` | Max width/height/depth |
| `MAX_SCHEMATIC_BLOCKS` | `32000000` | Max schematic volume |
| `BEDROCK_REGISTRY` | `bedrock_1.19.1` | Prismarine registry id |
| `JAVA_VERSION` | `1.20.4` | PC version for schematic parsing |
| `PASTE_X` / `PASTE_Y` / `PASTE_Z` | `0` / `80` / `0` | Paste origin in Bedrock world |

## API

- `POST /api/jobs` — multipart field `file` (`.schem` / `.schematic`) → `{ jobId }`
- `GET /api/jobs/:id` — `{ status, queuePosition?, error?, progress?, stats? }`
- `GET /api/jobs/:id/download` — `.mcworld` when completed; **410** if the output file was removed or expired
