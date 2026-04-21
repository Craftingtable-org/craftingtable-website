import { bbbRequest } from "@/lib/bbb/client";

/**
 * @typedef {object} BasicResource
 * @property {number} resource_id
 * @property {number} author_id
 * @property {string} title
 * @property {string} tag_line
 * @property {number} price
 * @property {string} currency
 * @property {string} [cover_image_url]
 */

/**
 * @typedef {object} BbbGridCard
 * @property {string} id
 * @property {'bbb'} source
 * @property {string} title
 * @property {string} [url]
 * @property {string} author
 * @property {string} description
 * @property {string} price
 * @property {string} image
 * @property {string | null} originalPrice
 * @property {number | null} salePercent
 * @property {boolean} featured
 * @property {number | null} rating
 * @property {number | null} reviews
 * @property {number | null} purchases
 * @property {boolean} showMeta
 */

/**
 * @param {number} price
 * @param {string} currency
 */
export function formatBbbPrice(price, currency) {
  const n = Number(price);
  if (!Number.isFinite(n) || n <= 0) return "Free";
  const code = (currency || "USD").toUpperCase();
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: code,
    }).format(n);
  } catch {
    return `${code} ${n.toFixed(2)}`;
  }
}

/**
 * Load public marketplace resources and resolve author usernames.
 * @param {{ limit?: number, page?: number, token?: string | null }} [opts] `token` is sent as `x-bbb-token`.
 * @returns {Promise<BbbGridCard[]>}
 */
export async function loadMarketplaceCompetitors(opts = {}) {
  const limit = Math.min(Math.max(opts.limit ?? 17, 1), 20);
  const page = Math.max(1, Math.floor(opts.page ?? 1));
  const reqOpts = { token: opts.token };
  /** @type {BasicResource[]} */
  const raw = await bbbRequest(`/resources?page=${page}`, reqOpts);
  if (!Array.isArray(raw)) {
    throw new Error("Invalid resources list");
  }
  const slice = raw.slice(0, limit);

  const authorIds = [...new Set(slice.map((r) => r.author_id).filter(Boolean))];
  /** @type {Map<number, string>} */
  const usernames = new Map();
  for (const id of authorIds) {
    try {
      const member = await bbbRequest(`/members/${id}`, reqOpts);
      if (member && typeof member.username === "string") {
        usernames.set(id, member.username);
      }
    } catch {
      usernames.set(id, `Author #${id}`);
    }
    // Small delay to avoid triggering rate limits on rapid requests
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  return slice.map((r) => {
    const cover =
      r.cover_image_url ||
      /** @type {{ cover_image?: string }} */ (r).cover_image ||
      "";
    return {
      id: `bbb-resource-${r.resource_id}`,
      source: "bbb",
      title: r.title || "Untitled",
      url: `https://builtbybit.com/resources/${r.resource_id}/`,
      author: usernames.get(r.author_id) || `Author #${r.author_id}`,
      description: r.tag_line || "",
      price: formatBbbPrice(r.price, r.currency),
      image: cover,
      originalPrice: null,
      salePercent: null,
      featured: false,
      rating: null,
      reviews: null,
      purchases: null,
      showMeta: false,
    };
  });
}
