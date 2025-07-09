import { createListAction } from "@/actions/listActions";
import { ModalApp } from "@/components/modal/ModalApp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { ListFormData, ListSchema } from "../constants/listSchema";
import { Board } from "@/generated/prisma";
import { FormInput } from "@/components/form/FormInput";
import { toast } from "react-toastify";

interface CreateNewListModalFormProps {
    board: Board,
    isOpenModal: boolean,
    onCloseModal: () => void,
}

export const CreateNewListModalForm: React.FC<CreateNewListModalFormProps> = ({ board, isOpenModal, onCloseModal }) => {
    const [isPending, startTransition] = useTransition();

    const { handleSubmit, control, reset } = useForm<ListFormData>({
        resolver: zodResolver(ListSchema),
        defaultValues: { name: '' }
    });

    const handleCloseModal = () => {
        onCloseModal();
        reset();
    }

    const handleCreateList = handleSubmit((data: ListFormData) => {
        startTransition(async () => {
            const result = await createListAction({ ...data, board: { connect: { id: board.id, projectId: board.projectId } } });

            if (result.success) {
                toast.success(result.message);
                handleCloseModal();
                return
            }

            toast.error(`Error creating list: ${result.error || 'Unknown error'}`);
        });
    })

    return (
        <ModalApp
            isOpen={isOpenModal}
            onClose={handleCloseModal}
            header="Create New List"
            onAgree={handleCreateList}
            isPending={isPending}
        >
            <div className="w-100 max-w-full flex flex-col gap-4">
                <FormInput fieldName="name" fieldLabel="Name" control={control} />
            </div>
        </ModalApp>
    )
}
