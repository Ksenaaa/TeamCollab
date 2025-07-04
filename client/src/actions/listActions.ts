'use server'

import { Prisma } from '@/generated/prisma';
import prisma from '@/lib/prisma'

export async function createListAction(data: Prisma.ListCreateInput) {
    try {
        const list = await prisma.list.create({ data });
        return list;
    } catch (error) {
        console.error("Error creating list:", error);
        throw new Error("Failed to create list");
    }
}

export async function updateListAction(id: string, data: Prisma.ListUpdateInput) {
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
}

export async function deleteListAction(id: string) {
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
