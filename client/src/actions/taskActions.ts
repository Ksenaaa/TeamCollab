'use server'

import { Prisma, Task } from '@/generated/prisma';
import { errorHandler } from '@/lib/errorHandlers';
import prisma from '@/lib/prisma'
import { ActionResult } from '@/models/actionResponse';
import { revalidatePath } from 'next/cache';

export async function createTaskAction(data: Prisma.TaskCreateInput): Promise<ActionResult<Task>> {
    try {
        const task = await prisma.task.create({ data });
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
        const result = await prisma.task.delete({
            where: { id },
            select: {
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
            }
        });

        revalidatePath(`/${result.list.board.projectId}/boards/${result.list.boardId}`);

        return { success: true, data: null, message: 'Task deleted successfully', status: 204 };
    } catch (error) {
        return errorHandler(error);
    }
}
