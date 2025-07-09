'use server'

import { List, Prisma } from '@/generated/prisma';
import { errorHandler } from '@/lib/errorHandlers';
import prisma from '@/lib/prisma'
import { ActionResult } from '@/models/actionResponse';
import { revalidatePath } from 'next/cache';

export async function createListAction(data: Prisma.ListCreateInput): Promise<ActionResult<List>> {
    try {
        const list = await prisma.list.create({ data });
        revalidatePath(`/${data.board.connect?.projectId}/boards/${data.board.connect?.id}`);

        return { success: true, data: list, message: 'List created successfully', status: 201 };
    } catch (error) {
        return errorHandler(error);
    }
}

export async function updateListAction(id: string, data: Prisma.ListUpdateInput): Promise<ActionResult<null>> {
    try {
        await prisma.list.update({
            where: { id },
            data,
        });
        revalidatePath(`/${data.board?.connect?.projectId}/boards/${data.board?.connect?.id}`);

        return { success: true, data: null, message: 'List updated successfully', status: 204 };
    } catch (error) {
        return errorHandler(error);
    }
}

export async function deleteListAction(id: string): Promise<ActionResult<null>> {
    try {
        const response = await prisma.list.delete({
            where: { id },
            select: {
                board: {
                    select: {
                        projectId: true,
                        id: true
                    }
                }
            }
        });
        revalidatePath(`/${response.board.projectId}/boards/${response.board.id}`);

        return { success: true, data: null, message: 'List deleted successfully', status: 204 };
    } catch (error) {
        return errorHandler(error);
    }
}

export async function getListsShortByBoardIdAction(boardId: string): Promise<ActionResult<{ id: string; name: string }[]>> {
    const lists = await prisma.list.findMany({
        where: { boardId },
        select: {
            id: true,
            name: true,
        }
    });
    return { success: true, data: lists, status: 200 };
}
