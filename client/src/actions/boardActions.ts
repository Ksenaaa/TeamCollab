'use server'

import { Board, Prisma } from '@/generated/prisma';
import { errorHandler } from '@/lib/errorHandlers';
import prisma from '@/lib/prisma'
import { ActionResult } from '@/models/actionResponse';
import { revalidatePath } from 'next/cache';

export async function createBoardAction(data: Prisma.BoardCreateInput): Promise<ActionResult<Board>> {
    try {
        const board = await prisma.board.create({ data });
        revalidatePath(`/${data.project.connect?.id}/boards`);

        return { success: true, data: board, message: 'Board created successfully', status: 201 };
    } catch (error) {
        return errorHandler(error);
    }
}

export async function updateBoardAction(id: string, data: Prisma.BoardUpdateInput): Promise<ActionResult<null>> {
    try {
        await prisma.board.update({
            where: { id },
            data,
        });
        revalidatePath(`/${data.project?.connect?.id}/boards/${id}`);

        return { success: true, data: null, message: 'Board updated successfully', status: 204 };
    } catch (error) {
        return errorHandler(error);
    }
}

export async function deleteBoardAction(id: string): Promise<ActionResult<null>> {
    try {
        await prisma.board.delete({
            where: { id },
        });

        return { success: true, data: null, message: 'Board deleted successfully', status: 204 };
    } catch (error) {
        return errorHandler(error);
    }
}
