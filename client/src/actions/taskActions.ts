'use server'

import { Prisma, Task } from '@/generated/prisma';
import { errorHandler } from '@/lib/errorHandlers';
import prisma from '@/lib/prisma'
import { ActionResult } from '@/models/actionResponse';
import { errorWithDetails } from '@/utils/helpers/errorWithDetails';
import { revalidatePath } from 'next/cache';

export async function createTaskAction(data: Prisma.TaskCreateInput): Promise<ActionResult<Task>> {
    try {
        const highestOrderTask = await prisma.task.findFirst({
            where: { listId: data.list.connect?.id },
            orderBy: { order: 'desc' },
            select: { order: true },
        });

        const newOrder = highestOrderTask ? highestOrderTask.order + 1 : 0;


        const task = await prisma.task.create({
            data: {
                ...data,
                order: newOrder
            }
        });
        revalidatePath(`/${data.list.connect?.board?.projectId}/boards/${data.list.connect?.boardId}`);

        return { success: true, data: task, message: 'Task created successfully', status: 201 };
    } catch (error) {
        return errorHandler(error);
    }
}

export async function updateTaskAction(id: string, data: Prisma.TaskUpdateInput): Promise<ActionResult<null>> {
    try {
        await prisma.task.update({
            where: { id },
            data,
        });
        revalidatePath(`/${data.list?.connect?.board?.projectId}/boards/${data.list?.connect?.boardId}`);

        return { success: true, data: null, message: 'Task updated successfully', status: 204 };
    } catch (error) {
        return errorHandler(error);
    }
}

export async function deleteTaskAction(id: string): Promise<ActionResult<null>> {
    try {
        const transactionResult = await prisma.$transaction(async (tx) => {
            const taskToDelete = await tx.task.findUnique({
                where: { id },
                select: {
                    listId: true,
                    order: true,
                    list: {
                        select: {
                            boardId: true,
                            board: {
                                select: {
                                    projectId: true
                                }
                            }
                        }
                    }
                },
            });

            if (!taskToDelete) {
                throw errorWithDetails({ message: "Task not found", status: 404 });
            }

            await tx.task.delete({
                where: { id },
            });

            await tx.task.updateMany({
                where: {
                    listId: taskToDelete.listId,
                    order: {
                        gt: taskToDelete.order,
                    },
                },
                data: {
                    order: {
                        decrement: 1,
                    },
                },
            });

            return { boardId: taskToDelete.list.boardId, projectId: taskToDelete.list.board.projectId };
        });
        revalidatePath(`/${transactionResult.projectId}/boards/${transactionResult.boardId}`);

        return { success: true, data: null, message: 'Task deleted successfully', status: 204 };
    } catch (error) {
        return errorHandler(error);
    }
}

export async function updateTasksOrderAction({ listId, newTasks }: {
    listId: string, newTasks: { id: string, order: number }[]
}): Promise<ActionResult<null>> {
    try {
        await prisma.$transaction(async (tx) => {
            const currentTasksOnList = await tx.task.findMany({
                where: { listId },
                select: { id: true, order: true },
                orderBy: { createdAt: 'asc' }
            });

            const tempUpdates = currentTasksOnList.map((task, index) =>
                tx.task.update({
                    where: { id: task.id },
                    data: { order: -(index + 1) }
                })
            );
            await Promise.all(tempUpdates);

            const finalUpdates = newTasks.map(task =>
                tx.task.update({
                    where: { id: task.id, listId },
                    data: { order: task.order },
                })
            );
            await Promise.all(finalUpdates);
        });

        return { success: true, data: null, message: 'Task updated successfully', status: 204 };
    } catch (error) {
        return errorHandler(error);
    }
}

export async function updateTasksOrderInDifferentListsAction({ sourceListId, destinationListId, sourceMovedTask, newDestinationListTasks }: {
    sourceListId: string, destinationListId: string, sourceMovedTask: { id: string, order: number }, newDestinationListTasks: { id: string, order: number }[]
}): Promise<ActionResult<null>> {
    try {
        await prisma.$transaction(async (tx) => {
            await tx.task.update({
                where: { id: sourceMovedTask.id },
                data: {
                    listId: destinationListId,
                    order: 999999999
                },
            });

            await tx.task.updateMany({
                where: {
                    listId: sourceListId,
                    order: {
                        gt: sourceMovedTask.order,
                    },
                },
                data: {
                    order: {
                        decrement: 1,
                    },
                },
            });

            const destinationListTasks = await tx.task.findMany({
                where: { listId: destinationListId },
                select: { id: true, order: true },
                orderBy: { createdAt: 'asc' }
            });

            const tempUpdates = destinationListTasks.map((task, index) =>
                tx.task.update({
                    where: { id: task.id },
                    data: { order: -(index + 1) }
                })
            );
            await Promise.all(tempUpdates);

            const finalUpdates = newDestinationListTasks.map(task =>
                tx.task.update({
                    where: { id: task.id, listId: destinationListId },
                    data: { order: task.order },
                })
            );
            await Promise.all(finalUpdates);
        });

        return { success: true, data: null, message: 'Task updated successfully', status: 204 };
    } catch (error) {
        return errorHandler(error);
    }
}
