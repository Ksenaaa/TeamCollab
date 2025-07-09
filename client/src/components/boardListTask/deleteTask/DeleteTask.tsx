import { useTransition } from "react";
import { ButtonIcon } from "@/components/button/ButtonIcon"
import { useToggle } from "@/utils/hooks/useToggle";
import { ModalApp } from "@/components/modal/ModalApp";
import { toast } from "react-toastify";
import RejectIcon from "@/assets/icons/cross-icon.svg";
import { TaskWithAssignedType } from "@/models/boardTypes";
import { deleteTaskAction } from "@/actions/taskActions";

interface DeleteTaskProps {
    task: TaskWithAssignedType
}

export const DeleteTask: React.FC<DeleteTaskProps> = ({ task }) => {
    const { isOpen, onToggle } = useToggle()
    const [isPending, startTransition] = useTransition();

    const handleDeleteTask = async () => {
        startTransition(async () => {
            const result = await deleteTaskAction(task.id)

            if (result.success) {
                toast.success(result.message);
                onToggle();
                return
            }

            toast.error(`Error deleting task: ${result.error || 'Unknown error'}`);
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
                    header="Delete Task"
                    onAgree={handleDeleteTask}
                    isPending={isPending}
                >
                    <div className="w-100 max-w-full flex flex-col">
                        <p>Are you sure you want to delete task: &apos;<strong>{task.name}</strong>&apos;?</p>
                    </div>
                </ModalApp>
            }
        </>
    )
}
