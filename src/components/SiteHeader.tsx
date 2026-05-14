"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useHomeHeroTheme } from "@/context/HomeHeroThemeContext";
import { FIGMA_MCP } from "../assets/figmaMcpAssets";
import styles from "./SiteHeader.module.css";

/** Root-absolute URLs so icons load on every route in production (stable vs bundled `/_next/static/media/…`). */
const ICON_MENU = "/icons/hamburger.svg";
const ICON_SEARCH = "/icons/search.svg";
const ICON_ACCOUNT = "/icons/account.svg";
const ICON_BAG = "/icons/shopping-bag.svg";

const NAV_LINKS = [
  "Best Sellers",
  "New In",
  "Shop By",
  "Necklaces",
  "Bracelets",
  "Earrings",
  "Rings",
  "Father's Day",
] as const;

const SCROLL_SOLID_PX = 8;

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { theme } = useHomeHeroTheme();

  const [scrolled, setScrolled] = useState(false);
  const [navHovered, setNavHovered] = useState(false);

  const solid = !isHome || scrolled || navHovered;
  const transparentHeroDark = isHome && !solid && theme === "dark";

  useEffect(() => {
    setScrolled(false);
    setNavHovered(false);
  }, [pathname]);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_SOLID_PX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const headerClass = [
    styles.header,
    isHome ? styles.headerFixed : styles.headerInNavStack,
    solid ? styles.headerSolid : isHome ? styles.headerTransparent : styles.headerSolid,
    transparentHeroDark ? styles.headerTransparentDark : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClass} data-name="Header">
      <div className={styles.leadingMobile} data-name="Header MB leading">
        <button type="button" className={styles.iconBtn} aria-label="Open menu" aria-expanded="false">
          <img className={styles.headerIcon} src={ICON_MENU} alt="" width={24} height={24} />
        </button>
        <button type="button" className={styles.iconBtn} aria-label="Search">
          <img className={styles.headerIcon} src={ICON_SEARCH} alt="" width={24} height={24} />
        </button>
      </div>
      <Link className={styles.logo} href="/" aria-label="Home">
        <img src={FIGMA_MCP.header.logo} alt="" width={145} height={37} />
      </Link>
      <nav
        className={styles.nav}
        aria-label="Primary"
        onMouseEnter={() => {
          if (isHome) setNavHovered(true);
        }}
        onMouseLeave={() => setNavHovered(false)}
      >
        {NAV_LINKS.map((label) =>
          label === "Necklaces" ? (
            <Link
              key={label}
              href="/category"
              className={`${styles.navLink} ${pathname === "/category" ? styles.navLinkActive : ""}`}
            >
              {label}
            </Link>
          ) : (
            <a key={label} className={styles.navLink} href="#">
              {label}
            </a>
          ),
        )}
      </nav>
      <div className={styles.icons} data-name="Icons">
        <button
          type="button"
          className={`${styles.iconBtn} ${styles.searchDesktop}`}
          aria-label="Search"
        >
          <img className={styles.headerIcon} src={ICON_SEARCH} alt="" width={24} height={24} />
        </button>
        <button type="button" className={styles.iconBtn} aria-label="Account">
          <img className={styles.headerIcon} src={ICON_ACCOUNT} alt="" width={24} height={24} />
        </button>
        <button type="button" className={styles.iconBtn} aria-label="Shopping bag">
          <img className={styles.headerIcon} src={ICON_BAG} alt="" width={24} height={24} />
        </button>
      </div>
    </header>
  );
}
