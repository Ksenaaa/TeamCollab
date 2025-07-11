import { Board, Comment, List, Task } from "@/generated/prisma"

export type BoardDataType = Board & {
    lists: ListWithTaskType[]
}

export type ListWithTaskType = List & {
    tasks: TaskWithAssignedType[]
}

export type TaskWithAssignedType = Task & {
    assigned: { id: string, name: string, email: string },
    comments: CommentWithUserType[]
}

export type CommentWithUserType = Comment & { user: { id: string, name: string, email: string } }
