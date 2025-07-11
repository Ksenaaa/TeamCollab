'use client'

import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Field, Label } from '@headlessui/react'
import { useState } from 'react'
import ChevronUpDownIcon from '@/assets/icons/chevron-up-svgrepo-com.svg'
import { LoadingIcon } from '../loading/Loading'

interface ComboboxCustomProps<T> {
    options: T[],
    value?: T | null,
    onChange?: (item: T) => void,
    name?: string,
    errorText?: string,
    label: string,
    disabled?: boolean,
    displayValue: (item: T) => string,
    getKey: (item: T) => string | number,
    placeholder?: string,
    isPending?: boolean,
}

export const ComboboxCustom = <T,>({
    label, name, disabled, value, errorText, options, placeholder, isPending, displayValue, onChange, getKey
}: ComboboxCustomProps<T>) => {
    const [query, setQuery] = useState('')

    const filteredOptions = options.filter((item) =>
        displayValue(item).toLowerCase().includes(query.toLowerCase())
    );

    return (
        <Field disabled={disabled} aria-label={label}>
            <Label className="text-sm font-medium text-indigo block text-start break-words">{label}</Label>
            <Combobox name={name} value={value} onChange={onChange} onClose={() => setQuery('')}>
                {({ open }) =>
                    <div>
                        <ComboboxButton className="relative w-full flex items-center cursor-pointer">
                            <ComboboxInput
                                className={`w-full cursor-pointer rounded-md border-0 bg-white py-1.5 pl-3 pr-7 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo sm:text-sm sm:leading-6
                                    ${errorText
                                        ? 'border-red text-red focus:ring-red focus:border-red'
                                        : 'border-gray-600'
                                    }
                                `}
                                placeholder={placeholder}
                                displayValue={displayValue}
                                onChange={(event) => setQuery(event.target.value)}
                                aria-invalid={!!errorText}
                                aria-describedby={errorText ? `${name}-error` : undefined}
                                autoComplete="off"
                            />
                            {isPending
                                ? <LoadingIcon className='h-3 w-3 absolute top-[50%] right-3 translate-y-[-50%]' />
                                : <ChevronUpDownIcon className={`h-3 w-3 text-gray-600 absolute top-[50%] right-3 translate-y-[-50%] transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                            }
                        </ComboboxButton>
                        <ComboboxOptions
                            anchor="bottom"
                            transition
                            className="origin-top z-10 mt-1 max-h-60 w-(--input-width) overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-gray-600 ring-opacity-5 focus:outline-none sm:text-sm empty:invisible transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0"
                        >
                            {filteredOptions.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none px-4 py-1 text-gray-600">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredOptions.map((item) => (
                                    <ComboboxOption
                                        key={getKey(item)}
                                        value={item}
                                        className="group relative cursor-pointer select-none py-2 pl-8 pr-4 text-gray-800 data-[focus]:bg-blue data-[focus]:text-white"
                                    >
                                        <span className="absolute inset-y-0 left-0 hidden items-center pl-3 group-data-[selected]:flex">
                                            <div className="h-2 w-2 rounded-full bg-green" />
                                        </span>
                                        <span className="block text-sm/4 font-normal group-data-[selected]:font-semibold">{displayValue(item)}</span>
                                    </ComboboxOption>
                                ))
                            )}
                        </ComboboxOptions>
                    </div>
                }
            </Combobox>
            {errorText && (
                <p className="mt-1 text-xs text-start break-words text-red" id={`${name}-error`}>
                    {errorText}
                </p>
            )}
        </Field>
    )
}
