# Base Bedrock world

Place your **`void-world-bedrock.mcworld`** file in this directory (or set `VOID_WORLD_PATH` to an absolute path).

The conversion pipeline unzips this template, writes schematic blocks into its LevelDB `db/` folder, and re-zips as a downloadable `.mcworld`. Use a **void / flat** Bedrock world exported from the game or a tool you trust.

**Version note:** The server defaults to Prismarine registry `bedrock_1.19.1`. Your template should be compatible with that Bedrock format, or adjust `BEDROCK_REGISTRY` / `JAVA_VERSION` in the API environment.
