import { Button } from "@/components/button/Button"
import { TaskWithAssignedType } from "@/models/boardTypes"
import { DeleteTask } from "../deleteTask/DeleteTask"
import { UpdateTask } from "../updateTask/UpdateTask"
import { StatusElement } from "@/components/statusElement/StatusElement"
import { TaskDataElement } from "./TaskDataElement"
import { formatDate } from "@/utils/helpers/formatDate"
import { formatDateWithTime } from "@/utils/helpers/formatDateWithTime"

interface TaskDataProps {
    task: TaskWithAssignedType
}

export const TaskData: React.FC<TaskDataProps> = ({ task }) => {
    return (
        <div className='w-120 max-w-full'>
            <div className="grid grid-cols-4 gap-1 md:gap-4 text-sm text-gray-800">
                <div className="col-span-4 sm:col-span-2">
                    <TaskDataElement title='Created'>
                        {formatDateWithTime(task.createdAt)}
                    </TaskDataElement>
                </div>
                <div className="col-span-4 sm:col-span-2">
                    <TaskDataElement title='Last Changes'>
                        {formatDateWithTime(task.updatedAt)}
                    </TaskDataElement>
                </div>

                <div className="col-span-4">
                    <TaskDataElement title='Description'>{task.description}</TaskDataElement>
                </div>

                <div className="col-span-4 sm:col-span-2">
                    <TaskDataElement title='Assigned To'>
                        <div className="flex flex-col">
                            <p>{task.assigned.name}</p>
                            <p>{task.assigned.email}</p>
                        </div>
                    </TaskDataElement>
                </div>
                <div className="col-span-4 sm:col-span-1">
                    <TaskDataElement title='Status'>
                        <StatusElement status={task.status} />
                    </TaskDataElement>
                </div>
                <div className="col-span-4 sm:col-span-1">
                    <TaskDataElement title='End Date'>{formatDate(task.dateEnd)}</TaskDataElement>
                </div>

                <div className="col-span-4">
                    <TaskDataElement title='Comments'>
                        <div className="mt-6 flex justify-end">
                            <Button title="Add Comment" />
                        </div>
                    </TaskDataElement>
                </div>

                <div className="col-span-4">
                    <TaskDataElement title='Task Settings'>
                        <div className="mt-6 flex justify-end">
                            <UpdateTask task={task} />
                            <DeleteTask task={task} />
                        </div>
                    </TaskDataElement>
                </div>
            </div>
        </div>
    )
}
