import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import accountIcon from "../assets/images/account.svg";
import menuIcon from "../assets/images/hamburger.svg";
import searchIcon from "../assets/images/search.svg";
import bagIcon from "../assets/images/shopping-bag.svg";
import { FIGMA_MCP } from "../assets/figmaMcpAssets";
import styles from "./SiteHeader.module.css";

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
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [navHovered, setNavHovered] = useState(false);

  const solid = !isHome || scrolled || navHovered;

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
    isHome ? styles.headerFixed : styles.headerStatic,
    solid ? styles.headerSolid : isHome ? styles.headerTransparent : styles.headerSolid,
  ].join(" ");

  return (
    <header className={headerClass} data-name="Header">
      <div className={styles.leadingMobile} data-name="Header MB leading">
        <button type="button" className={styles.iconBtn} aria-label="Open menu" aria-expanded="false">
          <img className={styles.headerIcon} src={menuIcon} alt="" width={24} height={24} />
        </button>
        <button type="button" className={styles.iconBtn} aria-label="Search">
          <img className={styles.headerIcon} src={searchIcon} alt="" width={24} height={24} />
        </button>
      </div>
      <Link className={styles.logo} to="/" aria-label="Home">
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
            <NavLink
              key={label}
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
              to="/category"
            >
              {label}
            </NavLink>
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
          <img className={styles.headerIcon} src={searchIcon} alt="" width={24} height={24} />
        </button>
        <button type="button" className={styles.iconBtn} aria-label="Account">
          <img className={styles.headerIcon} src={accountIcon} alt="" width={24} height={24} />
        </button>
        <button type="button" className={styles.iconBtn} aria-label="Shopping bag">
          <img className={styles.headerIcon} src={bagIcon} alt="" width={24} height={24} />
        </button>
      </div>
    </header>
  );
}
