import Link from "next/link";

interface SidebarLinkProps {
    label: string;
    icon: string;
    href: string;
    isActive?: boolean;
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({ label, icon, href, isActive }) => {
    return (
        <Link
            href={href}
            className={`rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-left hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]
        ${isActive
                    ? 'bg-indigo-100 text-indigo-700 font-semibold shadow-md'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                }`}
        >
            <svg
                className="w-6 h-6 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon}></path>
            </svg>
            {label}
        </Link>
    );
};

// className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-left hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
