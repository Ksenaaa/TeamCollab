import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { List } from "@/generated/prisma";
import { updateListAction } from "@/actions/listActions";
import { ModalApp } from "@/components/modal/ModalApp";
import { FormInput } from "@/components/form/FormInput";
import { ListFormData, ListSchema } from "../constants/listSchema";

interface UpdateBoardListModalFormProps {
    isOpenModal: boolean;
    onCloseModal: () => void;
    list: List;
}

export const UpdateBoardListModalForm: React.FC<UpdateBoardListModalFormProps> = ({ isOpenModal, onCloseModal, list }) => {
    const [isPending, startTransition] = useTransition();

    const { handleSubmit, control, reset } = useForm<ListFormData>({
        resolver: zodResolver(ListSchema),
        defaultValues: { name: list.name }
    });

    const handleCloseModal = () => {
        onCloseModal();
        reset();
    }

    const handleUpdateList = handleSubmit((data: ListFormData) => {
        startTransition(async () => {
            const result = await updateListAction(list.id, data)

            if (result?.success) {
                toast.success(result.message);
                handleCloseModal();
                return
            }

            toast.error('Error updating list');
        });
    })

    return (
        <ModalApp
            isOpen={isOpenModal}
            onClose={handleCloseModal}
            header="Update List"
            onAgree={handleUpdateList}
            isPending={isPending}
        >
            <div className="w-100 max-w-full flex flex-col gap-4">
                <FormInput fieldName="name" fieldLabel="Name" control={control} />
            </div>
        </ModalApp>
    )
}
