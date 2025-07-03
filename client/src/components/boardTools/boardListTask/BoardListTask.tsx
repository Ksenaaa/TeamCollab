'use client'

import { ModalApp } from "@/components/modal/ModalApp"
import { StatusElement } from "@/components/statusElement/StatusElement"
import { Task } from "@/generated/prisma"
import { useToggle } from "@/utils/hooks/useToggle"
import { TaskData } from "./TaskData"

interface BoardListProps {
    task: Task
}

export const BoardListTask: React.FC<BoardListProps> = ({ task }) => {
    const { isOpen, onToggle } = useToggle()

    return (
        <>
            <div onClick={onToggle} className="bg-white rounded-xl shadow hover:shadow-md cursor-pointer transition-shadow border border-gray-200 p-4 space-y-2">
                <h3 className="text-base font-semibold text-gray-800 truncate">
                    {task.name}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-400">
                    <span className="font-medium">Status:</span>
                    <StatusElement status={task.status} />
                </div>
            </div>
            {isOpen &&
                <ModalApp
                    header={`Task: ${task.name}`}
                    isOpen={isOpen}
                    onAgree={onToggle}
                    onClose={onToggle}
                >
                    <TaskData task={task} />
                </ModalApp>
            }
        </>
    )
}
