import { useToggle } from "@/utils/hooks/useToggle"
import ChevronUp from "@/assets/icons/chevron-up-svgrepo-com.svg"
import { Project } from "@/generated/prisma"
import { SidebarProjectList } from "./SidebarProjectList"

interface SidebarProjectsProps {
    onSelectProject: (project: Project) => void;
    selectedProject: Project | null
}

export const SidebarProjects: React.FC<SidebarProjectsProps> = ({ selectedProject, onSelectProject }) => {
    const { isOpen, onToggle } = useToggle()

    const handleSelect = (project: Project) => {
        onSelectProject(project)
        onToggle()
    }

    return (
        <div>
            <label id="listbox-label" className="block text-md font-bold text-indigo">My projects</label>
            <div className="relative mt-2">
                <button
                    onClick={onToggle}
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-labelledby="listbox-label"
                    className="w-full cursor-pointer rounded-md bg-white py-1.5 px-3 text-left text-gray-800 outline outline-gray-400 focus:outline-2 focus:outline-blue sm:text-sm"
                >
                    <span className="w-full flex flex-row justify-between items-center gap-3">
                        <span className="block truncate">{selectedProject?.name}</span>
                        <ChevronUp className={`w-[6px] h-[6px] transition-transform ${isOpen && 'rotate-180'}`} />
                    </span>
                </button>

                {isOpen &&
                    <SidebarProjectList onSelectProject={handleSelect} selectedProjectId={selectedProject?.id} />
                }
            </div>
        </div>
    )
}
