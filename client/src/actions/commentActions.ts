'use server'

import { Prisma } from '@/generated/prisma';
import prisma from '@/lib/prisma'

export async function createCommentAction(data: Prisma.CommentCreateInput) {
    try {
        const comment = await prisma.comment.create({ data });
        return comment;
    } catch (error) {
        console.error("Error creating comment:", error);
        throw new Error("Failed to create comment");
    }
}

export async function updateCommentAction(id: string, data: Prisma.CommentUpdateInput) {
    try {
        const comment = await prisma.comment.update({
            where: { id },
            data,
        });
        return comment;
    } catch (error) {
        console.error("Error updating comment:", error);
        throw new Error("Failed to update comment");
    }
}

export async function deleteCommentAction(id: string) {
    try {
        await prisma.comment.delete({
            where: { id },
        });
        return { success: true };
    } catch (error) {
        console.error("Error deleting comment:", error);
        return { success: false, error: "Failed to delete comment" };
    }
}
