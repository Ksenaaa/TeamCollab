'use server'

import { List, Prisma } from '@/generated/prisma';
import { errorHandler } from '@/lib/errorHandlers';
import prisma from '@/lib/prisma'
import { ActionResult } from '@/models/actionResponse';
import { errorWithDetails } from '@/utils/helpers/errorWithDetails';
import { revalidatePath } from 'next/cache';

export async function createListAction(data: Prisma.ListCreateInput): Promise<ActionResult<List>> {
    try {
        const highestOrderList = await prisma.list.findFirst({
            where: { boardId: data.board.connect?.id },
            orderBy: { order: 'desc' },
            select: { order: true },
        });

        const newOrder = highestOrderList ? highestOrderList.order + 1 : 0;

        const list = await prisma.list.create({
            data: {
                ...data,
                order: newOrder
            }
        });
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
        const transactionResult = await prisma.$transaction(async (tx) => {
            const listToDelete = await tx.list.findUnique({
                where: { id },
                select: {
                    order: true,
                    boardId: true,
                    board: {
                        select: {
                            projectId: true,
                        },
                    },
                },
            });

            if (!listToDelete) {
                throw errorWithDetails({ message: "List not found", status: 404 });
            }

            await tx.list.delete({
                where: { id },
            });

            await tx.list.updateMany({
                where: {
                    boardId: listToDelete.boardId,
                    order: {
                        gt: listToDelete.order,
                    },
                },
                data: {
                    order: {
                        decrement: 1,
                    },
                },
            });

            return { boardId: listToDelete.boardId, projectId: listToDelete.board.projectId };
        });
        revalidatePath(`/${transactionResult.projectId}/boards/${transactionResult.boardId}`);

        return { success: true, data: null, message: 'List deleted successfully', status: 204 };
    } catch (error) {
        return errorHandler(error);
    }
}

export async function updateListsOrderAction({ boardId, newLists }: {
    boardId: string, newLists: { id: string, order: number }[]
}): Promise<ActionResult<null>> {
    try {
        await prisma.$transaction(async (tx) => {
            const currentListsOnBoard = await tx.list.findMany({
                where: { boardId },
                select: { id: true, order: true },
                orderBy: { createdAt: 'asc' }
            });

            const tempUpdates = currentListsOnBoard.map((list, index) =>
                tx.list.update({
                    where: { id: list.id },
                    data: { order: -(index + 1) }
                })
            );
            await Promise.all(tempUpdates);

            const finalUpdates = newLists.map(list =>
                tx.list.update({
                    where: { id: list.id, boardId },
                    data: { order: list.order },
                })
            );
            await Promise.all(finalUpdates);
        });

        return { success: true, data: null, message: 'List updated successfully', status: 204 };
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
