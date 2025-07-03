'use server'

import prisma from "@/lib/prisma"
import { Project } from "@/generated/prisma"

interface SidebarProjectListProps {
    onSelectProject: (project: Project) => void;
    selectedProjectId?: string
}

export const SidebarProjectList = async ({ onSelectProject, selectedProjectId }: SidebarProjectListProps) => {
    const projects = await prisma.project.findMany()

    return (
        <ul
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden sm:text-sm"
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
        >
            {projects.map(project =>
                <li
                    key={project.id}
                    role="option"
                    onClick={() => onSelectProject(project)}
                    aria-selected={selectedProjectId === project.id}
                    className="flex flex-row justify-between items-center cursor-pointer py-2 px-3 select-none hover:text-blue"
                >
                    <span className={`font-normal ${selectedProjectId === project.id && 'font-bold'}`}>{project.name}</span>
                    {selectedProjectId === project.id && <div className="w-[6px] h-[6px] bg-green rounded-full" />}
                </li>
            )}
        </ul>
    )
}
