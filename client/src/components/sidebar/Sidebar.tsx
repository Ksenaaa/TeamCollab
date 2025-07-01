'use client'

import { usePathname, } from "next/navigation"
import { SidebarLink } from "./SidebarLink"
import { mainLinks, projectLinks } from './utils/constants/sidebarLinks'
import { SidebarProjects } from "./SidebarProjects"
import { useState } from "react"
import { Project } from "@/generated/prisma"

export const Sidebar = () => {
    const [selected, setSelected] = useState<Project | null>(null)

    const pathname = usePathname()
    const isActive = (href: string) => pathname === `/${href}`

    console.log(pathname)
    return (
        <aside className="w-64 space-y-6 bg-white shadow-lg p-6 flex flex-col rounded-r-xl">
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
                        isActive={isActive(link.href)}
                    />
                )}
            </nav>

            <SidebarProjects onSelectProject={setSelected} selectedProject={selected} />
            <nav className="space-y-3">
                {selected && projectLinks.map((link) =>
                    <SidebarLink
                        key={link.href}
                        label={link.label}
                        icon={link.icon}
                        href={link.href}
                        isActive={isActive(link.href)}
                    />
                )}
            </nav>
        </aside>
    )
}
