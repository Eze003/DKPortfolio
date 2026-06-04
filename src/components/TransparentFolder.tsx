import Image from "next/image";

type TransparentFolderProps = {
  previews: string[];
  size?: string | number;
};

export function TransparentFolder({ previews, size }: TransparentFolderProps) {
  // Size is driven by the CSS custom property --desktop-icon-size (defined in globals.css)
  // so it automatically shrinks on mobile without any JS.
  const cssSize = size ?? "var(--desktop-icon-size)";

  return (
    <div
      className="relative shrink-0"
      style={{ width: cssSize, height: cssSize }}
    >
      <div
        className="absolute overflow-hidden"
        style={{
          left: 8,
          right: 8,
          top: 26,
          bottom: 7,
          borderRadius: "0 0 5px 5px",
        }}
      >
        <div className="flex h-full items-start justify-center gap-0.5 pt-1">
          {previews.slice(0, 3).map((src) => (
            <div
              key={src}
              className="relative h-[18px] w-[18px] shrink-0 overflow-hidden rounded-[2px]"
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="18px"
              />
            </div>
          ))}
        </div>
      </div>

      <svg
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute inset-0 drop-shadow-md"
        style={{ width: cssSize, height: cssSize }}
        aria-hidden
      >
        <defs>
          <linearGradient id="folderGlass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(130, 190, 255, 0.7)" />
            <stop offset="100%" stopColor="rgba(70, 130, 220, 0.45)" />
          </linearGradient>
        </defs>
        <path
          d="M4 15C4 12.69 5.69 11 8 11H22L27 15H62C64.31 15 66 16.69 66 19V58C66 60.31 64.31 62 62 62H8C5.69 62 4 60.31 4 58V15Z"
          fill="url(#folderGlass)"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.75"
        />
        <path
          d="M4 21H66V58C66 60.31 64.31 62 62 62H8C5.69 62 4 60.31 4 58V21Z"
          fill="rgba(255,255,255,0.12)"
        />
      </svg>
    </div>
  );
}
