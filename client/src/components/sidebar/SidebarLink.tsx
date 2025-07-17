import { RouterPath } from "@/utils/constants/routerPath";
import Link from "next/link";
import { sidebarLinks } from "./utils/constants/sidebarLinks";

interface SidebarLinkProps {
    path: RouterPath;
    isActive: boolean;
    projectId?: string;
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({ path, isActive, projectId = '' }) => {
    if (!sidebarLinks[path]) return null;

    const { label, icon: Icon, id: href } = sidebarLinks[path];

    return (
        <Link
            href={`/${projectId}${href}`}
            className={`rounded-full border transition-colors flex items-center justify-left font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]
                ${isActive
                    ? 'text-blue font-semibold shadow-md'
                    : 'text-gray-800 hover:text-blue'
                }`}
        >
            <Icon className='mr-3 h-6 w-6' />
            {label}
        </Link>
    );
};
