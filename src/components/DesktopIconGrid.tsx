import { DESKTOP_ROWS_PER_COLUMN, type Project } from "@/data/projects";
import { AppIcon } from "@/components/AppIcon";

type DesktopIconGridProps = {
  projects: Project[];
  onOpen: (id: string) => void;
  isLoading?: boolean;
};

export function DesktopIconGrid({ projects, onOpen, isLoading = false }: DesktopIconGridProps) {
  return (
    <aside
      className={[
        // Mobile: full-width scrollable zone above the dock
        "desktop-icons absolute inset-x-3 top-6 bottom-28 z-10 overflow-y-auto",
        // Desktop: restore left-anchored column layout
        "sm:inset-x-auto sm:left-6 sm:right-auto sm:top-8 sm:bottom-auto sm:max-h-[calc(100dvh-7rem)] sm:overflow-y-auto",
      ].join(" ")}
      aria-label="Projects"
    >
      <div
        className="desktop-grid pl-1"
        // On desktop apply the column-count via inline style; on mobile the CSS class handles auto-fill
        style={{
          // The sm media query in globals.css re-enables grid-auto-flow:column,
          // so we still need to supply the row count for the desktop layout.
          // Using a CSS custom property so globals.css can read it if needed.
          // @ts-expect-error CSS custom property
          "--desktop-rows": DESKTOP_ROWS_PER_COLUMN,
        }}
      >
        {isLoading ? (
          Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="flex flex-col items-center gap-1.5 p-1.5"
              style={{ width: "var(--desktop-cell-width)" }}
            >
              <div
                className="rounded-[22px] bg-white/5 border border-white/10 animate-pulse shadow-lg"
                style={{
                  width: "calc(var(--desktop-icon-size) + 12px)",
                  height: "calc(var(--desktop-icon-size) + 12px)",
                }}
              />
              <div className="h-3 w-14 bg-white/10 rounded animate-pulse mt-1" />
            </div>
          ))
        ) : (
          projects.map((project) => (
            <AppIcon
              key={project.id}
              project={project}
              onOpen={() => onOpen(project.id)}
            />
          ))
        )}
      </div>
    </aside>
  );
}
