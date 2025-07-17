import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalApp } from "@/components/modal/ModalApp";
import { BoardFormData, BoardSchema } from "../constants/boardSchema";
import { createBoardAction } from "@/actions/boardActions";
import { FormInput } from "@/components/form/FormInput";
import { toast } from "react-toastify";

interface CreateNewBoardModalFormProps {
    projectId: string;
    isOpenModal: boolean;
    onCloseModal: () => void;
}

export const CreateNewBoardModalForm: React.FC<CreateNewBoardModalFormProps> = ({ projectId, isOpenModal, onCloseModal }) => {
    const [isPending, startTransition] = useTransition();

    const { handleSubmit, control, reset } = useForm<BoardFormData>({
        resolver: zodResolver(BoardSchema),
        defaultValues: { name: '' }
    });

    const handleCloseModal = () => {
        onCloseModal();
        reset();
    }

    const handleCreateBoard = handleSubmit((data: BoardFormData) => {
        startTransition(async () => {
            const result = await createBoardAction({ ...data, project: { connect: { id: projectId } } });

            if (result?.success) {
                toast.success(result.message);
                handleCloseModal();
                return
            }

            toast.error('Error creating board');
        });
    })

    return (
        <ModalApp
            isOpen={isOpenModal}
            onClose={handleCloseModal}
            header="Create New Board"
            onAgree={handleCreateBoard}
            isPending={isPending}
        >
            <div className="w-100 max-w-full flex flex-col gap-4">
                <FormInput fieldName="name" fieldLabel="Name" control={control} />
            </div>
        </ModalApp>
    )
}
