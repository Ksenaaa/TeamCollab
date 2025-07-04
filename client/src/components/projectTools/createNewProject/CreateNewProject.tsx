'use client'

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/button/Button";
import { ModalApp } from "@/components/modal/ModalApp";
import { useToggle } from "@/utils/hooks/useToggle";
import { CreateProjectSchema, ProjectFormData } from "./constants/createProjectSchema";
import { createProjectAction } from "@/actions/projectActions";
import { InputText } from "@/components/inputText/InputText";

export const CreateNewProject = () => {
    const { isOpen, onToggle } = useToggle();
    const [isPending, startTransition] = useTransition();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ProjectFormData>({
        resolver: zodResolver(CreateProjectSchema),
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
                    <InputText name="name" label="Name" errorText={errors.name?.message} register={register('name')} />
                    <InputText name="description" label="Description" errorText={errors.description?.message} register={register('description')} />
                </div>
            </ModalApp>
        </>
    )
}
