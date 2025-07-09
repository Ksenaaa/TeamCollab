import { CSSProperties } from "react";
import { LoadingIcon } from "@/components/loading/Loading";

interface ButtonIconProps {
    icon: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    styles?: CSSProperties
}

export const ButtonIcon = ({
    icon,
    onClick,
    styles,
    disabled = false,
    isLoading
}: ButtonIconProps) => {
    return (
        <button
            aria-label="Button Icon"
            type="button"
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`w-[40px] h-[40px] flex items-center justify-center p-2 rounded-full transition-all duration-200
                ${disabled || isLoading
                    ? "cursor-auto"
                    : `cursor-pointer hover:brightness-110 hover:scale-120`
                }
            `}
            style={styles}
        >
            <span className='relative w-full h-full'>
                {isLoading
                    ? <LoadingIcon className='absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]' />
                    : icon
                }
            </span>
        </button>
    );
};
