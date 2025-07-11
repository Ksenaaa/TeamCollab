'use client'

import { Button } from "@/components/button/Button";
import { useToggle } from "@/utils/hooks/useToggle";
import { CreateNewProjectModalForm } from "./CreateNewProjectModalForm";

export const CreateNewProject: React.FC = () => {
    const { isOpen, onToggle } = useToggle();

    return (
        <>
            <Button onClick={onToggle} title="Add New Project" />
            {isOpen &&
                <CreateNewProjectModalForm
                    isOpenModal={isOpen}
                    onCloseModal={onToggle}
                />
            }
        </>
    )
}
