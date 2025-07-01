import { Board, List, Task } from "@/generated/prisma";
import { BoardList } from "./boardList/BoardList";
import { CreateNewTask } from "./createNewTask/CreateNewTask";

interface BoardProps {
    board: Board & {
        lists: (List & { tasks: Task[] })[]
    }
}

export const BoardComponent: React.FC<BoardProps> = ({ board }) => {
    return (
        <div className="w=full h-100 border border-solid border-indigo rounded-xl p-2">
            <div className="h-full flex flex-col gap-2">
                <CreateNewTask />

                <div className="h-full flex flex-row gap-2">
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
