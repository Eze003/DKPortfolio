export function HeroLogo() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[46%] z-10 -translate-x-1/2 -translate-y-1/2 opacity-20 sm:top-[48%] sm:opacity-100"
      aria-hidden
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[88px] w-[88px] drop-shadow-[0_12px_40px_rgba(255,255,255,0.12)] sm:h-24 sm:w-24 md:h-28 md:w-28"
      >
        <defs>
          <linearGradient
            id="hero-metal"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#fafafa" />
            <stop offset="30%" stopColor="#b8b8b8" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#a3a3a3" />
            <stop offset="100%" stopColor="#737373" />
          </linearGradient>
        </defs>
        {/* Three rounded arms — stylized Y / trefoil */}
        <path
          d="M50 22 C50 22 50 38 50 50 C50 62 50 78 50 78"
          stroke="url(#hero-metal)"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <path
          d="M50 50 C50 50 28 58 18 72 C12 80 22 88 34 82 C44 76 50 58 50 50Z"
          fill="url(#hero-metal)"
        />
        <path
          d="M50 50 C50 50 72 58 82 72 C88 80 78 88 66 82 C56 76 50 58 50 50Z"
          fill="url(#hero-metal)"
        />
        <circle cx="50" cy="50" r="6" fill="url(#hero-metal)" />
      </svg>
    </div>
  );
}
