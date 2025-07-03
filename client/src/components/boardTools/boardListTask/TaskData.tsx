import { Button } from "@/components/button/Button"
import { Task } from "@/generated/prisma"

interface TaskDataProps {
    task: Task
}

export const TaskData: React.FC<TaskDataProps> = ({ task }) => {
    return (
        <div className='w-full'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-800">
                <div className="space-y-2">
                    <TaskDataElement title='Description' value={task.description || ''} />
                    <TaskDataElement title='Assigned To' value={task.assignedId} />
                    <TaskDataElement title='Status' value={task.status} />
                </div>

                <div className="space-y-2">
                    <TaskDataElement title='End Date' value={new Date(task.dateEnd).toLocaleDateString()} />
                    <TaskDataElement title='Created' value={new Date(task.createdAt).toLocaleDateString()} />
                    <TaskDataElement title='Updated' value={new Date(task.updatedAt).toLocaleDateString()} />
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <Button title="Add Comment" />
            </div>
        </div>
    )
}

export const TaskDataElement = ({ title, value = '' }: { title: string, value?: string }) => {
    return (
        <div className="border border-gray-200 rounded p-3 bg-gray-100">
            <p className="text-gray-600 text-xs mb-1">{title}</p>
            <p>{value}</p>
        </div>
    )
}
