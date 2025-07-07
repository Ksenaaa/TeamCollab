import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { UserFormData, UserSchema } from "./constants/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalApp } from "@/components/modal/ModalApp";
import { FormInput } from "@/components/form/FormInput";
import { FormCombobox } from "@/components/form/FormCombobox";
import { createUserAction } from "@/actions/userActions";
import { defaultValuesUser } from "./constants/defaultValuesUser";
import { userRoles } from "@/utils/constants/userRoles";

interface CreateNewUserModalFormProps {
    isOpenModal: boolean,
    onCloseModal: () => void,
}

export const CreateNewUserModalForm: React.FC<CreateNewUserModalFormProps> = ({ isOpenModal, onCloseModal }) => {
    const [isPending, startTransition] = useTransition();

    const { handleSubmit, control, reset } = useForm<UserFormData>({
        defaultValues: defaultValuesUser,
        resolver: zodResolver(UserSchema),
    });

    const handleCloseModal = () => {
        onCloseModal();
        reset();
    }

    const handleCreateUser = handleSubmit((data: UserFormData) => {
        startTransition(async () => {
            await createUserAction({ ...data, role: data.role?.id })

            handleCloseModal();
        });
    })

    return (
        <ModalApp
            isOpen={isOpenModal}
            onClose={handleCloseModal}
            header="Create New User"
            onAgree={handleCreateUser}
            isPending={isPending}
        >
            <div className="w-100 max-w-full flex flex-col gap-4">
                <FormInput fieldName="name" fieldLabel="Name" control={control} />
                <FormInput fieldName="email" fieldLabel="Email" control={control} />
                <FormInput fieldName="password" fieldLabel="Password" control={control} />
                <FormCombobox
                    fieldName="role"
                    fieldLabel="Role"
                    displayValue={(role) => role?.name || ''}
                    getKey={(role) => role.id}
                    control={control}
                    options={userRoles}
                />
            </div>
        </ModalApp>
    )
}
