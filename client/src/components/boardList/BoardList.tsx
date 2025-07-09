'use client'

import { BoardListTask } from "../boardListTask/BoardListTask"
import { DeleteBoardList } from "./deleteBoardList/DeleteBoardList"
import { UpdateBoardList } from "./updateBoardList/UpdateBoardList"
import { ListWithTaskType } from "@/models/boardTypes"

interface BoardListProps {
    list: ListWithTaskType
}

export const BoardList: React.FC<BoardListProps> = ({ list }) => {

    return (
        <div className="w-full h-full max-w-full bg-white rounded-xl shadow-md">
            <div className="w-full bg-gray-100 p-4 mb-3 flex justify-between items-center">
                <p className="text-lg font-semibold">{list.name}</p>
                <div className="flex flex-row">
                    <UpdateBoardList list={list} />
                    <DeleteBoardList list={list} />
                </div>
            </div>
            <div className="flex flex-col gap-2 p-4">
                {list.tasks.map(task => (
                    <BoardListTask key={task.id} task={task} />
                ))}
            </div>
        </div>
    )
}
