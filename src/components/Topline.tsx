import styles from "./Topline.module.css";

export function Topline() {
  return (
    <div className={styles.bar} data-name="Topline">
      <div className={styles.left} data-name="Subscribe">
        <p className={styles.textLight}>Subscribe &amp; Get 10% Off</p>
      </div>
      <div className={styles.center}>
        <p className={styles.textMedium}>FREE SHIPPING ON ALL ORDERS</p>
      </div>
      <div className={styles.right} data-name="Track & Help">
        <p className={`${styles.textLight} ${styles.trackHelp}`}>
          <span>Help</span>
          <span className={styles.trackHelpPipe} aria-hidden>|</span>
          <span>Track my order</span>
        </p>
      </div>
    </div>
  );
}
