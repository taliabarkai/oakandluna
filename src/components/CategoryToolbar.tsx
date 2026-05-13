"use client";

import { FilterSlidersIcon } from "./FilterSlidersIcon";
import styles from "./CategoryToolbar.module.css";

export type CategoryToolbarProps = {
  itemCountLabel?: string;
  filtersOpen?: boolean;
  filtersPanelId?: string;
  onOpenFilters?: () => void;
};

export function CategoryToolbar({
  itemCountLabel = "100 items",
  filtersOpen = false,
  filtersPanelId = "filters-sort-panel",
  onOpenFilters,
}: CategoryToolbarProps) {
  return (
    <div className={styles.bar} data-node-id="91:4991">
      <button
        type="button"
        className={styles.filterBtn}
        data-name="Hide Filters"
        aria-expanded={filtersOpen}
        aria-controls={filtersPanelId}
        onClick={() => onOpenFilters?.()}
      >
        <span className={styles.filterIcon} aria-hidden>
          <FilterSlidersIcon />
        </span>
        <span className={styles.filterLabel}>Filter / Sort</span>
      </button>
      <p className={styles.count} data-node-id="91:4994">
        {itemCountLabel}
      </p>
    </div>
  );
}
