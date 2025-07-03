import { Board, List, Task } from "@/generated/prisma";
import { BoardList } from "./boardList/BoardList";
import { CreateNewTask } from "./createNewTask/CreateNewTask";
import { CreateNewList } from "./createNewList/CreateNewList";

interface BoardProps {
    board: Board & {
        lists: (List & { tasks: Task[] })[]
    }
}

export const BoardComponent: React.FC<BoardProps> = ({ board }) => {
    return (
        <div className="w-250 max-w-full h-150 border border-solid border-indigo rounded-xl p-4">
            <div className="h-full flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-2 justify-between">
                    <CreateNewTask />
                    <CreateNewList />
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
