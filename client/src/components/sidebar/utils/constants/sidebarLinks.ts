import HomeIcon from '@/assets/icons/home-icon.svg'
import BoardsIcon from '@/assets/icons/board-icon.svg'
import TeamsIcon from '@/assets/icons/team-icon.svg'
import UsersIcon from '@/assets/icons/users-icon.svg'
import { RouterPath } from '@/utils/constants/routerPath'

export const mainLinks = [
    {
        label: 'Home',
        icon: HomeIcon,
        href: RouterPath.HOME,
    },
    {
        label: 'Users',
        icon: UsersIcon,
        href: RouterPath.USERS,
    },
]

export const projectLinks = [
    {
        label: 'Boards',
        icon: BoardsIcon,
        href: RouterPath.BOARDS,
    },
]

export const boardLinks = [
    {
        label: 'Teams',
        icon: TeamsIcon,
        href: RouterPath.TEAMS,
    },
]
