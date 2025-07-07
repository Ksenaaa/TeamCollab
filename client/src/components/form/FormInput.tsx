import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { InputText } from '@/components/inputText/InputText';

type FormInputProps<T extends FieldValues> = {
    control: Control<T>,
    fieldName: FieldPath<T>,
    fieldLabel: string,
    type?: string,
}

export const FormInput = <T extends FieldValues>({ control, fieldName, fieldLabel, type }: FormInputProps<T>) => {
    const { field, fieldState: { error } } = useController({
        name: fieldName,
        control
    });

    return (
        <InputText
            {...field}
            label={fieldLabel}
            type={type}
            placeholder={fieldLabel}
            errorText={error?.message}
        />
    );
};
