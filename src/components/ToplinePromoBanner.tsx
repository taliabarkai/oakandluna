import styles from "./Topline.module.css";

export const PROMO_BANNER_ID = "topline-promo-banner";

export function ToplinePromoBanner() {
  return (
    <div className={styles.promoRoot} data-name="Topline" data-node-id="9604:82037">
      <div id={PROMO_BANNER_ID} className={styles.promoBanner} role="region" aria-label="Promotion">
        <div className={styles.promoInner}>
          <p className={styles.promoText}>MOTHER&apos;S DAY SALE / 20% OFF SITEWIDE</p>
        </div>
      </div>
    </div>
  );
}
