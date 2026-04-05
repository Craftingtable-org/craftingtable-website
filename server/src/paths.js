const path = require("path");

const TEMPLATE_PATH =
  process.env.VOID_WORLD_PATH ||
  path.join(__dirname, "../assets/void-world-bedrock.mcworld");

module.exports = { TEMPLATE_PATH };
