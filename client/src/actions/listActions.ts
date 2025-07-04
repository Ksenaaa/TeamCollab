'use server'
import { Prisma } from '@/generated/prisma';
import prisma from '@/lib/prisma'

export const listActions = {
    create: async (data: Prisma.ListCreateInput) => {
        try {
            const list = await prisma.list.create({ data });
            return list;
        } catch (error) {
            console.error("Error creating list:", error);
            throw new Error("Failed to create list");
        }
    },
    update: async (id: string, data: Prisma.ListUpdateInput) => {
        try {
            const list = await prisma.list.update({
                where: { id },
                data,
            });
            return list;
        } catch (error) {
            console.error("Error updating list:", error);
            throw new Error("Failed to update list");
        }
    },
    delete: async (id: string) => {
        try {
            await prisma.list.delete({
                where: { id },
            });
            return { success: true };
        } catch (error) {
            console.error("Error deleting list:", error);
            return { success: false, error: "Failed to delete list" };
        }
    }
}
