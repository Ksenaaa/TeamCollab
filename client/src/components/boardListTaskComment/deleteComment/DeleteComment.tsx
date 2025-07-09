import { useTransition } from "react";
import { ButtonIcon } from "@/components/button/ButtonIcon"
import { useToggle } from "@/utils/hooks/useToggle";
import { ModalApp } from "@/components/modal/ModalApp";
import { toast } from "react-toastify";
import RejectIcon from "@/assets/icons/cross-icon.svg";
import { CommentWithUserType } from "@/models/boardTypes";
import { deleteCommentAction } from "@/actions/commentActions";

interface DeleteCommentProps {
    comment: CommentWithUserType
}

export const DeleteComment: React.FC<DeleteCommentProps> = ({ comment }) => {
    const { isOpen, onToggle } = useToggle()
    const [isPending, startTransition] = useTransition();

    const handleDeleteComment = async () => {
        startTransition(async () => {
            const result = await deleteCommentAction(comment.id)

            if (result.success) {
                toast.success(result.message);
                onToggle();
                return
            }

            toast.error(`Error deleting comment: ${result.error || 'Unknown error'}`);
        })
    }

    return (
        <>
            <ButtonIcon
                styles={{ width: '36px', height: '36px' }}
                icon={<RejectIcon className={'text-red'} />}
                onClick={onToggle}
                isLoading={isPending}
            />
            {isOpen &&
                <ModalApp
                    isOpen={isOpen}
                    onClose={onToggle}
                    header="Delete Comment"
                    onAgree={handleDeleteComment}
                    isPending={isPending}
                >
                    <div className="w-100 max-w-full flex flex-col">
                        <p>Are you sure you want to delete comment?</p>
                    </div>
                </ModalApp>
            }
        </>
    )
}
