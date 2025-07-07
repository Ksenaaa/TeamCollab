import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { ComboboxCustom } from '@/components/combobox/Combobox';

type FormInputProps<FormType extends FieldValues, OptionType> = {
    control: Control<FormType>,
    fieldName: FieldPath<FormType>,
    fieldLabel: string,
    options: OptionType[],
    disabled?: boolean
    displayValue: (value: OptionType) => string,
    getKey: (value: OptionType) => string,
    isPending?: boolean,
}

export const FormCombobox = <FormType extends FieldValues, OptionType>({
    control, fieldName, fieldLabel, displayValue, getKey, options, disabled, isPending
}: FormInputProps<FormType, OptionType>) => {
    const { field, fieldState: { error } } = useController({
        name: fieldName,
        control
    });

    return (
        <ComboboxCustom
            name={fieldName}
            value={field.value}
            onChange={field.onChange}
            label={fieldLabel}
            displayValue={displayValue}
            getKey={getKey}
            options={options}
            placeholder={fieldLabel}
            errorText={error?.message}
            isPending={isPending}
            disabled={isPending || disabled}
        />
    );
};
