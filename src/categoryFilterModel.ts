import type { InscriptionCountKey } from "./components/FilterSortPanel";
import type { SortKey } from "./components/FilterSortPanel";

/** Demo-only: approximate how many PLP rows still match the current filter UI state. */
export function computeFilteredProductCount(
  total: number,
  sort: SortKey,
  materials: ReadonlySet<string>,
  inscription: InscriptionCountKey | null,
): number {
  let n = total;
  if (materials.size > 0) {
    n = Math.max(1, Math.floor(n * 0.92 ** materials.size));
  }
  if (inscription != null) {
    const byInscription: Record<InscriptionCountKey, number> = {
      "1": 0.72,
      "2": 0.55,
      "3": 0.42,
      "4": 0.32,
      "5plus": 0.24,
    };
    n = Math.max(1, Math.floor(n * byInscription[inscription]));
  }
  if (sort === "whatsNew") {
    n = Math.max(1, Math.floor(n * 0.88));
  }
  if (sort === "priceAsc" || sort === "priceDesc") {
    n = Math.max(1, n - 1);
  }
  return Math.min(total, Math.max(1, n));
}
