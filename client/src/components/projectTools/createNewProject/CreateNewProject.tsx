'use client'

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/button/Button";
import { ModalApp } from "@/components/modal/ModalApp";
import { useToggle } from "@/utils/hooks/useToggle";
import { ProjectSchema, ProjectFormData } from "./constants/projectSchema";
import { createProjectAction } from "@/actions/projectActions";
import { FormInput } from "@/components/form/FormInput";

export const CreateNewProject: React.FC = () => {
    const { isOpen, onToggle } = useToggle();
    const [isPending, startTransition] = useTransition();
    const { handleSubmit, control, reset } = useForm<ProjectFormData>({
        resolver: zodResolver(ProjectSchema),
        defaultValues: { name: '', description: '' }
    });

    const handleCloseModal = () => {
        onToggle();
        reset();
    }

    const handleCreateProject = handleSubmit((data: ProjectFormData) => {
        startTransition(async () => {
            await createProjectAction(data);
            handleCloseModal();
        });
    })

    return (
        <>
            <Button onClick={onToggle} title="Add New Project" />
            <ModalApp
                isOpen={isOpen}
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
        </>
    )
}
