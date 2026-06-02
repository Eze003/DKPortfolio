type DockNotesIconProps = {
  size: number;
};

/** macOS-style Notes: white pad, yellow header, ruled lines */
export function DockNotesIcon({ size }: DockNotesIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0 drop-shadow-sm"
    >
      <rect width="40" height="40" rx="9" fill="white" />
      <rect x="0" y="0" width="40" height="11" rx="9" fill="#F5D565" />
      <rect x="0" y="9" width="40" height="2" fill="#E8C84A" />
      <line x1="8" y1="18" x2="32" y2="18" stroke="#C8C8C8" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="8" y1="23" x2="32" y2="23" stroke="#C8C8C8" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="8" y1="28" x2="28" y2="28" stroke="#C8C8C8" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="8" y1="33" x2="30" y2="33" stroke="#C8C8C8" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
