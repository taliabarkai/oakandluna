import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { PROMO_BANNER_ID } from "./ToplinePromoBanner";
import styles from "./Topline.module.css";

export type ToplineProps = {
  promoOpen: boolean;
  onPromoOpenChange: (open: boolean) => void;
};

export function Topline({ promoOpen, onPromoOpenChange }: ToplineProps) {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const announcementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isHome) {
      document.documentElement.style.removeProperty("--header-fixed-top");
      return;
    }

    const syncHeaderTop = () => {
      const ann = announcementRef.current?.getBoundingClientRect().bottom ?? 0;
      const promoEl = document.getElementById(PROMO_BANNER_ID);
      const promoBottom = promoEl ? promoEl.getBoundingClientRect().bottom : ann;
      const bottom = Math.max(0, Math.ceil(Math.max(ann, promoBottom)));
      document.documentElement.style.setProperty("--header-fixed-top", `${bottom}px`);
    };

    syncHeaderTop();
    const ro = new ResizeObserver(syncHeaderTop);
    if (announcementRef.current) ro.observe(announcementRef.current);
    const promoEl = document.getElementById(PROMO_BANNER_ID);
    if (promoEl) ro.observe(promoEl);
    window.addEventListener("scroll", syncHeaderTop, { passive: true });
    window.addEventListener("resize", syncHeaderTop);

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", syncHeaderTop);
      window.removeEventListener("resize", syncHeaderTop);
      document.documentElement.style.removeProperty("--header-fixed-top");
    };
  }, [isHome, promoOpen]);

  return (
    <div ref={announcementRef} className={styles.announcementShell}>
      <button
        type="button"
        className={styles.announcementBtn}
        data-name="Announcement"
        aria-label="Toggle promotional banner"
        aria-expanded={promoOpen}
        aria-controls={promoOpen ? PROMO_BANNER_ID : undefined}
        onClick={() => onPromoOpenChange(!promoOpen)}
      >
        <div className={styles.left} data-name="Subscribe">
          <p className={styles.textLight}>Subscribe &amp; Get 10% Off</p>
        </div>
        <div className={styles.center}>
          <p className={styles.textMedium}>Free Shipping on All Orders</p>
        </div>
        <div className={styles.right} data-name="Track & Help">
          <p className={`${styles.textLight} ${styles.trackHelp}`}>
            <span>Help</span>
            <span className={styles.trackHelpPipe} aria-hidden>
              |
            </span>
            <span>Track my order</span>
          </p>
        </div>
      </button>
    </div>
  );
}
