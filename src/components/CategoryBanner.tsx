"use client";

import type { CSSProperties, ReactNode } from "react";
import { useMemo, useState } from "react";
import { CATEGORY_BANNER_SEO_IMAGES } from "../assets/categoryBannerSeoImages";
import type { SeoBannerCardCount } from "../seoBannerLayout";
import styles from "./CategoryBanner.module.css";
import { SeoCategoryTile } from "./SeoCategoryTile";

export type CategoryBannerSeoItem = {
  label: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Selecting this category sets how many tiles the banner shows */
  displayCount?: SeoBannerCardCount;
};

export type CategoryBannerProps = {
  title: ReactNode;
  description: ReactNode;
  seoItems?: CategoryBannerSeoItem[];
};

const DEFAULT_DISPLAY_BY_INDEX: readonly SeoBannerCardCount[] = [2, 4, 6, 2];

const DEFAULT_SEO: CategoryBannerSeoItem[] = [
  {
    label: "Best Selling Bracelets",
    imageSrc: CATEGORY_BANNER_SEO_IMAGES[0],
    displayCount: 2,
  },
  {
    label: "Best Selling Earrings",
    imageSrc: CATEGORY_BANNER_SEO_IMAGES[1],
    displayCount: 4,
  },
  {
    label: "Best Selling Rings",
    imageSrc: CATEGORY_BANNER_SEO_IMAGES[2],
    displayCount: 6,
  },
  {
    label: "Best Selling Fine Jewelry",
    imageSrc: CATEGORY_BANNER_SEO_IMAGES[3],
    displayCount: 2,
  },
];

function targetForItem(item: CategoryBannerSeoItem, index: number): SeoBannerCardCount {
  return item.displayCount ?? DEFAULT_DISPLAY_BY_INDEX[index % DEFAULT_DISPLAY_BY_INDEX.length];
}

function buildSeoSlots(
  mode: SeoBannerCardCount,
  items: readonly CategoryBannerSeoItem[],
): { item: CategoryBannerSeoItem; key: string; sourceIndex: number }[] {
  if (items.length === 0) return [];
  if (mode === 2) {
    return items.slice(0, 2).map((item, i) => ({
      item,
      key: `seo2-${i}`,
      sourceIndex: i,
    }));
  }
  if (mode === 4) {
    return items.slice(0, 4).map((item, i) => ({
      item,
      key: `seo4-${i}`,
      sourceIndex: i,
    }));
  }
  const order = [0, 1, 2, 2, 1, 0];
  return order.map((idx, i) => ({
    item: items[idx],
    key: `seo6-${i}-${idx}`,
    sourceIndex: idx,
  }));
}

/** Match `SeoCategoryTile` fixed image width so columns never squeeze tiles smaller. */
const SEO_TILE_PX = 150;

function gridStyleForMode(mode: SeoBannerCardCount): CSSProperties {
  if (mode === 6) {
    return {
      gridTemplateColumns: `repeat(3, ${SEO_TILE_PX}px)`,
    };
  }
  return {
    gridTemplateColumns: `repeat(${mode}, ${SEO_TILE_PX}px)`,
  };
}

export function CategoryBanner({
  title,
  description,
  seoItems = DEFAULT_SEO,
}: CategoryBannerProps) {
  const [seoDisplay, setSeoDisplay] = useState<SeoBannerCardCount>(4);
  const slots = useMemo(() => buildSeoSlots(seoDisplay, seoItems), [seoDisplay, seoItems]);

  return (
    <section
      className={styles.banner}
      data-seo-layout={seoDisplay}
      data-node-id="91:4978"
      data-name="CATEGORY BANNER"
    >
      <div className={styles.copy} data-node-id="91:4980">
        <h1 className={styles.headline} data-node-id="91:4981">
          {title}
        </h1>
        <p className={styles.body} data-node-id="91:4982">
          {description}
        </p>
      </div>
      <div
        className={styles.grid}
        style={gridStyleForMode(seoDisplay)}
        data-node-id="91:4983"
        data-name="SEO Categories"
        role="toolbar"
        aria-label="Category shortcuts layout"
      >
        {slots.map(({ item, key, sourceIndex }) => {
          const target = targetForItem(item, sourceIndex);
          return (
            <div key={key} className={styles.snapItem}>
              <SeoCategoryTile
                label={item.label}
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                selected={target === seoDisplay}
                onSelect={() => setSeoDisplay(target)}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
