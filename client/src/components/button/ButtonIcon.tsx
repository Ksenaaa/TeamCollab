interface ButtonIconProps {
    icon: React.ReactNode;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
}

export const ButtonIcon = ({
    icon,
    onClick,
    className = "",
    disabled = false,
}: ButtonIconProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center justify-center p-2 rounded-full transition-all duration-200
                ${disabled
                    ? "cursor-auto"
                    : `cursor-pointer hover:brightness-110 hover:scale-120`
                }
                ${className}`}
        >
            <span className='w-[36px] h-[36px]'>
                {icon}
            </span>
        </button>
    );
};
