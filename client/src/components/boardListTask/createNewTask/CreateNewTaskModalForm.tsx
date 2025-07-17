import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { TaskFormData, TaskSchema } from "../constants/taskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalApp } from "@/components/modal/ModalApp";
import { FormInput } from "@/components/form/FormInput";
import { FormCombobox } from "@/components/form/FormCombobox";
import { useAsyncData } from "@/utils/hooks/useAsyncData";
import { getUsersShortAction } from "@/actions/userActions";
import { createTaskAction } from "@/actions/taskActions";
import { defaultValuesTask } from "../constants/defaultValuesTask";
import { toast } from "react-toastify";
import { BoardDataType } from "@/models/boardTypes";

interface CreateNewTaskModalFormProps {
    board: BoardDataType
    isOpenModal: boolean,
    onCloseModal: () => void,
}

export const CreateNewTaskModalForm: React.FC<CreateNewTaskModalFormProps> = ({ board, isOpenModal, onCloseModal }) => {
    const [isPending, startTransition] = useTransition();

    const { handleSubmit, control, reset } = useForm<TaskFormData>({
        defaultValues: defaultValuesTask,
        resolver: zodResolver(TaskSchema),
    });

    const handleCloseModal = () => {
        onCloseModal();
        reset();
    }

    const handleCreateTask = handleSubmit((data: TaskFormData) => {
        startTransition(async () => {
            const result = await createTaskAction({
                name: data.name,
                description: data.description,
                dateEnd: new Date(data.dateEnd),
                assigned: { connect: { id: data.assigned?.id } },
                list: {
                    connect: { id: board.lists[0].id }
                },
            })

            if (result?.success) {
                toast.success(result.message);
                handleCloseModal();
                return
            }

            toast.error('Error creating task');
        });
    })

    const { data: dataUsers, isPending: isPendingUsers } = useAsyncData(getUsersShortAction);

    return (
        <ModalApp
            isOpen={isOpenModal}
            onClose={handleCloseModal}
            header="Create New Task"
            onAgree={handleCreateTask}
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
