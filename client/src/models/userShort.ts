import { Role } from "@/generated/prisma";

export interface UsersShort {
    id: string;
    name: string;
    email: string;
    role: Role;
}
