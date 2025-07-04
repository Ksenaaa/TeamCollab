'use server'
import { Prisma } from '@/generated/prisma';
import prisma from '@/lib/prisma'

export const commentActions = {
    create: async (data: Prisma.CommentCreateInput) => {
        try {
            const comment = await prisma.comment.create({ data });
            return comment;
        } catch (error) {
            console.error("Error creating comment:", error);
            throw new Error("Failed to create comment");
        }
    },
    update: async (id: string, data: Prisma.CommentUpdateInput) => {
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
    },
    delete: async (id: string) => {
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
}
