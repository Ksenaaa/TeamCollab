'use server'

import { Comment, Prisma } from '@/generated/prisma';
import { errorHandler } from '@/lib/errorHandlers';
import prisma from '@/lib/prisma'
import { ActionResult } from '@/models/actionResponse';
import { revalidatePath } from 'next/cache';

export async function createCommentAction(data: Prisma.CommentCreateInput): Promise<ActionResult<Comment>> {
    try {
        const comment = await prisma.comment.create({ data });
        revalidatePath(`/${data.task.connect?.list?.board?.projectId}/boards/${data.task.connect?.list?.boardId}`);

        return { success: true, data: comment, message: 'Comment created successfully', status: 201 };
    } catch (error) {
        return errorHandler(error);
    }
}

export async function updateCommentAction(id: string, data: Prisma.CommentUpdateInput): Promise<ActionResult<null>> {
    try {
        await prisma.comment.update({
            where: { id },
            data,
        });
        revalidatePath(`/${data.task?.connect?.list?.board?.projectId}/boards/${data.task?.connect?.list?.boardId}`);

        return { success: true, data: null, message: 'Comment updated successfully', status: 204 };
    } catch (error) {
        return errorHandler(error);
    }
}

export async function deleteCommentAction(id: string): Promise<ActionResult<null>> {
    try {
        const result = await prisma.comment.delete({
            where: { id },
            select: {
                task: {
                    select: {
                        list: {
                            select: {
                                board: {
                                    select: {
                                        projectId: true,
                                        id: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        revalidatePath(`/${result.task.list.board.projectId}/boards/${result.task.list.board.id}`);

        return { success: true, data: null, message: 'Comment deleted successfully', status: 204 };
    } catch (error) {
        return errorHandler(error);
    }
}
