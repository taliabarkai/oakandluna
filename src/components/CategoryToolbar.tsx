"use client";

import { useId } from "react";
import { FilterSlidersIcon } from "./FilterSlidersIcon";
import type { DesktopFilterSlideVariant } from "./FilterSortPanel";
import styles from "./CategoryToolbar.module.css";

export type CategoryToolbarProps = {
  itemCountLabel?: string;
  filtersOpen?: boolean;
  filtersPanelId?: string;
  onOpenFilters?: () => void;
  /** Desktop-only: compare top / left / right slide-in for the filter panel. */
  desktopFilterSlide?: DesktopFilterSlideVariant;
  onDesktopFilterSlideChange?: (variant: DesktopFilterSlideVariant) => void;
};

export function CategoryToolbar({
  itemCountLabel = "100 items",
  filtersOpen = false,
  filtersPanelId = "filters-sort-panel",
  onOpenFilters,
  desktopFilterSlide = "top",
  onDesktopFilterSlideChange,
}: CategoryToolbarProps) {
  const slideDemoLabelId = useId();
  return (
    <div className={styles.bar} data-node-id="91:4991">
      <div className={styles.barStart}>
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
        {onDesktopFilterSlideChange ? (
          <div
            className={styles.desktopSlideDemo}
            role="group"
            aria-label="Desktop filter panel: slide from top, left, or right (demo)"
          >
            <span className={styles.desktopSlideDemoLabel} id={slideDemoLabelId}>
              Panel
            </span>
            <div className={styles.desktopSlideDemoPills} role="none">
              <button
                type="button"
                className={styles.desktopSlidePill}
                aria-pressed={desktopFilterSlide === "top"}
                aria-labelledby={slideDemoLabelId}
                onClick={() => onDesktopFilterSlideChange("top")}
              >
                Top
              </button>
              <button
                type="button"
                className={styles.desktopSlidePill}
                aria-pressed={desktopFilterSlide === "left"}
                aria-labelledby={slideDemoLabelId}
                onClick={() => onDesktopFilterSlideChange("left")}
              >
                Left
              </button>
              <button
                type="button"
                className={styles.desktopSlidePill}
                aria-pressed={desktopFilterSlide === "right"}
                aria-labelledby={slideDemoLabelId}
                onClick={() => onDesktopFilterSlideChange("right")}
              >
                Right
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <p className={styles.count} data-node-id="91:4994">
        {itemCountLabel}
      </p>
    </div>
  );
}
