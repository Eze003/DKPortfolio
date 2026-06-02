import { DESKTOP_ROWS_PER_COLUMN, type Project } from "@/data/projects";
import { AppIcon } from "@/components/AppIcon";

type DesktopIconGridProps = {
  projects: Project[];
  onOpen: (id: string) => void;
};

export function DesktopIconGrid({ projects, onOpen }: DesktopIconGridProps) {
  return (
    <aside
      className="desktop-icons absolute left-3 top-6 z-10 max-h-[calc(100dvh-7rem)] sm:left-6 sm:top-8"
      aria-label="Projects"
    >
      <div
        className="grid max-h-[inherit] auto-cols-max grid-flow-col gap-x-5 gap-y-6 overflow-y-auto pl-1 sm:gap-x-6 sm:gap-y-7"
        style={{
          gridTemplateRows: `repeat(${DESKTOP_ROWS_PER_COLUMN}, minmax(5.75rem, auto))`,
        }}
      >
        {projects.map((project) => (
          <AppIcon
            key={project.id}
            project={project}
            onOpen={() => onOpen(project.id)}
          />
        ))}
      </div>
    </aside>
  );
}
