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
          className={styles.heroLink}
          aria-label="Shop categories — go to category page"
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
        </Link>
      </section>
    </>
  );
}
