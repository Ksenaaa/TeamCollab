'use client'

import { Status } from "@/generated/prisma"
import { statusMeta } from "@/utils/constants/statusMeta"

interface StatusProps {
    status: Status
}

export const StatusElement: React.FC<StatusProps> = ({ status }) => {
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusMeta[status].color}`}>
            {statusMeta[status].label}
        </span>
    )
}
