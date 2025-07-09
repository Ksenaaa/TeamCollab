import { Button } from "@/components/button/Button";
import { useToggle } from "@/utils/hooks/useToggle";
import { CreateNewCommentModalForm } from "./CreateNewCommentModalForm";
import { TaskWithAssignedType } from "@/models/boardTypes";

interface CreateNewCommentProps {
    task: TaskWithAssignedType
}

export const CreateNewComment: React.FC<CreateNewCommentProps> = ({ task }) => {
    const { isOpen, onToggle } = useToggle();

    return (
        <>
            <Button onClick={onToggle} title="Add Comment" />
            {isOpen &&
                <CreateNewCommentModalForm
                    isOpenModal={isOpen}
                    onCloseModal={onToggle}
                    task={task}
                />
            }
        </>
    )
}
