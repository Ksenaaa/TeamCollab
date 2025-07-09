import { LoadingIcon } from "../loading/Loading";

interface ButtonIconProps {
    icon: React.ReactNode;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
    isLoading?: boolean;
}

export const ButtonIcon = ({
    icon,
    onClick,
    className = "",
    disabled = false,
    isLoading
}: ButtonIconProps) => {
    return (
        <button
            aria-label="Button Icon"
            type="button"
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`flex items-center justify-center p-2 rounded-full transition-all duration-200
                ${disabled || isLoading
                    ? "cursor-auto"
                    : `cursor-pointer hover:brightness-110 hover:scale-120`
                }
                ${className}`}
        >
            <span className='relative w-[36px] h-[36px]'>
                {isLoading
                    ? <LoadingIcon className='absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]' />
                    : icon
                }
            </span>
        </button>
    );
};
