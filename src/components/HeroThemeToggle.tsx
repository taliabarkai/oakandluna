"use client";

import { useHomeHeroTheme } from "@/context/HomeHeroThemeContext";
import styles from "./HeroThemeToggle.module.css";

/** Homepage-only control: switches hero + transparent header between light and dark foreground. */
export function HeroThemeToggle() {
  const { theme, toggleTheme } = useHomeHeroTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={(e) => {
        e.stopPropagation();
        toggleTheme();
      }}
      aria-pressed={isDark}
      aria-label={isDark ? "Use light hero and header" : "Use dark hero and header"}
      title={isDark ? "Light hero" : "Dark hero"}
    >
      <span className={styles.track} aria-hidden>
        <span className={`${styles.thumb} ${isDark ? styles.thumbDark : ""}`} />
      </span>
    </button>
  );
}
