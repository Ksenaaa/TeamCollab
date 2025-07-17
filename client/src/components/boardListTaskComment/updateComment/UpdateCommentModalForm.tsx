import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalApp } from "@/components/modal/ModalApp";
import { FormInput } from "@/components/form/FormInput";
import { CommentWithUserType } from "@/models/boardTypes";
import { CommentFormData, CommentSchema } from "../constants/commentSchema";
import { updateCommentAction } from "@/actions/commentActions";

interface UpdateCommentModalFormProps {
    isOpenModal: boolean;
    onCloseModal: () => void;
    comment: CommentWithUserType
}

export const UpdateCommentModalForm: React.FC<UpdateCommentModalFormProps> = ({ isOpenModal, onCloseModal, comment }) => {
    const [isPending, startTransition] = useTransition();

    const { handleSubmit, control, reset } = useForm<CommentFormData>({
        resolver: zodResolver(CommentSchema),
        defaultValues: { text: comment.text }
    });

    const handleCloseModal = () => {
        onCloseModal();
        reset();
    }

    const handleUpdateComment = handleSubmit((data: CommentFormData) => {
        startTransition(async () => {
            const result = await updateCommentAction(comment.id, data)

            if (result?.success) {
                toast.success(result.message);
                handleCloseModal();
                return
            }

            toast.error('Error updating comment');
        });
    })

    return (
        <ModalApp
            isOpen={isOpenModal}
            onClose={handleCloseModal}
            header="Update Comment"
            onAgree={handleUpdateComment}
            isPending={isPending}
        >
            <div className="w-100 max-w-full flex flex-col gap-4">
                <FormInput fieldName="text" fieldLabel="Text" control={control} />
            </div>
        </ModalApp>
    )
}
