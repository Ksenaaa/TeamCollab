import { ButtonIcon } from "@/components/button/ButtonIcon"
import UpdateIcon from "@/assets/icons/edit-icon.svg"
import { useToggle } from "@/utils/hooks/useToggle";
import { UpdateCommentModalForm } from "./UpdateCommentModalForm";
import { CommentWithUserType } from "@/models/boardTypes";

interface UpdateCommentProps {
    comment: CommentWithUserType
}

export const UpdateComment: React.FC<UpdateCommentProps> = ({ comment }) => {
    const { isOpen, onToggle } = useToggle()

    return (
        <>
            <ButtonIcon styles={{ width: '36px', height: '36px' }} icon={<UpdateIcon className='text-orange' />} onClick={onToggle} />
            {isOpen &&
                <UpdateCommentModalForm
                    isOpenModal={isOpen}
                    onCloseModal={onToggle}
                    comment={comment}
                />
            }
        </>
    )
}
