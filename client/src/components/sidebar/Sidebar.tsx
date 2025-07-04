'use client'

import { useParams, usePathname, useRouter } from "next/navigation"
import { SidebarLink } from "./SidebarLink"
import { mainLinks, projectLinks } from './utils/constants/sidebarLinks'
import { SidebarProjects } from "./projectSection/SidebarProjects"
import { memo, useCallback, useMemo } from "react"
import { Project } from "@/generated/prisma"

interface SidebarProps {
    projects: Project[]
}

export const Sidebar: React.FC<SidebarProps> = memo(({ projects }) => {
    const pathname = usePathname()
    const params = useParams()
    const router = useRouter();

    const selectedProject = useMemo(() => {
        return projects.find(project => project.id === params?.projectId) || null
    }, [projects, params?.projectId])

    const handleSelectProject = useCallback((project: Project) => {
        if (!project) return;
        router.push(`/${project.id}/boards`);
    }, [router])

    return (
        <aside className="w-0 invisible p-0 sm:visible sm:p-6 sm:w-64 space-y-6 bg-white shadow-lg flex flex-col rounded-r-xl">
            <div className="text-2xl font-bold text-indigo mb-8">
                My Dashboard
            </div>
            <nav className="space-y-3">
                {mainLinks.map((link) =>
                    <SidebarLink
                        key={link.href}
                        label={link.label}
                        icon={link.icon}
                        href={link.href}
                        isActive={pathname === `/${link.href}`}
                    />
                )}
            </nav>

            <SidebarProjects projects={projects} selectedProject={selectedProject} onSelectProject={handleSelectProject} />

            <nav className="space-y-3">
                {selectedProject && projectLinks.map((link) =>
                    <SidebarLink
                        key={link.href}
                        label={link.label}
                        icon={link.icon}
                        href={`${params?.projectId}/${link.href}`}
                        isActive={pathname === `/${params?.projectId}/${link.href}`}
                    />
                )}
            </nav>
        </aside>
    )
})

Sidebar.displayName = 'Sidebar'
