'use server'

import { hash } from 'bcrypt';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { Prisma, Role, User } from '@/generated/prisma';
import prisma from '@/lib/prisma'
import { RouterPath } from '@/utils/constants/routerPath';
import { ActionResult } from '@/models/actionResponse';
import { UsersShort } from '@/models/userShort';
import { errorHandler } from '@/lib/errorHandlers';
import { authConfig } from '@/lib/auth.config';
import { errorWithDetails } from '@/utils/helpers/errorWithDetails';

export async function createUserAction(data: Prisma.UserCreateInput): Promise<ActionResult<User>> {
    try {
        const session = await getServerSession(authConfig);
        if (!session || session.user.role !== Role.ADMIN) {
            throw errorWithDetails({ message: "Forbidden: Admin access required", status: 403 });
        }

        const hashedPassword = await hash(data.password, 10);
        data.password = hashedPassword;

        const user = await prisma.user.create({ data });

        revalidatePath(RouterPath.USERS);

        return { success: true, data: user, message: 'User created successfully', status: 201 };
    } catch (error) {
        return errorHandler(error);
    }
}

export async function updateUserAction(id: string, data: Prisma.UserUpdateInput): Promise<ActionResult<null>> {
    try {
        await prisma.user.update({
            where: { id },
            data,
        });
        return { success: true, data: null, message: 'User updated successfully', status: 204 };
    } catch (error) {
        return errorHandler(error);
    }
}

export async function deleteUserAction(id: string): Promise<ActionResult<null>> {
    try {
        await prisma.user.delete({
            where: { id },
        });
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
