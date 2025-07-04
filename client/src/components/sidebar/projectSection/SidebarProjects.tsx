import { Project } from "@/generated/prisma"
import { memo } from "react";
import { ComboboxCustom } from "@/components/combobox/Combobox";

interface SidebarProjectsProps {
    projects: Project[],
    selectedProject: Project | null,
    onSelectProject: (project: Project) => void,
}

export const SidebarProjects: React.FC<SidebarProjectsProps> = memo(({ projects, selectedProject, onSelectProject }) => {
    return (
        <div>
            <div id="listbox-label" className="block text-md font-bold text-indigo mb-4">My projects</div>
            <ComboboxCustom
                options={projects}
                displayValue={(project: Project | null) => project?.name || ''}
                getKey={(project: Project) => project?.id}
                label="Projects"
                selected={selectedProject}
                onChange={onSelectProject}
            />
        </div>
    )
});

SidebarProjects.displayName = 'SidebarProjects'
