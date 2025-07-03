import Link from "next/link";
import { ComponentType, SVGProps } from "react";

interface SidebarLinkProps {
    label: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    href: string;
    isActive?: boolean;
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({ label, icon: Icon, href, isActive }) => {
    return (
        <Link
            href={`/${href}`}
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
