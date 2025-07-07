'use client'

import { Button } from "@/components/button/Button";
import { useToggle } from "@/utils/hooks/useToggle";
import { CreateNewBoardModalForm } from "./CreateNewBoardModalForm";

interface CreateNewBoardProps {
    projectId: string;
}

export const CreateNewBoard: React.FC<CreateNewBoardProps> = ({ projectId }) => {
    const { isOpen, onToggle } = useToggle();

    return (
        <>
            <Button onClick={onToggle} title="Add New Board" />
            {isOpen &&
                <CreateNewBoardModalForm
                    projectId={projectId}
                    isOpenModal={isOpen}
                    onCloseModal={onToggle}
                />
            }
        </>
    )
}
