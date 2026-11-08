// Layered concentric green arcs at the bottom start corner under the hero. Decorative only.
export function HillArcs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-16 -start-24 size-[22rem] sm:-bottom-24 sm:-start-32 sm:size-[32rem] rtl:-scale-x-100"
    >
      <svg viewBox="0 0 400 400" fill="none" className="size-full">
        <circle
          cx="0"
          cy="400"
          r="380"
          fill="#22c55e"
          fillOpacity="0.04"
          stroke="#22c55e"
          strokeOpacity="0.12"
        />
        <circle
          cx="0"
          cy="400"
          r="300"
          fill="#16a34a"
          fillOpacity="0.07"
          stroke="#22c55e"
          strokeOpacity="0.18"
        />
        <circle
          cx="0"
          cy="400"
          r="220"
          fill="#15803d"
          fillOpacity="0.14"
          stroke="#22c55e"
          strokeOpacity="0.26"
        />
        <circle
          cx="0"
          cy="400"
          r="140"
          fill="#14532d"
          fillOpacity="0.4"
          stroke="#22c55e"
          strokeOpacity="0.34"
        />
        <circle
          cx="0"
          cy="400"
          r="70"
          fill="#052e16"
          fillOpacity="0.8"
          stroke="#22c55e"
          strokeOpacity="0.4"
        />
      </svg>
    </div>
  );
}
