import styles from "./SeoCategoryTile.module.css";

export type SeoCategoryTileProps = {
  label: string;
  imageSrc?: string;
  imageAlt?: string;
  selected?: boolean;
  onSelect?: () => void;
};

export function SeoCategoryTile({
  label,
  imageSrc,
  imageAlt: _imageAlt,
  selected = false,
  onSelect,
}: SeoCategoryTileProps) {
  return (
    <button
      type="button"
      className={styles.tile}
      data-name="SEO Categories"
      aria-pressed={selected}
      aria-label={`${label}. Change how many products appear per row.`}
      onClick={onSelect}
      disabled={!onSelect}
    >
      <div className={styles.imageWrap} data-name="Product Card image">
        <div className={styles.fallback} aria-hidden />
        {imageSrc ? <img className={styles.image} src={imageSrc} alt="" /> : null}
      </div>
      <div className={styles.labelRow}>
        <span className={styles.label}>{label}</span>
      </div>
    </button>
  );
}
