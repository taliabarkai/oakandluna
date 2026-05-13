/** Metal finishes for product card swatches (order matches design). */
export type ProductSwatchMetal = "silver" | "yellowGold" | "roseGold" | "whiteGold";

export const PRODUCT_SWATCH_SETS = {
  /** Silver, Yellow Gold */
  duo: ["silver", "yellowGold"] as readonly ProductSwatchMetal[],
  /** Silver, Rose Gold, Yellow Gold */
  trio: ["silver", "roseGold", "yellowGold"] as readonly ProductSwatchMetal[],
  /** Silver, Rose Gold, Yellow Gold, White Gold */
  quad: ["silver", "roseGold", "yellowGold", "whiteGold"] as readonly ProductSwatchMetal[],
} as const;

export const SWATCH_METAL: Record<
  ProductSwatchMetal,
  { fill: string; label: string }
> = {
  silver: { fill: "#cbcbcb", label: "Silver" },
  yellowGold: { fill: "#f2e6a1", label: "Yellow gold" },
  roseGold: { fill: "#f5ccb9", label: "Rose gold" },
  whiteGold: { fill: "#e7e7e7", label: "White gold" },
};
