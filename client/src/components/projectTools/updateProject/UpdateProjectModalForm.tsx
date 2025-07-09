import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalApp } from "@/components/modal/ModalApp";
import { ProjectSchema, ProjectFormData } from "../constants/projectSchema";
import { updateProjectAction } from "@/actions/projectActions";
import { FormInput } from "@/components/form/FormInput";
import { Project } from "@/generated/prisma";
import { toast } from "react-toastify";

interface UpdateProjectModalFormProps {
    isOpenModal: boolean;
    onCloseModal: () => void;
    project: Project;
}

export const UpdateProjectModalForm: React.FC<UpdateProjectModalFormProps> = ({ isOpenModal, onCloseModal, project }) => {
    const [isPending, startTransition] = useTransition();

    const { handleSubmit, control, reset } = useForm<ProjectFormData>({
        resolver: zodResolver(ProjectSchema),
        defaultValues: { name: project.name, description: project.description }
    });

    const handleCloseModal = () => {
        onCloseModal();
        reset();
    }

    const handleUpdateProject = handleSubmit((data: ProjectFormData) => {
        startTransition(async () => {
            const result = await updateProjectAction(project.id, data)

            if (result.success) {
                toast.success(result.message);
                handleCloseModal();
                return
            }

            toast.error(`Error updating project: ${result.error || 'Unknown error'}`);
        });
    })

    return (
        <ModalApp
            isOpen={isOpenModal}
            onClose={handleCloseModal}
            header="Update Project"
            onAgree={handleUpdateProject}
            isPending={isPending}
        >
            <div className="w-100 max-w-full flex flex-col gap-4">
                <FormInput fieldName="name" fieldLabel="Name" control={control} />
                <FormInput fieldName="description" fieldLabel="Description" control={control} />
            </div>
        </ModalApp>
    )
}
