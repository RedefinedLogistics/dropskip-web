/* Post artwork. There are no photographs, so each post gets an abstract panel
   drawn in the site's own visual language, sized to fill its card. */
const art = {
  trend: (
    <>
      <path
        d="M0 250 C 90 232, 150 120, 240 104 C 330 88, 380 150, 480 40"
        fill="none"
        stroke="var(--orange)"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <circle cx="240" cy="104" r="15" fill="var(--orange)" />
      <circle cx="480" cy="40" r="15" fill="var(--orange)" />
      <path d="M0 296 H 480" stroke="currentColor" strokeWidth="3" opacity=".3" />
    </>
  ),
  network: (
    <>
      <path
        d="M40 232 C 150 80, 330 64, 470 150"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeDasharray="12 18"
        opacity=".45"
      />
      <path
        d="M40 232 L 250 176 L 470 150"
        fill="none"
        stroke="var(--orange)"
        strokeWidth="8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="40" cy="232" r="17" fill="var(--orange)" />
      <circle cx="250" cy="176" r="22" fill="none" stroke="var(--orange)" strokeWidth="8" />
      <circle cx="470" cy="150" r="17" fill="var(--orange)" />
    </>
  ),
  bars: (
    <>
      <rect x="30" y="182" width="78" height="112" rx="10" fill="var(--orange)" opacity=".3" />
      <rect x="130" y="138" width="78" height="156" rx="10" fill="var(--orange)" opacity=".55" />
      <rect x="230" y="84" width="78" height="210" rx="10" fill="var(--orange)" />
      <path
        d="M346 168 C 390 122, 424 90, 470 52"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="m448 48 26 2-3 26"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
};

export default function PostCover({ variant = "trend", className = "" }) {
  return (
    <div className={`post-cover ${className}`} aria-hidden="true">
      <svg viewBox="0 0 500 320" preserveAspectRatio="xMidYMid slice">
        {art[variant] ?? art.trend}
      </svg>
    </div>
  );
}
