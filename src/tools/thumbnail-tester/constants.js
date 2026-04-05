import { BRAND_LOGO_PATH } from "@/lib/constants";

/** Max image size for thumbnail upload (file picker). */
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export const COVER_FALLBACK = BRAND_LOGO_PATH;

export const defaultVariant = () => ({
  title: "Your resource title",
  subtitle: "Your name or studio",
  price: "$5.00",
  description: "A short line or two about what this resource does.",
  imageUrl: "",
  objectUrl: "",
});
