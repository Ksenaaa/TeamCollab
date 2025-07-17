import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalApp } from "@/components/modal/ModalApp";
import { FormInput } from "@/components/form/FormInput";
import { UsersShort } from "@/models/userShort";
import { UserUpdateFormData, UserUpdateSchema } from "../constants/userSchema";
import { userRoles } from "@/utils/constants/userRoles";
import { updateUserAction } from "@/actions/userActions";
import { FormCombobox } from "@/components/form/FormCombobox";

interface UpdateUserModalFormProps {
    isOpenModal: boolean;
    onCloseModal: () => void;
    user: UsersShort
}

export const UpdateUserModalForm: React.FC<UpdateUserModalFormProps> = ({ isOpenModal, onCloseModal, user }) => {
    const [isPending, startTransition] = useTransition();

    const { handleSubmit, control, reset } = useForm<UserUpdateFormData>({
        resolver: zodResolver(UserUpdateSchema),
        defaultValues: { email: user.email, name: user.name, role: { id: user.role, name: userRoles.find(role => role.id === user.role)?.name || ('') } }
    });
    const handleCloseModal = () => {
        onCloseModal();
        reset();
    }

    const handleUpdateUser = handleSubmit((data: UserUpdateFormData) => {
        startTransition(async () => {
            const result = await updateUserAction(user.id, { name: data.name, email: data.email, role: data.role?.id })

            if (result?.success) {
                toast.success(result.message);
                handleCloseModal();
                return
            }

            toast.error('Error updating user');
        });
    })

    return (
        <ModalApp
            isOpen={isOpenModal}
            onClose={handleCloseModal}
            header="Update User"
            onAgree={handleUpdateUser}
            isPending={isPending}
        >
            <div className="w-100 max-w-full flex flex-col gap-4">
                <FormInput fieldName="name" fieldLabel="Name" control={control} />
                <FormInput fieldName="email" fieldLabel="Email" control={control} />
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
