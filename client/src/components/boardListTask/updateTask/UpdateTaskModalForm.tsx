import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalApp } from "@/components/modal/ModalApp";
import { FormInput } from "@/components/form/FormInput";
import { TaskWithAssignedType } from "@/models/boardTypes";
import { TaskFormData, TaskSchema } from "../constants/taskSchema";
import { updateTaskAction } from "@/actions/taskActions";
import { FormCombobox } from "@/components/form/FormCombobox";
import { useAsyncData } from "@/utils/hooks/useAsyncData";
import { getUsersShortAction } from "@/actions/userActions";
import { getFormattedDate } from "@/utils/helpers/formatDateForInput";

interface UpdateTaskModalFormProps {
    isOpenModal: boolean;
    onCloseModal: () => void;
    task: TaskWithAssignedType
}

export const UpdateTaskModalForm: React.FC<UpdateTaskModalFormProps> = ({ isOpenModal, onCloseModal, task }) => {
    const [isPending, startTransition] = useTransition();

    const { handleSubmit, control, reset } = useForm<TaskFormData>({
        resolver: zodResolver(TaskSchema),
        defaultValues: {
            name: task.name,
            description: task.description || '',
            dateEnd: getFormattedDate(task.dateEnd),
            assigned: task.assigned,
        }
    });

    const handleCloseModal = () => {
        onCloseModal();
        reset();
    }

    const handleUpdateTask = handleSubmit((data: TaskFormData) => {
        startTransition(async () => {
            const result = await updateTaskAction(task.id, {
                name: data.name,
                description: data.description,
                dateEnd: new Date(data.dateEnd),
                assigned: { connect: { id: data.assigned?.id } },
            })

            if (result.success) {
                toast.success(result.message);
                handleCloseModal();
                return
            }

            toast.error(`Error updating task: ${result.error || 'Unknown error'}`);
        });
    })

    const { data: dataUsers, isPending: isPendingUsers } = useAsyncData(getUsersShortAction);

    return (
        <ModalApp
            isOpen={isOpenModal}
            onClose={handleCloseModal}
            header="Update Task"
            onAgree={handleUpdateTask}
            isPending={isPending}
        >
            <div className="w-100 max-w-full flex flex-col gap-4">
                <FormInput fieldName="name" fieldLabel="Name" control={control} />
                <FormInput fieldName="description" fieldLabel="Description" control={control} />
                <FormInput fieldName="dateEnd" fieldLabel="Date End" control={control} type="date" />
                <FormCombobox
                    fieldName="assigned"
                    fieldLabel="Assigned"
                    displayValue={(user) => user?.name || ''}
                    getKey={(user) => user.id}
                    control={control}
                    options={dataUsers}
                    isPending={isPendingUsers}
                />
            </div>
        </ModalApp>
    )
}
