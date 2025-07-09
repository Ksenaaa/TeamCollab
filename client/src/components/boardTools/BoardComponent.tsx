'use client'

import { BoardList } from "../boardList/BoardList";
import { CreateNewTask } from "../boardListTask/createNewTask/CreateNewTask";
import { CreateNewList } from "../boardList/createNewList/CreateNewList";
import { BoardDataType } from "@/models/boardTypes";

interface BoardProps {
    board: BoardDataType
}

export const BoardComponent: React.FC<BoardProps> = ({ board }) => {
    return (
        <div className="w-250 max-w-full h-150 border border-solid border-indigo rounded-xl p-4">
            <div className="h-full flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-2 justify-between">
                    <CreateNewTask board={board} />
                    <CreateNewList board={board} />
                </div>

                <div className="h-full grid md:grid-cols-1 lg:grid-cols-3 gap-3">
                    {board.lists.map(list =>
                        <BoardList
                            key={list.id}
                            list={list}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
