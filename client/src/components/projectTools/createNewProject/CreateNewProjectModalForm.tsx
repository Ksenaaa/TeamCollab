import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalApp } from "@/components/modal/ModalApp";
import { ProjectSchema, ProjectFormData } from "../constants/projectSchema";
import { createProjectAction } from "@/actions/projectActions";
import { FormInput } from "@/components/form/FormInput";
import { toast } from "react-toastify";

interface CreateNewProjectModalFormProps {
    isOpenModal: boolean;
    onCloseModal: () => void;
}

export const CreateNewProjectModalForm: React.FC<CreateNewProjectModalFormProps> = ({ isOpenModal, onCloseModal }) => {
    const [isPending, startTransition] = useTransition();

    const { handleSubmit, control, reset } = useForm<ProjectFormData>({
        resolver: zodResolver(ProjectSchema),
        defaultValues: { name: '', description: '' }
    });

    const handleCloseModal = () => {
        onCloseModal();
        reset();
    }

    const handleCreateProject = handleSubmit((data: ProjectFormData) => {
        startTransition(async () => {
            const result = await createProjectAction(data);

            if (result?.success) {
                toast.success(result.message);
                handleCloseModal();
                return
            }

            toast.error('Error creating project');
        });
    })

    return (
        <ModalApp
            isOpen={isOpenModal}
            onClose={handleCloseModal}
            header="Create New Project"
            onAgree={handleCreateProject}
            isPending={isPending}
        >
            <div className="w-100 max-w-full flex flex-col gap-4">
                <FormInput fieldName="name" fieldLabel="Name" control={control} />
                <FormInput fieldName="description" fieldLabel="Description" control={control} />
            </div>
        </ModalApp>
    )
}
