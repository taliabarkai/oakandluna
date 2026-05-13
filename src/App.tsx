import { useLayoutEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { Topline } from "./components/Topline";
import { ToplinePromoBanner } from "./components/ToplinePromoBanner";
import { CategoryPageView } from "./pages/CategoryPageView";
import { HomePage } from "./pages/HomePage";
import styles from "./App.module.css";

export function App() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [promoOpen, setPromoOpen] = useState(false);
  const stickyNavRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (isHome) {
      root.style.removeProperty("--sticky-nav-stack-height");
      return;
    }

    const el = stickyNavRef.current;
    if (!el) return;

    const sync = () => {
      root.style.setProperty("--sticky-nav-stack-height", `${Math.ceil(el.getBoundingClientRect().height)}px`);
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    window.addEventListener("resize", sync);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
      root.style.removeProperty("--sticky-nav-stack-height");
    };
  }, [isHome, promoOpen]);

  return (
    <div className={styles.page}>
      <Topline promoOpen={promoOpen} onPromoOpenChange={setPromoOpen} />
      {isHome ? (
        <>
          {promoOpen ? (
            <div className={styles.promoStickyHome}>
              <ToplinePromoBanner />
            </div>
          ) : null}
          <SiteHeader />
        </>
      ) : (
        <div ref={stickyNavRef} className={styles.stickyNavStack}>
          {promoOpen ? <ToplinePromoBanner /> : null}
          <SiteHeader />
        </div>
      )}
      <main className={isHome ? styles.mainHome : styles.mainDefault}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoryPageView />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}
