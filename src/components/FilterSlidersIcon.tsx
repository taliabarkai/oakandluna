/** Filter / sort sliders icon (toolbar). */
export function FilterSlidersIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <line x1="2" y1="6.5" x2="18" y2="6.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="13" y1="10" x2="13" y2="3" stroke="currentColor" strokeWidth="2" />
      <line x1="18" y1="14" x2="2" y2="14" stroke="currentColor" strokeWidth="1.5" />
      <line x1="7" y1="10.5" x2="7" y2="17.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
