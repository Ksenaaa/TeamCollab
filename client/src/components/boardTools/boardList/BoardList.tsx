import { List, Task } from "@/generated/prisma"

interface BoardListProps {
    list: List & {
        tasks: Task[]
    }
}

export const BoardList: React.FC<BoardListProps> = ({ list }) => {

    return (
        <div className="w-64 bg-gray-100 p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-3">{list.name}</h3>

            <div className="flex flex-col gap-2">
                {list.tasks.map(task => (
                    <div key={task.id} className="bg-white p-2 rounded-md shadow-sm">
                        {task.name}
                        {task.status}
                    </div>
                ))}
            </div>
        </div>
    )
}
