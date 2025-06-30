import { SidebarLink } from "./SidebarLink"

export const Sidebar = () => {
    return (
        <aside className="w-64 bg-white shadow-lg p-6 flex flex-col rounded-r-xl">
            <div className="text-2xl font-bold text-indigo-700 mb-8">
                My Dashboard
            </div>
            <nav className="space-y-4">
                <SidebarLink
                    label="Home"
                    icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2 2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    href={'home'}
                // isActive={activePage === 'home'}
                />
                <SidebarLink
                    label="Boards"
                    icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    href={'boards'}
                // isActive={activePage === 'boards'}
                />
                <SidebarLink
                    label="Members"
                    icon="M17 20h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v11a2 2 0 002 2zM7 10h2a2 2 0 002-2V3a2 2 0 00-2-2H7a2 2 0 00-2 2v5a2 2 0 002 2zm6 10h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v11a2 2 0 002 2z"
                    href={'members'}
                // isActive={activePage === 'members'}
                />
            </nav>
        </aside>
    )
}
