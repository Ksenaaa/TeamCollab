'use client'

import { UseFormRegisterReturn } from "react-hook-form";

interface InputTextProps {
    name: string,
    label: string,
    type?: string,
    placeholder?: string,
    className?: string,
    errorText?: string,
    register: UseFormRegisterReturn,
}

export const InputText: React.FC<InputTextProps> = ({ name, label, type, register, placeholder, errorText, className }) => {
    return (
        <div className="w-full">
            {label && <label htmlFor={name} className="text-sm font-medium text-indigo block text-start break-words">{label}</label>}
            <input
                {...register}
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                className={`block w-full rounded-md border-1 bg-white py-1.5 pl-3 pr-7 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo sm:text-sm sm:leading-6
                    ${errorText
                        ? 'border-red text-red focus:ring-red focus:border-red'
                        : 'border-gray-600'
                    }
                    ${className}
                `}
                aria-invalid={!!errorText}
                aria-describedby={errorText ? `${name}-error` : undefined}
            />
            {errorText && (
                <p className="mt-1 text-xs text-start break-words text-red" id={`${name}-error`}>
                    {errorText}
                </p>
            )}
        </div>
    );
};
