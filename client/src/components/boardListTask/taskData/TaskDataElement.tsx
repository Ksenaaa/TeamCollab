import { PropsWithChildren } from "react"

interface TaskDataElementProps {
    title: string
}

export const TaskDataElement = ({ title, children }: PropsWithChildren<TaskDataElementProps>) => {
    return (
        <div className="border border-gray-200 rounded p-2 h-full break-words">
            <p className="text-blue text-xs mb-1">{title}</p>
            {children}
        </div>
    )
}
