import { LoadingIcon } from "@/components/loading/Loading";

interface ButtonProps {
    title: string;
    iconStart?: React.ReactNode;
    iconEnd?: React.ReactNode;
    isLoading?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    mode?: 'full' | 'outline'
}

export const Button: React.FC<ButtonProps> = ({
    title, disabled, iconStart, iconEnd, isLoading, mode = 'full', onClick
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`min-w-[120px] max-w-full font-bold py-2 px-5 rounded-full relative flex flex-row items-center justify-center transition-all duration-200    
                ${disabled || isLoading
                    ? 'bg-gray-200'
                    : mode === 'full'
                        ? 'text-white bg-indigo shadow-md hover:bg-indigo-100 hover:ring-indigo-100 hover:ring-2 focus:outline-none focus:ring-2 focus:ring-indigo focus:ring-opacity-50 cursor-pointer'
                        : 'text-indigo bg-white shadow-md ring-1 ring-indigo hover:ring-indigo-100 hover:ring-2 focus:outline-none focus:ring-2 focus:ring-opacity-50 cursor-pointer'
                }
            `}
        >
            {iconStart && <span className="flex-shrink-0 flex items-center justify-center mr-2">{iconStart}</span>}
            <p className="text-sm">{title}</p>
            {isLoading && <LoadingIcon className='absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]' />}
            {iconEnd && <span className="flex-shrink-0 flex items-center justify-center ml-2">{iconEnd}</span>}
        </button>
    );
};
