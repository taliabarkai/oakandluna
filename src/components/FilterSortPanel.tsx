"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import styles from "./FilterSortPanel.module.css";

export type SortKey = "featured" | "priceAsc" | "priceDesc";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "priceAsc", label: "Price: Low to high" },
  { key: "priceDesc", label: "Price: High to low" },
];

/** Materials row — swatch colors aligned with THEMES Filters Panel (9605:93804). */
const MATERIAL_OPTIONS: { id: string; label: string; swatch: string; ring?: boolean }[] = [
  { id: "stainless", label: "Stainless Steel", swatch: "#a2a2a2", ring: true },
  { id: "sterling", label: "Sterling Silver", swatch: "#cbcbcb", ring: true },
  { id: "vermeil", label: "Gold Vermeil", swatch: "#efe089", ring: true },
  { id: "plated", label: "Gold Plated", swatch: "#efe089", ring: true },
  {
    id: "yellowGold",
    label: "Yellow Gold",
    swatch: "linear-gradient(135deg, #f5e7b0 0%, #dbc883 100%)",
    ring: true,
  },
  { id: "roseVermeil", label: "Rose Gold Vermeil", swatch: "#f5ccb9", ring: true },
  { id: "rosePlating", label: "Rose Gold Plating", swatch: "#f5ccb9", ring: true },
  { id: "rose", label: "Rose Gold", swatch: "#f1d4ce", ring: true },
  { id: "white", label: "White Gold", swatch: "#e1e1e1", ring: true },
  {
    id: "mixed",
    label: "Mixed Metals",
    swatch: "linear-gradient(90deg, #dbc883 0%, #f5e7b0 50%, #cbcbcb 100%)",
    ring: true,
  },
  { id: "labDiamond", label: "Lab Diamond", swatch: "linear-gradient(145deg, #e8f4fc 0%, #c5dde8 100%)", ring: true },
  { id: "gemstones", label: "Gemstones", swatch: "linear-gradient(145deg, #e8dfe8 0%, #c9b8c9 100%)", ring: true },
  { id: "pearls", label: "Pearls", swatch: "linear-gradient(145deg, #f5f0e8 0%, #e0d8ce 100%)", ring: true },
];

export type FilterSortPanelProps = {
  open: boolean;
  onClose: () => void;
  /** Matches `aria-controls` on the toolbar Filter button. */
  panelId?: string;
};

export function FilterSortPanel({ open, onClose, panelId = "filters-sort-panel" }: FilterSortPanelProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [sort, setSort] = useState<SortKey>("featured");
  const [materials, setMaterials] = useState<Set<string>>(() => new Set());

  const sortLabel = SORT_OPTIONS.find((o) => o.key === sort)?.label ?? "Featured";

  const toggleMaterial = useCallback((id: string) => {
    setMaterials((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => closeRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <button
        type="button"
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`}
        aria-label="Dismiss filters"
        aria-hidden={!open}
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />
      <div
        id={panelId}
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-hidden={!open}
      >
        <div className={styles.banner} data-name="Modal Banner DT">
          <p className={styles.bannerTitle} id={titleId}>
            Filters
          </p>
          <button
            ref={closeRef}
            type="button"
            className={styles.closeBtn}
            aria-label="Close filters"
            onClick={onClose}
          >
            <svg className={styles.closeIcon} viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.scroll}>
          <div className={styles.sortBlock} data-name="OAL">
            <div className={styles.sortRow} data-name="Filter Nav">
              <div className={styles.sortRowInner}>
                <span className={styles.sortLabel}>Sort By:</span>
                <span className={styles.sortValue}>{sortLabel}</span>
              </div>
              <span className={styles.chevron} aria-hidden>
                <svg className={styles.chevronSvg} viewBox="0 0 9 6" fill="none">
                  <path d="M1 1.5L4.5 5L8 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </span>
            </div>

            <div className={styles.sortList} role="radiogroup" aria-label="Sort options">
              {SORT_OPTIONS.map((opt) => {
                const selected = sort === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    className={styles.sortOption}
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setSort(opt.key)}
                  >
                    <span
                      className={`${styles.radioOuter} ${selected ? styles.radioOuterSelected : ""}`}
                      aria-hidden
                    >
                      {selected ? <span className={styles.radioInner} /> : null}
                    </span>
                    <span className={styles.sortOptionText}>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.categories} data-name="categories">
            <h2 className={styles.sectionTitle}>Materials</h2>
            <div className={styles.materialList}>
              {MATERIAL_OPTIONS.map((m) => {
                const on = materials.has(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    className={styles.materialRow}
                    aria-pressed={on}
                    onClick={() => toggleMaterial(m.id)}
                  >
                    <span
                      className={`${styles.swatch} ${m.ring ? styles.swatchRing : ""} ${on ? styles.swatchOn : ""}`}
                      style={
                        m.swatch.startsWith("linear")
                          ? { backgroundImage: m.swatch }
                          : { backgroundColor: m.swatch }
                      }
                    />
                    <span className={styles.materialLabel}>{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.viewBtn} data-name="Component 47" onClick={onClose}>
            View items
          </button>
        </div>
      </div>
    </>
  );
}
