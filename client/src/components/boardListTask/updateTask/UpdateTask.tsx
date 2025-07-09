import { ButtonIcon } from "@/components/button/ButtonIcon"
import UpdateIcon from "@/assets/icons/edit-icon.svg"
import { useToggle } from "@/utils/hooks/useToggle";
import { UpdateTaskModalForm } from "./UpdateTaskModalForm";
import { TaskWithAssignedType } from "@/models/boardTypes";

interface UpdateTaskProps {
    task: TaskWithAssignedType
}

export const UpdateTask: React.FC<UpdateTaskProps> = ({ task }) => {
    const { isOpen, onToggle } = useToggle()

    return (
        <>
            <ButtonIcon styles={{ width: '36px', height: '36px' }} icon={<UpdateIcon className='text-orange' />} onClick={onToggle} />
            {isOpen &&
                <UpdateTaskModalForm
                    isOpenModal={isOpen}
                    onCloseModal={onToggle}
                    task={task}
                />
            }
        </>
    )
}
