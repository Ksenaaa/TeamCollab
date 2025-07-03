import { Status } from "@/generated/prisma";

export const statusMeta: Record<Status, { label: string, color: string }> = {
    IN_PROGRESS: {
        label: 'In Progress',
        color: 'bg-blue-100 text-blue-800'
    },
    COMPLETED: {
        label: 'Completed',
        color: 'bg-green-100 text-green-800'
    },
    DELAY: {
        label: 'Delay',
        color: 'bg-yellow-100 text-yellow-800'
    },
};
