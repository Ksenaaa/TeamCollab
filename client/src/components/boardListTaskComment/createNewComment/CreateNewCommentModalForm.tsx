import { ModalApp } from "@/components/modal/ModalApp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/form/FormInput";
import { toast } from "react-toastify";
import { TaskWithAssignedType } from "@/models/boardTypes";
import { CommentFormData, CommentSchema } from "../constants/commentSchema";
import { createCommentAction } from "@/actions/commentActions";
import { useSession } from "next-auth/react";

interface CreateNewCommentModalFormProps {
    task: TaskWithAssignedType,
    isOpenModal: boolean,
    onCloseModal: () => void,
}

export const CreateNewCommentModalForm: React.FC<CreateNewCommentModalFormProps> = ({ task, isOpenModal, onCloseModal }) => {
    const { data: session, } = useSession();

    const [isPending, startTransition] = useTransition();

    const { handleSubmit, control, reset } = useForm<CommentFormData>({
        resolver: zodResolver(CommentSchema),
        defaultValues: { text: '' }
    });

    const handleCloseModal = () => {
        onCloseModal();
        reset();
    }

    const handleCreateComment = handleSubmit((data: CommentFormData) => {
        startTransition(async () => {
            const result = await createCommentAction({
                text: data.text,
                task: { connect: { id: task.id } },
                user: { connect: { id: session?.user.id } }
            });

            if (result?.success) {
                toast.success(result.message);
                handleCloseModal();
                return
            }

            toast.error('Error creating comment');
        });
    })

    return (
        <ModalApp
            isOpen={isOpenModal}
            onClose={handleCloseModal}
            header="Create New Comment"
            onAgree={handleCreateComment}
            isPending={isPending}
        >
            <div className="w-100 max-w-full flex flex-col gap-4">
                <FormInput fieldName="text" fieldLabel="Text" control={control} />
            </div>
        </ModalApp>
    )
}
