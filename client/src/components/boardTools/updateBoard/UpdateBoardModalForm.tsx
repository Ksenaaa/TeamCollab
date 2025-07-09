import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalApp } from "@/components/modal/ModalApp";
import { FormInput } from "@/components/form/FormInput";
import { Board } from "@/generated/prisma";
import { toast } from "react-toastify";
import { BoardFormData, BoardSchema } from "../constants/boardSchema";
import { updateBoardAction } from "@/actions/boardActions";

interface UpdateBoardModalFormProps {
    isOpenModal: boolean;
    onCloseModal: () => void;
    board: Board;
}

export const UpdateBoardModalForm: React.FC<UpdateBoardModalFormProps> = ({ isOpenModal, onCloseModal, board }) => {
    const [isPending, startTransition] = useTransition();

    const { handleSubmit, control, reset } = useForm<BoardFormData>({
        resolver: zodResolver(BoardSchema),
        defaultValues: { name: board.name }
    });

    const handleCloseModal = () => {
        onCloseModal();
        reset();
    }

    const handleUpdateBoard = handleSubmit((data: BoardFormData) => {
        startTransition(async () => {
            const result = await updateBoardAction(board.id, data)

            if (result.success) {
                toast.success(result.message);
                handleCloseModal();
                return
            }

            toast.error(`Error updating board: ${result.error || 'Unknown error'}`);
        });
    })

    return (
        <ModalApp
            isOpen={isOpenModal}
            onClose={handleCloseModal}
            header="Update Board"
            onAgree={handleUpdateBoard}
            isPending={isPending}
        >
            <div className="w-100 max-w-full flex flex-col gap-4">
                <FormInput fieldName="name" fieldLabel="Name" control={control} />
            </div>
        </ModalApp>
    )
}
