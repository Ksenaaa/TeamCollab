'use server'

import { Prisma } from '@/generated/prisma';
import prisma from '@/lib/prisma'
import { RouterPath } from '@/utils/constants/routerPath';
import { revalidatePath } from 'next/cache';

export async function createUserAction(data: Prisma.UserCreateInput) {
    try {
        // e.g., data.password = await bcrypt.hash(data.password, 10)
        const user = await prisma.user.create({ data });
        revalidatePath(RouterPath.USERS);
        return user;
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user");
    }
}

export async function updateUserAction(id: string, data: Prisma.UserUpdateInput) {
    try {
        const user = await prisma.user.update({
            where: { id },
            data,
        });
        return user;
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Failed to update user");
    }
}

export async function deleteUserAction(id: string) {
    try {
        await prisma.user.delete({
            where: { id },
        });
        return { success: true };
    } catch (error) {
        console.error("Error deleting user:", error);
        return { success: false, error: "Failed to delete user" };
    }
}

export async function getUsersShortAction() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
    return users;
}
