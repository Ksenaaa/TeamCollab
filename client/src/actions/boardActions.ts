'use server'
import { Prisma } from '@/generated/prisma';
import prisma from '@/lib/prisma'

export const boardActions = {
    create: async (data: Prisma.BoardCreateInput) => {
        try {
            const board = await prisma.board.create({ data });
            return board;
        } catch (error) {
            console.error("Error creating board:", error);
            throw new Error("Failed to create board");
        }
    },
    update: async (id: string, data: Prisma.BoardUpdateInput) => {
        try {
            const board = await prisma.board.update({
                where: { id },
                data,
            });
            return board;
        } catch (error) {
            console.error("Error updating board:", error);
            throw new Error("Failed to update board");
        }
    },
    delete: async (id: string) => {
        try {
            await prisma.board.delete({
                where: { id },
            });
            return { success: true };
        } catch (error) {
            console.error("Error deleting board:", error);
            return { success: false, error: "Failed to delete board" };
        }
    }
}
