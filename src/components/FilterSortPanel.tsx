"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import styles from "./FilterSortPanel.module.css";

export type SortKey = "featured" | "whatsNew" | "priceAsc" | "priceDesc";

export type DesktopFilterSlideVariant = "top" | "left" | "right";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "whatsNew", label: "What's New" },
  { key: "priceAsc", label: "Price low to high" },
  { key: "priceDesc", label: "Price high to low" },
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

export type InscriptionCountKey = "1" | "2" | "3" | "4" | "5plus";

const INSCRIPTION_OPTIONS: { key: InscriptionCountKey; label: string }[] = [
  { key: "1", label: "1 inscription" },
  { key: "2", label: "2 inscriptions" },
  { key: "3", label: "3 inscriptions" },
  { key: "4", label: "4 inscriptions" },
  { key: "5plus", label: "5 and more inscriptions" },
];

function TrailingSelectionCheck({ className }: { className: string }) {
  return (
    <svg
      className={className}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="12" cy="12" r="7.4" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M15.6384 9.83027C15.3455 9.53737 14.8707 9.53737 14.5778 9.83027L11.3613 13.0467L9.79132 11.4767C9.49842 11.1838 9.02355 11.1838 8.73066 11.4767C8.43776 11.7696 8.43776 12.2445 8.73066 12.5374L10.8114 14.6182C10.8598 14.6665 10.9131 14.7069 10.9697 14.7392C11.2591 14.9199 11.645 14.8844 11.8966 14.6328L15.6384 10.8909C15.9313 10.598 15.9313 10.1232 15.6384 9.83027Z"
        fill="currentColor"
      />
    </svg>
  );
}

export type FilterSortPanelProps = {
  open: boolean;
  onClose: () => void;
  /** Matches `aria-controls` on the toolbar Filter button. */
  panelId?: string;
  /** Total sellable SKU count on the PLP (demo). */
  totalProductCount: number;
  /** Count after applying current filter UI (demo heuristic). */
  filteredProductCount: number;
  sort: SortKey;
  onSortChange: (key: SortKey) => void;
  materials: ReadonlySet<string>;
  onToggleMaterial: (id: string) => void;
  /** `null` = no inscription filter (nothing selected). */
  inscriptionCount: InscriptionCountKey | null;
  /** Same toggle semantics as materials: click selects; click again clears. */
  onToggleInscription: (key: InscriptionCountKey) => void;
  /** Desktop-only (≥901px): how the panel enters the viewport (`top` | `left` | `right`). Mobile unchanged. */
  desktopFilterSlide?: DesktopFilterSlideVariant;
};

export function FilterSortPanel({
  open,
  onClose,
  panelId = "filters-sort-panel",
  totalProductCount,
  filteredProductCount,
  sort,
  onSortChange,
  materials,
  onToggleMaterial,
  inscriptionCount,
  onToggleInscription,
  desktopFilterSlide = "top",
}: FilterSortPanelProps) {
  const titleId = useId();
  const sortListId = useId();
  const materialsListId = useId();
  const inscriptionsListId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  const [mobileSortOpen, setMobileSortOpen] = useState(false);
  const [mobileMaterialsOpen, setMobileMaterialsOpen] = useState(false);
  const [mobileInscriptionsOpen, setMobileInscriptionsOpen] = useState(false);

  const sortLabel = SORT_OPTIONS.find((o) => o.key === sort)?.label ?? "Featured";

  const toggleMaterial = useCallback(
    (id: string) => {
      onToggleMaterial(id);
    },
    [onToggleMaterial],
  );

  const toggleInscription = useCallback(
    (key: InscriptionCountKey) => {
      onToggleInscription(key);
    },
    [onToggleInscription],
  );

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

  useEffect(() => {
    if (!open) {
      setMobileSortOpen(false);
      setMobileMaterialsOpen(false);
      setMobileInscriptionsOpen(false);
      return;
    }

    const isMobileLayout = window.matchMedia("(max-width: 900px)").matches;
    const isSideSlide = desktopFilterSlide === "left" || desktopFilterSlide === "right";
    if (isMobileLayout || isSideSlide) {
      setMobileSortOpen(true);
    } else {
      setMobileSortOpen(false);
    }
  }, [open, desktopFilterSlide]);

  const ctaLabel = `View ${filteredProductCount} items`;

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
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""} ${
          desktopFilterSlide === "left"
            ? styles.drawerDesktopSlideLeft
            : desktopFilterSlide === "right"
              ? styles.drawerDesktopSlideRight
              : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-hidden={!open}
      >
        <div className={styles.banner} data-name="Modal Banner DT">
          <p className={styles.bannerTitle} id={titleId}>
            Filter + Sort
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
          <div className={styles.columns}>
            <div className={`${styles.sortBlock} ${styles.filterColumn}`}>
              <h2 className={`${styles.sectionTitle} ${styles.columnHeadingDesktop}`}>Sort by</h2>
              <button
                type="button"
                className={styles.sortRow}
                data-name="Filter Nav"
                aria-expanded={mobileSortOpen}
                aria-controls={sortListId}
                onClick={() => setMobileSortOpen((v) => !v)}
              >
                <div className={styles.sortRowInner}>
                  <span className={styles.sortLabel}>Sort By:</span>
                  <span className={styles.sortValue}>{sortLabel}</span>
                </div>
                <span
                  className={`${styles.chevron} ${mobileSortOpen ? styles.chevronExpanded : ""}`}
                  aria-hidden
                >
                  <svg className={styles.chevronSvg} viewBox="0 0 9 6" fill="none">
                    <path d="M1 1.5L4.5 5L8 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </span>
              </button>

              <div
                id={sortListId}
                className={`${styles.sortList} ${!mobileSortOpen ? styles.filterBodyMobileCollapsed : ""}`}
                role="radiogroup"
                aria-label="Sort options"
              >
                {SORT_OPTIONS.map((opt) => {
                  const selected = sort === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      className={styles.sortOption}
                      role="radio"
                      aria-checked={selected}
                      onClick={() => onSortChange(opt.key)}
                    >
                      <span className={styles.sortOptionText}>{opt.label}</span>
                      <span className={styles.trailingCheckSlot} aria-hidden>
                        {selected ? <TrailingSelectionCheck className={styles.trailingCheckSvg} /> : null}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={`${styles.categories} ${styles.filterColumn}`}>
              <h2 className={`${styles.sectionTitle} ${styles.columnHeadingDesktop}`}>Materials</h2>
              <button
                type="button"
                className={styles.filterSectionDisclosure}
                aria-expanded={mobileMaterialsOpen}
                aria-controls={materialsListId}
                onClick={() => setMobileMaterialsOpen((v) => !v)}
              >
                <span className={styles.filterSectionDisclosureLabel}>Materials</span>
                <span
                  className={`${styles.chevron} ${mobileMaterialsOpen ? styles.chevronExpanded : ""}`}
                  aria-hidden
                >
                  <svg className={styles.chevronSvg} viewBox="0 0 9 6" fill="none">
                    <path d="M1 1.5L4.5 5L8 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <div
                id={materialsListId}
                className={`${styles.materialList} ${!mobileMaterialsOpen ? styles.filterBodyMobileCollapsed : ""}`}
              >
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
                      <span className={styles.swatchFrame}>
                        <span
                          className={`${styles.swatch} ${m.ring ? styles.swatchRing : ""}`}
                          style={
                            m.swatch.startsWith("linear")
                              ? { backgroundImage: m.swatch }
                              : { backgroundColor: m.swatch }
                          }
                        />
                      </span>
                      <span className={styles.materialLabel}>{m.label}</span>
                      <span className={styles.trailingCheckSlot} aria-hidden>
                        {on ? <TrailingSelectionCheck className={styles.trailingCheckSvg} /> : null}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={`${styles.inscriptionBlock} ${styles.filterColumn}`}>
              <h2 className={`${styles.sectionTitle} ${styles.columnHeadingDesktop}`}>
                Number of inscriptions
              </h2>
              <button
                type="button"
                className={styles.filterSectionDisclosure}
                aria-expanded={mobileInscriptionsOpen}
                aria-controls={inscriptionsListId}
                onClick={() => setMobileInscriptionsOpen((v) => !v)}
              >
                <span className={styles.filterSectionDisclosureLabel}>Number of inscriptions</span>
                <span
                  className={`${styles.chevron} ${mobileInscriptionsOpen ? styles.chevronExpanded : ""}`}
                  aria-hidden
                >
                  <svg className={styles.chevronSvg} viewBox="0 0 9 6" fill="none">
                    <path d="M1 1.5L4.5 5L8 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <div
                id={inscriptionsListId}
                className={`${styles.inscriptionList} ${!mobileInscriptionsOpen ? styles.filterBodyMobileCollapsed : ""}`}
              >
                {INSCRIPTION_OPTIONS.map((opt) => {
                  const selected = inscriptionCount === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      className={styles.inscriptionOption}
                      aria-pressed={selected}
                      onClick={() => toggleInscription(opt.key)}
                    >
                      <span className={styles.inscriptionOptionText}>{opt.label}</span>
                      <span className={styles.trailingCheckSlot} aria-hidden>
                        {selected ? <TrailingSelectionCheck className={styles.trailingCheckSvg} /> : null}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.viewBtn}
            data-name="Component 47"
            onClick={onClose}
            aria-label={`View ${filteredProductCount} items (${totalProductCount} total on page)`}
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </>
  );
}
