"use client";

import Link from "next/link";
import { useHomeHeroTheme } from "@/context/HomeHeroThemeContext";
import heroDesktop from "../assets/images/home-hero-desktop.jpg";
import heroMobile from "../assets/images/home-hero-mobile.jpg";
import styles from "./HomePage.module.css";

export function HomePage() {
  const { theme } = useHomeHeroTheme();
  const heroClass = theme === "dark" ? `${styles.hero} ${styles.heroDark}` : styles.hero;

  return (
    <>
      <section className={heroClass} aria-label="Featured">
        <Link
          href="/category"
          className={styles.heroCard}
          aria-label="Shop Hot Days Hot Icons"
        >
          <picture className={styles.heroPicture}>
            <source media="(max-width: 767px)" srcSet={heroMobile.src} />
            <img
              className={styles.heroMedia}
              src={heroDesktop.src}
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
