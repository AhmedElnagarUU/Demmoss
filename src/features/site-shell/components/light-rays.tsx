export function LightRays({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none select-none ${className}`}>
      <div className="h-full w-full rtl:-scale-x-100">
        <div className="brand-rays h-full w-full">
          <svg
            viewBox="0 0 1200 760"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
            className="h-full w-full"
          >
            <defs>
              <linearGradient id="brand-ray" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="#22c55e" stopOpacity="0" />
                <stop offset="0.4" stopColor="#22c55e" stopOpacity="0.7" />
                <stop offset="1" stopColor="#4ade80" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="brand-ray-soft" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stopColor="#22c55e" stopOpacity="0.22" />
                <stop offset="1" stopColor="#22c55e" stopOpacity="0" />
              </linearGradient>
              <filter id="brand-ray-glow" x="-20%" y="-30%" width="140%" height="160%">
                <feGaussianBlur stdDeviation="12" />
              </filter>
              <radialGradient id="brand-ray-glow-bg" cx="0.16" cy="0.94" r="0.72">
                <stop offset="0" stopColor="#22c55e" stopOpacity="0.22" />
                <stop offset="1" stopColor="#22c55e" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width="1200" height="760" fill="url(#brand-ray-glow-bg)" />

            <g filter="url(#brand-ray-glow)" strokeWidth="9" opacity="0.5">
              <path d="M-120 820C180 720 320 620 500 470S900 250 1320 220" stroke="url(#brand-ray)" />
              <path d="M-100 760C220 680 400 560 590 410S980 220 1300 180" stroke="url(#brand-ray)" />
            </g>

            <g strokeWidth="1.6" opacity="0.8">
              <path d="M-100 800C200 720 340 610 520 460S920 240 1300 210" stroke="url(#brand-ray)" />
              <path d="M-120 730C200 660 400 540 580 400S960 210 1280 175" stroke="url(#brand-ray)" />
              <path d="M-60 660C240 600 430 490 610 360S1000 190 1260 160" stroke="url(#brand-ray)" />
              <path
                d="M-40 600C260 550 460 440 640 320S1020 170 1240 145"
                stroke="#22c55e"
                strokeOpacity="0.28"
              />
            </g>

            <g fill="url(#brand-ray-soft)">
              <path d="M-40 760L420 760L60 520Z" opacity="0.5" />
              <path d="M120 760L520 760L260 600Z" opacity="0.35" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
