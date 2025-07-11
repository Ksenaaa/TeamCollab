'use client'

import { ModalApp } from "@/components/modal/ModalApp"
import { StatusElement } from "@/components/statusElement/StatusElement"
import { useToggle } from "@/utils/hooks/useToggle"
import { TaskData } from "./taskData/TaskData"
import { TaskWithAssignedType } from "@/models/boardTypes"
import { Draggable } from "@hello-pangea/dnd"

interface BoardListProps {
    task: TaskWithAssignedType,
    index: number,
}

export const BoardListTask: React.FC<BoardListProps> = ({ task, index }) => {
    const { isOpen, onToggle } = useToggle()

    return (
        <>
            <Draggable draggableId={task.id} index={index}>
                {(provided) => (
                    <div
                        onClick={onToggle}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`bg-white rounded-xl shadow hover:shadow-md cursor-pointer transition-shadow border border-gray-200 p-4 space-y-2`}
                    >
                        <p className="text-base font-semibold text-gray-800 truncate">
                            {task.name}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <span className="font-medium">Status:</span>
                            <StatusElement status={task.status} />
                        </div>
                    </div>
                )}
            </Draggable>
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
