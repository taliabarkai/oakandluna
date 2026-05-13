import { FIGMA_MCP } from "../assets/figmaMcpAssets";
import {
  PRODUCT_SWATCH_SETS,
  SWATCH_METAL,
  type ProductSwatchMetal,
} from "./productSwatches";
import styles from "./ProductCard.module.css";

export type { ProductSwatchMetal } from "./productSwatches";
export { PRODUCT_SWATCH_SETS } from "./productSwatches";

export type ProductCardProps = {
  title: string;
  price?: string;
  compareAtPrice?: string;
  imageSrc?: string;
  imageAlt?: string;
  ribbonText?: string;
  /** Taller hero tile to match large product image column */
  featured?: boolean;
  showSwatches?: boolean;
  /** Image-only hero column (no info block below) */
  imageOnly?: boolean;
  /** 2–4 metal swatches; defaults to trio preset */
  swatches?: readonly ProductSwatchMetal[];
  /** Index of selected swatch in `swatches` */
  selectedSwatchIndex?: number;
};

const DEFAULT_SWATCHES: readonly ProductSwatchMetal[] = PRODUCT_SWATCH_SETS.trio;

export function ProductCard({
  title,
  price = "",
  compareAtPrice,
  imageSrc = FIGMA_MCP.productCard.image,
  imageAlt = "",
  ribbonText,
  featured = false,
  showSwatches = true,
  imageOnly = false,
  swatches = DEFAULT_SWATCHES,
  selectedSwatchIndex = 2,
}: ProductCardProps) {
  const list = swatches.slice(0, 4);
  const selected = Math.min(Math.max(selectedSwatchIndex, 0), Math.max(list.length - 1, 0));

  const heroFill = imageOnly && featured;

  return (
    <article
      className={`${styles.card} ${heroFill ? styles.cardHeroFill : ""}`}
      data-name="Product Card MB NEW"
    >
      <div
        className={`${styles.imageWrap} ${featured ? styles.imageWrapFeatured : ""}`}
        data-name="Product Card image"
      >
        {ribbonText ? (
          <div className={styles.ribbon} data-name="Ribbon Margin">
            <div className={styles.ribbonInner} data-name="Ribbon">
              <p className={styles.ribbonText}>{ribbonText}</p>
            </div>
          </div>
        ) : null}
        <img className={styles.image} src={imageSrc} alt={imageAlt || title} loading="lazy" />
      </div>
      {imageOnly ? null : (
        <div className={styles.info} data-name="Product Info">
          {showSwatches && list.length > 0 ? (
            <div
              className={styles.swatches}
              data-name="material swatches"
              role="group"
              aria-label="Available metals"
            >
              {list.map((metal, i) => {
                const meta = SWATCH_METAL[metal];
                const isSelected = i === selected;
                return (
                  <button
                    key={`${metal}-${i}`}
                    type="button"
                    className={`${styles.swatch} ${isSelected ? styles.swatchSelected : ""}`}
                    style={{ backgroundColor: meta.fill }}
                    title={meta.label}
                    aria-label={meta.label}
                    aria-current={isSelected ? "true" : undefined}
                  />
                );
              })}
            </div>
          ) : null}
          <p className={styles.title}>{title}</p>
          {price ? (
            <div className={styles.prices} data-name="Prices">
              {compareAtPrice ? <p className={styles.wasPrice}>{compareAtPrice}</p> : null}
              <p className={styles.price} data-name="Price">
                {price}
              </p>
            </div>
          ) : null}
        </div>
      )}
    </article>
  );
}
