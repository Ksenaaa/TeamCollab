'use client'

import { Button } from "@/components/button/Button";
import { Board } from "@/generated/prisma";
import { useToggle } from "@/utils/hooks/useToggle";
import { CreateNewTaskModalForm } from "./CreateNewTaskModalForm";

interface CreateNewTaskProps {
    board: Board
}

export const CreateNewTask: React.FC<CreateNewTaskProps> = ({ board }) => {
    const { isOpen, onToggle } = useToggle();

    return (
        <>
            <Button onClick={onToggle} title="Add Task" />
            {isOpen &&
                <CreateNewTaskModalForm
                    isOpenModal={isOpen}
                    onCloseModal={onToggle}
                    board={board}
                />
            }
        </>
    )
}
