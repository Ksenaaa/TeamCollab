'use client'

import { useParams, usePathname, useRouter } from "next/navigation"
import { SidebarLink } from "./SidebarLink"
import { SidebarProjects } from "./projectSection/SidebarProjects"
import { memo, useCallback, useMemo } from "react"
import { Project, Role } from "@/generated/prisma"
import { useSession } from "next-auth/react"
import { SignInUser } from "../signIn/SignInUser"
import { SignOutUser } from "../signout/SignOutUser"
import { RouterPath } from "@/utils/constants/routerPath"

interface SidebarProps {
    projects: Project[]
}

export const Sidebar: React.FC<SidebarProps> = memo(({ projects }) => {
    const { data: session } = useSession();

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
            <div className="flex flex-col items-start gap-2 mb-8 p-4 rounded-lg border-1 border-gray-200">
                {session ? (
                    <>
                        <div className="flex flex-col w-full items-start">
                            <p className="text-md font-semibold break-all">{session.user?.name}</p>
                            <p className="text-sm text-gray-600 break-all">{session.user?.email}</p>
                            <p className="text-sm font-semibold text-gray-600">{`(Role: ${session.user?.role})`}</p>
                        </div>
                        <SignOutUser />
                    </>
                ) : (
                    <>
                        <p className="text-lg">Not signed in</p>
                        <SignInUser />
                    </>
                )}
            </div>
            {session &&
                <>
                    <div className="text-2xl font-bold text-indigo mb-8">
                        My Dashboard
                    </div>
                    <nav className="space-y-3">
                        {session.user.role === Role.ADMIN &&
                            <SidebarLink path={RouterPath.USERS} isActive={pathname.includes(RouterPath.USERS)} />
                        }
                        <SidebarLink path={RouterPath.PROJECTS} isActive={pathname.includes(RouterPath.PROJECTS)} />
                    </nav>

                    <SidebarProjects projects={projects} selectedProject={selectedProject} onSelectProject={handleSelectProject} />

                    <nav className="space-y-3">
                        {selectedProject &&
                            <SidebarLink path={RouterPath.BOARDS} isActive={pathname === `/${params?.projectId}/${RouterPath.BOARDS}`} projectId={`${params?.projectId}/`} />
                        }
                    </nav>
                </>
            }
        </aside>
    )
})

Sidebar.displayName = 'Sidebar'
