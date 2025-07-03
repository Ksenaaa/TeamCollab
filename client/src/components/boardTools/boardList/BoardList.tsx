import { List, Task } from "@/generated/prisma"
import { BoardListTask } from "../boardListTask/BoardListTask"

interface BoardListProps {
    list: List & {
        tasks: Task[]
    }
}

export const BoardList: React.FC<BoardListProps> = ({ list }) => {

    return (
        <div className="w-full h-full max-w-full bg-white rounded-xl shadow-md">
            <div className="w-full bg-gray-100 p-4 mb-3">
                <h3 className="text-lg font-semibold">{list.name}</h3>
            </div>
            <div className="flex flex-col gap-2 p-4">
                {list.tasks.map(task => (
                    <BoardListTask key={task.id} task={task} />
                ))}
            </div>
        </div>
    )
}
