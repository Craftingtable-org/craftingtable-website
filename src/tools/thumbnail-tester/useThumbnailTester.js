import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { sanitizeBbbTokenInput } from "@/lib/bbb/authorization";
import { loadMarketplaceCompetitors } from "@/lib/bbb/resources";
import { PLACEHOLDER_COMPETITORS } from "@/tools/thumbnail-tester/data/placeholderCompetitors";
import {
  defaultVariant,
  MAX_IMAGE_BYTES,
} from "@/tools/thumbnail-tester/constants";

export function useThumbnailTester() {
  const [variantA, setVariantA] = useState(defaultVariant);
  const [variantB, setVariantB] = useState(() => ({
    ...defaultVariant(),
    title: "Second title (version B)",
    description: "Another blurb so you can compare A and B side by side.",
  }));
  const [abTest, setAbTest] = useState(false);
  const [editSide, setEditSide] = useState("a");
  const [previewSide, setPreviewSide] = useState("a");

  const [blurGrid, setBlurGrid] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [carouselMode, setCarouselMode] = useState(false);
  const [userInsertIndex, setUserInsertIndex] = useState(3);
  const [uploadError, setUploadError] = useState(null);
  const [gridCompetitors, setGridCompetitors] = useState(null);
  const [gridLoadError, setGridLoadError] = useState(null);

  const [apiKey, setApiKey] = useState(() =>
    sanitizeBbbTokenInput(localStorage.getItem("bbb_custom_token") || ""),
  );
  const [isLoadingGrid, setIsLoadingGrid] = useState(false);

  const fileInputARef = useRef(null);
  const fileInputBRef = useRef(null);
  const apiKeyRef = useRef(apiKey);
  apiKeyRef.current = apiKey;

  const fetchCompetitors = useCallback(async (page = 1) => {
    setIsLoadingGrid(true);
    setGridLoadError(null);
    try {
      const rows = await loadMarketplaceCompetitors({
        limit: 17,
        page,
        token: apiKeyRef.current,
      });
      setGridCompetitors(rows);
    } catch (e) {
      setGridCompetitors(null);
      setGridLoadError(e instanceof Error ? e.message : String(e));
    } finally {
      setIsLoadingGrid(false);
    }
  }, []);

  /** Avoid calling BuiltByBit without a token — that spams 401s in dev. Server-side BBB_API_TOKEN is applied on fetch; we only auto-load when a browser token exists (returning users). */
  useEffect(() => {
    const token = localStorage.getItem("bbb_custom_token")?.trim();
    if (token) {
      fetchCompetitors(1);
    }
  }, [fetchCompetitors]);

  const handleApiKeyChange = (val) => {
    const cleaned = sanitizeBbbTokenInput(val);
    setApiKey(cleaned);
    if (cleaned) {
      localStorage.setItem("bbb_custom_token", cleaned);
    } else {
      localStorage.removeItem("bbb_custom_token");
    }
  };

  const editing = abTest && editSide === "b" ? variantB : variantA;
  const setEditing = (patch) => {
    if (!abTest || editSide === "a") {
      setVariantA((v) => ({ ...v, ...patch }));
    } else {
      setVariantB((v) => ({ ...v, ...patch }));
    }
  };

  useEffect(() => {
    setUploadError(null);
  }, [editSide, abTest]);

  const previewVariant = !abTest || previewSide === "a" ? variantA : variantB;

  const competitorPool =
    gridCompetitors != null && gridCompetitors.length > 0
      ? gridCompetitors
      : PLACEHOLDER_COMPETITORS;

  useEffect(() => {
    setUserInsertIndex((i) =>
      Math.min(i, Math.max(0, competitorPool.length - 1)),
    );
  }, [competitorPool.length]);

  const cards = useMemo(() => {
    const userCard = {
      id: "user-resource",
      title: previewVariant.title.trim() || "Your Resource Name",
      url: "#",
      category: "Plugin",
      price: previewVariant.price.trim() || "$5.00",
      originalPrice: "$14.99",
      salePercent: 30,
      featured: false,
      author: previewVariant.subtitle.trim() || "Your Brand",
      description:
        previewVariant.description.trim() ||
        "Your short resource pitch appears here.",
      rating: 4.8,
      image:
        previewVariant.imageUrl ||
        "https://picsum.photos/seed/your-resource/500",
      showMeta: true,
    };

    const merged = [...competitorPool];
    if (merged.length === 0) {
      return [userCard];
    }
    const slot = Math.min(Math.max(0, userInsertIndex), merged.length - 1);
    merged.splice(slot, 1, userCard);
    return merged;
  }, [previewVariant, userInsertIndex, competitorPool]);

  /** @param {"a" | "b"} targetSide */
  function processImageFile(file, targetSide) {
    if (!file.type.startsWith("image/")) {
      setUploadError("Use an image file (PNG, JPG, WebP, GIF, …).");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setUploadError("Images must be 5 MB or smaller.");
      return;
    }

    setUploadError(null);
    const side = abTest ? targetSide : "a";
    const nextUrl = URL.createObjectURL(file);

    if (side === "a") {
      setVariantA((v) => {
        if (v.objectUrl) URL.revokeObjectURL(v.objectUrl);
        return { ...v, objectUrl: nextUrl, imageUrl: nextUrl };
      });
    } else {
      setVariantB((v) => {
        if (v.objectUrl) URL.revokeObjectURL(v.objectUrl);
        return { ...v, objectUrl: nextUrl, imageUrl: nextUrl };
      });
    }
  }

  function handleImageInputChange(event, targetSide) {
    const file = event.target.files?.[0];
    if (file) processImageFile(file, targetSide);
    event.target.value = "";
  }

  function randomizeUserPosition() {
    const nextIndex = Math.floor(Math.random() * competitorPool.length);
    setUserInsertIndex(nextIndex);
  }

  function onAbTestChange(v) {
    setAbTest(v);
    if (!v) {
      setPreviewSide("a");
      setEditSide("a");
    }
  }

  return {
    variantA,
    variantB,
    abTest,
    onAbTestChange,
    editSide,
    setEditSide,
    previewSide,
    setPreviewSide,
    blurGrid,
    setBlurGrid,
    darkMode,
    setDarkMode,
    carouselMode,
    setCarouselMode,
    userInsertIndex,
    uploadError,
    gridLoadError,
    apiKey,
    handleApiKeyChange,
    fetchCompetitors,
    isLoadingGrid,
    fileInputARef,
    fileInputBRef,
    editing,
    setEditing,
    cards,
    competitorPool,
    handleImageInputChange,
    randomizeUserPosition,
  };
}
