"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Topline } from "@/components/Topline";
import { ToplinePromoBanner } from "@/components/ToplinePromoBanner";
import { RouteErrorBoundary } from "@/components/RouteErrorBoundary";
import styles from "./AppChrome.module.css";

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
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
    window.addEventListener("resize", sync);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      try {
        ro = new ResizeObserver(sync);
        ro.observe(el);
      } catch {
        ro = null;
      }
    }

    return () => {
      ro?.disconnect();
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
        <RouteErrorBoundary>{children}</RouteErrorBoundary>
      </main>
      <SiteFooter />
    </div>
  );
}
