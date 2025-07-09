'use client'

import { Button } from "@/components/button/Button";
import { useToggle } from "@/utils/hooks/useToggle";
import { CreateNewTaskModalForm } from "./CreateNewTaskModalForm";
import { BoardDataType } from "@/models/boardTypes";

interface CreateNewTaskProps {
    board: BoardDataType
}

export const CreateNewTask: React.FC<CreateNewTaskProps> = ({ board }) => {
    const { isOpen, onToggle } = useToggle();

    return (
        <>
            <Button onClick={onToggle} title="Add Task" disabled={board.lists.length === 0} />
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
