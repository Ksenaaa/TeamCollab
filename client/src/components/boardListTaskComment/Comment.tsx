'use client'

import { TaskWithAssignedType } from "@/models/boardTypes"
import { CommentElement } from "./commentElement/CommentElement"
import { CreateNewComment } from "./createNewComment/CreateNewComment"

interface CommentProps {
    task: TaskWithAssignedType
}

export const Comment: React.FC<CommentProps> = ({ task }) => {
    return (
        <div className="flex flex-col gap-2 max-h-60 overflow-scroll bg-gray-100 p-1">
            {task.comment.map(comment =>
                <CommentElement key={comment.id} comment={comment} />
            )}
            <div className="mt-3 flex justify-end">
                <CreateNewComment task={task} />
            </div>
        </div>
    )
}
