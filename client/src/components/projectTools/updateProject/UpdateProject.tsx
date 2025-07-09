"use client"

import { ButtonIcon } from "@/components/button/ButtonIcon"
import UpdateIcon from "@/assets/icons/edit-icon.svg"
import { useToggle } from "@/utils/hooks/useToggle";
import { UpdateProjectModalForm } from "./UpdateProjectModalForm";
import { Project } from "@/generated/prisma";

interface UpdateProjectProps {
    project: Project
}

export const UpdateProject: React.FC<UpdateProjectProps> = ({ project }) => {
    const { isOpen, onToggle } = useToggle()

    return (
        <>
            <ButtonIcon icon={<UpdateIcon className='text-orange' />} onClick={onToggle} />
            {isOpen &&
                <UpdateProjectModalForm
                    isOpenModal={isOpen}
                    onCloseModal={onToggle}
                    project={project}
                />
            }
        </>
    )
}
