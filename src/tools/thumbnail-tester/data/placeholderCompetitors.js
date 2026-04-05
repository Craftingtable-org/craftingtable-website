const prefixes = [
  "Nebula",
  "Arcane",
  "Velocity",
  "Dungeon",
  "Realm",
  "Frost",
  "Aether",
  "Skyblock",
  "Boss",
  "Mythic",
  "Questline",
  "Prism",
];
const suffixes = [
  "HUD Pack",
  "Crates Pro",
  "PvP Kit",
  "Loot FX",
  "Shop UI",
  "Assets",
  "Scoreboard",
  "Upgrade Set",
  "Bundle",
  "Essentials",
  "Core",
  "Suite",
];
const authorPool = [
  "ByteForge",
  "PixelNest",
  "Ardent Labs",
  "VoxLab",
  "Sertano",
  "IronMotive",
  "CraftNova",
  "Northbyte",
  "MintySoft",
  "CobaltWorks",
];
const tagPool = [
  "Gameplay",
  "Economy",
  "GUI",
  "Chat",
  "World",
  "Protection",
  "Survival",
  "Skyblock",
  "Factions",
  "Lifesteal",
  "Minigame",
  "Utility",
  "Config",
  "PvP",
];
const prices = [
  "Free",
  "$3.99",
  "$5.00",
  "$7.99",
  "$9.99",
  "$12.99",
  "$14.99",
  "$19.99",
  "$24.99",
];

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickUnique(list, count) {
  const pool = [...list];
  const result = [];
  for (let i = 0; i < count && pool.length; i += 1) {
    const idx = rand(0, pool.length - 1);
    result.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return result;
}

export function generatePlaceholderCompetitors(count = 18) {
  return Array.from({ length: count }, (_, index) => {
    const id = Math.floor(Math.random() * 1000000);
    const onSale = Math.random() < 0.45;
    const title = `${prefixes[rand(0, prefixes.length - 1)]} ${suffixes[rand(0, suffixes.length - 1)]}`;
    const tags = pickUnique(tagPool, rand(2, 4));
    const purchases = rand(25, 2500);

    return {
      id,
      title,
      url: `https://builtbybit.com/resources/${id}/`,
      tags,
      author: authorPool[rand(0, authorPool.length - 1)],
      category: tags[0],
      price: prices[rand(0, prices.length - 1)],
      originalPrice: onSale ? "$24.99" : null,
      salePercent: onSale ? [20, 25, 30, 35][rand(0, 3)] : null,
      featured: Math.random() < 0.25,
      rating: Number((4 + rand(0, 10) / 20).toFixed(1)),
      reviews: rand(8, 180),
      purchases,
      description:
        "Premium quality package tuned for modern Minecraft networks and storefront conversion.",
      image: `https://picsum.photos/seed/bbb-competitor-${id}/500`,
    };
  });
}

export const PLACEHOLDER_COMPETITORS = generatePlaceholderCompetitors(18);
