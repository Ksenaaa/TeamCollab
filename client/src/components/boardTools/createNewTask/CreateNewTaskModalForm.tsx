import { Board, List } from "@/generated/prisma";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { TaskFormData, TaskSchema } from "./constants/taskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalApp } from "@/components/modal/ModalApp";
import { FormInput } from "@/components/form/FormInput";
import { FormCombobox } from "@/components/form/FormCombobox";
import { useAsyncData } from "@/utils/hooks/useAsyncData";
import { getUsersShortAction } from "@/actions/userActions";
import { createTaskAction } from "@/actions/taskActions";
import { defaultValuesTask } from "./constants/defaultValuesTask";

interface CreateNewTaskModalFormProps {
    board: Board & { lists: List[] }
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
            await createTaskAction({
                name: data.name,
                description: data.description,
                dateEnd: new Date(data.dateEnd),
                assigned: { connect: { id: data.assigned?.id } },
                list: {
                    connect: { id: data.list?.id, board: { projectId: board.projectId, id: board.id } }
                },
            })
            handleCloseModal();
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
                    fieldName="list"
                    fieldLabel="List"
                    displayValue={(list) => list?.name || ''}
                    getKey={(list) => list.id}
                    control={control}
                    options={board.lists}
                />
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
