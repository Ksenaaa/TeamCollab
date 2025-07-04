'use server'
import { Prisma } from '@/generated/prisma';
import prisma from '@/lib/prisma'

export const projectActions = {
    create: async (data: Prisma.ProjectCreateInput) => {
        try {
            const project = await prisma.project.create({ data });
            return project;
        } catch (error) {
            console.error("Error creating project:", error);
            throw new Error("Failed to create project");
        }
    },
    update: async (id: string, data: Prisma.ProjectUpdateInput) => {
        try {
            const project = await prisma.project.update({
                where: { id },
                data,
            });
            return project;
        } catch (error) {
            console.error("Error updating project:", error);
            throw new Error("Failed to update project");
        }
    },
    delete: async (id: string) => {
        try {
            await prisma.project.delete({
                where: { id },
            });
            return { success: true };
        } catch (error) {
            console.error("Error deleting project:", error);
            return { success: false, error: "Failed to delete project" };
        }
    }
}
