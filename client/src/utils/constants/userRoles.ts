import { Role } from "@/generated/prisma"

export const userRoles: { id: Role, name: string }[] = [
    {
        id: Role.ADMIN,
        name: "Admin",
    },
    {
        id: Role.EDITOR_LIST,
        name: "Editor List",
    },
    {
        id: Role.VIEWER,
        name: "Viewer",
    }
]
