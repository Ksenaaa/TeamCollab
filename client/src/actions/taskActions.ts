'use server'
import { Prisma } from '@/generated/prisma';
import prisma from '@/lib/prisma'

export const taskActions = {
    create: async (data: Prisma.TaskCreateInput) => {
        try {
            const task = await prisma.task.create({ data });
            return task;
        } catch (error) {
            console.error("Error creating task:", error);
            throw new Error("Failed to create task");
        }
    },
    update: async (id: string, data: Prisma.TaskUpdateInput) => {
        try {
            const task = await prisma.task.update({
                where: { id },
                data,
            });
            return task;
        } catch (error) {
            console.error("Error updating task:", error);
            throw new Error("Failed to update task");
        }
    },
    delete: async (id: string) => {
        try {
            await prisma.task.delete({
                where: { id },
            });
            return { success: true };
        } catch (error) {
            console.error("Error deleting task:", error);
            return { success: false, error: "Failed to delete task" };
        }
    }
}
