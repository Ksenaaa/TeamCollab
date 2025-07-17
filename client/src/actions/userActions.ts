'use server'

import { hash } from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { Role, User } from '@/generated/prisma';
import prisma from '@/lib/prisma'
import { RouterPath } from '@/utils/constants/routerPath';
import { ActionResult } from '@/models/actionResponse';
import { UsersShort } from '@/models/userShort';
import { errorHandler } from '@/lib/errorHandlers';
import { errorWithDetails } from '@/utils/helpers/errorWithDetails';
import { authorizeUser } from './auth-helpers';

export async function createUserAction(data: {
    name: string; email: string; password: string; role: Role
}): Promise<ActionResult<User>> {
    try {
        await authorizeUser([Role.ADMIN]);

        const hashedPassword = await hash(data.password, 10);
        data.password = hashedPassword;

        const user = await prisma.user.create({ data });

        revalidatePath(RouterPath.USERS);

        return { success: true, data: user, message: 'User created successfully', status: 201 };
    } catch (error) {
        return errorHandler(error);
    }
}

export async function updateUserAction(id: string, data: { name: string, email: string, role: Role }): Promise<ActionResult<null>> {
    try {
        await authorizeUser([Role.ADMIN]);

        await prisma.user.update({
            where: { id },
            data,
        });
        revalidatePath(RouterPath.USERS);

        return { success: true, data: null, message: 'User updated successfully', status: 204 };
    } catch (error) {
        return errorHandler(error);
    }
}

export async function deleteUserAction(id: string): Promise<ActionResult<null>> {
    try {
        await authorizeUser([Role.ADMIN]);

        await prisma.user.delete({
            where: { id },
        });
        revalidatePath(RouterPath.USERS);

        return { success: true, data: null, message: 'User deleted successfully', status: 204 };
    } catch (error) {
        return errorHandler(error);
    }
}

export async function getUsersShortAction(): Promise<ActionResult<UsersShort[]>> {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });
        return { data: users, success: true, status: 200 };
    } catch (error) {
        return errorHandler(error);
    }
}

export async function getUserAction(id: string): Promise<ActionResult<UsersShort>> {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });
        if (!user) throw errorWithDetails({ message: 'User not found', status: 404 });

        return { data: user, success: true, status: 200 };
    } catch (error) {
        return errorHandler(error);
    }
}
