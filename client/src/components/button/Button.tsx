import { ComponentType, SVGProps } from "react";
import { LoadingIcon } from "@/components/loading/Loading";

interface ButtonProps {
    title: string;
    iconStart?: ComponentType<SVGProps<SVGSVGElement>>;
    iconEnd?: ComponentType<SVGProps<SVGSVGElement>>;
    isLoading?: boolean;
    onClick?: () => void;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    title, disabled, iconStart: IconStart, iconEnd: IconEnd, isLoading, onClick
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`text-white font-bold py-2 px-5 rounded-full relative   
                ${disabled || isLoading
                    ? 'bg-gray-200'
                    : 'bg-indigo shadow-lg hover:bg-indigo-100 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo focus:ring-opacity-50 cursor-pointer'
                }
            `}
        >
            {IconStart && <IconStart />}
            {title}
            {isLoading && <LoadingIcon className='absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]' />}
            {IconEnd && <IconEnd />}
        </button>
    );
};
