import { Link } from "react-router-dom";
import heroDesktop from "../assets/images/hero-desktop.jpg";
import heroMobile from "../assets/images/hero-mobile.jpg";
import styles from "./HomePage.module.css";

export function HomePage() {
  return (
    <>
      <section className={styles.hero} aria-label="Featured">
        <Link
          to="/category"
          className={styles.heroCard}
          aria-label="Shop Hot Days Hot Icons"
        >
          <picture className={styles.heroPicture}>
            <source media="(max-width: 767px)" srcSet={heroMobile} />
            <img
              className={styles.heroMedia}
              src={heroDesktop}
              alt=""
              sizes="100vw"
              loading="eager"
            />
          </picture>
          <div className={styles.heroOverlay}>
            <h1 className={styles.heroHeadline}>
              HOT DAYS
              <br />
              HOT ICONS
            </h1>
            <span className={styles.heroCta}>shop now</span>
          </div>
        </Link>
      </section>
    </>
  );
}
