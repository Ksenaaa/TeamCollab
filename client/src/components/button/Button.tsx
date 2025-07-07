import { ComponentType, SVGProps } from "react";

interface ButtonProps {
    title: string;
    iconStart?: ComponentType<SVGProps<SVGSVGElement>>;
    iconEnd?: ComponentType<SVGProps<SVGSVGElement>>;
    onClick?: () => void;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    title, disabled, iconStart: IconStart, iconEnd: IconEnd, onClick
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`text-white font-bold py-2 px-5 rounded-full   
                ${disabled
                    ? 'bg-gray-200'
                    : 'bg-indigo shadow-lg hover:bg-indigo-100 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo focus:ring-opacity-50 cursor-pointer'
                }
            `}
        >
            {IconStart && <IconStart />}
            {title}
            {IconEnd && <IconEnd />}
        </button>
    );
};
