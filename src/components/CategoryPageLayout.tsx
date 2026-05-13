"use client";

import { useState } from "react";
import { CategoryToolbar } from "./CategoryToolbar";
import { FilterSortPanel } from "./FilterSortPanel";
import styles from "./CategoryPageLayout.module.css";
import {
  ProductCard,
  PRODUCT_SWATCH_SETS,
  type ProductSwatchMetal,
} from "./ProductCard";

const CDN = "https://cdn.oakandluna.com";

/** Demo PLP tiles — name, price, and hero image from Oak & Luna CDN. */
const DEMO_PRODUCTS = [
  {
    title: "Lock & Luna charm with Round cut Moissanite - Gold",
    price: "$150",
    imageSrc: `${CDN}/digital-asset/product/lock-luna-charm-with-round-cut-moissanite-gold-vermeil-6.jpg`,
  },
  {
    title: "Lock & Luna charm with Emerald cut Moissanite - Gold Plated",
    price: "$195",
    imageSrc: `${CDN}/digital-asset/product/lock-luna-charm-with-emerald-cut-moissanite-gold-vermeil-7.jpg`,
  },
  {
    title: "Lock & Luna charm with Oval cut Moissanite - Gold Plated",
    price: "$195",
    imageSrc: `${CDN}/digital-asset/product/lock-luna-charm-with-oval-cut-moissanite-gold-vermeil-2.jpg`,
  },
  {
    title: "Willow Tag Initial Necklace with Diamond - Gold Vermeil",
    price: "$155",
    imageSrc: `${CDN}/digital-asset/product/willow-tag-initial-necklace-with-diamond-gold-vermeil-6.jpg`,
  },
  {
    title: "Engraved Compass Necklace with Diamond - Gold Vermeil",
    price: "$290",
    imageSrc: `${CDN}/digital-asset/product/engraved-comprass-necklace-gold-vermeil-1.jpg`,
  },
  {
    title: "Singapore Chain Name Necklace - Gold Vermeil",
    price: "$130",
    imageSrc: `${CDN}/digital-asset/product/singapore-chain-name-necklace-gold-vermeil-8.jpg`,
  },
  {
    title: "Pillar Bar Necklace - Gold Plated",
    price: "$150",
    imageSrc: `${CDN}/digital-asset/product/pillar-bar-necklace-18k-gold-vermeil-16.jpg`,
  },
  {
    title: "Inez Initial Necklace with Diamonds - Gold Vermeil",
    price: "$180",
    imageSrc: `${CDN}/digital-asset/product/inez-initial-necklace-gold-vermeil-with-diamond-12.jpg`,
  },
  {
    title: "Belle Custom Name Necklace - Gold Plated",
    price: "$105",
    imageSrc: `${CDN}/digital-asset/product/belle-custom-name-necklace-gold-vermeil-33.jpg`,
  },
  {
    title: "Singapore Chain Name Necklace - Gold Plated",
    price: "$110",
    imageSrc: `${CDN}/digital-asset/products/singapore-chain-name-necklace-gold-plated-1.jpg`,
  },
  {
    title: "Herringbone Engraved Slim Chain Necklace - Gold Vermeil",
    price: "$180",
    imageSrc: `${CDN}/digital-asset/products/herringbone-thin-chain-necklace-gold-vermeil-4.jpg`,
  },
  {
    title: "Inez Initial Heart Necklace with Diamond - Gold Vermeil",
    price: "$180",
    imageSrc: `${CDN}/digital-asset/product/red-heart-inez-initial-necklace-with-diamond-gold-vermeil-2.jpg`,
  },
  {
    title: "Bubble Up Initial Necklace - Gold Plated",
    price: "$125",
    imageSrc: `${CDN}/digital-asset/product/bubble-up-initial-necklace-gold-vermeil-6.jpg`,
  },
  {
    title: "Singapore Chain Name Necklace with Diamond - Gold Vermeil",
    price: "$180",
    imageSrc: `${CDN}/digital-asset/product/singapore-chain-name-necklace-with-diamonds-vermeil-3.jpg`,
  },
  {
    title: "Ivy Name Paperclip Chain Necklace - Gold Plated",
    price: "$165",
    imageSrc: `${CDN}/digital-asset/products/ivy-name-link-chain-necklace-gold-plating-7.jpg`,
  },
  {
    title: "Multiple Name Necklace - Gold Vermeil",
    price: "$190",
    imageSrc: `${CDN}/digital-asset/products/multiple-name-necklace-vermeil-gold-plated-1.jpg`,
  },
  {
    title: "Together Birthstone Bar - Gold",
    price: "$150",
    imageSrc: `${CDN}/digital-asset/product/together-birthstone-bar-gold-1.jpg`,
  },
  {
    title: "Pillar Bar Necklace With 0.25ct Diamond - Gold Vermeil",
    price: "$350",
    imageSrc: `${CDN}/digital-asset/product/pillar-bar-necklace-with-0.25ct-diamond-vermeil--5.jpg`,
  },
  {
    title: "Northern Star Necklace with 0.3ct Green Emerald Gemstone - Gold Plated",
    price: "$190",
    imageSrc: `${CDN}/digital-asset/product/engraved-etoile-necklace-with-0.3ct-green-emerald-gemstone-gold-vermeil-2.jpg`,
  },
  {
    title: "Willow Disc Initial Necklace - Gold Vermeil",
    price: "$125",
    imageSrc: `${CDN}/digital-asset/product/willow-disc-initial-necklace-gold-vermeil-9.jpg`,
  },
  {
    title: "The Charmer Coins & Initials Necklace - Gold Plated",
    price: "$187",
    imageSrc: `${CDN}/digital-asset/product/the-charmer-coins-initials-necklace-gold-vermeil-1.jpg`,
  },
  {
    title: "My Signature Initial - Gold",
    price: "$165",
    imageSrc: `${CDN}/digital-asset/product/my-signature-initial-gold-vermeil-10.jpg`,
  },
  {
    title: "Real Love Multiple Name Necklace - Gold Plated",
    price: "$175",
    imageSrc: `${CDN}/digital-asset/product/real-love-multiple-name-necklace-gold-vermeil-6.jpg`,
  },
  {
    title: "Initial Necklace - Gold Plated",
    price: "$95",
    imageSrc: `${CDN}/digital-asset/product/initial-necklace-gold-vermeil-8.jpg`,
  },
  {
    title: "Engraved Compass Necklace - Gold Plated",
    price: "$150",
    imageSrc: `${CDN}/digital-asset/products/engraved-comprass-necklace-gold-vermeil-7.jpg`,
  },
  {
    title: "Together Birthstone Bar - Silver",
    price: "$130",
    imageSrc: `${CDN}/digital-asset/product/together-birthstone-bar-silver-1.jpg`,
  },
  {
    title: "Lock & Luna charm with Oval cut Moissanite - Silver",
    price: "$155",
    imageSrc: `${CDN}/digital-asset/product/lock-luna-charm-with-oval-cut-moissanite-silver-12.jpg`,
  },
  {
    title: "Sun Compass Initials Necklace with Diamond - Gold Vermeil",
    price: "$225",
    imageSrc: `${CDN}/digital-asset/product/sun-compass-initials-necklace-with-diamonds-gold-vermeil-1.jpg`,
  },
  {
    title: "Singapore Chain Name Necklace - Silver",
    price: "$100",
    imageSrc: `${CDN}/digital-asset/products/singapore-chain-name-necklace-silver-1.jpg`,
  },
  {
    title: "Willow Tag Initial Necklace with Diamond - Silver",
    price: "$120",
    imageSrc: `${CDN}/digital-asset/products/willow-tag-initial-necklace-with-diamond-sterling-silver-1.jpg`,
  },
] as const;

/** Silver in the product name → select silver swatch; otherwise yellow gold when present. */
function selectedSwatchForTitle(
  title: string,
  swatches: readonly ProductSwatchMetal[]
): number {
  const isSilver = / - Silver$/i.test(title.trim());
  if (isSilver) {
    const idx = swatches.indexOf("silver");
    return idx >= 0 ? idx : 0;
  }
  const yg = swatches.indexOf("yellowGold");
  return yg >= 0 ? yg : 0;
}

/** Cycle 2 / 3 / 4 swatches across cards (metal selection follows product title). */
const SWATCH_CYCLE = [
  { swatches: PRODUCT_SWATCH_SETS.duo, selectedSwatchIndex: 1 },
  { swatches: PRODUCT_SWATCH_SETS.trio, selectedSwatchIndex: 2 },
  { swatches: PRODUCT_SWATCH_SETS.quad, selectedSwatchIndex: 2 },
] as const;

function swatchProps(i: number) {
  return SWATCH_CYCLE[i % SWATCH_CYCLE.length];
}

function demoForIndex(i: number) {
  const product = DEMO_PRODUCTS[i % DEMO_PRODUCTS.length];
  const sw = swatchProps(i);
  return {
    ...product,
    swatches: sw.swatches,
    selectedSwatchIndex: selectedSwatchForTitle(product.title, sw.swatches),
  };
}

const EDITORIAL_FEATURE_IMAGE =
  "https://cdn.oakandluna.com/digital-asset/banners/oal-Bridal-box2.jpg";

const LOOKBOOK_FEATURE_IMAGE =
  "https://cdn.oakandluna.com/digital-asset/banners/oal-Birthstones-box1.jpg";

const FILTERS_PANEL_ID = "filters-sort-panel";

export function CategoryPageLayout() {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <section className={styles.section} data-name="Category">
      <CategoryToolbar
        filtersOpen={filtersOpen}
        filtersPanelId={FILTERS_PANEL_ID}
        onOpenFilters={() => setFiltersOpen((v) => !v)}
      />
      <FilterSortPanel
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        panelId={FILTERS_PANEL_ID}
      />
      <div className={styles.heroGrid}>
        <ProductCard {...demoForIndex(0)} />
        <ProductCard {...demoForIndex(1)} />
        <div className={styles.heroFeatured}>
          <ProductCard
            title="Editorial"
            price=""
            imageSrc={EDITORIAL_FEATURE_IMAGE}
            imageOnly
            featured
            showSwatches={false}
          />
        </div>
        <ProductCard {...demoForIndex(2)} />
        <ProductCard {...demoForIndex(3)} />
      </div>
      <div className={styles.row4}>
        <ProductCard {...demoForIndex(4)} />
        <ProductCard {...demoForIndex(5)} />
        <ProductCard {...demoForIndex(6)} />
        <ProductCard {...demoForIndex(7)} />
      </div>
      <div className={styles.row4}>
        <ProductCard {...demoForIndex(8)} />
        <ProductCard {...demoForIndex(9)} />
        <ProductCard {...demoForIndex(10)} />
        <ProductCard {...demoForIndex(11)} />
      </div>
      <div className={styles.splitHero}>
        <div className={styles.splitFeatured}>
          <ProductCard
            title="Lookbook"
            price=""
            imageSrc={LOOKBOOK_FEATURE_IMAGE}
            imageOnly
            featured
            showSwatches={false}
          />
        </div>
        <div className={styles.splitA}>
          <ProductCard {...demoForIndex(12)} />
        </div>
        <div className={styles.splitB}>
          <ProductCard {...demoForIndex(13)} />
        </div>
        <div className={styles.splitC}>
          <ProductCard {...demoForIndex(14)} />
        </div>
        <div className={styles.splitD}>
          <ProductCard {...demoForIndex(15)} />
        </div>
      </div>
      <div className={styles.row4}>
        <ProductCard {...demoForIndex(16)} />
        <ProductCard {...demoForIndex(17)} />
        <ProductCard {...demoForIndex(18)} />
        <ProductCard {...demoForIndex(19)} />
      </div>
      <div className={styles.row4}>
        <ProductCard {...demoForIndex(20)} />
        <ProductCard {...demoForIndex(21)} />
        <ProductCard {...demoForIndex(22)} />
        <ProductCard {...demoForIndex(23)} />
      </div>
    </section>
  );
}
