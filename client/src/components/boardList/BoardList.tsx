'use client'

import { Draggable, Droppable } from "@hello-pangea/dnd"
import { BoardListTask } from "../boardListTask/BoardListTask"
import { DeleteBoardList } from "./deleteBoardList/DeleteBoardList"
import { UpdateBoardList } from "./updateBoardList/UpdateBoardList"
import { ListWithTaskType } from "@/models/boardTypes"
import { memo } from "react"

interface BoardListProps {
    list: ListWithTaskType,
    index: number,
}

export const BoardList: React.FC<BoardListProps> = memo(({ list, index }) => {
    return (
        <Draggable draggableId={list.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="flex-shrink-0 w-60 sm:w-80 rounded-xl shadow-md bg-white overflow-hidden"
                >
                    <div {...provided.dragHandleProps} className="w-full bg-gray-100 p-4 flex justify-between items-center">
                        <p className="text-lg font-semibold">{list.name}</p>
                        <div className="flex flex-row">
                            <UpdateBoardList list={list} />
                            <DeleteBoardList list={list} />
                        </div>
                    </div>

                    <Droppable droppableId={list.id} type="task">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`flex flex-col space-y-2 min-h-[50px] p-3 transition-colors duration-300 ease-in-out 
                                    ${snapshot.isDraggingOver ? 'bg-blue-100' : ''}
                                `}
                            >
                                {list.tasks.map((task, taskIndex) => (
                                    <BoardListTask key={task.id} task={task} index={taskIndex} />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    )
})

BoardList.displayName = 'BoardList'
