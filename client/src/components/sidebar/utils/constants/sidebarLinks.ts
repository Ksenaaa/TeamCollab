import { ComponentType, SVGProps } from 'react'
import HomeIcon from '@/assets/icons/home-icon.svg'
import BoardsIcon from '@/assets/icons/board-icon.svg'
import UsersIcon from '@/assets/icons/users-icon.svg'
import { RouterPath } from '@/utils/constants/routerPath'

export const sidebarLinks: Partial<Record<RouterPath, { id: RouterPath, label: string, icon: ComponentType<SVGProps<SVGSVGElement>> }>> = {
    [RouterPath.PROJECTS]: {
        id: RouterPath.PROJECTS,
        label: 'Projects',
        icon: HomeIcon,
    },
    [RouterPath.BOARDS]: {
        id: RouterPath.BOARDS,
        label: 'Boards',
        icon: BoardsIcon,
    },
    [RouterPath.USERS]: {
        id: RouterPath.USERS,
        label: 'Users',
        icon: UsersIcon,
    },
}
