/**
 * Java .schematic / .schem → Bedrock .mcworld (requires native leveldb-zlib).
 *
 * Unmapped Java→Bedrock blocks use bedrock air (counted in stats.unmapped).
 * This is explicit policy — not silent substitution with arbitrary solids.
 */

const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const unzipper = require("unzipper");
const archiver = require("archiver");
const { Schematic } = require("prismarine-schematic");
const { Vec3 } = require("vec3");
const prismarineRegistry = require("prismarine-registry");
const prismarineBlock = require("prismarine-block");

const BEDROCK_FLAVOR = process.env.BEDROCK_REGISTRY || "bedrock_1.19.1";
const JAVA_FALLBACK = process.env.JAVA_VERSION || "1.20.4";
const MAX_AXIS =
  Number(process.env.MAX_SCHEMATIC_DIMENSION) || 512;
const MAX_VOLUME =
  Number(process.env.MAX_SCHEMATIC_BLOCKS) || 32_000_000;

function assertSchematicBounds(schematic) {
  const { x, y, z } = schematic.size;
  if (x > MAX_AXIS || y > MAX_AXIS || z > MAX_AXIS) {
    throw new Error(
      `Schematic exceeds max dimension (${MAX_AXIS} blocks per axis).`,
    );
  }
  const vol = x * y * z;
  if (vol > MAX_VOLUME) {
    throw new Error(
      `Schematic volume ${vol} blocks exceeds limit (${MAX_VOLUME}).`,
    );
  }
}

function loadLevelDb() {
  try {
    return require("leveldb-zlib");
  } catch (e) {
    throw new Error(
      "Native module leveldb-zlib could not be loaded. Install build deps (cmake, zlib) or run via Docker — see server/README.md",
    );
  }
}

function loadBedrockData() {
  return require("minecraft-data")(BEDROCK_FLAVOR);
}

function buildJavaLookupKey(block) {
  const name = block.name;
  const props = block.getProperties();
  const keys = Object.keys(props).sort();
  if (keys.length === 0) return `minecraft:${name}[]`;
  const inner = keys.map((k) => `${k}=${props[k]}`).join(",");
  return `minecraft:${name}[${inner}]`;
}

function buildJavaLookupKeyUnsorted(block) {
  const name = block.name;
  const props = block.getProperties();
  const entries = Object.entries(props);
  if (entries.length === 0) return `minecraft:${name}[]`;
  const inner = entries.map(([k, v]) => `${k}=${v}`).join(",");
  return `minecraft:${name}[${inner}]`;
}

function javaToBedrockString(javaBlock, j2b) {
  if (!javaBlock || javaBlock.name === "air") {
    return "minecraft:air[]";
  }
  for (const k of [
    buildJavaLookupKey(javaBlock),
    buildJavaLookupKeyUnsorted(javaBlock),
  ]) {
    if (j2b[k]) return j2b[k];
  }
  const short = `minecraft:${javaBlock.name}[]`;
  if (j2b[short]) return j2b[short];
  return null;
}

function bedrockStringToBlock(bedrockStr, BedrockBlock) {
  let s = bedrockStr.trim();
  if (s.startsWith("minecraft:")) s = s.slice("minecraft:".length);
  return BedrockBlock.fromString(s, 1);
}

async function unzipMcworld(mcworldPath, destDir) {
  await fs.mkdir(destDir, { recursive: true });
  await fs
    .createReadStream(mcworldPath)
    .pipe(unzipper.Extract({ path: destDir }))
    .promise();
}

async function zipMcworld(sourceDir, outPath) {
  await fs.rm(outPath, { force: true });
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outPath);
    const archive = archiver("zip", { zlib: { level: 6 } });
    output.on("close", resolve);
    archive.on("error", reject);
    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
  });
}

/**
 * @param {Buffer} schematicBuffer
 * @param {string} templateMcworldPath
 * @param {{ onProgress?: (n: number, total: number) => void }} [opts]
 */
async function convertSchematicToMcworld(schematicBuffer, templateMcworldPath, opts = {}) {
  const { LevelDB } = loadLevelDb();
  const { WorldProvider } = require("bedrock-provider");
  const bedrockRegistry = prismarineRegistry(BEDROCK_FLAVOR);
  const BedrockBlock = prismarineBlock(bedrockRegistry);
  const ChunkColumnFactory = require("prismarine-chunk")(bedrockRegistry);
  const j2b = loadBedrockData().blocksJ2B;

  const schematic = await Schematic.read(schematicBuffer, JAVA_FALLBACK);
  assertSchematicBounds(schematic);

  const pasteAt = new Vec3(
    Number(process.env.PASTE_X) || 0,
    Number(process.env.PASTE_Y) || 80,
    Number(process.env.PASTE_Z) || 0,
  );
  const start = schematic.start();

  /** @type {Map<string, Array<{ lx: number, wy: number, lz: number, block: any }>>} */
  const byChunk = new Map();

  let total = 0;
  let unmapped = 0;

  await schematic.forEach((javaBlock, pos) => {
    total += 1;
    const rel = pos.minus(start);
    const wx = pasteAt.x + rel.x;
    const wy = pasteAt.y + rel.y;
    const wz = pasteAt.z + rel.z;

    const cx = Math.floor(wx / 16);
    const cz = Math.floor(wz / 16);
    const lx = ((wx % 16) + 16) % 16;
    const lz = ((wz % 16) + 16) % 16;

    let bedrockStr = javaToBedrockString(javaBlock, j2b);
    if (!bedrockStr) {
      unmapped += 1;
      bedrockStr = "minecraft:air[]";
    }

    let block;
    try {
      block = bedrockStringToBlock(bedrockStr, BedrockBlock);
    } catch {
      unmapped += 1;
      block = BedrockBlock.fromStateId(
        bedrockRegistry.blocksByName.air.defaultState,
        1,
      );
    }

    const key = `${cx},${cz}`;
    if (!byChunk.has(key)) byChunk.set(key, []);
    byChunk.get(key).push({ lx, wy, lz, block });
  });

  const tmpRoot = await fs.mkdtemp(path.join(os.tmpdir(), "ct-schem-"));
  const worldDir = path.join(tmpRoot, "world");
  try {
    await unzipMcworld(templateMcworldPath, worldDir);
    const dbPath = path.join(worldDir, "db");
    if (!(await fs.pathExists(dbPath))) {
      throw new Error("Template is missing db/ — invalid Bedrock .mcworld.");
    }

    const db = new LevelDB(dbPath, { createIfMissing: false });
    await db.open();
    const world = new WorldProvider(db, { dimension: 0, registry: bedrockRegistry });

    let defaultChunkVersion = 40;
    const v0 = await world.getChunkVersion(0, 0);
    if (v0 && v0[0] != null) defaultChunkVersion = v0[0];

    let processed = 0;
    const nChunks = byChunk.size;

    for (const [key, sets] of byChunk) {
      const [cx, cz] = key.split(",").map(Number);
      processed += 1;
      if (opts.onProgress) opts.onProgress(processed, nChunks);

      let column = await world.load(cx, cz, true);
      if (!column) {
        column = new ChunkColumnFactory({
          x: cx,
          z: cz,
          chunkVersion: defaultChunkVersion,
        });
      }

      for (const { lx, wy, lz, block } of sets) {
        column.setBlock({ x: lx, y: wy, z: lz, l: 0 }, block);
      }
      await world.save(cx, cz, column);
    }

    await db.close();

    const outMcworld = path.join(tmpRoot, "out.mcworld");
    await zipMcworld(worldDir, outMcworld);

    return {
      outputPath: outMcworld,
      tmpRoot,
      stats: { total, unmapped, chunks: nChunks },
    };
  } catch (e) {
    await fs.remove(tmpRoot).catch(() => {});
    throw e;
  }
}

module.exports = {
  convertSchematicToMcworld,
  unzipMcworld,
  zipMcworld,
  assertSchematicBounds,
};
