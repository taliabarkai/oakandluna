import { FilterSlidersIcon } from "./FilterSlidersIcon";
import styles from "./CategoryToolbar.module.css";

export type CategoryToolbarProps = {
  itemCountLabel?: string;
};

export function CategoryToolbar({ itemCountLabel = "100 items" }: CategoryToolbarProps) {
  return (
    <div className={styles.bar} data-node-id="91:4991">
      <button type="button" className={styles.filterBtn} data-name="Hide Filters">
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
